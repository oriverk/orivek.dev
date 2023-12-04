<script lang="ts">
  import urlJoin from 'url-join'
  import siteConfig from '../../site.config'
  import GithubIcon from './ui/icons/GithubIcon.svelte'
  import ZennIcon from './ui/icons/ZennIcon.svelte'
  import XIcon from './ui/icons/X.svelte'
  import PencilIcon from './ui/icons/PencilIcon.svelte'
  import MagnifyingGlass from './ui/icons/MagnifyingGlass.svelte'
  import Search from './Search/index.svelte'
  import Dialog from './ui/Dialog.svelte'

  const { blogPath, github, zenn, x } = siteConfig

  let dialog: HTMLDialogElement
  function openDialog() {
    dialog.showModal()
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dialog?.close()
      }
    })

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog?.close()
      }
    })
  }

  function closeDialog() {
    dialog.close()
  }
</script>

<div class="hero">
  <h1>Kawano Yudai</h1>
  <p><span class="text-gradient">Agr.</span> → ? / Bicycle</p>
  <div class="links">
    <button type="button" on:click={openDialog}>
      <MagnifyingGlass title="Search" />
      <span class="sr-only">Search</span>
    </button>
    <a href={blogPath} title="Blog" target="_blank" rel="noopener noreferrer">
      <PencilIcon title="blog.oriverk.dev" />
      <span class="sr-only">Blog link</span>
    </a>
    <a
      href={urlJoin('https://github.com', github)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon title={'@' + github} />
      <span class="sr-only">GitHub link</span>
    </a>
    <a
      href={urlJoin('https://twitter.com', x)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <XIcon title={'@' + x} />
      <span class="sr-only">X link</span>
    </a>
    <a
      href={urlJoin('https://zenn.dev', zenn)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ZennIcon title={'@' + zenn} />
      <span class="sr-only">Zenn.dev link</span>
    </a>
  </div>
  <Dialog bind:dialog on:closeDialog={closeDialog}>
    <Search />
  </Dialog>
</div>

<style>
  :global(.links svg) {
    width: 2rem;
    aspect-ratio: 1;
  }
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

  .links > * {
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    border-radius: 0.5rem;
    transition: background-color 100ms ease-in;
    background-color: rgb(var(--color-hover));
  }

  .links > *:hover {
    background-color: rgba(0 0 0 / 0.3);
  }
</style>
