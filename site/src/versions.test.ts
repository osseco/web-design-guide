import fs from "node:fs";
import { describe, expect, it } from "vitest";

type Manifest = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

function deps(path: string): Record<string, string> {
  const manifest = JSON.parse(
    fs.readFileSync(new URL(path, import.meta.url), "utf8"),
  ) as Manifest;
  return { ...manifest.dependencies, ...manifest.devDependencies };
}

describe("dependency versions", () => {
  it("match templates/package.json for every shared dependency", () => {
    const site = deps("../package.json");
    const template = deps("../../templates/package.json");
    for (const [name, version] of Object.entries(template)) {
      expect(site[name], name).toBe(version);
    }
  });
});
