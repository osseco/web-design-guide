import { Marked } from "marked";

/** GitHub-style heading anchor, so `file.md#some-heading` links keep working. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}

const marked = new Marked({
  renderer: {
    heading({ tokens, depth, text }) {
      const inner = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${inner}</h${depth}>\n`;
    },
  },
});

/**
 * Render Markdown that ships with the project (never user input: marked does
 * not sanitize). Drops the leading `# Title`, since the page supplies one,
 * gives headings ids, and passes every relative link through `rewriteHref`.
 */
export function renderMarkdown(
  markdown: string,
  rewriteHref: (href: string) => string = (href) => href,
): string {
  const html = marked.parse(markdown.replace(/^# .*\n/, ""), {
    async: false,
  }) as string;
  return html.replace(
    /href="(?![a-z]+:|#|\/)([^"]+)"/g,
    (_, href: string) => `href="${rewriteHref(href)}"`,
  );
}

/** The text of the leading `# Title`, if any. */
export function markdownTitle(markdown: string): string | undefined {
  return /^# (.*)\n/.exec(markdown)?.[1]?.trim();
}
