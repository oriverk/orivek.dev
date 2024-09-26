<script lang="ts">
import { clsx } from "clsx";
import type { Snippet } from "svelte";

type Props = {
  children: Snippet;
  className?: string;
  style?: string;
};

const { children, className, style }: Props = $props();
</script>

<div class={clsx('content-wrapper', className)} style={style}>
  {@render children()}
</div>

<style>
  .content-wrapper {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>
