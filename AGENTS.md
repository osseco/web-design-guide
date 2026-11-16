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

### Socket Firewall

Prefix every `pnpm` command with `sfw` ([Socket Firewall Free](https://docs.socket.dev/docs/socket-firewall-free)). From the root:

```bash
sfw pnpm install --frozen-lockfile
sfw pnpm lint
sfw pnpm typecheck
sfw pnpm test
sfw pnpm build
```

CI installs sfw with `osseco/setup-sfw-free`, pinned by full commit SHA.

### Checks

Run `pre-commit run --all-files` before staging a chunk. It runs Biome, typecheck, the tests, zizmor, actionlint and basic file checks.

It needs these on PATH: `sfw`, `node` (22), `pnpm`, `zizmor`, `actionlint`, `pre-commit`.

### GitHub Actions

- `pr.yml` runs every check through reusable workflows (`check.yml`, `codeql.yml`, `zizmor.yml`, `actionlint.yml`, `socket.yml`). `Merge gate` is the single required status check: every pull request job must be in its `needs`, and none may have a `paths:` filter or a job-level `if`, because a skipped job fails the gate.
- `main.yml` runs the same checks on every push to `main` and deploys Pages once they all pass.
- Pin every action to a full commit SHA with a version comment, in this repository's workflows and in `templates/.github/workflows` alike. Call our own reusable workflows with `$/`.
- Start each workflow with `permissions: {}`, and grant per job only what it needs.
- Set `persist-credentials: false` on checkout.
- Pass `${{ }}` values to `run:` through `env:`, never inline.
- zizmor and actionlint must report no findings.

### Branches

Never change or commit directly on `main`. Before the first edit, check the current branch. If it is `main`, create a branch from `origin/main` (no `git fetch`), not from local `main`, and work there:

```bash
git switch --no-track -c fix/short_description origin/main
```

Name it `type/short_description`, with the same types as commits.

### Commits

Agents never commit. The maintainer reviews and signs every commit.

- Never run `git commit`, `git tag`, `git push`, or anything that rewrites history (`rebase`, `reset --hard`, `commit --amend`, force pushes).
- Work in reviewable chunks. At the end of each chunk, stage exactly that chunk's files with explicit paths (`git add <path>…`, never `git add -A` or `git add .`), show `git diff --cached --stat`, and propose a commit message. Staged means "commit this". Then wait until the maintainer has committed before starting the next chunk. On requested changes, edit and re-stage.
- Staging is the only git write an agent does.
- Never stage `dist/`.
- Pull requests are squash-merged and the PR title becomes the commit on `main`, so PR titles follow the same format.

Messages use [Conventional Commits](https://www.conventionalcommits.org/):

```text
type(scope): imperative subject
```

- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`.
- Scopes when useful: `docs`, `templates`, `site`, `skill`, `ci`.
- The subject is lowercase imperative, with no trailing period.
- Breaking changes (to a rule, token or template API projects depend on) use `!` or a `BREAKING CHANGE:` footer.
- The `ci` type and scope are only for this repository's own workflow. Changes to `templates/.github/` use the `templates` scope.
