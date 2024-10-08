<script lang="ts">
import type { CollectionEntry } from "astro:content";
import PostTag from "./PostTag.svelte";

type Props = Pick<
  CollectionEntry<"blog">["data"],
  "title" | "tags" | "create" | "update"
> & {
  href: string;
};

const { title, tags = [], create, update, href }: Props = $props();
export { title, tags, create, update, href };
const lastModified = update || create;
const date = lastModified.toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const isoDate = lastModified.toISOString();
</script>

<article class="post-card">
  <a {href} class="thumbnail">
    <div>
      <h2>{title}</h2>
    </div>
  </a>
  <div class="info">
    <time datetime={isoDate}>{date}</time>
    <div class="tags">
      {#each tags as tag}
        <PostTag {tag} href={`/blog/tags/${tag}`} />
      {/each}
    </div>
  </div>
</article>

<style>
  .post-card {
    border: 1px solid rgba(var(--color-hover));
  }

  .thumbnail {
    text-decoration: none;

    & > div {
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

    & h2 {
      font-size: 1.25rem;
    }
  }

  .info {
    padding-inline: 1rem;
    padding-block: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;

    & > .tags {
      display: flex;
      column-gap: .75rem;
      flex-wrap: wrap;
    }
  }
</style>
