import { cn } from "../../lib/utils";

/**
 * A small set of mutually exclusive choices shown side by side (WAI-ARIA
 * radio group). Use it for view modes, not for navigation: that is Tabs.
 */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-lg border border-border p-0.5"
    >
      {options.map((option) => (
        // biome-ignore lint/a11y/useSemanticElements: a segmented control following the WAI-ARIA radio group pattern
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
            value === option.value
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
