# Principles

Why the guide exists, and the rules every osseco frontend follows.

## Rules

- MUST use the stack in [stack.md](./stack.md) for new web frontends and GitHub Pages sites.
- MUST take colors, radii and fonts from tokens ([tokens.md](./tokens.md)). Never hard-code a color.
- MUST start from the files in [`templates/`](../templates/) and change them only where the guide allows.
- MUST support light and dark themes ([theming.md](./theming.md)).
- MUST pass the [checklist](./checklist.md) before a frontend ships.
- SHOULD keep a page plain: one primary action, short paragraphs, muted body text, bold only for terms.

## Why

osseco projects are small tools built by few people. Users move between a project's docs site, its web UI and the next project's site. When those all look and behave the same, users don't have to relearn anything, and maintainers don't have to redesign anything.

The design comes from [git-uplink](https://github.com/npetzall/git-uplink): its operator UI (`web/`) and its documentation site (`site/`). This guide is that design written down once, with the differences between the two resolved.

## What consistent means

| Same everywhere | Free per project |
| --- | --- |
| Stack, tooling, lint rules | Name, icon, nav entries |
| Tokens: colors, radius, fonts | Page content and structure |
| Components in `templates/src/components` | Extra components built from tokens |
| Header, widths, spacing scale | Whether to use Mermaid or Markdown |
| Status palette meanings | Which statuses exist and their names |
| Pages workflow and security settings | Routes |

## Changes from git-uplink

Where git-uplink's two frontends disagreed, or fell short of the rules here, the guide picked one answer:

- **Light theme added.** git-uplink is dark-only. Its palette is kept unchanged as `.dark`.
- **Focus ring.** It was gray at 50% in dark mode (below 3:1) and mixed with `outline-2 outline-primary` in places. Now it's one style everywhere, `ring-3 ring-ring`, with a teal token that meets 3:1 in both themes.
- **No hard-coded colors.** `text-teal-400` eyebrows, `bg-black/40` code blocks and amber/rose callouts became tokens (`primary`, `code`, `warning`, `destructive`), so they work in light mode.
- **Tabs.** The site's accessible version (arrow keys, roving focus, tab panel) with the web UI's generic typing.
- **Prose.** One `prose-osseco` utility replaces `.markdown-body` and the long `[&_code]:…` class strings.
- **Status badges.** Tones named by meaning (`success`, `danger`…) instead of by each project's statuses.

## Copy, don't depend

Projects **copy** the template files in, the way shadcn/ui works, rather than installing a package. A copy can be read, edited and debugged in place, and nothing needs publishing. In exchange, a project picks up changes to this guide by comparing its copy with `templates/` and pulling them over by hand. The [checklist](./checklist.md) lists what has to stay identical.

## Visual character

- Calm and dense: muted body text (`text-muted-foreground`), foreground only for headings, terms and values.
- Teal (`primary`) marks the one important thing on screen: the active nav item, the primary button, an eyebrow, a link.
- Rounded but not soft: `rounded-lg` for controls, `rounded-xl` for cards.
- Thin borders (`border-border`) instead of shadows. A shadow appears only on overlays such as a modal.
- Monospace for identifiers: commands, statuses, IDs, paths.
- No decorative images or gradients. Icons come from [lucide](https://lucide.dev), sized `size-4`.
