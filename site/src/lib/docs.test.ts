import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { ORDER, rewriteDocHref, slugOf, summaryOf } from "./docs";

const docsDir = new URL("../../../docs/", import.meta.url);

describe("ORDER", () => {
  it("lists every doc exactly once", () => {
    const onDisk = fs
      .readdirSync(docsDir)
      .filter((file) => file.endsWith(".md"))
      .map(slugOf)
      .sort();
    expect([...ORDER].sort()).toEqual(onDisk);
  });
});

describe("docs", () => {
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));

  it.each(files)("%s has a title, a summary and a Rules section", (file) => {
    const text = fs.readFileSync(new URL(file, docsDir), "utf8");
    expect(text).toMatch(/^# \S/);
    expect(summaryOf(text)).not.toBe("");
    if (file !== "checklist.md") expect(text).toContain("\n## Rules\n");
  });

  it.each(files)("%s links only to docs that exist", (file) => {
    const text = fs.readFileSync(new URL(file, docsDir), "utf8");
    for (const [, target] of text.matchAll(/\]\(\.\/([\w-]+)\.md/g)) {
      expect(ORDER).toContain(target);
    }
  });
});

describe("llms.txt", () => {
  it("links every doc", () => {
    const text = fs.readFileSync(
      new URL("../../../llms.txt", import.meta.url),
      "utf8",
    );
    for (const slug of ORDER) expect(text).toContain(`/docs/${slug}.md)`);
  });
});

describe("rewriteDocHref", () => {
  it("routes links between docs", () => {
    expect(rewriteDocHref("./tokens.md", "/base/")).toBe("/base/docs/tokens");
    expect(rewriteDocHref("./tokens.md#status-palette", "/")).toBe(
      "/docs/tokens#status-palette",
    );
  });

  it("sends other repository paths to GitHub", () => {
    expect(rewriteDocHref("../templates/src/index.css", "/")).toBe(
      "https://github.com/osseco/web-design-guide/blob/main/templates/src/index.css",
    );
  });
});
