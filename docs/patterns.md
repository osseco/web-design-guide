# Patterns

Recurring compositions, built from the components.

## Rules

- MUST map domain statuses to status tones in one module (for example `lib/status.ts`), with a meaning for each.
- MUST show copyable commands with `CodeBlock`, never in a plain `<pre>`.
- MUST give empty, loading and error states real text. Never leave a blank area.
- SHOULD link section headings (`Section` with `id`) so people can share deep links.
- SHOULD use a numbered `Step` layout for setup guides.

## Status badges

Keep each status's meaning next to its tone, and use the meaning as the tooltip and in a legend:

```ts
// lib/status.ts
import type { StatusTone } from "../components/status-badge";

export const STATUS: Record<string, { tone: StatusTone; meaning: string }> = {
  queued: { tone: "queued", meaning: "Merged internally, not yet approved." },
  submitted: { tone: "progress", meaning: "Open as an upstream pull request." },
  merged: { tone: "success", meaning: "Upstream has it." },
  conflict: { tone: "danger", meaning: "No longer applies on upstream." },
  dropped: { tone: "neutral", meaning: "Removed from the queue." },
};
```

```tsx
const info = STATUS[value];
<StatusBadge tone={info?.tone ?? "neutral"} title={info?.meaning}>{value}</StatusBadge>
```

A **legend** is a `Card` with a `dl`: each row is a badge followed by its meaning in `text-sm text-muted-foreground`.

## Card grid

Parallel ideas of similar length: `grid gap-4 md:grid-cols-3` of `Card` with `CardTitle className="text-base"`. Up to three across, and up to six cards. For a card with an icon, put an icon tile `size-8 rounded-md bg-primary/15 text-primary` above the title.

## Hero

`Eyebrow`, hero title, lead, and a button row: one `default` button, the rest `outline`. The template's [`pages/home.tsx`](../templates/src/pages/home.tsx) shows it.

## Numbered steps

For setup guides: each step is a `section` with an `id`, `border-l-2 border-border pl-5`, and `prose-osseco`. Its `h2` starts with the step number in `font-mono text-sm text-primary`, zero-padded (`01`). Optional alternatives go in a `<details className="rounded-lg border border-border px-4 py-2">`.

## Mode switch

When content exists in two forms (web UI vs CLI), put a `Segmented` above the steps and keep the choice in React context. If a step has no version in the chosen mode, say so with a `Callout tone="warning"`.

## Tables

Wrap tables in `overflow-x-auto`. Headers use the table header style ([typography.md](./typography.md)), and cells have `border-b border-border py-2 pr-3`. Put IDs in `font-mono`. Clickable rows link the identifier cell instead of making the whole row clickable.

## Empty, loading and error

- Empty: `text-sm text-muted-foreground` text in the space the content would fill, saying what would appear and how to get it.
- Loading: the same, with "Loading…". No spinner for anything under a second.
- Error: `Callout tone="danger"` with the message and what to try.

## Diagrams

Use `MermaidDiagram` for flows and sequences. Caption every diagram, and explain the same thing in the text next to it, since the diagram can't be read aloud.

## Links out

External links in the nav and footer show `ExternalLink className="size-3"`. Links in body text don't.
