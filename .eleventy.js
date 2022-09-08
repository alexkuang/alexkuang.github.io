const { DateTime } = require("luxon")
module.exports = function(eleventyConfig) {
  // Output directory: _site
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addFilter("postDate", (d) => {
    return DateTime.fromJSDate(d).toUTC().toLocaleString(DateTime.DATE_MED);
  });

  return {
  }
};
