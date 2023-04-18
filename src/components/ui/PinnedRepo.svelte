<!-- [Advanced styling / The style directive • Svelte Tutorial](https://svelte.dev/tutorial/style-directive) -->
<!-- [こびと on Twitter: "「CSS変数をstyle属性で書いてしまえばユニークな値入れ放題」 という技をエスイチさんから盗みました。義賊なのでみなさんに再配布します(感動の共有) https://t.co/siA1s8R7Tb" / Twitter](https://twitter.com/kobitoCode/status/1645360488602284032) -->
<!-- [Emotion – Best Practices](https://emotion.sh/docs/best-practices#advanced-css-variables-with-style) -->

<script lang="ts">
  import urlJoin from 'url-join';
  import type { Repository, Language } from '@octokit/graphql-schema';
  import StarIcon from './icons/StarIcon.svelte'
  import RepoIcon from './icons/RepoIcon.svelte';

  export let name: Repository['name'];
  export let description: Repository['description'] = '';
  export let url: Repository['url'];
  export let stargazerCount: Repository['stargazerCount'] = 0;
  export let isArchived: Repository['isArchived'] = false;
  export let primaryLanguage: Pick<Language, 'name' | 'color'> = {
    name: '',
    color: ''
  }
</script>

<div class='box'>
  <div class='pinnedItem'>
  <div class='title'>
    <RepoIcon />
    <a href={url} target="_blank" rel='noopener noreferrer'>
      {name}
    </a>
    {#if isArchived}
      <span class='public archived'>Public archive</span>
    {:else}
      <span class='public'>Public</span>
    {/if}
  </div>
  <p class='description'>{description || ""}</p>
  <div class='information'>
    {#if !!primaryLanguage.name}
      <div class='primaryLanguage'>
        <span class='color' style:--color-language={primaryLanguage.color} />
        <span class='name'>
          {primaryLanguage.name}
        </span>
      </div>
    {/if}
    {#if !!stargazerCount}
      <a href={urlJoin(url, 'stargazers')} class='stargazerCount' target="_blank" rel='noopener noreferrer'>
        <StarIcon />
        {stargazerCount}
      </a>
    {/if}
  </div>
</div>
</div>

<style lang="scss">
  .box:has(.pinnedItem) {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(var(--color-lightgray));
    border-radius: 0.5rem;
  }
  .pinnedItem {
    margin: .8rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    font-size: .9rem;
  }

  .pinnedItem > * {
    display: flex;
    align-items: center;
    gap: .5rem;
    margin: 0;
  }

  .pinnedItem :global(svg) {
    width: 1rem;
    aspect-ratio: 1;
    color: rgb(var(--color-lightgray));
  }

  .title {
    gap: .5rem;
  }

  .title a {
    font-weight: 600;
    color: rgb(var(--color-miku));
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }

  .public {
    font-size: .8rem;
    padding: .1rem .3rem;
    border: 1px solid rgb(var(--color-gray));
    border-radius: .8rem;
  }

  .archived {
    color: yellow;
    border-color: yellow;
  }

  .pinnedItem > .description {
    color: rgb(var(--color-gray));
  }

  .information {
    height: 1rem;
    gap: 1rem;
  }

  .primaryLanguage {
    display: flex;
    align-items: center;
    gap: .25rem;
  }

  .primaryLanguage > .color {
    display: inline-block;
    width: 12px;
    aspect-ratio: 1;
    border-radius: 50%;
    // Advanced styling: https://svelte.jp/tutorial/style-directive
    background-color: var(--color-language);
  }

  .information > .stargazerCount {
    display: flex;
    align-items: center;
    gap: .25rem;
    color: rgb(var(--color-lightgray));
    text-decoration: none;
    &:hover {
      color: rgb(var(--color-miku));
      &:hover > :global(svg) {
        color: rgb(var(--color-miku));
      }
    }
  }
</style>