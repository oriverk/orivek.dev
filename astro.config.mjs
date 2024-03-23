// https://www.kevinzunigacuellar.com/blog/google-analytics-in-astro/
import { defineConfig } from 'astro/config';
// import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import remarkComment from 'remark-comment';
import remarkGithubAlerts from "remark-github-alerts";
import rehypeKatex from "rehype-katex";
import { remarkFencedCodeBlock, rehypeAnchor, rehypeFigure } from "./src/utils/markdown";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  publicDir: "./public",
  integrations: [
    partytown({
      config: {
        forward: ["datalayer.push"],
      },
    }),
    svelte(),
    // NOTE: expressiveCode must be before mdx
    expressiveCode({
      themes: ["github-dark"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        wrap: false
      },
      frames: {
        showCopyToClipboardButton: true,
        removeCommentsWhenCopyingTerminalFrames: true
      }
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [remarkComment, remarkMath, remarkFencedCodeBlock, remarkGithubAlerts],
    rehypePlugins: [rehypeAnchor, rehypeFigure, rehypeKatex],
    gfm: true
  }
});
