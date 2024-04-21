<script lang="ts">
import clsx from "clsx";

interface Props {
  size?: "small" | "medium" | "large" | "xlarge";
  color?: "white" | "black" | "gray";
  style?: string;
}

export let size: Props["size"] = "medium";
export let color: Props["color"] = "white";
export let style: Props["style"] = "";
</script>

<span class={clsx('icon', size, color)} {style} />

<style>
  .icon {
    display: flex;
  }

  .icon::before {
    content: '';
    display: inline-block;
    mask: no-repeat center;
    mask-size: contain;
    background-color: currentColor;
    mask-image: url('/assets/magnifyingGlass.svg');
  }

  /* size */
  .small::before {
    width: 1rem;
    height: 1rem;
  }

  .medium::before {
    width: 2rem;
    height: 2rem;
  }

  .large::before {
    width: 3rem;
    height: 3rem;
  }

  .xlarge::before {
    width: 4rem;
    height: 4rem;
  }

  /* color */
  .white::before {
    background-color: rgb(var(--color-white));
  }

  .black::before {
    background-color: rgb(var(--color-black));
  }

  .gray::before {
    background-color: rgb(var(--color-gray));
  }

  .currentColor::before {
    background-color: currentColor;
  }
</style>
