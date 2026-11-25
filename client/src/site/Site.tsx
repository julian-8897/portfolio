import { useEffect } from "react";
import AsciiAi from "./AsciiAi";
import {
  astrophysics, featuredPaper, interests, person, researchBrief, simulationProjects,
  type Figure, type Link, type SimulationProject,
} from "@/content";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

function ProjectLinks({ links }: { links: Link[] }) {
  return (
    <ul className="s-links">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Ext href={href}>{label} <span aria-hidden="true">↗</span></Ext>
        </li>
      ))}
    </ul>
  );
}

function ProjectFigure({ figure, priority = false }: { figure: Figure; priority?: boolean }) {
  return (
    <figure className="s-figure">
      {figure.video ? (
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={figure.src}
          aria-label={figure.alt}
          width={figure.width}
          height={figure.height}
        >
          <source src={figure.video.webm} type="video/webm" />
          <source src={figure.video.mp4} type="video/mp4" />
          <a href={figure.video.mp4}>Download the animation</a>
        </video>
      ) : (
        <Ext href={figure.src}>
          <img
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            loading={priority ? "eager" : "lazy"}
          />
        </Ext>
      )}
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}

function SimulationEntry({ project }: { project: SimulationProject }) {
  return (
    <article className="s-simulation" id={project.id}>
      <p className="s-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="s-context">{project.context}</p>
      <ProjectFigure figure={project.figure} />
      <p>{project.summary}</p>
      <p>{project.finding}</p>
      <div className="s-simulation-links" id={project.id === "hybrid-closure" ? "notes" : undefined}>
        <ProjectLinks links={project.links} />
      </div>
    </article>
  );
}

// Shared by the React page and the static Artifact build.
export function pauseForReducedMotion() {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((video) => {
    video.removeAttribute("autoplay");
    video.pause();
    video.currentTime = 0;
  });
}

export default function Site({ showCv = true }: { showCv?: boolean }) {
  useEffect(() => {
    pauseForReducedMotion();
  }, []);

  return (
    <div className="site" id="top">
      <div className="s-wrap">
        <header className="s-masthead">
          <a className="s-name" href="#top">{person.name}</a>
          <nav className="s-nav" aria-label="Sections">
            <a href="#research">Research</a>
            <a href="#astrophysics">Astrophysics</a>
            <a href="#about">Contact</a>
            {showCv && <Ext href={person.links.cv}>CV <span aria-hidden="true">↗</span></Ext>}
          </nav>
        </header>
        <main>
          <section className="s-hero" aria-labelledby="role">
            <h1 id="role">
              <span className="s-hero-line"><AsciiAi />{" for Science "}</span>Research Engineer
            </h1>
            <p>{person.statement}</p>
            <div className="s-actions">
              <a className="s-button" href="#research">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="s-contact-link" href="#about">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </section>

          <section className="s-research" id="research" aria-label="Selected research">
            <article className="s-feature" id="llm-fno">
              <div className="s-feature-heading" id="agents">
                <p className="s-category">{featuredPaper.venue}</p>
                <h2>{featuredPaper.title}</h2>
              </div>
              <ProjectFigure figure={featuredPaper.figure} priority />
              <div className="s-feature-details">
                <p>{featuredPaper.summary}</p>
                <p>{featuredPaper.finding}</p>
                <p className="s-context">Equal contribution</p>
                <ProjectLinks links={featuredPaper.links} />
              </div>
            </article>

            <section className="s-section" id="differentiable" aria-labelledby="simulation-title">
              <h2 id="simulation-title">Learning with simulators</h2>
              <p className="s-intro">I use differentiable solvers to learn corrections to physical models and to infer parameters from observations.</p>
              <div className="s-simulation-grid">
                {simulationProjects.map((project) => <SimulationEntry key={project.id} project={project} />)}
              </div>
            </section>

            <article className="s-brief" id="research-brief-agent">
              <div id="software">
                <h3>{researchBrief.title}</h3>
                <p>{researchBrief.summary}</p>
              </div>
              <ProjectLinks links={researchBrief.links} />
            </article>
          </section>

          <section className="s-section s-astro" id="astrophysics" aria-labelledby="astro-title">
            <div className="s-astro-media">
              <ProjectFigure figure={astrophysics.figure} />
            </div>
            <div className="s-astro-copy">
              <p className="s-category">Astrophysics</p>
              <h2 id="astro-title">Supermassive black hole binaries</h2>
              <p>{astrophysics.intro}</p>
              <div id="earlier">
                <h3 id="publications">Selected astrophysics papers</h3>
                <ul className="s-papers">
                  {astrophysics.papers.map((paper) => (
                    <li key={paper.href}>
                      <Ext href={paper.href}>{paper.title} <span aria-hidden="true">↗</span></Ext>
                      {paper.line && <p>{paper.line}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="s-interests" id="about" aria-labelledby="contact-title">
            <h2 id="contact-title">Interests and contact</h2>
            <p>{interests.summary}</p>
            <p>{interests.invitation}</p>
            <a className="s-button" href={`mailto:${person.email}`}>{person.email} <span aria-hidden="true">↗</span></a>
          </section>
        </main>

        <footer className="s-footer">
          <a className="s-name" href="#top">{person.name}</a>
          <ProjectLinks links={[
            { label: "GitHub", href: person.links.github },
            { label: "Google Scholar", href: person.links.scholar },
            { label: "LinkedIn", href: person.links.linkedin },
          ]} />
        </footer>
      </div>
    </div>
  );
}
