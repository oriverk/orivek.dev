<script lang="ts">
import type { Hierarchy } from "../../../utils/getPosts";

export let heading: Hierarchy;
const { slug, text, subHeadings } = heading;
</script>

<li>
  <a href={`#${slug}`}>{text}</a>
  {#if subHeadings.length}
    <ol>
      {#each subHeadings as heading}
        <svelte:self {heading} />
      {/each}
    </ol>
  {/if}
</li>

<style>
  ol {
    list-style: none;
  }
</style>
