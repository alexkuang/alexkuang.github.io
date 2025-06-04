import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    // approximation of RFC-9557
    publishedAt: z
      .string()
      .regex(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})(\[[^\]]+\])?$/,
      ),
    excerptLimit: z.number().optional(),
  }),
});

export const collections = { posts };
