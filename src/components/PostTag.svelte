<script lang="ts">
type Props = {
  tag: string;
  href?: string;
};
const { tag, href }: Props = $props();
</script>

{#if !!href}
<a {href} class="tag">#{tag}</a>
{:else}
<span class="tag">#{tag}</span>
{/if}

<style>
  .tag {
    color: gray;
    font-size: 1rem;
  }

  a.tag {
    text-decoration: none;

    &:hover {
      color: rgb(var(--color-miku));
      border-color: rgb(var(--color-miku));
    }
  }
</style>
