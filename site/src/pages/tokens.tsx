import { DocPage, Section } from "@template/components/doc-page";
import { useTheme } from "@template/lib/theme";
import { useEffect, useState } from "react";

const GROUPS: { title: string; id: string; tokens: string[] }[] = [
  {
    title: "Surface and text",
    id: "surface",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "muted",
      "muted-foreground",
      "secondary",
      "accent",
      "border",
      "input",
      "code",
      "code-foreground",
    ],
  },
  {
    title: "Brand and focus",
    id: "brand",
    tokens: ["primary", "primary-foreground", "ring"],
  },
  {
    title: "Feedback",
    id: "feedback",
    tokens: [
      "info",
      "info-foreground",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
      "destructive",
      "destructive-foreground",
    ],
  },
];

/** Reads the live CSS variables so the values always match index.css. */
function useTokenValues(names: string[]) {
  const theme = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    void theme;
    const style = getComputedStyle(document.documentElement);
    setValues(
      Object.fromEntries(
        names.map((name) => [name, style.getPropertyValue(`--${name}`).trim()]),
      ),
    );
  }, [names, theme]);
  return { theme, values };
}

const ALL = GROUPS.flatMap((group) => group.tokens);

export function TokensPage() {
  const { theme, values } = useTokenValues(ALL);
  return (
    <DocPage
      eyebrow="Reference"
      title="Tokens"
      lead={`The live token values for the ${theme} theme, read from the page. Switch the theme in the header to compare.`}
    >
      {GROUPS.map((group) => (
        <Section key={group.id} id={group.id} title={group.title}>
          <ul className="not-prose grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.tokens.map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span
                  aria-hidden
                  className="size-10 shrink-0 rounded-lg border border-border"
                  style={{ background: `var(--${name})` }}
                />
                <span className="min-w-0">
                  <span className="block font-mono text-sm text-foreground">
                    {name}
                  </span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">
                    {values[name] || "…"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <Section id="radius" title="Radius">
        <div className="flex flex-wrap gap-4">
          {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl"].map((r) => (
            <div key={r} className="space-y-2 text-center">
              <div
                className={`size-16 border border-primary/40 bg-primary/15 ${r}`}
              />
              <code>{r}</code>
            </div>
          ))}
        </div>
      </Section>
    </DocPage>
  );
}
