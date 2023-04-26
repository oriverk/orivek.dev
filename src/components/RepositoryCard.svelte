<!-- [Advanced styling / The style directive • Svelte Tutorial](https://svelte.dev/tutorial/style-directive) -->
<!-- [こびと on Twitter: "「CSS変数をstyle属性で書いてしまえばユニークな値入れ放題」 という技をエスイチさんから盗みました。義賊なのでみなさんに再配布します(感動の共有) https://t.co/siA1s8R7Tb" / Twitter](https://twitter.com/kobitoCode/status/1645360488602284032) -->
<!-- [Emotion – Best Practices](https://emotion.sh/docs/best-practices#advanced-css-variables-with-style) -->

<script lang="ts">
  import type { Repository, Language } from '@octokit/graphql-schema'
  import Card from './ui/Card.svelte'
  import StarIcon from './ui/icons/StarIcon.svelte'
  import RepoIcon from './ui/icons/RepoIcon.svelte'

  export let name: Repository['name']
  export let description: Repository['description'] = ''
  export let url: Repository['url']
  export let stargazerCount: Repository['stargazerCount'] = 0
  export let isArchived: Repository['isArchived'] = false
  export let primaryLanguage: Pick<Language, 'name' | 'color'> = {
    name: '',
    color: '',
  }
</script>

<a class="repository-card" href={url} target="_blank" rel="noopener noreferrer">
  <Card>
    <div class="repository">
      <div class="title">
        <RepoIcon />
        <span>{name}</span>
        {#if isArchived}
          <span class="public archived">Public archive</span>
        {:else}
          <span class="public">Public</span>
        {/if}
      </div>
      <p class="description">{description || ''}</p>
      <div class="information">
        {#if !!primaryLanguage.name}
          <div class="primaryLanguage">
            <span
              class="color"
              style:--color-language={primaryLanguage.color}
            />
            <span class="name">
              {primaryLanguage.name}
            </span>
          </div>
        {/if}
        {#if !!stargazerCount}
          <span class="stargazerCount">
            <StarIcon />
            {stargazerCount}
          </span>
        {/if}
      </div>
    </div>
  </Card>
</a>

<style lang="scss">
  .repository-card {
    text-decoration: none;
  }

  .repository {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .repository :global(svg) {
    width: 1rem;
    aspect-ratio: 1;
    color: rgb(var(--color-lightgray));
  }

  .title,
  .information {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .title {
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--color-miku));
  }

  .public {
    font-size: 0.8rem;
    padding: 0.1rem 0.3rem;
    border: 1px solid rgb(var(--color-gray));
    border-radius: 0.8rem;
  }

  .archived {
    color: yellow;
    border-color: yellow;
  }

  .description {
    margin: 0;
    flex-grow: 1;
    color: rgb(var(--color-lightgray));
  }

  .information {
    height: 1rem;
    gap: 1rem;
  }

  .primaryLanguage {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .primaryLanguage > .color {
    display: inline-block;
    width: 14px;
    aspect-ratio: 1;
    border-radius: 50%;
    // Advanced styling: https://svelte.jp/tutorial/style-directive
    background-color: var(--color-language);
  }

  .stargazerCount {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: rgb(var(--color-lightgray));
    text-decoration: none;
  }
</style>
