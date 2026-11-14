import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const dist = fileURLToPath(new URL("./dist", import.meta.url));

function pagesBase() {
  const raw = process.env.PAGES_BASE || "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

/** Same as templates/vite.config.ts: deep links on Pages fall back to the app. */
function pagesSpaFallback() {
  return {
    name: "pages-spa-fallback",
    closeBundle() {
      const index = path.join(dist, "index.html");
      if (!fs.existsSync(index)) return;
      fs.copyFileSync(index, path.join(dist, "404.html"));
      fs.writeFileSync(path.join(dist, ".nojekyll"), "");
    },
  };
}

/** Publish the guide as plain text for agents: llms.txt, AGENTS.md, docs/*.md. */
function publishForAgents() {
  return {
    name: "publish-for-agents",
    closeBundle() {
      if (!fs.existsSync(dist)) return;
      fs.mkdirSync(path.join(dist, "docs"), { recursive: true });
      const docs = path.join(repoRoot, "docs");
      for (const file of fs.readdirSync(docs)) {
        if (file.endsWith(".md")) {
          fs.copyFileSync(path.join(docs, file), path.join(dist, "docs", file));
        }
      }
      for (const file of ["llms.txt", "AGENTS.md"]) {
        fs.copyFileSync(path.join(repoRoot, file), path.join(dist, file));
      }
    },
  };
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react(), tailwindcss(), pagesSpaFallback(), publishForAgents()],
  resolve: {
    alias: {
      "@template": fileURLToPath(new URL("../templates/src", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // templates/src resolves packages from templates/node_modules; keep one React.
    dedupe: ["react", "react-dom", "react-router-dom"],
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    // Mermaid's layout engines are large but only load on the Components page.
    chunkSizeWarningLimit: 1600,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
