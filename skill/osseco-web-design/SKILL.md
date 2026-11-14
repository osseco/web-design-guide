---
name: osseco-web-design
description: Apply the osseco web design guide when creating, changing or reviewing a web frontend or GitHub Pages site in an osseco project (React, Vite, Tailwind UI, docs sites, operator dashboards). Covers stack, tokens, light/dark theming, components, layout, accessibility, Pages deployment and security.
---

# osseco web design

The osseco web design guide lives at https://github.com/osseco/web-design-guide and is published at https://osseco.github.io/web-design-guide/. Every doc is also served as raw Markdown at `https://osseco.github.io/web-design-guide/docs/<name>.md`, and `llms.txt` at the site root indexes them.

## When starting a new frontend

1. Copy the whole `templates/` folder from the guide repository (a local clone, or `git clone --depth 1 https://github.com/osseco/web-design-guide`). Never write the files from memory.
2. Follow "Starting a project" in `docs/project-structure.md`: rename the package, set the title and description, set `BRAND`/`REPO`/icon in `src/main.tsx`, and drop optional parts you don't need.
3. Run `sfw pnpm install`, `sfw pnpm run lint`, `sfw pnpm run typecheck`, `sfw pnpm test`, `sfw pnpm run build`.

## When changing an existing frontend

Read the doc for the area you touch before editing:

| Touching | Read |
| --- | --- |
| colors, borders, backgrounds | `docs/tokens.md`, `docs/theming.md` |
| headings, text, Markdown | `docs/typography.md` |
| page frame, spacing, new page | `docs/layout.md` |
| buttons, tabs, dialogs, badges | `docs/components.md`, `docs/patterns.md` |
| keyboard, ARIA | `docs/accessibility.md` |
| Pages build or workflow | `docs/github-pages.md`, `docs/security.md` |
| dependencies, scripts, config | `docs/stack.md` |

## Rules that are always on

- Tokens only: no raw Tailwind palette colors or hex values, except status tones in `status-badge.tsx`.
- Light and dark must both work. Never add `dark:` variants for token colors.
- Use the shared components, extended through `cn()`. Don't restyle raw elements.
- Body text `text-muted-foreground`, one `h1`, `prose-osseco` for long-form content.
- Visible focus ring (`focus-visible:ring-3 focus-visible:ring-ring`) and an `aria-label` on icon-only controls.
- No `dangerouslySetInnerHTML` except repository Markdown or strict Mermaid, with a `biome-ignore` reason.
- `sfw` in front of every pnpm command. Actions pinned by SHA, `permissions: {}`, `persist-credentials: false`.

## When reviewing

Go through `docs/checklist.md` item by item and report each failing item with the file and the rule it breaks.
