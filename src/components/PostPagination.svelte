<script lang="ts">
import type { Page } from "astro";

interface $$Props extends Omit<Page, "data"> {}
let { start, end, total, currentPage, size, lastPage, url } =
  $$props as $$Props;
export { start, end, total, currentPage, size, lastPage, url };
const { current, prev, next } = url;
const maxPage = Math.ceil(total / size);
const curr = (index: number) => (index === currentPage ? "page" : null);
const tab = (index: number) => (index === currentPage ? -1 : 0);
</script>

<ol>
  {#if prev}
    <li>
      <a href="/blog">&lt;&lt;</a>
    </li>
    <li>
      <a href={prev}>&lt;</a>
    </li>
  {/if}
  {#if size < total}
    <li>
      <a href="/blog" aria-current={curr(1)} tabindex={tab(1)}>1</a>
    </li>
  {/if}
  {#each [...Array(maxPage - 1)] as _, index}
    <li>
      <a href={`/blog/${index+2}`} aria-current={curr(index+2)} tabindex={tab(index+2)}>{index+2}</a>
    </li>
  {/each}
  {#if next}
    <li>
      <a href={next}>&gt;</a>
    </li>
    <li>
      <a href={`/blog/${lastPage}`}>&gt;&gt;</a>
    </li>
  {/if}
</ol>

<style>
  ol {
    padding-inline: 0;
    list-style: none;
    display: flex;
    gap: .5rem;

    & > li > a {
      text-decoration: none;
      color: white;
      width: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      border-radius: 0.5rem;
      transition: background-color 100ms ease-in;
      background-color: rgb(var(--color-hover));

      &[aria-current="page"] {
        pointer-events: none;
      }

      &:hover, &[aria-current="page"] {
        background-color: rgba(0 0 0 / 0.3);
      }
    }
  }
</style>
