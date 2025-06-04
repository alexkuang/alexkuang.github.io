---
title: "hacking excerpts in astro"
publishedAt: "2025-06-04T11:03:22-04:00[America/New_York]"
---

I wanted to do excerpts to give the main blog page more of a "feed" than a "post list" feeling.  Surprisingly there
wasn't a straightforward / built-in way to do it in astro.  The markdown => HTML conversion seems to happen as part of
loading a post collection, and any downstream methods like `render()` just reuses that HTML.

When I looked around there were two bits of prior art:

- The [top google result](https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro) renders the post
  `body` with an external library and then truncates the result.  I didn't love this because it seemed error-prone,
  e.g. it's easy to truncate through the middle of a codeblock.  Using `markdown-it` also means that none of the astro
  setup, e.g. syntax highlighting, is reused.
- I also tried out a [library](https://github.com/igorskyflyer/npm-astro-post-excerpt) from the astro integrations list,
  but its output heavily favored simplicity and dropped a lot of things I cared about, e.g. blockquotes.

Eventually I read through the astro code + the library and settled on the following approach:

```js
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";

const renderer = await createMarkdownProcessor();

async function getExcerpt(post: CollectionEntry<"posts">, maxChars: number) {
  const rawBody = post.body || "";

  // convert to an AST to work with structured data
  const parsed = fromMarkdown(rawBody);
  // generate AST for excerpt and convert it back to plain text
  const truncated = toMarkdown(truncateMarkdown(parsed, maxChars));

  // use astro's remark setup to render to html
  return (await renderer.render(truncated)).code;
}

function truncateMarkdown(root: node, maxChars: number) {
  // do stuff to the tree here
}
```

And then in usage:

```astro
<Fragment set:html={getExcerpt(post, post.excerptLimit)} />
```

This isn't *perfect* since astro passes in a bunch of config to both `createMarkdownProcessor` and the `render`
call to make fancy things like relative URLs work.  Unfortunately, I couldn't find a straightforward way to replicate
all that, so for now this setup will have to do.  I also have no idea if this works with mdx or how hard that would be.
Final output (as of this writing)
[here](https://github.com/alexkuang/alexkuang.github.io/blob/41eec37f632b3bf659f65f73f50715238f26306b/src/excerpt.ts).
