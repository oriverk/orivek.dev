import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import gfm from 'remark-gfm'
import comment from 'remark-comment'

import { rehypeAnchor, rehypeFigure } from './src/utils/markdown'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  markdown: {
    remarkPlugins: [gfm, comment],
    rehypePlugins: [rehypeAnchor, rehypeFigure],
  }
});