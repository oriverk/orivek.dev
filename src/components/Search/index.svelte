<script lang="ts">
import type {
  DataReturn,
  Option,
  Pagefind,
  SearchResponse,
} from "@/types/pagefind";
import { onMount } from "svelte";
import urlJoin from "url-join";
import Hit from "./Hit.svelte";
import SearchInput from "./SearchInput.svelte";

let pagefind: Pagefind | null = $state(null);
let query = $state("");
let results: DataReturn[] = $state([]);
let activeHit = $state(-1);
let anchor: HTMLAnchorElement | null = $state(null);

async function search(
  query: string,
  options: Partial<Option>,
  miliseconds: number,
) {
  if (!pagefind || !query) return;

  const search: SearchResponse = await pagefind.debouncedSearch(
    query,
    options,
    miliseconds,
  );
  if (!search) return;
  results = await Promise.all(search.results.map((result) => result.data()));
}

function goUp() {
  activeHit = activeHit <= 0 ? activeHit : activeHit - 1;
}

function goDown() {
  activeHit = results.length - 1 <= activeHit ? activeHit : activeHit + 1;
}

function selectHit() {
  if (activeHit === -1 || !results[activeHit]) return;
  const { raw_url } = results[activeHit];
  if (!anchor || !raw_url) return;
  anchor.setAttribute("href", raw_url);
  anchor.click();
}

async function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      goUp();
      document
        .querySelector(".search-results > a.active")
        ?.scrollIntoView(false);
      break;
    case "ArrowDown":
      goDown();
      document
        .querySelector(".search-results > a.active")
        ?.scrollIntoView(true);
      break;
    case "Enter":
      selectHit();
      break;
    default:
      null;
  }
}

const url = urlJoin(
  import.meta.env.DEV ? "/dist" : "/",
  "pagefind/pagefind.js",
);

onMount(async () => {
  const _pagefind: Pagefind = await import(/* @vite-ignore */ url);
  if (!_pagefind) return;

  pagefind = _pagefind;
  pagefind.init();
  anchor = document.createElement("a");
});

$effect(() => {
  search(query, {}, 300);
});
</script>

<svelte:window onkeydown={handleKeyDown} />
<div class="search">
  <SearchInput placeholder="検索" bind:value={query} name="q" type="search" />
  <div class="search-message">
    {#if !query}
      <p>&nbsp;</p>
    {:else if !results?.length}
      <p>No results for {query}</p>
    {:else}
      <p>{results.length} results for {query}</p>
    {/if}
  </div>
  <div class="search-results">
    {#if !!query}
      {#each results as result, i}
        {@const selected = i === activeHit}
        <Hit
          data={result}
          {selected}
          setActiveHit={() => activeHit = i}
        />
      {/each}
    {/if}
  </div>
  <div class="search-shorthand">
    <p><kbd>Enter</kbd> to select, <kbd>↑</kbd><kbd>↓</kbd> to select, <kbd>Esc</kbd> to close.</p>
  </div>
</div>

<style>
  .search {
    height: 100%;
  }

  .search-results {
    height: calc(100% - 9rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (width < 768px) {
    .search-shorthand {
      display: none;
    }
  }
</style>
