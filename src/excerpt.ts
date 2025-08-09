import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import type { ParsedPost } from "./util";

// This isn't the exact same pipeline as the current astro instance, but getting an exact match seems
// non-straightforward at first glance.  certain things e.g. built-in `image` hrefs won't work properly, but Close
// Enough(TM) for now
const renderer = await createMarkdownProcessor();

// astro doesn't seem to offer an `excerpt` out of the box, so this is a rough best-effort truncation
// - convert raw `post.body` into markdown AST
// - walk through the nodes doing a best-effort limit to `maxChars`
// - convert node back to markdown AST
// - render to HTML
export async function getExcerpt(post: ParsedPost, maxChars: number) {
  const rawBody = post.body || "";

  const parsed = fromMarkdown(rawBody);
  const truncated = toMarkdown(truncateMarkdown(parsed, maxChars));

  return (await renderer.render(truncated)).code;
}

// maybe missing something obvious, but types not working quite correctly -- can't seem to find the module
function truncateMarkdown(root: any, maxChars: number) {
  let charsSoFar = 0;
  let [head, ...tail] = root.children;
  let processed: any[] = [];

  while (charsSoFar <= maxChars && head != undefined) {
    const { charsConsumed, node } = truncateNode(head, maxChars - charsSoFar);

    charsSoFar += charsConsumed;
    processed.push(node);
    [head, ...tail] = tail;
  }

  return { ...root, children: processed };
}

function truncateNode(node: any, maxChars: number) {
  let charsSoFar = node.value?.length || 0;

  if (node.children === undefined || node.children.length == 0) {
    return { charsConsumed: charsSoFar, node };
  }

  let processed: any[] = [];
  let [head, ...tail] = node.children;

  while (charsSoFar <= maxChars && head != undefined) {
    const { charsConsumed, node } = truncateNode(head, maxChars - charsSoFar);

    charsSoFar += charsConsumed;
    processed.push(node);
    [head, ...tail] = tail;
  }

  return { charsConsumed: charsSoFar, node: { ...node, children: processed } };
}
