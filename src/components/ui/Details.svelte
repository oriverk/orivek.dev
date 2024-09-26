<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLDetailsAttributes } from "svelte/elements";

type Props = Omit<HTMLDetailsAttributes, "class"> & {
  children: Snippet;
  summary: string;
  className?: string;
};

const { children, summary, className, ...restProps }: Props = $props();
</script>
<details class={className} {...restProps}>
  {#if !!summary}
    <summary>
      {summary}
    </summary>
  {/if}
  {@render children()}
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
