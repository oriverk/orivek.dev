<script lang="ts">
import type { ComponentProps } from "svelte";
import urlJoin from "url-join";
import siteConfig from "../../site.config";
import type IconType from "./ui/Icon.svelte";
import Icon from "./ui/Icon.svelte";

const { github, zenn, x } = siteConfig;

type Link = Pick<ComponentProps<IconType>, "type" | "size"> & {
  href: string;
  title: string;
};

const links: Link[] = [
  {
    href: "/blog",
    title: "Blog",
    type: "pencil",
    size: "medium",
  },
  {
    href: urlJoin("https://github.com", github),
    title: "GitHub",
    type: "github",
    size: "medium",
  },
  {
    href: urlJoin("https://x.com", x),
    title: "X",
    type: "x",
    size: "medium",
  },
  {
    href: urlJoin("https://zenn.dev", zenn),
    title: "Zenn.dev",
    type: "zenn",
    size: "medium",
  },
  {
    href: "/icon",
    title: "Icon Generator",
    type: "oriver rounded",
    size: "medium",
  },
];
</script>

{#snippet link({href, title, type, size}: Link)}
  {@const isExternal = href.startsWith("https")}
  <a
    class="hero-link"
    {href}
    target={isExternal ? "_blank" : ""}
    rel={isExternal ? "noopener noreferrer" : ""}
    {title}
  >
    <Icon {type} {size} />
    <span class="sr-only">{title} link</span>
  </a>
{/snippet}

<div class="hero">
  <h1>oriverk.dev</h1>
  <p><span class="text-gradient">Agr.</span> → ? / Bicycle</p>
  <div class="links">
    {#each links as args}
      {@render link(args)}
    {/each}
  </div>
</div>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .text-gradient {
    background-image: var(--accent-gradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400%;
    transition: background-size 200ms var(--cubic-bezier);
  }

  .text-gradient:hover {
    background-size: 100%;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .hero-link {
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    border-radius: 0.5rem;
    transition: background-color 100ms ease-in;
    background-color: rgb(var(--color-hover));

    &:hover {
      background-color: rgba(0 0 0 / 0.3);
    }
  }

</style>
