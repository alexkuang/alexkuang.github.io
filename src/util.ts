import { getCollection, type CollectionEntry } from "astro:content";
import { Temporal } from "temporal-polyfill";

export async function getPosts() {
  const posts = (await getCollection("posts"))
    .map((p) => parsePost(p))
    .sort((a, b) => Temporal.Instant.compare(b.publishedAt, a.publishedAt));

  return posts;
}

export function parsePost(post: CollectionEntry<"posts">) {
  const publishedAt = Temporal.Instant.from(post.data.publishedAt);

  return {
    ...post,
    publishedAt,
  };
}
