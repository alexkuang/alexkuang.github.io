import type { Loader } from "astro/loaders";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const DEFAULT_EXCERPT_LIMIT = 400;

// Custom loader that wraps glob and marks long posts for truncation
function postsLoader(): Loader {
  const globLoader = glob({ pattern: "**/[^_]*.mdx", base: "./src/content/posts" });

  return {
    name: "posts-loader",
    async load(context) {
      await globLoader.load(context);
      const { store, generateDigest } = context;

      for (const id of store.keys()) {
        const entry = store.get(id);
        if (!entry) continue;

        const excerptLimit = (entry.data.excerptLimit as number) || DEFAULT_EXCERPT_LIMIT;
        const body = entry.body || "";

        if (body.length > excerptLimit) {
          const data = { ...entry.data, hasExcerpt: true };
          const digest = generateDigest(data);
          store.set({ ...entry, data, digest });
        }
      }
    },
  };
}

const posts = defineCollection({
  loader: postsLoader(),
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
    hasExcerpt: z.boolean().optional(),
  }),
});

export const collections = { posts };
