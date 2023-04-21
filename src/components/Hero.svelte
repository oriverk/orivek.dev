<script lang="ts">
import GithubIcon from "./ui/icons/GithubIcon.svelte";
import TwitterIcon from "./ui/icons/TwitterIcon.svelte";
import PencilIcon from "./ui/icons/PencilIcon.svelte";
</script>

<div class="hero">
  <h1>Kawano Yudai</h1>
  <p><span class="text-gradient">Agr.</span> → ? / Bicycle</p>
  <div class="links">
    <a href="/#" target="_blank" rel="noopener noreferrer">
      <GithubIcon />
      <span class="sr-only">GitHub link</span>
    </a>
    <a href="/#" title="blog">
      <TwitterIcon />
      <span class="sr-only">Twitter link</span>
    </a>
    <a href="/#" title="cv">
      <PencilIcon />
      <span class="sr-only">cv link</span>
    </a>
  </div>
</div>

<style lang="scss">
.hero {
  margin-inline: auto;
  // width: 60ch;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  // background-position: 0%;
  transition: background-size 0.2s var(--cubic-bezier);
  &:hover {
    background-size: 100%;
  }
}

.links {
  display: flex;
  gap: .5rem;
}

.links a {
  // padding: .625rem;
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