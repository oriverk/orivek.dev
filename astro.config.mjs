// https://www.kevinzunigacuellar.com/blog/google-analytics-in-astro/
import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import partytown from "@astrojs/partytown";
import gfm from 'remark-gfm'
import comment from 'remark-comment'

import { rehypeAnchor, rehypeFigure } from './src/utils/markdown'

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["datalayer.push"],
      }
    })
  ],
  markdown: {
    remarkPlugins: [gfm, comment],
    rehypePlugins: [rehypeAnchor, rehypeFigure],
  }
});