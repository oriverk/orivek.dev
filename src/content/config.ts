import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    create: z.string(),
    update: z.string()
  })
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().default(""),
    create: z.string(),
    update: z.string().nullable().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().nullable().default(""),
    published: z.boolean().nullable().default(false)
  })
});

export const collections = {
  blog: blogCollection,
  posts: postsCollection
};
