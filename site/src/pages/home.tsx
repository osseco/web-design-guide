import { CodeBlock } from "@template/components/code-block";
import { Eyebrow } from "@template/components/doc-page";
import { Button } from "@template/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@template/components/ui/card";
import { ArrowRight, Bot, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { DOCS } from "../lib/docs";
import { GITHUB_BLOB, GITHUB_REPO } from "../lib/links";

const BASE = import.meta.env.BASE_URL;

const AGENT_LINKS = [
  {
    icon: <FileText className="size-4" />,
    title: "llms.txt",
    body: "Index of every doc as raw Markdown, in llmstxt.org format.",
    href: `${BASE}llms.txt`,
  },
  {
    icon: <Bot className="size-4" />,
    title: "AGENTS.md",
    body: "Hard rules and where each answer lives, for agents building or reviewing a frontend.",
    href: `${BASE}AGENTS.md`,
  },
  {
    icon: <Sparkles className="size-4" />,
    title: "Claude skill",
    body: "Install it in a project and agents apply the guide on their own.",
    href: `${GITHUB_BLOB}/skill/osseco-web-design/SKILL.md`,
  },
];

export function HomePage() {
  return (
    <>
      <section className="max-w-3xl space-y-5">
        <Eyebrow>osseco · web design guide</Eyebrow>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          One look for every osseco frontend.
        </h1>
        <p className="text-lg leading-8 text-pretty text-muted-foreground">
          What to use, how to use it, and the files to start from, for web app
          UIs and GitHub Pages sites alike. Written for people and for agents.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/docs/principles">
              Read the guide <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/components">Components</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tokens">Tokens</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`${GITHUB_REPO}/tree/main/templates`}>Templates</a>
          </Button>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Start a new frontend</h2>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Copy the templates, install, run. The starter already has the tokens,
          both themes, the components, the app shell and the Pages workflow.
        </p>
        <div className="max-w-3xl">
          <CodeBlock>{`git clone --depth 1 ${GITHUB_REPO}.git /tmp/osseco-guide
cp -R /tmp/osseco-guide/templates/. ./web/
cd web && sfw pnpm install && sfw pnpm dev`}</CodeBlock>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">The guide</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {DOCS.map((doc, i) => (
            <Link
              key={doc.slug}
              to={`/docs/${doc.slug}`}
              className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring"
            >
              <Card className="h-full transition-colors group-hover:border-primary/40">
                <CardHeader>
                  <CardTitle className="flex items-baseline gap-2 text-base">
                    <span className="font-mono text-xs text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {doc.summary}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">For agents</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {AGENT_LINKS.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="rounded-xl border border-border bg-card p-5 outline-none transition-colors hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring"
            >
              <div className="mb-3 flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary">
                {link.icon}
              </div>
              <h3 className="font-medium">{link.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {link.body}
              </p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
