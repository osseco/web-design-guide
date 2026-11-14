import { DocPage } from "@template/components/doc-page";
import { MarkdownContent } from "@template/components/markdown-content";
import { cn } from "@template/lib/utils";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import type * as React from "react";
import { useCallback } from "react";
import {
  Link,
  Navigate,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { DOCS, getDoc, rewriteDocHref } from "../lib/docs";
import { GITHUB_BLOB } from "../lib/links";

const BASE = import.meta.env.BASE_URL;

function DocNav({ current }: { current: string }) {
  return (
    <ol className="space-y-0.5">
      {DOCS.map((doc) => (
        <li key={doc.slug}>
          <NavLink
            to={`/docs/${doc.slug}`}
            className={cn(
              "block rounded-md px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
              doc.slug === current
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {doc.title}
          </NavLink>
        </li>
      ))}
    </ol>
  );
}

export function DocRoute() {
  const { slug } = useParams();
  const doc = getDoc(slug);
  const navigate = useNavigate();
  const rewrite = useCallback((href: string) => rewriteDocHref(href, BASE), []);

  // Links rendered from Markdown are plain <a>; keep in-site ones in the router.
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        anchor.origin !== window.location.origin ||
        !anchor.pathname.startsWith(`${BASE}docs/`)
      ) {
        return;
      }
      event.preventDefault();
      navigate(`${anchor.pathname.slice(BASE.length - 1)}${anchor.hash}`);
    },
    [navigate],
  );

  if (!doc) return <Navigate to="/docs/principles" replace />;

  const index = DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = DOCS[index - 1];
  const next = DOCS[index + 1];

  return (
    <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-10">
      <aside className="mb-8 lg:mb-0">
        <nav aria-label="Guide" className="hidden lg:sticky lg:top-20 lg:block">
          <DocNav current={doc.slug} />
        </nav>
        <details className="rounded-lg border border-border px-4 py-2 lg:hidden">
          <summary className="cursor-pointer text-sm text-foreground">
            All pages
          </summary>
          <nav aria-label="Guide" className="mt-2">
            <DocNav current={doc.slug} />
          </nav>
        </details>
      </aside>
      <DocPage
        eyebrow={`Guide · ${String(index + 1).padStart(2, "0")}`}
        title={doc.title}
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: delegates clicks on the links inside to the router */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: the links inside stay keyboard-operable on their own */}
        <div onClick={onClick}>
          <MarkdownContent markdown={doc.markdown} rewriteHref={rewrite} />
        </div>
        <footer className="flex flex-wrap items-center gap-3 border-t border-border pt-6 text-sm">
          {prev ? (
            <Link
              to={`/docs/${prev.slug}`}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> {prev.title}
            </Link>
          ) : null}
          <a
            href={`${BASE}docs/${doc.slug}.md`}
            className="mx-auto inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <FileText className="size-4" /> Raw Markdown
          </a>
          <a
            href={`${GITHUB_BLOB}/docs/${doc.slug}.md`}
            className="text-muted-foreground hover:text-foreground"
          >
            Edit on GitHub
          </a>
          {next ? (
            <Link
              to={`/docs/${next.slug}`}
              className="ms-auto inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              {next.title} <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </footer>
      </DocPage>
    </div>
  );
}
