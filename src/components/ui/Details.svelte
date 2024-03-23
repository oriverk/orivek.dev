<script lang="ts">
  import type { HTMLDetailsAttributes } from 'svelte/elements'

  interface $$Props extends Omit<HTMLDetailsAttributes, 'class'> {
    summary: string
    className?: string
  }

  let { summary, className } = $$props as $$Props
  export { summary, className }
</script>

<details
  {...$$restProps}
>
  {#if summary}
    <summary>
      {summary}
    </summary>
  {/if}
  <slot />
</details>

<style>
  details {
    background-color: rgba(var(--color-hover));

    & > summary {
      padding: 1rem;
      font-size: .9rem;
      cursor: pointer;
      user-select: none;
      touch-action: manipulation;

      &:hover{
        background-color: rgba(0 0 0 / 0.3);
      }
    }
  }

  details[open] {
    & > summary {
      background-color: rgba(0 0 0 / 0.3);

      &:hover {
        background-color: rgba(var(--color-hover));
      }
    }
  }
</style>
