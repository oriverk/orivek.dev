import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkComment from "remark-comment";
import remarkGithubAlerts from "remark-github-alerts";
import remarkMath from "remark-math";
import {
  rehypeAnchor,
  rehypeFigure,
  remarkFencedCodeBlock,
} from "./src/utils/markdown";

// https://astro.build/config
export default defineConfig({
  site: "https://oriverk.dev",
  publicDir: "./public",
  prefetch: true,
  integrations: [
    svelte(),
    // NOTE: expressiveCode must be before mdx
    expressiveCode({
      themes: ["github-dark"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        wrap: false,
      },
      frames: {
        showCopyToClipboardButton: true,
        removeCommentsWhenCopyingTerminalFrames: true,
      },
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkComment,
      remarkMath,
      remarkFencedCodeBlock,
      remarkGithubAlerts,
    ],
    rehypePlugins: [rehypeAnchor, rehypeFigure, rehypeKatex],
    gfm: true,
  },
});
