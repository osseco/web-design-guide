# Tokens

The design tokens: every color, radius and font an osseco frontend may use.

## Rules

- MUST style with token utilities: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `bg-primary`, `text-primary`, `ring-ring`, `bg-code`, and so on.
- MUST NOT use Tailwind's raw palette (`text-teal-400`, `bg-zinc-900`, `bg-black/40`) or hex/rgb values. The only exception is the status palette inside `status-badge.tsx`.
- MUST NOT add tokens in a project. If one is missing, add it to this guide first.
- MUST keep the token block in `src/index.css` identical to [`templates/src/index.css`](../templates/src/index.css).
- SHOULD use opacity modifiers on tokens for tints: `bg-primary/15`, `border-info/30`, `bg-destructive/10`.

## How they work

`src/index.css` defines CSS variables twice: in `:root` (light) and in `.dark` (dark). `@theme inline` maps each one to a Tailwind color, so `--primary` becomes `bg-primary`, `text-primary`, `border-primary`, `ring-primary`, and so on. Switching the `dark` class on `<html>` swaps every value at once; components never need `dark:` variants for token colors.

All colors are OKLCH. The neutrals share hue 240, a cool slate. The brand color is teal at hue 185.

## Surface and text

| Token | Use | Light | Dark |
| --- | --- | --- | --- |
| `background` | page | `oklch(0.985 0.004 240)` | `oklch(0.16 0.018 240)` |
| `foreground` | headings, terms, values | `oklch(0.21 0.02 240)` | `oklch(0.97 0.01 240)` |
| `card` / `card-foreground` | raised surface | `oklch(1 0 0)` / fg | `oklch(0.21 0.02 240)` / fg |
| `popover` / `popover-foreground` | menus, popovers | as card | as card |
| `muted` | quiet fills: inline code, hover | `oklch(0.95 0.006 240)` | `oklch(0.269 0 0)` |
| `muted-foreground` | body text, labels | `oklch(0.47 0.015 240)` | `oklch(0.708 0 0)` |
| `secondary` / `accent` (+ `-foreground`) | secondary buttons, highlights | as muted | as muted |
| `border` | every border and divider | fg at 12% | white at 10% |
| `input` | form control borders | fg at 18% | white at 15% |
| `code` / `code-foreground` | code blocks | `oklch(0.955 0.006 240)` | black at 40% / `oklch(0.92 0.004 286)` |

## Brand and focus

| Token | Use | Light | Dark |
| --- | --- | --- | --- |
| `primary` | primary button, active nav, links, eyebrow | `oklch(0.47 0.09 185)` | `oklch(0.82 0.1 185)` |
| `primary-foreground` | text on `bg-primary` | `oklch(0.985 0.01 185)` | `oklch(0.2 0.03 240)` |
| `ring` | focus ring, used solid (`ring-ring`) | = primary | primary at 50% |

## Feedback

Each feedback color comes as a pair. The base (`info`, `success`, `warning`, `destructive`) is for borders and tints (`/30`, `/10`). The `-foreground` is for text on those tints. The base stays the same in both themes; the foreground flips from dark to light text.

| Tone | Base | Foreground light | Foreground dark |
| --- | --- | --- | --- |
| `info` | sky 500 | sky 800 | sky 100 |
| `success` | emerald 500 | emerald 800 | emerald 100 |
| `warning` | amber 500 | amber 800 | amber 100 |
| `destructive` | red (light) / rose-red (dark) | rose 800 | rose 100 |

Pattern: `border-warning/30 bg-warning/10 text-warning-foreground`. This is what [`Callout`](./components.md#callout) does.

## Status palette

Statuses (queued, merged, failed…) use eight fixed tones in `status-badge.tsx`, so the same meaning gets the same color in every project. Each tone is `border-<hue>-500/30 bg-<hue>-500/10 text-<hue>-700 dark:text-<hue>-300`.

| Tone | Hue | Meaning |
| --- | --- | --- |
| `queued` | sky | waiting in line, not yet acted on |
| `waiting` | indigo | blocked on a person or an external step |
| `approved` | violet | approved, about to proceed |
| `progress` | teal | handed off, in progress elsewhere |
| `success` | emerald | done or live |
| `warning` | amber | needs attention but is not broken |
| `danger` | rose | failed, rejected, in conflict |
| `neutral` | zinc | inactive, removed, informational |

Map each project status to one tone; several statuses may share a tone. See [patterns.md](./patterns.md#status-badges).

## Radius

`--radius: 0.625rem`. The others derive from it:

| Utility | Value | Use |
| --- | --- | --- |
| `rounded-sm` | 0.6 × | rarely |
| `rounded-md` | 0.8 × | badges, nav links, icon tiles |
| `rounded-lg` | 1 × | buttons, inputs, code blocks, callouts |
| `rounded-xl` | 1.4 × | cards, modals, diagrams |
| `rounded-full` | | switches, avatars |

## Fonts

System fonts only. Nothing is downloaded.

- `font-sans`: `ui-sans-serif, system-ui, sans-serif`
- `font-mono`: `ui-monospace, SFMono-Regular, menlo, monaco, consolas, monospace`

See [typography.md](./typography.md) for the scale.
