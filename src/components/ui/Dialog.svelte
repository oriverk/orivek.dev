<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLDialogAttributes } from "svelte/elements";

type Props = Omit<HTMLDialogAttributes, "class"> & {
  children: Snippet;
  className?: string;
  dialog: HTMLDialogElement;
};

let {
  children,
  id,
  className,
  dialog = $bindable(),
  ...restProps
}: Props = $props();
// const dispatch = createEventDispatcher();
// function onClose(){
//   dispatch('closeDialog')
// }
</script>

<dialog bind:this={dialog} {id} class={className} {...restProps}>
  {@render children()}
</dialog>

<style>
  :global(html:has(dialog[open])) {
    overflow: hidden;
  }

  dialog {
    max-width: 1024px;
    width: 80%;
    height: 80%;
    padding: 1rem;
    background-color: rgb(var(--color-black));
    border-radius: 0.2em;
  }

  @media (640px <= width) {
    dialog {
      width: 50%;
    }
  }

  @media (768px <= width) {
    dialog {
      width: 60%;
    }
  }

  dialog::backdrop {
    background: rgb(0 0 0 / 70%);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }

    to {
      transform: scale(1);
    }
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
