import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/** GitHub Pages serves a project site under `/<repo>/`; the workflow passes it in. */
function pagesBase() {
  const raw = process.env.PAGES_BASE || "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

/**
 * Pages has no SPA rewrite: a deep link would 404. Serving index.html as
 * 404.html lets the router take over. `.nojekyll` stops Jekyll processing.
 * Delete this plugin for an app that is not hosted on Pages.
 */
function pagesSpaFallback() {
  return {
    name: "pages-spa-fallback",
    closeBundle() {
      const dist = path.resolve(
        fileURLToPath(new URL("./dist", import.meta.url)),
      );
      const index = path.join(dist, "index.html");
      if (!fs.existsSync(index)) return;
      fs.copyFileSync(index, path.join(dist, "404.html"));
      fs.writeFileSync(path.join(dist, ".nojekyll"), "");
    },
  };
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react(), tailwindcss(), pagesSpaFallback()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
