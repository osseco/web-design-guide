# Layout

Page frame, widths, spacing and responsive behavior.

## Rules

- MUST wrap every page in `AppShell`, through a layout route in `main.tsx`.
- MUST use `max-w-7xl` with `px-4` for the frame (header, main, footer), and `max-w-4xl` for a documentation article (`DocPage`).
- MUST work at 375px width with no horizontal page scroll. Wide content (tables, code, diagrams) scrolls inside its own box.
- MUST put the main navigation in the header. Below `md` it collapses into the menu button. If there are more links than fit, raise the breakpoint (`xl`) instead of shrinking the text.
- MUST use the spacing values below. Use `gap-*` and `space-y-*` for spacing, not margins between siblings.
- SHOULD stack to one column below `md` and use at most three columns of cards.

## AppShell

[`templates/src/components/app-shell.tsx`](../templates/src/components/app-shell.tsx)

```tsx
<AppShell
  brand="git uplink"
  icon={<GitFork />}
  nav={[
    { href: "/", label: "Overview" },
    { href: "/how", label: "How" },
    { href: "https://github.com/osseco/git-uplink", label: "GitHub" },
  ]}
  footer={<a href="https://github.com/osseco/git-uplink">GitHub</a>}
>
  <Outlet />
</AppShell>
```

- A skip link comes first and is visible on focus.
- The header is sticky, `h-14`, `bg-background/80 backdrop-blur-md`, with a bottom border. It holds the brand (an icon tile `size-8 rounded-md bg-primary/15 text-primary` plus the name in `font-semibold tracking-tight`), the nav, the theme toggle, and the menu button on mobile.
- Nav links are `rounded-md px-3 py-2 text-sm`. The active one is `bg-primary/15 text-primary`; the others are `text-muted-foreground hover:bg-muted hover:text-foreground`. External links show an `ExternalLink` icon.
- `<main id="main">` is `max-w-7xl px-4 py-6 md:py-10`.
- The footer is optional: a row of `text-sm text-muted-foreground` links above a top border.
- It scrolls to `#fragment` once the content has rendered, and to the top on route change.

## Page types

**Landing page**: a hero (`max-w-3xl space-y-5`: `Eyebrow`, hero title, lead, button row `flex flex-wrap gap-3`), then sections with `mt-12`: a card grid (`grid gap-4 md:grid-cols-3`) and short sections (`space-y-4`, `h2`, `max-w-3xl` paragraph, an outline button `size="sm"` with an `ArrowRight`).

**Documentation page**: `DocPage` (eyebrow, title, lead) with `Section`s inside, `space-y-10` between them. Each `Section` has an `id` so its heading can be linked.

**App page** (dashboard, list, detail): use the full `max-w-7xl` width. A title row (`flex flex-wrap items-center justify-between gap-3`), then filters (`Tabs` or `Segmented`), then the content in a `Card`. Tables go inside `overflow-x-auto`.

**Docs with many pages**: a sidebar (`lg:grid lg:grid-cols-[14rem_1fr] gap-10`) with a sticky list of pages (`sticky top-20`). On mobile the sidebar becomes a list above the content. The guide's own site does this.

## Spacing

| Between | Value |
| --- | --- |
| Hero blocks / page sections | `mt-12` or `space-y-10` |
| Heading and its content | `space-y-3` (header), `space-y-4` (section) |
| Cards in a grid | `gap-4` (`gap-3` for dense) |
| Buttons in a row | `gap-3` |
| Inline icon and text | `gap-1.5` to `gap-2` |
| Card padding | `p-5` (via `CardHeader` / `CardContent`) |

## Breakpoints

Tailwind defaults. Use `md` (768px) for two or three columns and the desktop nav, `lg` (1024px) for sidebars, and `xl` only for a nav with many links.
