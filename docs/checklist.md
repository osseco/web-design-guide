# Checklist

A pass/fail list for reviewing a new osseco frontend or a change to one. Every item links to the rule it checks.

## Setup

- [ ] Stack and versions match [`templates/package.json`](../templates/package.json) ([stack.md](./stack.md)).
- [ ] Scripts `dev`, `build`, `preview`, `typecheck`, `test`, `lint`, `format` exist and pass.
- [ ] `pnpm-lock.yaml` committed, `dist/` ignored.
- [ ] `biome.json` and `tsconfig.json` match the templates (apart from `vcs.root`).
- [ ] Layout follows [project-structure.md](./project-structure.md).

## Identical to the templates

These files must match `templates/` exactly, apart from the documented placeholders:

- [ ] The token block in `src/index.css` (`@theme inline`, `:root`, `.dark`), the base layer, and `prose-osseco`.
- [ ] `src/lib/utils.ts`, `src/lib/theme.ts`, and the theme script in `index.html`.
- [ ] `src/components/ui/*`.
- [ ] `status-badge.tsx` tones.

## Design

- [ ] No raw palette colors or hex values outside `status-badge.tsx` ([tokens.md](./tokens.md)).
- [ ] Body text muted, headings in foreground, one `h1` ([typography.md](./typography.md)).
- [ ] `AppShell` frame, `max-w-7xl` / `max-w-4xl` widths ([layout.md](./layout.md)).
- [ ] Shared components used, no restyled raw buttons ([components.md](./components.md)).
- [ ] Statuses mapped to tones in one module, with meanings ([patterns.md](./patterns.md)).
- [ ] Light and dark both checked by eye ([theming.md](./theming.md)).

## Accessibility

- [ ] Keyboard-only pass: visible focus everywhere, logical order ([accessibility.md](./accessibility.md)).
- [ ] Icon-only controls labeled.
- [ ] Contrast AA in both themes.
- [ ] 375px wide: no horizontal page scroll.

## Pages and security

- [ ] `PAGES_BASE`, `basename`, `404.html`, `.nojekyll` ([github-pages.md](./github-pages.md)).
- [ ] Actions pinned by SHA, `permissions: {}`, `persist-credentials: false` ([security.md](./security.md)).
- [ ] Every `dangerouslySetInnerHTML` justified, with trusted input only.
- [ ] No secrets or third-party runtime requests.
