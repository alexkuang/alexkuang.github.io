export function dropPagesFolder(path) {
  return path.replace(/^\/pages\//, "");
}

export function slugify(text) {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(new RegExp("[_,:;]"), "-")
    .replace(/'/g, "")
    .replace(/\s+/g, "-")
    .replace(/\--+/g, "-");

  return slug;
}
