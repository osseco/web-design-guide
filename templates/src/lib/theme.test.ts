import { describe, expect, it } from "vitest";
import { resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it("uses the stored choice", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("follows the system without a valid stored choice", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
    expect(resolveTheme("purple", true)).toBe("dark");
  });
});
