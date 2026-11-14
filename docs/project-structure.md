# Project structure

Where files go in an osseco frontend.

## Rules

- MUST use the layout below. Put shared building blocks in `components/ui/`, project composites in `components/`, and routes in `pages/`.
- MUST name files in kebab-case (`status-badge.tsx`) and components in PascalCase (`StatusBadge`).
- MUST use named exports. The only default exports allowed are config files.
- MUST keep logic that can be tested without a DOM in `lib/`, with a `*.test.ts` next to it.
- SHOULD import within `src/` with relative paths, as the templates do. `@/` is available for deep paths.
- MUST NOT put tokens or global CSS anywhere but `src/index.css`.

## Layout

```text
<package>/
├── index.html              title, description, no-flash theme script
├── package.json            scripts from stack.md
├── vite.config.ts          base path, SPA fallback, @ alias, vitest config
├── tsconfig.json
├── biome.json
├── public/
│   └── favicon.svg         brand teal tile; swap the inner shape for the project's mark
└── src/
    ├── main.tsx            router, layout route with AppShell
    ├── index.css           Tailwind import, tokens, base layer, prose
    ├── vite-env.d.ts
    ├── lib/
    │   ├── utils.ts        cn()
    │   ├── theme.ts        light/dark state
    │   ├── markdown.ts     optional
    │   └── *.test.ts
    ├── components/
    │   ├── ui/             button, card, badge, tabs, switch, segmented, modal
    │   ├── app-shell.tsx   header, nav, main, footer
    │   ├── doc-page.tsx    DocPage, Section, Eyebrow
    │   ├── status-badge.tsx
    │   ├── callout.tsx
    │   ├── code-block.tsx, copy-button.tsx
    │   ├── theme-toggle.tsx
    │   └── mermaid-diagram.tsx, markdown-content.tsx   optional
    └── pages/
        └── <route>.tsx     one file per route, exports <Name>Page
```

## Starting a project

1. Copy everything in [`templates/`](../templates/) (including `.gitignore` and `.github/`) into the new package folder.
2. Set `name` in `package.json`, and the `<title>` and `description` in `index.html`.
3. In `src/main.tsx`, set `BRAND`, `REPO` and the icon, then replace `pages/home.tsx`.
4. Remove what you don't use: `mermaid-diagram.tsx` with `mermaid`, `markdown-content.tsx` and `lib/markdown.ts` with `marked`. For an app not hosted on Pages, also remove `pagesSpaFallback` from `vite.config.ts` and the Pages workflow.
5. Run `sfw pnpm install`, then the scripts in [stack.md](./stack.md).

## Pages versus embedded apps

| | GitHub Pages site | Embedded app (served by a binary or server) |
| --- | --- | --- |
| `base` | from `PAGES_BASE` | `/` |
| SPA fallback plugin | keep | remove |
| Router | `BrowserRouter` with `basename` from `BASE_URL` | `BrowserRouter`, the server falls back to `index.html` |
| Data | static, bundled at build time | `fetch` from the same origin, in `lib/api.ts` |
| Workflow | [github-pages.md](./github-pages.md) | the host project's CI builds `dist/` and embeds it |
