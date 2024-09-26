<script lang="ts">
import type { Snippet } from "svelte";

import "@/styles/markdown.css";
// import "katex/dist/katex.min.css";
import "remark-github-alerts/styles/github-base.css";
import "remark-github-alerts/styles/github-colors-dark-class.css";
import "remark-github-alerts/styles/github-colors-light.css";

type Props = {
  children: Snippet;
};

const { children }: Props = $props();
</script>

<div class="markdown">
  {@render children()}
</div>
