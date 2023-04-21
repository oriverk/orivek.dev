<script lang="ts">
  import type {UserContent} from "../types/github";
  import PinnedRepo from "./ui/PinnedRepo.svelte";
  export let pinnedItems: UserContent["pinnedItems"];
</script>

<div class='github'>
  <h2>GitHub</h2>
  <div class='pinnedItems'>
    <h3>Pinned</h3>
    <ol class='grid'>
      {#each pinnedItems.nodes as item}
        <li>
          <PinnedRepo {...item} />
        </li>
      {/each}
    </ol>
  </div>
  <div class='contributionCalendar'>
    <h3>Contribution</h3>
    <slot>under construction....</slot>
  </div>
</div>

<style lang='scss'>
  .github {
    margin-inline: auto;
    max-width: 120ch;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .github h2 {
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