import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <div className="fade-in pt-32 pb-24">
      <Section>
        <div className="max-w-2xl">
          <div className="mono-font text-xs uppercase tracking-widest text-primary mb-4">
            404
          </div>
          <h1 className="display-font text-5xl md:text-6xl tracking-tight text-balance">
            This page is outside the attractor.
          </h1>
          <p className="mt-5 text-muted-foreground text-pretty">
            The route you requested does not exist. Return to the homepage or browse
            the selected work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
              data-testid="link-not-found-home"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <Link
              href="/work"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm hover:bg-muted transition-colors"
              data-testid="link-not-found-work"
            >
              Browse work
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

