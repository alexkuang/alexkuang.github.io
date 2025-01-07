import mdIt from "markdown-it";

export default function markdownIt() {
  const mdLib = mdIt({
    html: true,
  });

  return mdLib;
}
