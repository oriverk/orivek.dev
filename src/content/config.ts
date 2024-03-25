import { defineCollection, z } from "astro:content";

const staticCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    create: z.string(),
    update: z.string().optional(),
    noindex: z.boolean().optional().default(false),
    published: z.boolean().optional().default(false),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    create: z.string(),
    update: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional().default(""),
    noindex: z.boolean().optional().default(false),
    published: z.boolean().optional().default(false),
  }),
});

export const collections = {
  static: staticCollection,
  blog: blogCollection,
};
