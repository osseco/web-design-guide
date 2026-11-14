import { CopyButton } from "./copy-button";

/** A block of code or shell commands, with a copy button unless `copy={false}`. */
export function CodeBlock({
  children,
  copy = true,
}: {
  children: string;
  copy?: boolean;
}) {
  const text = children.trim();
  return (
    <div className="not-prose relative">
      <pre className="overflow-x-auto rounded-lg bg-code p-4 pr-12 font-mono text-xs leading-6 text-code-foreground">
        {text}
      </pre>
      {copy ? (
        <CopyButton value={text} className="absolute top-2 right-2" />
      ) : null}
    </div>
  );
}
