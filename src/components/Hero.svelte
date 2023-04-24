<script lang="ts">
  import GithubIcon from "./ui/icons/GithubIcon.svelte";
  import ZennIcon from "./ui/icons/ZennIcon.svelte";
  import TwitterIcon from "./ui/icons/TwitterIcon.svelte";
  import PencilIcon from "./ui/icons/PencilIcon.svelte";

  import siteConfig from "../../site.config";
  import urlJoin from "url-join"
  const {blogPath, github, zenn, twitter} = siteConfig
</script>

<div class="hero">
  <h1>Kawano Yudai</h1>
  <p><span class="text-gradient">Agr.</span> → ? / Bicycle</p>
  <div class="links">
    <a href={blogPath} title="Blog" target="_blank" rel="noopener noreferrer">
      <PencilIcon title="blog.oriverk.dev" />
      <span class="sr-only">Blog link</span>
    </a>
    <a href={urlJoin("https://github.com", github)} target="_blank" rel="noopener noreferrer">
      <GithubIcon title={"@" + github} />
      <span class="sr-only">GitHub link</span>
    </a>
    <a href={urlJoin("https://zenn.dev", zenn)} target="_blank" rel="noopener noreferrer">
      <ZennIcon title={"@" + zenn} />
      <span class="sr-only">Zenn.dev link</span>
    </a>
    <a href={urlJoin("https://twitter.com", twitter)} target="_blank" rel="noopener noreferrer">
      <TwitterIcon title={"@" + twitter} />
      <span class="sr-only">Twitter link</span>
    </a>
  </div>
</div>

<style lang="scss">
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
  &:hover {
    background-size: 100%;
  }
}

.links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .5rem;
}

.links a {
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border-radius: .5rem;
  transition: background-color 100ms ease-in;
  background-color: rgb(var(--color-hover));

  &:hover {
    background-color: rgba(0 0 0 / .3);
  }
}

.links :global(svg) {
  width: 2rem;
  aspect-ratio: 1;
}
</style>