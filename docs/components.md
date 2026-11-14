# Components

The shared components: what each is for, its API, and its accessibility contract. The source files are in [`templates/src/components`](../templates/src/components/). The guide site's Components page shows each one live.

## Rules

- MUST use these components rather than restyling raw elements. A `<button>` with its own classes is a review finding.
- MUST pass `className` through `cn()` when extending a component, so Tailwind conflicts resolve correctly.
- MUST give every icon-only control an `aria-label`.
- MUST keep the focus style `outline-none focus-visible:ring-3 focus-visible:ring-ring` on anything interactive.
- SHOULD build a new component from tokens and existing components. If two projects need it, propose it for this guide.

## Button

`ui/button.tsx`. Built with cva. `asChild` renders the child (a router `Link`, an `<a>`) with button styles.

| Variant | Use |
| --- | --- |
| `default` | the one primary action in a view |
| `outline` | secondary actions, link rows on landing pages |
| `secondary` | low-emphasis filled |
| `ghost` | toolbar and icon buttons, the menu toggle |
| `destructive` | delete, drop, reject |
| `link` | inline text action |

Sizes: `sm` (h-7), `default` (h-8), `lg` (h-9), `icon` (size-8). An SVG child is sized `size-4` automatically. `type` defaults to `"button"`.

```tsx
<Button asChild>
  <Link to="/start">Get started <ArrowRight /></Link>
</Button>
<Button variant="ghost" size="icon" aria-label="Refresh"><RefreshCw /></Button>
```

## Card

`ui/card.tsx`: `Card`, `CardHeader`, `CardTitle`, `CardContent`. A `rounded-xl` border on `bg-card`, padded `p-5`. Put body text in `text-sm leading-6 text-muted-foreground`.

## Badge

`ui/badge.tsx`: `variant="outline"` (default) or `"default"` (a primary tint). For statuses, use [`StatusBadge`](#statusbadge) instead.

## StatusBadge

`status-badge.tsx`: `<StatusBadge tone="success" title="What this status means">merged</StatusBadge>`. Monospace, with color from the status palette ([tokens.md](./tokens.md#status-palette)). Always set `title` to the status's meaning. Keep the mapping from status to tone in one place, in `lib/`.

## Tabs

`ui/tabs.tsx`. Controlled, generic over the value type, and follows the WAI-ARIA tabs pattern: roving `tabIndex`, Arrow Left and Right, Home, End, `aria-controls` / `aria-labelledby`, and a focusable panel. The tab strip scrolls sideways when it doesn't fit.

```tsx
<Tabs
  label="Patch view"
  value={view}
  onChange={setView}
  items={[
    { value: "diff", label: "Diff", content: <DiffView /> },
    { value: "meta", label: "Metadata", content: <Meta /> },
  ]}
/>
```

## Segmented

`ui/segmented.tsx`. Two to four mutually exclusive options shown side by side, using the radio group pattern. Use it for modes ("Manual / CLI", "All / Open"). Use Tabs when the choice swaps out a whole section.

## Switch

`ui/switch.tsx`. A boolean setting (`role="switch"`). Pair it with a visible `<label>` or give it an `aria-label`.

## Modal

`ui/modal.tsx`. Built on the native `<dialog>` with `showModal()`, so the focus trap, Escape and the top layer come from the browser. Clicking the backdrop closes it, the page behind doesn't scroll, and the body scrolls inside. Props: `open`, `onClose`, `title`, optional `actions` (buttons in the header), and `children`.

## Callout

`callout.tsx`: `<Callout tone="warning" title="Optional">Text</Callout>`. Tones: `info`, `success`, `warning`, `danger`. `danger` uses `role="alert"`; the others use `role="note"`. Use it sparingly, at most one per section.

## CodeBlock and CopyButton

`code-block.tsx`: a `pre` on `bg-code` with a copy button in the corner. Use it for any command a reader should run. `copy-button.tsx` also works on its own next to an ID or hash. It shows a check mark for 1.5s, and fails silently when the clipboard is blocked.

## DocPage, Section, Eyebrow

`doc-page.tsx`. See [layout.md](./layout.md#page-types). `Section` gets `prose-osseco` and a heading that links to its own `id`.

## AppShell and ThemeToggle

See [layout.md](./layout.md#appshell) and [theming.md](./theming.md).

## MermaidDiagram (optional)

`mermaid-diagram.tsx`: `<MermaidDiagram title="Caption" chart={"flowchart LR\n a --> b"} />`. Mermaid loads on demand with `securityLevel: "strict"` and follows the theme. The figure scrolls sideways, and `title` becomes the caption and the accessible name.

## MarkdownContent (optional)

`markdown-content.tsx`: renders Markdown that ships with the project, using `marked` and `prose-osseco`. `rewriteHref` maps relative links (for example `./x.md` to a route). **Never pass user input**: the output is not sanitized. See [security.md](./security.md).
