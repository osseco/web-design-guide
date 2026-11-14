import { ExternalLink, Menu, X } from "lucide-react";
import type * as React from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export type NavItem = {
  /** A route path, or an absolute URL for an external link. */
  href: string;
  label: string;
};

const LINK =
  "rounded-md px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring";
const IDLE = "text-muted-foreground hover:bg-muted hover:text-foreground";
const ACTIVE = "bg-primary/15 text-primary";

const isExternal = (href: string) => /^[a-z]+:/.test(href);

function NavLinks({
  items,
  onClick,
}: {
  items: NavItem[];
  onClick?: () => void;
}) {
  return (
    <>
      {items.map((item) =>
        isExternal(item.href) ? (
          <a
            key={item.href}
            href={item.href}
            className={cn(LINK, IDLE, "inline-flex items-center gap-1")}
          >
            {item.label} <ExternalLink className="size-3" />
          </a>
        ) : (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            onClick={onClick}
            className={({ isActive }) => cn(LINK, isActive ? ACTIVE : IDLE)}
          >
            {item.label}
          </NavLink>
        ),
      )}
    </>
  );
}

/**
 * Scrolls to `#fragment` once the page has rendered it. Content that renders
 * after navigation (lazy pages, Markdown) appears after the browser's own
 * fragment scroll has already missed it.
 */
function useScrollToHash() {
  const { pathname, hash } = useLocation();
  // biome-ignore lint/correctness/useExhaustiveDependencies: a new pathname must scroll too, even with the same hash
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) {
      window.scrollTo(0, 0);
      return;
    }
    let frame = 0;
    let tries = 0;
    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
      } else if (tries++ < 30) {
        frame = requestAnimationFrame(attempt);
      }
    };
    attempt();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
}

/**
 * The page frame every osseco frontend uses: sticky header with brand, nav
 * and theme toggle; centered content; optional footer.
 */
export function AppShell({
  brand,
  icon,
  nav,
  footer,
  children,
}: {
  brand: string;
  icon: React.ReactNode;
  nav: NavItem[];
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  useScrollToHash();
  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-4">
          <NavLink
            to="/"
            className="me-auto flex items-center gap-2 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary [&_svg]:size-4">
              {icon}
            </span>
            {brand}
          </NavLink>
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            <NavLinks items={nav} />
          </nav>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open ? (
          <nav
            aria-label="Main"
            className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden"
          >
            <NavLinks items={nav} onClick={() => setOpen(false)} />
          </nav>
        ) : null}
      </header>
      <main
        id="main"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 md:py-10"
      >
        {children}
      </main>
      {footer ? (
        <footer className="border-t border-border">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 text-sm text-muted-foreground [&_a:hover]:text-foreground">
            {footer}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
