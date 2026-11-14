# Typography

Text sizes, weights and the prose style.

## Rules

- MUST use the scale below. Don't invent sizes.
- MUST put body text in `text-muted-foreground`. Use `text-foreground` for headings, `<strong>`, inline code and values.
- MUST have exactly one `h1` per page, and must not skip heading levels.
- MUST style long-form content (rendered Markdown, documentation sections) with the `prose-osseco` utility. Don't repeat `[&_code]:…` arbitrary variants.
- MUST use `font-mono` for commands, IDs, statuses, paths and code.
- SHOULD add `text-balance` to headings and `text-pretty` to paragraphs.
- SHOULD keep line length readable: `max-w-3xl` for hero text, `max-w-4xl` for doc articles.

## Scale

| Role | Classes |
| --- | --- |
| Hero title (home page) | `text-4xl md:text-5xl font-semibold tracking-tight text-balance` |
| Page title (`h1`) | `text-4xl font-semibold tracking-tight text-balance` |
| Lead paragraph | `text-lg leading-8 text-muted-foreground text-pretty` |
| Eyebrow (above a title) | `text-xs font-medium uppercase tracking-[0.25em] text-primary` (the `Eyebrow` component) |
| Section (`h2`) | `text-xl font-semibold text-foreground` |
| Subsection (`h3`) | `text-lg font-semibold` |
| Card title | `text-base font-semibold leading-none tracking-tight` |
| Body (prose) | `text-[15px] leading-7 text-muted-foreground` |
| Body (cards, compact UI) | `text-sm leading-6 text-muted-foreground` |
| Small / captions / meta | `text-xs text-muted-foreground` |
| Table header | `text-xs font-medium uppercase tracking-wide text-muted-foreground` |
| Inline code | `rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground` |
| Code block | `font-mono text-xs leading-6 text-code-foreground` on `bg-code` |

Weights: `font-medium` (500) for labels and buttons, `font-semibold` (600) for headings. Don't use bold (700) or anything heavier.

## Prose

`prose-osseco` is defined in [`src/index.css`](../templates/src/index.css) with `@utility`. It styles descendant headings, paragraphs, lists, inline code, `pre`, tables, links, `strong`, `hr` and `blockquote` to match the scale above. Tables and code blocks scroll horizontally rather than widening the page, and long inline code wraps.

```tsx
<div className="prose-osseco">{/* markdown or JSX content */}</div>
```

`Section` and `MarkdownContent` apply it already.

Prose rules use `:where()`, so they never outrank utility classes. They also skip everything inside an element with the `not-prose` class. `Card`, `Callout`, `CodeBlock`, `Tabs` and `MermaidDiagram` carry `not-prose`, so they look the same inside and outside prose. Add `not-prose` to any custom block (a grid of swatches, a demo area) that sits inside a `Section`.

## Writing

- Short sentences. Active voice. Present tense.
- Address the reader by role ("operators", "developers") when content differs by role.
- Title Case is not used. Headings and buttons use sentence case.
- Links say where they go ("How sync works"), never "click here".
