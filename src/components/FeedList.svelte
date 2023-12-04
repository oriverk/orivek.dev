<script lang="ts">
  import type { FeedItem } from '../types/feed'
  import FeedCard from './FeedCard.svelte'

  interface $$Props {
    items: FeedItem[]
    displayItemsCount?: number
  }

  let { items, displayItemsCount = 12 } = $$props as $$Props
  export { items, displayItemsCount }
</script>

<div class="feed-list">
  <ol class="grid">
    {#each items.slice(0, displayItemsCount) as item}
      <li>
        <FeedCard {...item} />
      </li>
    {/each}
  </ol>
</div>

<style>
  .grid {
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);
    list-style: none;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
