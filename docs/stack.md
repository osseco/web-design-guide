# Stack

The tools every osseco web frontend uses, with versions and scripts.

## Rules

- MUST use the libraries and major versions listed below. Adding a runtime dependency needs a reason in the PR.
- MUST use pnpm, with the version pinned in `packageManager` in the root `package.json`.
- MUST prefix every `pnpm` command with `sfw` ([Socket Firewall Free](https://docs.socket.dev/docs/socket-firewall-free)), locally and in CI.
- MUST commit `pnpm-lock.yaml` and install with `--frozen-lockfile` in CI.
- MUST provide the scripts `dev`, `build`, `preview`, `typecheck`, `test`, `lint` and `format`, with the commands shown below.
- MUST NOT commit `dist/`.
- SHOULD use a pnpm workspace `catalog:` when a repository has more than one frontend package.

## Libraries

| Purpose | Package | Version |
| --- | --- | --- |
| Build and dev server | `vite`, `@vitejs/plugin-react` | ^8.3, ^6.1 |
| UI | `react`, `react-dom` | ^19 |
| Language | `typescript` (strict) | ^7 |
| Styling | `tailwindcss`, `@tailwindcss/vite` | ^4 |
| Class helpers | `clsx`, `tailwind-merge`, `class-variance-authority` | ^2.1, ^3.7, ^0.7 |
| Composition | `@radix-ui/react-slot` (for `asChild`) | ^1.1 |
| Routing | `react-router-dom` | ^7 |
| Icons | `lucide-react` | ^1 |
| Lint and format | `@biomejs/biome` (exact version) | 2.5.15 |
| Unit tests | `vitest` | ^5 |
| Markdown (optional) | `marked` | ^18 |
| Diagrams (optional) | `mermaid` | ^12 |
| Runtime | Node.js | 22 (`devEngines` in the root `package.json`) |

[`templates/package.json`](../templates/package.json) is the source of truth for exact ranges. Remove `marked` and `mermaid` if the project doesn't render Markdown or diagrams.

Not used, on purpose: CSS-in-JS, component libraries (MUI, Chakra), ESLint and Prettier (Biome covers both), Next.js (the sites are static and the apps are embedded), Jekyll.

## Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "lint": "biome ci .",
  "format": "biome check --write ."
}
```

Run them through Socket Firewall:

```bash
sfw pnpm install --frozen-lockfile
sfw pnpm run lint
sfw pnpm run typecheck
sfw pnpm test
sfw pnpm run build
```

## Biome

[`templates/biome.json`](../templates/biome.json): 2-space indent, line width 80, double quotes, semicolons, trailing commas, recommended rules, organized imports, Tailwind directives in CSS, and `noDangerouslySetInnerHtml` as an **error**. Silence a rule only with an inline `biome-ignore` that gives the reason.

In a monorepo where the frontend sits in a subfolder (`web/`, `site/`), add `"root": ".."` to the `vcs` section so Biome finds the repository's `.gitignore`.

## TypeScript

[`templates/tsconfig.json`](../templates/tsconfig.json): `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `moduleResolution: bundler`, `jsx: react-jsx`, and the `@/*` path alias for `./src/*`.

## Several frontends in one repository

Make the frontends one pnpm workspace with one lockfile, and give shared dependencies a catalog entry:

```yaml
# pnpm-workspace.yaml
packages:
  - web
  - site

catalog:
  react: ^19.0.0
  tailwindcss: ^4.0.14
  # every dependency both packages use

allowBuilds:
  fsevents: true
```

Each package then lists `"react": "catalog:"`. Run a script in every package with `sfw pnpm -r run lint`, or in one with `sfw pnpm --filter <name> test`.

## Commits and branches

Use [Conventional Commits](https://www.conventionalcommits.org/) (`type(scope): imperative subject`, lowercase, no trailing period). Types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`. Name branches `type/short_description`. Never commit directly to `main`.
