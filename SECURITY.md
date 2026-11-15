# Security policy

## Reporting a vulnerability

Report vulnerabilities privately through GitHub: **Security → Report a vulnerability** on [osseco/web-design-guide](https://github.com/osseco/web-design-guide/security/advisories/new). Don't open a public issue.

Include the file or page, what you did, and what happened. You'll get a reply within a week.

## Supported versions

Only `main` is supported. The guide and the starter in `templates/` have no releases; projects copy the current files.

## Dependencies

- pnpm refuses package versions younger than 7 days (`minimumReleaseAge`), denies dependency build scripts (`strictDepBuilds`, `allowBuilds`), and installs from the frozen lockfile.
- Installs in CI and on maintainers' machines run behind sfw (Socket Firewall Free). CI installs it with `osseco/setup-sfw-free`.
- `pnpm audit`, dependency review and a Socket Security scan run on every pull request.
- Dependabot updates npm packages, actions (also in `templates/.github/workflows`) and the Socket CLI weekly, with a 7-day cooldown.

## Workflows

- Every workflow starts with `permissions: {}`; each job asks only for what it needs.
- Actions are pinned to full commit SHAs. Our own reusable workflows are referenced with `$/` (the workflow's own commit).
- `actions/checkout` runs with `persist-credentials: false`.
- `${{ }}` values reach `run:` steps through `env:`, never inline.
- zizmor and actionlint must report no findings; CodeQL analyses the TypeScript and the workflows. The scanners also run weekly.
- Pull requests merge only through the single required `Merge gate` check.

## The site

- The Pages site is static. It renders only Markdown from this repository, and Mermaid runs with `securityLevel: "strict"`.
- It deploys from `main` only, through the `github-pages` environment.
