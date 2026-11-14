import { ArrowRight } from "lucide-react";
import { Eyebrow } from "../components/doc-page";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const FEATURES = [
  {
    title: "First point",
    body: "One or two sentences. Cards in a grid hold parallel ideas of similar length.",
  },
  {
    title: "Second point",
    body: "Keep card bodies in muted text; the title carries the scan.",
  },
  {
    title: "Third point",
    body: "Three across on desktop, stacked on mobile.",
  },
];

export function HomePage() {
  return (
    <>
      <section className="max-w-3xl space-y-5">
        <Eyebrow>What it is in a few words</Eyebrow>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          The one sentence that says why this project exists.
        </h1>
        <p className="text-lg leading-8 text-pretty text-muted-foreground">
          A short paragraph for who it is for and what it does for them.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>
            Primary action <ArrowRight />
          </Button>
          <Button variant="outline">Secondary</Button>
        </div>
      </section>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="text-base">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {feature.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
