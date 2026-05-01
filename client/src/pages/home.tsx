import { Link } from "wouter";
import { ArrowUpRight, FileText, Github, Mail } from "lucide-react";
import { ProjectHero } from "@/components/project-hero";
import { Reveal } from "@/components/reveal";
import { Section, SectionLabel } from "@/components/section";
import { featured, recognition, skills } from "@/lib/projects";

const focusAreas = [
  "Scientific machine learning",
  "Neural ODEs and operators",
  "Physics-informed modelling",
  "End-to-end ML products",
];

export default function Home() {
  return (
    <div className="fade-in">
      <Section full className="relative min-h-screen overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.18),transparent_32%),radial-gradient(circle_at_80%_0%,hsl(27_87%_55%/0.14),transparent_28%),linear-gradient(to_bottom,hsl(var(--background)/0.25),hsl(var(--background))_82%)]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20 min-h-screen grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mono-font text-xs uppercase tracking-[0.28em] text-primary mb-5">
                PhD researcher · Scientific ML · Applied research
              </div>
              <h1 className="display-font text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.96] text-balance">
                Building learning systems for physical dynamics.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-7 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl text-pretty">
                I’m Julian Chan, a physics-trained ML researcher working on neural
                surrogates, neural operators, and production-minded tools for scientific
                discovery.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/work"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  data-testid="link-home-work"
                >
                  View selected work <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-5 text-sm font-medium hover:bg-muted transition-colors"
                  data-testid="link-home-contact"
                >
                  Contact me <Mail className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="relative h-[430px] rounded-[2rem] border border-card-border bg-card overflow-hidden shadow-lg">
              <ProjectHero kind="lorenz" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background via-background/75 to-transparent">
                <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground">
                  Live Lorenz integration
                </div>
                <div className="display-font mt-2 text-2xl tracking-tight">
                  Dynamics as interface.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="py-20">
        <div className="grid md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {focusAreas.map((area, i) => (
            <Reveal key={area} delay={i * 50}>
              <div className="h-full bg-card p-6">
                <div className="mono-font text-[11px] uppercase tracking-widest text-primary mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="display-font text-xl tracking-tight">{area}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <SectionLabel index="01" label="Featured work" />
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <h2 className="display-font text-4xl md:text-5xl tracking-tight max-w-3xl text-balance">
            Case studies at the boundary of physics, ML, and useful software.
          </h2>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            data-testid="link-home-all-work"
          >
            All work <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {featured.slice(0, 4).map((project, i) => (
            <Reveal key={project.slug} delay={i * 70}>
              <Link
                href={`/work/${project.slug}`}
                className="group block h-full rounded-2xl border border-card-border bg-card p-6 md:p-8 hover-elevate"
                data-testid={`link-home-project-${project.slug}`}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="mono-font text-xs uppercase tracking-widest text-primary">
                    {project.year}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="display-font text-2xl md:text-3xl tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground italic">
                  {project.subtitle}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {project.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="02" label="Recognition" />
          <h2 className="display-font text-4xl tracking-tight text-balance">
            Research outputs, competitions, and shipped tools.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-4">
          {recognition.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-6 rounded-xl border border-card-border bg-card p-5 hover-elevate"
                data-testid={`link-recognition-${i}`}
              >
                <div>
                  <div className="mono-font text-[11px] uppercase tracking-widest text-primary">
                    {item.type} · {item.year}
                  </div>
                  <div className="display-font mt-2 text-xl tracking-tight">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.venue}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <div className="rounded-3xl border border-card-border bg-card p-8 md:p-12 overflow-hidden relative">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="relative grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <SectionLabel index="03" label="Toolkit" />
              <h2 className="display-font text-4xl tracking-tight text-balance">
                Practical tools for research-grade ML systems.
              </h2>
            </div>
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.slice(0, 8).map((skill) => (
                      <span
                        key={skill}
                        className="mono-font text-xs px-2.5 py-1 rounded-full border border-border bg-background/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="mono-font text-xs uppercase tracking-widest text-primary mb-3">
                Currently open
              </div>
              <h2 className="display-font text-4xl md:text-5xl tracking-tight text-balance">
                Scientific ML, data science, applied research, and quant roles.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm hover:bg-muted transition-colors"
                data-testid="link-home-about"
              >
                About <FileText className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/julian-8897"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm hover:bg-muted transition-colors"
                data-testid="link-home-github"
              >
                GitHub <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

