# osseco web design guide

One look for every osseco web frontend: app UIs and GitHub Pages sites. The guide says **what** to use, **how** to use it, and gives the **files** to start from.

- Read it: <https://osseco.github.io/web-design-guide/>
- Agents: [`AGENTS.md`](AGENTS.md), [`llms.txt`](llms.txt), and the [Claude skill](skill/osseco-web-design/SKILL.md)

The design is extracted from [git-uplink](https://github.com/npetzall/git-uplink)'s operator UI and documentation site, with a light theme added.

## What's here

| Path | What |
| --- | --- |
| [`docs/`](docs/) | The guide. Each page opens with MUST/SHOULD rules, then explains them. |
| [`templates/`](templates/) | Copy-in starter: tokens, components, configs, Pages workflow. A working Vite app. |
| [`site/`](site/) | The guide's own Pages site. It renders `docs/` and runs the components from `templates/`. |
| [`skill/`](skill/) | A Claude skill that applies the guide. |
| [`llms.txt`](llms.txt) | Machine-readable index of the docs. |

## The guide

1. [Principles](docs/principles.md): why, what must match, visual character
2. [Stack](docs/stack.md): tools, versions, scripts, sfw, Biome
3. [Project structure](docs/project-structure.md): folders, naming, starting a project
4. [Tokens](docs/tokens.md): colors, status palette, radius, fonts
5. [Theming](docs/theming.md): light and dark mode
6. [Typography](docs/typography.md): scale and prose
7. [Layout](docs/layout.md): AppShell, widths, spacing, page types
8. [Components](docs/components.md): the shared components and their APIs
9. [Patterns](docs/patterns.md): status badges, steps, tables, empty states
10. [Accessibility](docs/accessibility.md): the baseline
11. [GitHub Pages](docs/github-pages.md): base path, SPA fallback, workflow
12. [Security](docs/security.md): HTML rendering, supply chain, workflows
13. [Checklist](docs/checklist.md): review before shipping

## Start a new frontend

```bash
cp -R templates/. ../my-project/web/
```

```bash
cd ../my-project/web && sfw pnpm install && sfw pnpm dev
```

Then follow [Starting a project](docs/project-structure.md#starting-a-project).

## Work on this guide

Needs Node 22, pnpm (the version in `package.json`), and [`sfw`](https://docs.socket.dev/docs/socket-firewall-free).

```bash
sfw pnpm install
```

```bash
sfw pnpm dev
```

```bash
sfw pnpm lint && sfw pnpm typecheck && sfw pnpm test && sfw pnpm build
```

A change to the design goes into `templates/` and `docs/` in the same commit. The site picks up both automatically.
