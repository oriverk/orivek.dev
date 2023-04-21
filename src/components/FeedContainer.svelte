<script lang='ts'>
  import type { FeedItem } from "../types/feed"
  import FeedCard from "./FeedCard.svelte";
  export let items: FeedItem[];
  const displayItemsCount = 10;
</script>

<div class='feed'>
  <h2>Feed</h2>
  <div class='feed-items'>
    <ol class='grid'>
      {#each items.slice(0, displayItemsCount) as item}
        <li>
          <FeedCard {...item} />
        </li>
      {/each}
    </ol>
  </div>
</div>

<style lang='scss'>
  .feed {
    margin-inline: auto;
    max-width: 120ch;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .feed h2 {
    text-align: center;
  }

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