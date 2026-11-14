# AGENTS.md

This repository is the osseco web design guide. It has two audiences:

1. **Agents building or reviewing an osseco frontend** in another repository. Read "Applying the guide".
2. **Agents changing this repository.** Read "Working in this repository".

## Applying the guide

The guide covers web app UIs and GitHub Pages sites in the osseco organization.

- Docs: `docs/*.md`, also at `https://osseco.github.io/web-design-guide/docs/<name>.md`. Each starts with a **Rules** list; follow the MUST items without exception.
- Starter files: `templates/`. Copy them; never recreate them from memory.
- Index: `llms.txt`.

### Hard rules

- Stack: Vite 8, React 19, TypeScript 7 strict, Tailwind 4 (`@tailwindcss/vite`), Biome 2, Vitest, react-router-dom 7, lucide-react, cva + clsx + tailwind-merge. pnpm with every command prefixed by `sfw`.
- Colors come from tokens only (`bg-background`, `text-muted-foreground`, `bg-primary`, `border-border`, `bg-code`, `text-warning-foreground`…). No raw Tailwind palette or hex values, except the status tones in `status-badge.tsx`.
- Both light and dark themes work. Don't add `dark:` variants for token colors.
- Use the components in `templates/src/components` (Button, Card, Badge, StatusBadge, Tabs, Segmented, Switch, Modal, Callout, CodeBlock, CopyButton, DocPage, Section, Eyebrow, AppShell, ThemeToggle). Extend them with `className` through `cn()`.
- Every page sits inside `AppShell`. Widths: `max-w-7xl` frame, `max-w-4xl` doc article. No horizontal page scroll at 375px.
- Body text is `text-muted-foreground`, headings `text-foreground`. Use `prose-osseco` for long-form content.
- Focus style on every interactive element: `outline-none focus-visible:ring-3 focus-visible:ring-ring`. Icon-only controls get an `aria-label`.
- `dangerouslySetInnerHTML` only for repository Markdown or strict-mode Mermaid SVG, with a `biome-ignore` that says why.
- Pages: `base` from `PAGES_BASE`, router `basename` from `BASE_URL`, `404.html` + `.nojekyll`, Actions pinned by SHA, `permissions: {}`, `persist-credentials: false`.
- Before finishing, go through `docs/checklist.md`.

### Where to find an answer

| Question | File |
| --- | --- |
| Which library or version? Which scripts? | `docs/stack.md` |
| Where does this file go? | `docs/project-structure.md` |
| Which color, radius, font? | `docs/tokens.md` |
| Dark/light behavior | `docs/theming.md` |
| Text sizes | `docs/typography.md` |
| Page frame, spacing, page types | `docs/layout.md` |
| Component API | `docs/components.md` |
| Status badges, steps, tables, empty states | `docs/patterns.md` |
| Keyboard, ARIA, contrast | `docs/accessibility.md` |
| Deploying to Pages | `docs/github-pages.md` |
| HTML rendering, workflows, dependencies | `docs/security.md` |

## Working in this repository

- Layout: `docs/` (the guide, Markdown), `templates/` (the starter, a pnpm package `osseco-web-template`), `site/` (the guide's Pages site, package `osseco-web-design-site`), `skill/`, `llms.txt`.
- `site/` imports `templates/src` through the `@template` alias and renders `docs/*.md`. A design change goes in `templates/` and `docs/` **in the same commit**.
- `templates/package.json` pins its own versions (no catalog) so it works once copied out. `site/src/versions.test.ts` fails when site and templates disagree on a shared dependency.
- When you add, rename or remove a doc, update `llms.txt`, `README.md`, the table above, and `skill/osseco-web-design/SKILL.md`. The site picks up docs automatically.
- Commands, from the root, always with `sfw`:

```bash
sfw pnpm install --frozen-lockfile
sfw pnpm lint
sfw pnpm typecheck
sfw pnpm test
sfw pnpm build
```

- Never commit `dist/`. Never commit on `main`: branch as `type/short_description`.
- Commits: Conventional Commits, `type(scope): imperative subject`. Scopes: `docs`, `templates`, `site`, `skill`, `ci`.
