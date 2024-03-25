<script lang="ts">
import clsx from "clsx";
export let className = "";
export let style = "";
</script>

<div class={clsx('content-wrapper', className)} style={style}>
  <slot />
</div>

<style>
  .content-wrapper {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>
