import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** localStorage key. index.html reads the same key before first paint. */
export const THEME_KEY = "osseco-theme";

/** The stored choice wins; without one, follow the operating system. */
export function resolveTheme(stored: string | null, prefersDark: boolean) {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

export function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked; the choice then lasts for this page only.
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  // Follow the OS while the reader has not picked a theme.
  const query = media();
  const onSystem = () => {
    if (readStored()) return;
    document.documentElement.classList.toggle(
      "dark",
      resolveTheme(null, query.matches) === "dark",
    );
  };
  query.addEventListener("change", onSystem);
  return () => {
    observer.disconnect();
    query.removeEventListener("change", onSystem);
  };
}

/** The active theme; re-renders when it changes. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, currentTheme, () => "light");
}
