# Theming

How light and dark mode work, and what a component must do to support both.

## Rules

- MUST support both themes. The default follows the operating system (`prefers-color-scheme`).
- MUST put the `ThemeToggle` at the right end of the header (the `AppShell` already does).
- MUST keep the inline script in `index.html` so the right theme is set before first paint.
- MUST use the same storage key (`osseco-theme`) in `index.html` and `src/lib/theme.ts`.
- MUST wrap every `localStorage` access in `try`/`catch`. The page must work when storage is blocked.
- MUST NOT add `dark:` variants for token colors. Tokens already switch. `dark:` is only for raw palette text in the status palette.
- SHOULD re-render theme-dependent third-party output (Mermaid, charts) with `useTheme()`.

## Mechanism

1. **Before paint**: the script in [`templates/index.html`](../templates/index.html) reads `localStorage["osseco-theme"]`. If that's `"light"` or `"dark"`, it uses it; otherwise it follows `prefers-color-scheme`. Then it toggles the `dark` class on `<html>`.
2. **CSS**: `:root` holds the light tokens and `.dark` overrides them ([tokens.md](./tokens.md)). `@custom-variant dark (&:is(.dark *))` makes `dark:` utilities follow the class, not the media query. `color-scheme` is set too, so scrollbars and form controls match.
3. **React**: [`src/lib/theme.ts`](../templates/src/lib/theme.ts) has:
   - `useTheme()`: the active theme. It re-renders when the class changes, through a `MutationObserver` and `useSyncExternalStore`.
   - `setTheme(theme)`: sets the class and stores the choice.
   - `resolveTheme(stored, prefersDark)`: the pure decision, unit-tested.
   - While nothing is stored, the page follows live changes to the OS setting.
4. **Toggle**: [`ThemeToggle`](../templates/src/components/theme-toggle.tsx) is a ghost icon button. It shows a sun in dark mode and a moon in light mode, and its `aria-label` names the theme it switches to.

## Contrast

Both themes target WCAG AA: 4.5:1 for body text and 3:1 for large text and UI boundaries. Light-mode `primary` is darker than dark-mode `primary` for this reason. When you add something, check it in both themes.

## Third-party output

Libraries that render their own colors need the theme passed in. `MermaidDiagram` uses `useTheme()` and renders with Mermaid's `dark` or `neutral` theme. Do the same for charts or syntax highlighters.
