import { dropPagesFolder, slugify } from "./utils.js";

export default function filters(eleventyConfig) {
  eleventyConfig.addFilter("dropPagesFolder", (path) => {
    return dropPagesFolder(path);
  });

  eleventyConfig.addFilter("slugify", (path) => {
    return slugify(path);
  });
}
