<script lang="ts">
import type { Hit } from "@algolia/client-search";
import type { AlgoliaBlog } from "../../types/algolia";

interface $$Props extends Hit<AlgoliaBlog> {
  selected: boolean;
}

let { selected, id, title, tags } = $$props as $$Props;
export { selected, id, title, tags };
</script>

<a
  href={`https://blog.oriverk.dev/entry/${id}`}
  class:active={selected}
  on:mouseover
  on:focus
  on:touchstart
  {...$$restProps}
>
  <div class="hit-title">{title}</div>
  <div class="hit-info">
    tags: [{tags.join(', ')}]
  </div>
</a>

<style>
  a {
    text-decoration: none;
    padding: 0.5rem 1rem;
  }

  .active {
    border: 1px solid rgb(var(--accent));
    background-color: rgb(var(--accent));
    color: rgb(var(--color-black));
  }

  .hit-info {
    color: rgb(var(--color-lightgray));
  }

  .active .hit-info {
    color: rgb(var(--color-white));
  }
</style>
