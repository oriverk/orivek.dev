<script lang="ts">
import Icon from "@/components/ui/Icon.svelte";
import { clsx } from "clsx";
import type { HTMLInputAttributes } from "svelte/elements";

type Props = Omit<HTMLInputAttributes, "class"> & {
  className?: string;
};

let {
  className,
  value = $bindable(),
  placeholder = "検索",
  ...restProps
}: Props = $props();
</script>

<div class={clsx('search-input-container', className)}>
  <label for="search" class="sr-only">検索</label>
  <div class="search-input-wrapper">
    <div class="search-icon">
      <Icon type="search" size="small" />
    </div>
    <input class="search-input" {placeholder} bind:value {...restProps} />
  </div>
</div>

<style>
  .search-input-container {
    position: relative;
    display: flex;
  }

  .search-input-wrapper {
    position: relative;
    width: 100%;
  }

  .search-icon {
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding-left: 1rem;
    display: flex;
    align-items: center;
  }

  .search-input {
    color: rbg(var(--color-white));
    font-size: 1rem;
    display: block;
    width: 100%;
    border: 1px solid rgb(var(--color-gray));
    border-radius: 0.25rem;
    padding: 0.625rem;
    padding-left: 2.5rem;
    background-color: rgb(var(--color-black));
  }
</style>
