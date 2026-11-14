import { Callout } from "@template/components/callout";
import { CodeBlock } from "@template/components/code-block";
import { CopyButton } from "@template/components/copy-button";
import { DocPage, Section } from "@template/components/doc-page";
import { MermaidDiagram } from "@template/components/mermaid-diagram";
import {
  STATUS_TONES,
  StatusBadge,
  type StatusTone,
} from "@template/components/status-badge";
import { ThemeToggle } from "@template/components/theme-toggle";
import { Badge } from "@template/components/ui/badge";
import { Button } from "@template/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@template/components/ui/card";
import { Modal } from "@template/components/ui/modal";
import { Segmented } from "@template/components/ui/segmented";
import { Switch } from "@template/components/ui/switch";
import { Tabs } from "@template/components/ui/tabs";
import { ArrowRight, RefreshCw, Trash2 } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground">
      {children}
    </div>
  );
}

const FLOW = `flowchart LR
  copy[Copy templates] --> edit[Set brand and pages]
  edit --> check[lint, typecheck, test]
  check --> ship[Pages deploy]`;

export function ComponentsPage() {
  const [tab, setTab] = useState<"diff" | "meta" | "log">("diff");
  const [mode, setMode] = useState<"manual" | "cli">("manual");
  const [on, setOn] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <DocPage
      eyebrow="Gallery"
      title="Components"
      lead="Every shared component from templates/src/components, running live. Switch the theme in the header to see both."
    >
      <Section id="button" title="Button">
        <Demo>
          <Button>
            Primary <ArrowRight />
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">
            <Trash2 /> Drop
          </Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </Demo>
        <Demo>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="ghost" aria-label="Refresh">
            <RefreshCw />
          </Button>
          <Button asChild variant="outline">
            <Link to="/tokens">asChild link</Link>
          </Button>
        </Demo>
      </Section>

      <Section id="card" title="Card">
        <div className="grid gap-4 md:grid-cols-3">
          {["One idea", "Another idea", "A third"].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Card bodies are short, in muted text. Titles carry the scan.
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="status-badge" title="StatusBadge and Badge">
        <Demo>
          {(Object.keys(STATUS_TONES) as StatusTone[]).map((tone) => (
            <StatusBadge key={tone} tone={tone} title={`The ${tone} tone`}>
              {tone}
            </StatusBadge>
          ))}
        </Demo>
        <Demo>
          <Badge>outline</Badge>
          <Badge variant="default">default</Badge>
        </Demo>
      </Section>

      <Section id="tabs" title="Tabs">
        <Demo>
          <div className="w-full">
            <Tabs
              label="Example view"
              value={tab}
              onChange={setTab}
              items={[
                {
                  value: "diff",
                  label: "Diff",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      Arrow keys, Home and End move between tabs.
                    </p>
                  ),
                },
                {
                  value: "meta",
                  label: "Metadata",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      Only the selected tab is in the tab order.
                    </p>
                  ),
                },
                {
                  value: "log",
                  label: "Log",
                  content: (
                    <p className="text-sm text-muted-foreground">
                      The panel itself is focusable.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section id="segmented-switch" title="Segmented and Switch">
        <Demo>
          <Segmented
            label="How to run each step"
            value={mode}
            onChange={setMode}
            options={[
              { value: "manual", label: "Manual (web UI)" },
              { value: "cli", label: "gh CLI" },
            ]}
          />
          <span className="inline-flex items-center gap-2 text-sm">
            <Switch id="show-finished" checked={on} onCheckedChange={setOn} />
            <label htmlFor="show-finished">Show finished</label>
          </span>
          <ThemeToggle />
        </Demo>
      </Section>

      <Section id="modal" title="Modal">
        <Demo>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Open modal
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Patch 0042"
            actions={<CopyButton value="0042" label="Copy patch id" />}
          >
            <p className="text-sm leading-6 text-muted-foreground">
              A native dialog: focus is trapped, Escape closes it, the backdrop
              closes it, and the page behind does not scroll.
            </p>
          </Modal>
        </Demo>
      </Section>

      <Section id="callout" title="Callout">
        <Callout tone="info">Information that helps but is optional.</Callout>
        <Callout tone="success" title="Done">
          Something worked.
        </Callout>
        <Callout tone="warning">
          No gh command for this step. Use the web UI.
        </Callout>
        <Callout tone="danger" title="Failed">
          What went wrong, and what to try next.
        </Callout>
      </Section>

      <Section id="code" title="CodeBlock and CopyButton">
        <CodeBlock>
          {"sfw pnpm install --frozen-lockfile\nsfw pnpm dev"}
        </CodeBlock>
        <Demo>
          <code className="font-mono text-sm">a1b2c3d</code>
          <CopyButton value="a1b2c3d" label="Copy commit hash" />
        </Demo>
      </Section>

      <Section id="mermaid" title="MermaidDiagram">
        <MermaidDiagram chart={FLOW} title="From template to deployed site" />
      </Section>
    </DocPage>
  );
}
