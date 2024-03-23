<script lang="ts">
  export let tag: string;
  export let href = ""
</script>

{#if href}
  <a {href}>#{tag}</a>
{:else}
  <span>#{tag}</span>
{/if}

<style>
  span, a {
    color: gray;
    font-size: 1rem;
  }

  a {
    text-decoration: none;

    &:hover {
      color: rgb(var(--color-miku));
      border-color: rgb(var(--color-miku));
    }
  }
</style>
