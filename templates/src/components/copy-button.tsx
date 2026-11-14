import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  function onCopy() {
    navigator.clipboard
      .writeText(value)
      .then(() => setCopied(true))
      // Clipboard can be blocked; the text is still selectable.
      .catch(() => {});
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7 text-muted-foreground", className)}
      onClick={onCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}
