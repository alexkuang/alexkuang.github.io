import { getCollection, type CollectionEntry } from "astro:content";
import { Temporal } from "temporal-polyfill";

export type ParsedPost = CollectionEntry<"posts"> & {
  publishedAt: Temporal.ZonedDateTime;
};

export async function getPosts() {
  const posts = (await getCollection("posts"))
    .map((p) => parsePost(p))
    .sort((a, b) => Temporal.ZonedDateTime.compare(b.publishedAt, a.publishedAt));

  return posts;
}

export function parsePost(post: CollectionEntry<"posts">): ParsedPost {
  const publishedAt = Temporal.ZonedDateTime.from(post.data.publishedAt);

  return {
    ...post,
    publishedAt,
  };
}
