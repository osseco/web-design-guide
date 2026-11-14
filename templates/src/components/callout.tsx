import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/utils";

const TONES = {
  info: {
    icon: Info,
    className: "border-info/30 bg-info/10 text-info-foreground",
  },
  success: {
    icon: CircleCheck,
    className: "border-success/30 bg-success/10 text-success-foreground",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-warning/30 bg-warning/10 text-warning-foreground",
  },
  danger: {
    icon: CircleAlert,
    className:
      "border-destructive/30 bg-destructive/10 text-destructive-foreground",
  },
} as const;

export type CalloutTone = keyof typeof TONES;

/** A note set apart from the text. Danger is announced to screen readers. */
export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { icon: Icon, className: toneClass } = TONES[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "note"}
      className={cn(
        "not-prose flex gap-3 rounded-lg border px-4 py-3 text-sm leading-6",
        toneClass,
        className,
      )}
    >
      <Icon className="mt-1 size-4 shrink-0" aria-hidden />
      <div className="space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}
