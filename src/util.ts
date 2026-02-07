import { getCollection, type CollectionEntry } from "astro:content";
import { Temporal } from "temporal-polyfill";

export type ParsedPost = CollectionEntry<"posts"> & {
  publishedAt: Temporal.ZonedDateTime;
};

// Extract title-slug from post id (e.g., "2024-08-06-my-post" -> "my-post")
export function getTitleSlug(postId: string): string {
  const match = postId.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  if (!match) {
    throw new Error(`Invalid post id format: ${postId}`);
  }
  return match[1];
}

export function getPostUrl(post: ParsedPost): string {
  return `/${getTitleSlug(post.id)}/`;
}

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
