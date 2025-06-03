import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    publishedAt: z.string().datetime({ offset: true }),
  }),
});

export const collections = { posts };
