<script lang="ts">
import type { Hit, SearchResponse } from "@algolia/client-search";
import { onMount } from "svelte";
import type { AlgoliaBlog } from "../../types/algolia";
import { searchAlgolia } from "../../utils/algolia";
import AlgoliaIcon from "./AlgoliaIcon.svelte";
import BlogHit from "./BlogHit.svelte";
import SearchInput from "./SearchInput.svelte";

let results: SearchResponse<AlgoliaBlog>;
let hits: Hit<AlgoliaBlog>[] = [];
let activeHit = -1;

let query: string;
let debouncedQuery: string;
const debounceDelay = 1000;
let timer: NodeJS.Timeout;
let anchor: HTMLAnchorElement;

function debounce(val: string) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    debouncedQuery = val;
  }, debounceDelay);
}

async function search(query: string) {
  results = await searchAlgolia(query);
  hits = results.hits;
  activeHit = -1;
}

function goUp() {
  activeHit = activeHit <= 0 ? activeHit : activeHit - 1;
}

function goDown() {
  activeHit = activeHit >= results.hits.length - 1 ? activeHit : activeHit + 1;
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "ArrowUp") {
    goUp();
  }
  if (e.key === "ArrowDown") {
    goDown();
  }
  if (e.key === "Enter") {
    selectHit();
  }
}

function selectHit() {
  if (activeHit === -1) return;
  if (hits[activeHit]) {
    const { id } = results.hits[activeHit];
    if (!anchor || !id) return;
    anchor.setAttribute("href", `https://blog.oriverk.dev/entry/${id}`);
    anchor.click();
  }
}

onMount(() => {
  anchor = document.createElement("a");
  return () => {
    anchor.remove();
    window.removeEventListener("keydown", handleKeyDown);
  };
});

$: {
  if (!query) {
    search(query);
  }
  debounce(query);
}
$: {
  search(debouncedQuery);
}
</script>

<svelte:window on:keydown={handleKeyDown} />
<div class="search-component">
  <SearchInput placeholder="検索" bind:value={query} name="q" type="search" />
  <div class="search-icon-wrapper">
    <a
      href="https://www.algolia.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <AlgoliaIcon height="1.25rem" />
    </a>
  </div>
  {#if !results?.nbHits}
    <p class="no-results">no results yet</p>
  {:else}
    <p>
      {results?.nbHits} results found in {results?.processingTimeMS}ms
    </p>
  {/if}
  <div class="search-results-wrapper">
    {#each hits as hit, i}
      {@const selected = i === activeHit}
      <BlogHit
        {...hit}
        {selected}
        on:mouseover={() => (activeHit = i)}
        on:focus={() => (activeHit = i)}
        on:touchstart={() => (activeHit = i)}
      />
    {/each}
  </div>
</div>

<style>
  .search-component {
    height: 100%;
  }

  .search-icon-wrapper {
    margin: 1rem 0;
    display: flex;
    justify-content: flex-end;
  }

  .search-results-wrapper {
    height: calc(100% - 9rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
