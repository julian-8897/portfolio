import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionLabel } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { skills } from "@/lib/projects";

const timeline = [
  {
    year: "2023 – Present",
    title: "PhD, Astrophysics & Machine Learning",
    place: "University of Surrey",
    body: "Scientific machine learning for n-body simulations and dynamical systems. Neural ODEs, neural operators, physics-informed networks. First-author MNRAS paper.",
  },
  {
    year: "2022 – 2023",
    title: "Online Data Analyst",
    place: "TELUS International",
    body: "Evaluated and labelled web content against rubric-driven quality criteria — contributing training and evaluation data for downstream ML systems.",
  },
  {
    year: "2021 – 2022",
    title: "MSc Computer Science · Distinction",
    place: "Swansea University",
    body: "Foundations in algorithms, software engineering, and machine learning. Top-of-class dissertation work.",
  },
  {
    year: "2018 & 2019",
    title: "Research Intern, Particle Physics Group",
    place: "University of Birmingham",
    body: "Particle simulations of spherical gas detectors in C++ / CERN ROOT. Sensitivity and calibration studies for the NEWS-G dark matter collaboration.",
  },
  {
    year: "2016 – 2020",
    title: "MSci Physics with Particle Physics & Cosmology",
    place: "University of Birmingham",
    body: "Integrated master's covering theoretical physics, cosmology, and computational methods.",
  },
];

export default function About() {
  return (
    <div className="fade-in pt-32 pb-24">
      <Section>
        <SectionLabel index="∫" label="About" />
        <h1 className="display-font text-5xl md:text-6xl tracking-tight leading-[1.05] text-balance max-w-4xl">
          Physics first, then learning systems — and the engineering to ship them.
        </h1>
      </Section>

      <Section className="mt-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7 space-y-5 text-lg leading-relaxed text-pretty">
          <Reveal>
            <p>
              I'm Julian — a PhD researcher at the University of Surrey working at the
              intersection of scientific machine learning and dynamical systems. My
              research builds neural surrogates for physics simulations: models that
              learn the underlying dynamics of a system, not just discrete step maps, so
              they generalise across parameter regimes and stay accurate under sparse
              observations.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p>
              The pattern across my work — neural ODEs for galaxy mergers, parametric
              flow-matched operators for chaotic attractors, backend-agnostic PINNs — is
              the same: take a physical system that's expensive to simulate or hard to
              invert, and replace the bottleneck with a learning component that respects
              the structure of the underlying problem.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p>
              I'm now exploring industry roles in scientific ML, applied research,
              quantitative research, and end-to-end ML engineering — places where
              physics-aware modelling, uncertainty quantification, and production
              engineering all matter at once.
            </p>
          </Reveal>
        </div>

        <aside className="md:col-span-5 md:sticky md:top-24 md:self-start">
          <Reveal>
            <div className="rounded-2xl border border-card-border bg-card p-6 space-y-5">
              <div>
                <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Based in
                </div>
                <div className="text-sm">Guildford, UK · open to hybrid / remote</div>
              </div>
              <div>
                <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Languages
                </div>
                <div className="text-sm">English · Português</div>
              </div>
              <div>
                <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Currently
                </div>
                <div className="text-sm">
                  Wrapping up PhD year 3, ongoing collaboration with Pasteur Labs.
                </div>
              </div>
              <div>
                <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Curious about
                </div>
                <div className="text-sm">
                  Foundation models for physics · uncertainty quantification · neural
                  operators in production · quant research.
                </div>
              </div>
            </div>
          </Reveal>
        </aside>
      </Section>

      {/* Timeline */}
      <Section className="mt-24">
        <SectionLabel index="∂t" label="Trajectory" />
        <h2 className="display-font text-3xl md:text-4xl tracking-tight mb-12 text-balance">
          The path so far.
        </h2>
        <ol className="border-l border-border ml-2">
          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 50}>
              <li className="relative pl-8 pb-12 last:pb-0">
                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                <div className="mono-font text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  {t.year}
                </div>
                <h3 className="display-font text-xl md:text-2xl tracking-tight">
                  {t.title}
                </h3>
                <div className="text-sm text-primary mt-1">{t.place}</div>
                <p className="mt-3 text-muted-foreground text-pretty max-w-2xl">
                  {t.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Skills */}
      <Section className="mt-16">
        <SectionLabel index="Σ" label="Toolkit" />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
          {Object.entries(skills).map(([cat, items]) => (
            <Reveal key={cat}>
              <div>
                <div className="text-xs mono-font uppercase tracking-widest text-muted-foreground mb-3">
                  {cat}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="mono-font text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:border-primary transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Beyond work */}
      <Section className="mt-24">
        <SectionLabel index="ε" label="Beyond work" />
        <Reveal>
          <p className="text-lg max-w-2xl text-muted-foreground text-pretty leading-relaxed">
            Outside of research, I lift heavy things in the gym, road-trip through
            Portugal, and probably play a little too much Deadlock and Remnant 2. I read
            manga (One Piece, mostly) and drink too much matcha.
          </p>
        </Reveal>
      </Section>

      <Section className="mt-24">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 text-lg display-font tracking-tight hover:text-primary transition-colors"
          data-testid="link-about-contact"
        >
          Let's talk about a role
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Section>
    </div>
  );
}
