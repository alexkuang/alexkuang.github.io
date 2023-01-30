const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Output directory: _site
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addFilter("postDate", (d) => {
    return DateTime.fromJSDate(d).toUTC().toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addPlugin(syntaxHighlight);

  return {};
};
