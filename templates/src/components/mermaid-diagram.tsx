import { useEffect, useId, useState } from "react";
import { useTheme } from "../lib/theme";

let renderSeq = 0;

/**
 * A Mermaid diagram that follows the active theme. Mermaid is loaded on first
 * use so pages without diagrams do not pay for it.
 */
export function MermaidDiagram({
  chart,
  title,
}: {
  chart: string;
  title: string;
}) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const theme = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid${reactId}${++renderSeq}`;
    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "neutral",
          securityLevel: "strict",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          flowchart: { useMaxWidth: true, htmlLabels: false },
          sequence: { useMaxWidth: false },
        });
        return mermaid.render(id, chart.trim());
      })
      .then(({ svg: next }) => {
        if (!cancelled) {
          setSvg(next);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setSvg("");
          setError(
            err instanceof Error ? err.message : "Failed to render diagram",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [chart, reactId, theme]);

  if (error) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground"
      >
        {error}
      </p>
    );
  }

  return (
    <figure className="not-prose space-y-2">
      <div
        role="img"
        aria-label={title}
        className="mermaid-diagram min-h-24 overflow-x-auto rounded-xl border border-border bg-card p-4 [&_svg]:mx-auto"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG from mermaid.render with securityLevel strict
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
      <figcaption className="text-xs text-muted-foreground">{title}</figcaption>
    </figure>
  );
}
