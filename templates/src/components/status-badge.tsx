import type * as React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";

/**
 * The status palette. Each tone has a meaning; map your own statuses onto
 * these, never pick a hue by taste. Light text uses -700, dark uses -300.
 */
export const STATUS_TONES = {
  /** Waiting in line, not yet acted on. */
  queued: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  /** Blocked on a person or an external step. */
  waiting:
    "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  /** Approved, about to proceed. */
  approved:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  /** Handed off and in progress elsewhere. */
  progress:
    "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300",
  /** Done or live. */
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  /** Needs attention but is not broken. */
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  /** Failed, rejected or in conflict. */
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  /** Inactive, removed or informational. */
  neutral: "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
} as const;

export type StatusTone = keyof typeof STATUS_TONES;

/** A status label. Put what the status means in `title`; it shows on hover. */
export function StatusBadge({
  tone,
  title,
  children,
  className,
}: {
  tone: StatusTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-mono", STATUS_TONES[tone], className)}
      title={title}
    >
      {children}
    </Badge>
  );
}
