import { describe, expect, it } from "vitest";
import { markdownTitle, renderMarkdown, slugify } from "./markdown";

describe("slugify", () => {
  it("matches GitHub anchors", () => {
    expect(slugify("Status palette")).toBe("status-palette");
    expect(slugify("DocPage, Section, Eyebrow")).toBe(
      "docpage-section-eyebrow",
    );
    expect(slugify("Empty, loading and error")).toBe("empty-loading-and-error");
  });
});

describe("renderMarkdown headings", () => {
  it("adds ids", () => {
    expect(renderMarkdown("## Status palette\n")).toBe(
      '<h2 id="status-palette">Status palette</h2>\n',
    );
  });
});

describe("renderMarkdown", () => {
  it("drops the leading title", () => {
    expect(renderMarkdown("# Title\n\nBody\n")).toBe("<p>Body</p>\n");
  });

  it("rewrites relative links only", () => {
    const html = renderMarkdown(
      "[a](./a.md) [b](https://x.test) [c](#c) [d](/d)\n",
      (href) => `R(${href})`,
    );
    expect(html).toContain('href="R(./a.md)"');
    expect(html).toContain('href="https://x.test"');
    expect(html).toContain('href="#c"');
    expect(html).toContain('href="/d"');
  });
});

describe("markdownTitle", () => {
  it("reads the leading title", () => {
    expect(markdownTitle("# Tokens\n\nx")).toBe("Tokens");
    expect(markdownTitle("no title")).toBeUndefined();
  });
});
