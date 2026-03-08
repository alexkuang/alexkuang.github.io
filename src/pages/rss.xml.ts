import rss from "@astrojs/rss";
import { getPostUrl, getPosts } from "src/util";

export async function GET(context: { site?: URL }) {
  if (!context.site) {
    throw new Error("RSS feed requires `site` to be set in astro.config.mjs.");
  }

  const posts = await getPosts();

  return rss({
    title: "makeshift.computer",
    description: "Posts from makeshift.computer",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title ?? post.id,
      description: post.data.description,
      pubDate: new Date(post.publishedAt.toInstant().epochMilliseconds),
      link: getPostUrl(post),
    })),
  });
}
