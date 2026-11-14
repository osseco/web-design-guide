import type * as React from "react";
import { useId, useRef } from "react";
import { cn } from "../../lib/utils";

export type TabItem<T extends string> = {
  value: T;
  label: React.ReactNode;
  content: React.ReactNode;
};

/**
 * Accessible tabs (WAI-ARIA tablist): arrow keys, Home and End move between
 * tabs, and only the selected tab is in the tab order. Selection is controlled
 * by the caller.
 */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  );
  const active = items[index];

  function focusAt(next: number) {
    const i = (next + items.length) % items.length;
    onChange(items[i].value);
    refs.current[i]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") focusAt(index + 1);
    else if (event.key === "ArrowLeft") focusAt(index - 1);
    else if (event.key === "Home") focusAt(0);
    else if (event.key === "End") focusAt(items.length - 1);
    else return;
    event.preventDefault();
  }

  if (!active) return null;

  return (
    <div className="not-prose space-y-6">
      <div
        role="tablist"
        aria-label={label}
        className="flex gap-1 overflow-x-auto border-b border-border"
        onKeyDown={onKeyDown}
      >
        {items.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${baseId}-tab-${item.value}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.value)}
              className={cn(
                "-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
                selected
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.value}`}
        aria-labelledby={`${baseId}-tab-${active.value}`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: the WAI-ARIA tabs pattern makes the tab panel focusable
        tabIndex={0}
        className="outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        {active.content}
      </div>
    </div>
  );
}
