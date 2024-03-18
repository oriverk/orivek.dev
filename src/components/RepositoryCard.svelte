<script lang="ts">
import type { Language, Repository } from "@octokit/graphql-schema";
import Card from "./ui/Card.svelte";
import Icon from "./ui/Icon.svelte";

interface $$Props
  extends Pick<
    Repository,
    "name" | "description" | "url" | "stargazerCount" | "isArchived"
  > {
  primaryLanguage: Pick<Language, "name" | "color">;
}

let {
  name,
  description,
  url,
  stargazerCount = 0,
  isArchived = false,
  primaryLanguage,
} = $$props as $$Props;
export { name, description, url, stargazerCount, isArchived, primaryLanguage };
</script>

<a class="repository-card" href={url} target="_blank" rel="noopener noreferrer">
  <Card>
    <div class="repository">
      <div class="title">
        <Icon type="repository" size="small" />
        <span>{name}</span>
        {#if isArchived}
          <span class="public archived">Public archive</span>
        {:else}
          <span class="public">Public</span>
        {/if}
      </div>
      <p class="description">{description ?? ''}</p>
      <div class="information">
        {#if !!primaryLanguage.name}
          <div class="primaryLanguage">
            <span
              class="color"
              style="--color-language: {primaryLanguage.color}"
            />
            <span class="name">{primaryLanguage.name}</span>
          </div>
        {/if}
        {#if !!stargazerCount}
          <span class="stargazerCount">
            <Icon type="star" size="small" />
            {stargazerCount}
          </span>
        {/if}
      </div>
    </div>
  </Card>
</a>

<style>
  .repository {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    /* Advanced styling: https://svelte.jp/tutorial/style-directive */
    background-color: var(--color-language);
  }

  .stargazerCount {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: rgb(var(--color-lightgray));
  }
</style>
