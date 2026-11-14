# GitHub Pages

How osseco project sites are built and deployed.

## Rules

- MUST deploy through GitHub Actions (Settings → Pages → Source: GitHub Actions), not from a branch and not with Jekyll.
- MUST build with `base` from `PAGES_BASE`, which the workflow sets from `actions/configure-pages`.
- MUST set the router `basename` from `import.meta.env.BASE_URL`.
- MUST write `404.html` (a copy of `index.html`) and `.nojekyll` into `dist/`. The `pagesSpaFallback` plugin does this.
- MUST run lint, typecheck and tests before the build, and must deploy only from `main`.
- MUST follow the workflow security rules in [security.md](./security.md).
- SHOULD publish raw Markdown and an `llms.txt` next to the HTML when the site is documentation, so agents can read it.

## How it fits together

1. `actions/configure-pages` outputs `base_path`: `/<repo>` for a project site, empty for `<org>.github.io`.
2. The build runs with `PAGES_BASE=<base_path>`. `vite.config.ts` turns it into `base`, so asset URLs become `/<repo>/assets/…`.
3. `main.tsx` passes `BASE_URL` (minus its trailing slash) to `BrowserRouter` as `basename`.
4. A deep link like `/<repo>/docs/tokens` has no file on Pages, so Pages serves `404.html`, which is the app. The router then renders the right page. (The HTTP status is 404; crawlers may skip those pages. Use pre-rendering if that matters.)
5. `.nojekyll` stops Pages from dropping files and folders that start with `_`.

## Workflow

Copy [`templates/.github/workflows/pages.yml`](../templates/.github/workflows/pages.yml). It has three jobs:

- **check**: checkout, pnpm, Socket Firewall, `pnpm audit`, install, lint, typecheck, test.
- **build**: install, `configure-pages`, build with `PAGES_BASE`, `upload-pages-artifact` from `dist`. On a pull request it builds but doesn't upload.
- **deploy**: only on `main`, in the `github-pages` environment, with `pages: write` and `id-token: write`.

In a monorepo, set `defaults.run.working-directory` to the site's folder and upload `<folder>/dist`. git-uplink also limits the publish workflow with `paths:` to the folders that affect the site.

## Local preview with the Pages base

```bash
PAGES_BASE=/my-repo/ sfw pnpm run build
```

```bash
sfw pnpm run preview
```

Then open `http://localhost:4173/my-repo/`.

## Content for agents

A docs site should also be readable as plain text:

- Copy the source `.md` files into `dist/` at stable paths (this guide publishes `docs/*.md` as `/docs/<name>.md`).
- Publish an `llms.txt` at the root ([llmstxt.org](https://llmstxt.org)): a title, a one-line summary, then sections of links to those `.md` files, each with a one-line description.
