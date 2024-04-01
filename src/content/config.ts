import { defineCollection, z } from "astro:content";

const staticCollection = defineCollection({
  type: "content",
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
  type: "content",
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
  static: staticCollection,
  blog: blogCollection,
};
