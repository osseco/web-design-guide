import { markdownTitle } from "@template/lib/markdown";
import { GITHUB_BLOB } from "./links";

/** Reading order. docs.test.ts fails when a file in docs/ is missing here. */
export const ORDER = [
  "principles",
  "stack",
  "project-structure",
  "tokens",
  "theming",
  "typography",
  "layout",
  "components",
  "patterns",
  "accessibility",
  "github-pages",
  "security",
  "checklist",
];

const files = import.meta.glob<string>("../../../docs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type Doc = {
  slug: string;
  title: string;
  /** The first paragraph after the title. */
  summary: string;
  markdown: string;
};

export function slugOf(file: string): string {
  return file.replace(/^.*\//, "").replace(/\.md$/, "");
}

export function summaryOf(markdown: string): string {
  const body = markdown.replace(/^# .*\n+/, "");
  return body.split(/\n\s*\n/)[0]?.trim() ?? "";
}

const bySlug = new Map(
  Object.entries(files).map(([file, markdown]) => {
    const slug = slugOf(file);
    return [
      slug,
      {
        slug,
        title: markdownTitle(markdown) ?? slug,
        summary: summaryOf(markdown),
        markdown,
      },
    ];
  }),
);

export const DOCS: Doc[] = ORDER.flatMap((slug) => {
  const doc = bySlug.get(slug);
  return doc ? [doc] : [];
});

export const DOC_SLUGS = [...bySlug.keys()];

export function getDoc(slug: string | undefined): Doc | undefined {
  return slug ? bySlug.get(slug) : undefined;
}

/**
 * Where a relative link in docs/<file>.md points on the site: another doc
 * becomes its route, anything else in the repository opens on GitHub.
 */
export function rewriteDocHref(href: string, base: string): string {
  const doc = /^\.\/([\w-]+)\.md(#.*)?$/.exec(href);
  if (doc) return `${base}docs/${doc[1]}${doc[2] ?? ""}`;
  return new URL(href, `${GITHUB_BLOB}/docs/`).toString();
}
