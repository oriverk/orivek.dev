// https://www.kevinzunigacuellar.com/blog/google-analytics-in-astro/
import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import partytown from "@astrojs/partytown";
import remarkComment from 'remark-comment';
import { rehypeAnchor, rehypeFigure } from './src/utils/markdown';

// https://astro.build/config
export default defineConfig({
  publicDir: "./public",
  integrations: [
    svelte(),
    partytown({
      config: {
        forward: ["datalayer.push"]
      }
    })
  ],
  markdown: {
    remarkPlugins: [remarkComment],
    rehypePlugins: [rehypeAnchor, rehypeFigure]
  }
});