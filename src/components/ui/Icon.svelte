<script lang="ts">
import { clsx } from "clsx";

type Props = {
  type:
    | "oriver"
    | "oriver rounded"
    | "github"
    | "zenn"
    | "x"
    | "pencil"
    | "magnifyingGlass"
    | "repository"
    | "star"
    | "link-external"
    | "search";
  size?: "small" | "medium" | "large" | "xlarge";
  color?: "white" | "black" | "gray";
  style?: string;
};

const { type, size, color, style }: Props = $props();
</script>

<span class={clsx('icon', type, size, color)} {style}></span>

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
    aspect-ratio: 1 / 1;
  }

  /* size */
  .small::before {
    width: 1rem;
  }

  .medium::before {
    width: 2rem;
  }

  .large::before {
    width: 3rem;
  }

  .xlarge::before {
    width: 4rem;
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

  .oriver::before {
    border: 1px solid transparent;
    border-radius: 30% 70% 59% 41% / 30% 26% 74% 70%;
    background-image: var(--accent-gradient);
  }
  
  .oriver.rounded::before {
    border-radius: 50%;
  }

  /* web service */
  .github::before {
    mask-image: url('/assets/github.svg');
  }

  .zenn::before {
    mask-image: url('/assets/zenn.svg');
    background-color: #3ea8ff;
  }

  .x::before {
    mask-image: url('/assets/x.svg');
  }

  /* general icon */
  .pencil::before {
    mask-image: url('/assets/pencil.svg');
  }

  .magnifyingGlass::before {
    mask-image: url('/assets/magnifyingGlass.svg');
  }

  .repository::before {
    mask-image: url('/assets/repository.svg');
  }

  .star::before {
    mask-image: url('/assets/star.svg');
  }

  .link-external::before {
    mask-image: url("/assets/link-external.svg")
  }

  .search::before {
    mask-image: url('/assets/magnifyingGlass.svg');
  }
</style>
