<script lang="ts">
import type { DataReturn } from "@/types/pagefind";

interface Props {
  data: DataReturn;
  selected: boolean;
  setActiveHit: () => void;
}

const { data, selected, setActiveHit }: Props = $props();
const { meta, raw_url, sub_results } = data;
const { title, date } = meta;
</script>

<a
  href={raw_url}
  class:active={selected}
  onfocus={() => setActiveHit()}
  onmouseover={() => setActiveHit()}
  ontouchstart={() => setActiveHit()}
>
  <div>
    <p class="title">{title}</p>
    <time class="date" datetime={date}>{date?.split("T")[0]}</time>
  </div>
</a>
<!-- {#if !!sub_results.length}

{/if} -->

<style>
  a {
    text-decoration: none;
    padding: 0.5rem 1rem;

    &.active {
      border: 1px solid rgb(var(--accent));
      background-color: rgb(var(--accent));
      color: rgb(var(--color-black));
    }

    & p {
    font-size: 16px;
  }
  }
</style>
