import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check } from "lucide-react";
import { Section, SectionLabel } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { useState } from "react";

const EMAIL = "julianchan8897@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fade-in pt-32 pb-24">
      <Section>
        <SectionLabel index="→" label="Contact" />
        <h1 className="display-font text-5xl md:text-7xl tracking-tight leading-[1.04] text-balance max-w-4xl">
          Open to industry roles in scientific ML, data science, and applied research.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
          The fastest way to reach me is email. I respond within a couple of days. I'm
          based in Guildford, UK and open to hybrid or remote roles in the UK / EU.
        </p>
      </Section>

      <Section className="mt-16 grid md:grid-cols-2 gap-5">
        <Reveal>
          <button
            onClick={copyEmail}
            className="group w-full text-left rounded-2xl border border-card-border bg-card p-8 hover-elevate transition-colors"
            data-testid="button-copy-email"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Email · primary
                </div>
                <div className="display-font text-2xl md:text-3xl tracking-tight break-all">
                  {EMAIL}
                </div>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {copied ? "Copied to clipboard." : "Click to copy"}
            </div>
          </button>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={80}>
            <a
              href={`mailto:${EMAIL}`}
              className="block rounded-2xl border border-card-border bg-card p-6 hover-elevate"
              data-testid="link-mailto"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="display-font text-lg">Open in your mail client</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>
          </Reveal>
          <Reveal delay={140}>
            <a
              href="https://linkedin.com/in/julian-chan-a86b2921b"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-card-border bg-card p-6 hover-elevate"
              data-testid="link-linkedin"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span className="display-font text-lg">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="https://github.com/julian-8897"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-card-border bg-card p-6 hover-elevate"
              data-testid="link-github"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <span className="display-font text-lg">github.com/julian-8897</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>
          </Reveal>
        </div>
      </Section>

      <Section className="mt-20">
        <Reveal>
          <div className="rounded-2xl border border-card-border bg-card p-8 md:p-12">
            <div className="mono-font text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
              What I'm looking for
            </div>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-base">
              <li className="flex gap-3">
                <span className="mono-font text-primary">→</span>
                <span>Scientific ML / SciML engineer roles</span>
              </li>
              <li className="flex gap-3">
                <span className="mono-font text-primary">→</span>
                <span>Applied / industry research scientist</span>
              </li>
              <li className="flex gap-3">
                <span className="mono-font text-primary">→</span>
                <span>Data science with a modelling lean</span>
              </li>
              <li className="flex gap-3">
                <span className="mono-font text-primary">→</span>
                <span>Quantitative research</span>
              </li>
              <li className="flex gap-3">
                <span className="mono-font text-primary">→</span>
                <span>End-to-end ML / ML platform</span>
              </li>
              <li className="flex gap-3">
                <span className="mono-font text-primary">→</span>
                <span>Research collaboration & consulting</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
