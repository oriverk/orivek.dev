<script lang="ts">
import clsx from "clsx";
export let className = "";
export let disabled = false;
</script>

<div class={clsx('card', className, disabled && 'disabled')}>
  <div>
    <slot />
  </div>
</div>

<style>
  :global(a:has(.card)) {
    text-decoration: none;
  }

  .card {
    height: 100%;
    padding: 0.15rem;
    background-color: rgb(var(--color-gray));
    background-image: none;
    background-size: 400%;
    border-radius: 0.6rem;
    background-position: 100%;
    transition: background-position 600ms var(--cubic-bezier);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  .card > div {
    width: 100%;
    height: 100%;
    line-height: 1.4;
    padding: 1rem 1.3rem;
    border-radius: 0.35rem;
    color: rgb(var(--color-white));
    background-color: rgb(var(--color-black));
    opacity: 1;
  }

  .card:not(.disabled):is(:hover, :focus-within) {
    background-position: 0;
    background-image: var(--accent-gradient);
  }
</style>
