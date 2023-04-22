<script lang="ts">
  import type {UserContent} from "../types/github";
  import RepositoryCard from "./RepositoryCard.svelte";

  export let repositryItems: UserContent["pinnedItems"]["nodes"];
</script>

<div class='github-list'>
  <ol class='grid'>
    {#each repositryItems as item}
      <li>
        <RepositoryCard {...item} />
      </li>
    {/each}
  </ol>
</div>

<style lang='scss'>
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