import type * as React from "react";
import { cn } from "../../lib/utils";

/** On/off toggle (WAI-ARIA switch). Always give it an aria-label or a <label>. */
export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "onChange"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
        checked ? "bg-primary" : "bg-muted dark:bg-input",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full shadow transition-transform",
          checked
            ? "translate-x-4 bg-background"
            : "translate-x-0.5 bg-muted-foreground",
        )}
      />
    </button>
  );
}
