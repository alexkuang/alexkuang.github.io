import type { Loader } from "astro/loaders";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const DEFAULT_EXCERPT_LIMIT = 400;

function truncateMarkdown(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }

  // Try to find a good break point
  let truncated = text.substring(0, maxChars);

  // Look for the last complete paragraph within the limit
  const lastParagraphEnd = truncated.lastIndexOf("\n\n");
  if (lastParagraphEnd > maxChars * 0.5) {
    return truncated.substring(0, lastParagraphEnd).trim();
  }

  // Otherwise, break at last complete sentence
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf(". "),
    truncated.lastIndexOf("! "),
    truncated.lastIndexOf("? "),
  );
  if (lastSentenceEnd > maxChars * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1).trim();
  }

  // Finally, break at last word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace).trim();
  }

  return truncated.trim();
}

// Custom loader that wraps glob and adds excerpt rendering
function postsLoader(): Loader {
  const globLoader = glob({ pattern: "**/[^_]*.mdx", base: "./src/content/posts" });

  return {
    name: "posts-loader-with-excerpts",
    async load(context) {
      await globLoader.load(context);
      const { store, renderMarkdown, generateDigest } = context;

      for (const id of store.keys()) {
        const entry = store.get(id);
        if (!entry) continue;

        const excerptLimit = (entry.data.excerptLimit as number) || DEFAULT_EXCERPT_LIMIT;
        const body = entry.body || "";

        if (body.length > excerptLimit) {
          const truncated = truncateMarkdown(body, excerptLimit);
          const excerpt = { rendered: await renderMarkdown(truncated) };

          // Seems like the default behavior doesn't re-digest, at least not with extra keys, so manually fire that here
          const data = { ...entry.data, excerpt };
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
    excerpt: z.object({ html: z.string(), metadata: z.object({}).passthrough() }).optional(),
  }),
});

export const collections = { posts };
