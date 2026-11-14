import { useMemo } from "react";
import { renderMarkdown } from "../lib/markdown";
import { cn } from "../lib/utils";

/**
 * Markdown that ships with the project, rendered with prose styles. Never
 * pass user input: the HTML is not sanitized.
 */
export function MarkdownContent({
  markdown,
  rewriteHref,
  className,
}: {
  markdown: string;
  rewriteHref?: (href: string) => string;
  className?: string;
}) {
  const html = useMemo(
    () => renderMarkdown(markdown, rewriteHref),
    [markdown, rewriteHref],
  );
  return (
    <div
      className={cn("prose-osseco", className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown that ships with this repository, never user input
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
