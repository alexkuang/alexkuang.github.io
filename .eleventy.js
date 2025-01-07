import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config.js";
import filters from "./filters.js";
import interlinker from "@photogabble/eleventy-plugin-interlinker";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  filters(eleventyConfig);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Wire tailwind in with postcss to avoid additional wrappers to the build + serve processes
  // kudos: https://medium.com/@grahamrb/combining-eleventy-with-tailwind-css-and-daisyui-9b87c3f40d67
  eleventyConfig.addNunjucksAsyncFilter("postcss", (cssCode, done) => {
    postcss([tailwindcss(tailwindConfig), autoprefixer()])
      .process(cssCode)
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null),
      );
  });
  eleventyConfig.addWatchTarget("assets/*.css");

  eleventyConfig.addPlugin(interlinker, {});
  eleventyConfig.addPlugin(syntaxHighlight, {});

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
