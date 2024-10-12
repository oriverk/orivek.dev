import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const repositoryCollection = defineCollection({
  loader: file(".contents/repository.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable().default(""),
    url: z.string().url(),
    isFork: z.boolean(),
    stargazerCount: z.number(),
    primaryLanguage: z.object({
      name: z.string(),
      color: z.string(),
    }),
  }),
});

const feedCollection = defineCollection({
  loader: file(".contents/feed.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    link: z.string(),
    isoDate: z.string(),
    dateMiliSeconds: z.number(),
  }),
});

const staticCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/static" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    create: z.string(),
    update: z.string().optional(),
    noindex: z.boolean().optional(),
    published: z.boolean().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    create: z.coerce.date(),
    update: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    noindex: z.boolean().optional(),
    published: z.boolean(),
  }),
});

export const collections = {
  repository: repositoryCollection,
  feed: feedCollection,
  static: staticCollection,
  blog: blogCollection,
};
