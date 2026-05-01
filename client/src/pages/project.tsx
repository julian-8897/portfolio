import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Section, SectionLabel } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { featured } from "@/lib/projects";
import { ProjectHero } from "@/components/project-hero";

export default function ProjectPage() {
  const [, params] = useRoute<{ slug: string }>("/work/:slug");
  const slug = params?.slug;
  const project = featured.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 pb-24 fade-in">
        <Section>
          <h1 className="display-font text-3xl">Project not found</h1>
          <Link
            href="/work"
            className="mt-4 inline-flex items-center gap-2 text-primary"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all work
          </Link>
        </Section>
      </div>
    );
  }

  const idx = featured.findIndex((p) => p.slug === slug);
  const next = featured[(idx + 1) % featured.length];

  return (
    <div className="fade-in pt-28 pb-24">
      <Section className="mb-12">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10"
          data-testid="link-back-work"
        >
          <ArrowLeft className="w-4 h-4" /> All work
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-5 mono-font text-xs uppercase tracking-widest">
          <span className="text-primary">{project.year}</span>
          <span className="h-px w-8 bg-border" />
          <span className="text-muted-foreground">{project.status}</span>
        </div>

        <h1 className="display-font text-4xl md:text-6xl tracking-tight leading-[1.04] text-balance max-w-4xl">
          {project.title}
        </h1>
        <p className="mt-5 text-xl text-muted-foreground max-w-3xl text-pretty italic">
          {project.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border text-sm hover:bg-muted transition-colors"
              data-testid={`link-project-${project.slug}-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </Section>

      {/* Hero visualisation */}
      <Section className="mb-16">
        <div className="relative h-[44vh] md:h-[52vh] rounded-2xl border border-card-border bg-card overflow-hidden">
          <ProjectHero kind={project.hero} />
        </div>
      </Section>

      {/* Metrics strip */}
      <Section className="mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-card p-6 md:p-8">
              <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                {m.label}
              </div>
              <div className="display-font text-2xl md:text-3xl tracking-tight">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Body */}
      <Section className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-8 space-y-12">
          <Reveal>
            <SectionLabel index="01" label="The problem" />
            <p className="text-lg leading-relaxed text-pretty">{project.problem}</p>
          </Reveal>

          <Reveal>
            <SectionLabel index="02" label="Approach" />
            <ol className="space-y-5">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="mono-font text-xs text-primary mt-1.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed text-pretty">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <SectionLabel index="03" label="Results" />
            <ul className="space-y-3">
              {project.results.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span className="leading-relaxed text-pretty">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <SectionLabel index="04" label="Why it matters" />
            <p className="text-lg leading-relaxed text-pretty italic text-muted-foreground border-l-2 border-primary pl-5">
              {project.impact}
            </p>
          </Reveal>
        </div>

        <aside className="md:col-span-4 md:sticky md:top-24 md:self-start space-y-6">
          <div className="rounded-xl border border-card-border bg-card p-6">
            <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="mono-font text-xs px-2.5 py-1 rounded-full border border-border"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-6">
            <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Status
            </div>
            <div className="text-sm">{project.status}</div>
          </div>
        </aside>
      </Section>

      {/* Next */}
      <Section className="mt-24">
        <Link
          href={`/work/${next.slug}`}
          className="group block rounded-2xl border border-card-border bg-card p-8 md:p-12 hover-elevate relative overflow-hidden"
          data-testid="link-next-project"
        >
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="relative flex items-center justify-between gap-6 flex-wrap">
            <div>
              <div className="mono-font text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Next case study
              </div>
              <div className="display-font text-2xl md:text-3xl tracking-tight">
                {next.title}
              </div>
            </div>
            <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </Section>
    </div>
  );
}
