<script lang="ts">
import clsx from "clsx";
export let className = "";
export let disabled = false;
</script>

<div class={clsx(className, disabled && 'disabled')}>
  <slot />
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
