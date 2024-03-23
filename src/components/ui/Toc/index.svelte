<script lang="ts">
import type { Hierarchy } from "../../../utils/getPosts";
import TocList from "./TocList.svelte";

export let toc: Hierarchy[];
</script>

{#if toc.length}
  <nav>
    <ol>
      {#each toc as heading}
        <TocList {heading} />
      {/each}
    </ol>
  </nav>
{/if}

<style>
  ol {
    list-style: none;
    margin: 0;
    padding-block: 1rem;
    padding-inline: 2rem;
  }
</style>
