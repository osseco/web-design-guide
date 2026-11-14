# Accessibility

The accessibility baseline every osseco frontend meets.

## Rules

- MUST meet WCAG 2.2 AA in both themes.
- MUST be fully usable with the keyboard. Every interactive element shows `focus-visible:ring-3 focus-visible:ring-ring`.
- MUST use native elements first: `<button>` for actions, `<a>`/`Link` for navigation, `<dialog>` for modals, `<details>` for disclosure.
- MUST follow the WAI-ARIA pattern when a custom widget is unavoidable: tabs, radio group, switch. The templates already do.
- MUST label every icon-only control (`aria-label`) and hide decorative icons (`aria-hidden`).
- MUST have one `h1` per page, ordered headings, `lang` on `<html>`, a skip link, and a `<main>` landmark (the AppShell provides the last two).
- MUST respect `prefers-reduced-motion`. `index.css` shortens transitions globally.
- MUST NOT rely on color alone. Status badges carry their name as text and their meaning in `title`.
- SHOULD check each new screen with the keyboard and a contrast checker in both themes.

## Patterns already handled by the templates

| Need | Where |
| --- | --- |
| Skip link and `main` landmark | `AppShell` |
| Menu button state | `AppShell` (`aria-expanded`, label changes) |
| Tabs: roving focus, arrows, Home/End | `ui/tabs.tsx` |
| Radio group | `ui/segmented.tsx` |
| Switch | `ui/switch.tsx` (`role="switch"`, `aria-checked`) |
| Focus trap, Escape | `ui/modal.tsx` (native `<dialog>`) |
| Theme toggle names its target | `theme-toggle.tsx` |
| Copy feedback announced | `copy-button.tsx` (label switches to "Copied") |
| Alerts | `Callout tone="danger"` uses `role="alert"` |
| Diagram name | `MermaidDiagram` (`role="img"` + `aria-label`) |

## Contrast targets

- Body and muted text against `background` and `card`: at least 4.5:1.
- `primary` text and links against `background`: at least 4.5:1. This is why light `primary` is darker.
- `primary` text on its own `bg-primary/15` tint (active nav, segmented, default badge): at least 4.5:1.
- The focus ring (`ring-ring`) against the page and cards: at least 3:1. The token already includes its strength, so never add an opacity modifier (`ring-ring/50`).
- Status badge text (`-700` light, `-300` dark) against its 10% tint: at least 4.5:1.
- `border` and `input` are deliberately faint (about 1.5:1). A control must never be recognizable by its border alone: buttons have a label or fill, and inputs need a visible label. If you add a bare text input, raise its border to `border-muted-foreground`.

The values in [tokens.md](./tokens.md) meet these targets (measured on the guide site's Tokens and Components pages).

## Testing

- Tab through the page: the order follows the visual order, focus is always visible, and there are no traps outside modals.
- Zoom to 200%: nothing is cut off and the page doesn't scroll horizontally.
- Emulate `prefers-reduced-motion` and `prefers-color-scheme` in DevTools.
- Run Lighthouse's accessibility audit and aim for 100.
