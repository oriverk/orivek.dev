<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
  children: Snippet;
  className?: string;
  disabled?: boolean;
};

const { children, className, disabled = false }: Props = $props();
</script>

<div class={className} class:disabled={disabled}>
  {@render children()}
</div>

<style>
  div {
    height: 100%;
    padding: 1rem 1.3rem;
    color: rgb(var(--color-white));
    border-radius: 0.6rem;
    background-color: rgba(var(--color-hover));
    transition: background-color 100ms ease-in;

    &:not(.disabled):hover {
      background-color: rgba(0 0 0 / 0.3);
    }
  }
</style>
