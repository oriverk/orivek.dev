<script lang="ts">
import PostTag from "./PostTag.svelte";

interface $$Props {
  title: string;
  tags?: string[];
  create: string;
  update?: string;
  href: string;
}
let { title, tags = [], create, update, href } = $$props as $$Props;
export { title, tags, create, update, href };
</script>

<article>
  <a {href} class="thumbnail">
    <div>
      <h2>{title}</h2>
    </div>
  </a>
  <div class="info">
    <time>{update || create}</time>
    <div class="tags">
      {#each tags as tag}
        <PostTag {tag} href={`/blog/tags/${tag}`} />
      {/each}
    </div>
  </div>
</article>

<style>
  a {
    text-decoration: none;
  }

  article {
    border: 1px solid  rgba(var(--color-hover));
  }

  h2 {
    font-size: 1.25rem;
  }

  .thumbnail > div {
    padding-inline: 1rem;
    padding-block: 0.5rem;
    aspect-ratio: 1.9 / 1;
    display: flex;
    align-items: center;
    transition: background-color 100ms ease-in;
    background-color: rgba(var(--color-hover));

    &:hover{
      background-color: rgba(0 0 0 / 0.3);
    }
  }

  .info {
    padding-inline: 1rem;
    padding-block: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .tags {
    display: flex;
    column-gap: .75rem;
    flex-wrap: wrap;
  }
</style>
