# Security

Security rules for osseco frontends and their workflows.

## Rules

- MUST keep Biome's `security/noDangerouslySetInnerHtml` as an error. Each exception needs a `biome-ignore` that says why the HTML is safe.
- MUST render only trusted HTML: Markdown that ships with the repository, and SVG from Mermaid with `securityLevel: "strict"`. Never render user input or API responses as HTML.
- MUST NOT put secrets, tokens or personal data in frontend code, URLs or query strings. Anything in `dist/` is public.
- MUST install with `sfw pnpm install --frozen-lockfile` and run `sfw pnpm audit` in CI.
- MUST pin every GitHub Action to a full commit SHA, with the version in a comment.
- MUST start workflows with `permissions: {}` and grant the least each job needs.
- MUST set `persist-credentials: false` on `actions/checkout`.
- MUST NOT put `${{ … }}` expressions with untrusted input (PR titles, branch names) straight into `run:`. Pass them through `env:`.
- SHOULD run zizmor and actionlint on workflows, and CodeQL on the frontend code (git-uplink does all three).
- SHOULD load nothing from third-party origins at runtime: no CDNs, web fonts or analytics. Everything is bundled.

## Rendering HTML

| Source | Allowed | How |
| --- | --- | --- |
| Markdown in the repository | yes | `MarkdownContent` / `renderMarkdown`, imported with `?raw` at build time |
| Mermaid source in the repository | yes | `MermaidDiagram` with `securityLevel: "strict"` |
| API data, URL params, user input | **no** | render as text through React, which escapes it |

## Supply chain

- Prefer a few well-known dependencies ([stack.md](./stack.md)). Each new one needs a reason.
- Socket Firewall (`sfw`) blocks known-malicious packages at install time.
- Dependabot or Renovate keeps action SHAs and packages current. Review the changelogs.
- Generate an SBOM (Syft) when the frontend ships inside a released binary.

## Workflow example

```yaml
permissions: {}

jobs:
  check:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
```
