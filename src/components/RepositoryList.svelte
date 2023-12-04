<script lang="ts">
  import type { PinnedItem } from '../types/github'
  import RepositoryCard from './RepositoryCard.svelte'

  export let repositoryItems: PinnedItem[] = []
</script>

<div class="github-list">
  <ol class="grid">
    {#each repositoryItems as item}
      <li>
        <RepositoryCard {...item} />
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
