import { Link } from "wouter";
import { ArrowUpRight, Star } from "lucide-react";
import { Section, SectionLabel } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { featured, selected } from "@/lib/projects";

export default function Work() {
  return (
    <div className="fade-in pt-32 pb-24">
      <Section>
        <SectionLabel index="∮" label="Selected work" />
        <h1 className="display-font text-5xl md:text-6xl tracking-tight leading-[1.05] text-balance max-w-4xl">
          Four featured case studies and a small archive of related work.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-pretty">
          Each featured project has its own deep dive — problem, approach, results, and
          stack. The selected works below are smaller, mostly research-grade reference
          implementations.
        </p>
      </Section>

      <Section className="mt-20">
        <div className="text-xs mono-font uppercase tracking-widest text-muted-foreground mb-6">
          Featured · {featured.length}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link
                href={`/work/${p.slug}`}
                className="group block h-full rounded-2xl border border-card-border bg-card p-6 md:p-8 hover-elevate"
                data-testid={`card-featured-${p.slug}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="mono-font text-xs uppercase tracking-widest text-primary">
                    {p.year}
                  </span>
                  <span className="mono-font text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h2 className="display-font text-2xl tracking-tight leading-tight">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground italic">
                  {p.subtitle}
                </p>
                <p className="mt-5 text-sm text-muted-foreground text-pretty">
                  {p.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="mono-font text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground group-hover:text-primary transition-colors">
                  Read case study{" "}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="mt-24">
        <SectionLabel index="∂" label="Selected works" />
        <h2 className="display-font text-3xl md:text-4xl tracking-tight mb-10 text-balance max-w-2xl">
          Reference implementations and earlier work.
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {selected.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-card-border bg-card p-6 hover-elevate"
                data-testid={`card-selected-${i}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display-font text-lg font-medium tracking-tight">
                    {s.title}
                  </h3>
                  {s.stars !== undefined && (
                    <span className="inline-flex items-center gap-1 mono-font text-xs text-muted-foreground shrink-0">
                      <Star className="w-3 h-3" /> {s.stars}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">
                  {s.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.stack.map((t) => (
                    <span
                      key={t}
                      className="mono-font text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-1.5 group-hover:text-primary transition-colors">
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
