<script lang="ts">
import type { Hierarchy } from "@/utils/getBlog";
import TocList from "./TocList.svelte";

type Props = {
  heading: Hierarchy;
};

const { heading }: Props = $props();
const { slug, text, subHeadings } = heading;
</script>

<li class="toc-list">
  <a href={`#${slug}`}>{text}</a>
  {#if !!subHeadings}
    <ol>
      {#each subHeadings as heading}
        <TocList heading={heading} />
      {/each}
    </ol>
  {/if}
</li>

<style>
  ol {
    list-style: none;
    padding-inline-start: 1.5rem;
  }
</style>
