import type * as React from "react";
import { cn } from "../lib/utils";

/** Small uppercase label above a title. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
      {children}
    </p>
  );
}

/** Layout for a documentation page: one width, one header style. */
export function DocPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title?: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-4xl space-y-10">
      <header className="space-y-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        {title ? (
          <h1 className="text-4xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
        ) : null}
        {lead ? (
          <p className="text-lg leading-8 text-pretty text-muted-foreground">
            {lead}
          </p>
        ) : null}
      </header>
      {children}
    </article>
  );
}

/** A titled section with a linkable heading. Body text gets prose styles. */
export function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("prose-osseco scroll-mt-20 space-y-4", className)}
    >
      <h2 className="!mt-0">
        {id ? (
          <a href={`#${id}`} className="!text-foreground !no-underline">
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      {children}
    </section>
  );
}
