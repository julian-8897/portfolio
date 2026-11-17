import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./report.css";
import { person, projects, publications, type Project } from "@/content";

// Candidate B, "Technical report": a margin column holds metadata (venue,
// role, links) and the main column carries prose and full-width numbered
// figures. Grotesk plus mono matches the visual language of AI4Science
// companies (Isomorphic, Periodic, PhysicsX); figure-first presentation follows
// Distill and the result GIFs on rubenohana.github.io.

const themes: Project["theme"][] = ["LLM agents for scientific ML", "Differentiable simulation", "ML for astrophysics"];

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

const figureNumber = new Map(projects.filter((p) => p.figure).map((p, i) => [p.id, i + 1]));

function Plate({ p }: { p: Project }) {
  const n = figureNumber.get(p.id);
  const square = p.figure && p.figure.aspect.startsWith("2010");
  return (
    <article className="cB-row cB-plate" id={p.id}>
      <aside className="cB-margin">
        <span>{p.year}</span>
        {p.venue && <span>{p.venue}</span>}
        {p.role && <span>{p.role}</span>}
        <span className="cB-mlinks">
          {p.links.map((l) => (
            <Ext key={l.href} href={l.href}>
              {l.label} ↗
            </Ext>
          ))}
        </span>
      </aside>
      <div className="cB-main">
        <h3>{p.title}</h3>
        <p>{p.body}</p>
        {p.figure && (
          <figure className={square ? "cB-fig cB-fig--narrow" : "cB-fig"}>
            <img src={p.figure.src} alt={p.figure.alt} loading="lazy" style={{ aspectRatio: p.figure.aspect }} />
            <figcaption>
              <b>Fig. {n}.</b> {p.figure.caption}
            </figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}

export default function ReportCandidate() {
  return (
    <div className="cB">
      <div className="cB-wrap">
        <header className="cB-row cB-head">
          <aside className="cB-margin">
            <span>{person.affiliation}</span>
            <span>Final-year PhD</span>
          </aside>
          <div className="cB-main">
            <h1>{person.name}</h1>
            <p className="cB-lede">
              Research engineer in AI for Science. I build machine learning methods and tools for scientific discovery,
              spanning LLM agents, differentiable simulation and neural surrogates for complex dynamical systems.
            </p>
            <nav className="cB-contact" aria-label="Contact">
              <a href={`mailto:${person.email}`}>{person.email}</a>
              <Ext href={person.links.github}>GitHub</Ext>
              <Ext href={person.links.scholar}>Scholar</Ext>
              <Ext href={person.links.linkedin}>LinkedIn</Ext>
              <Ext href={person.links.cv}>CV (PDF)</Ext>
            </nav>
          </div>
        </header>

        {themes.map((t, i) => (
          <section key={t} className="cB-section">
            <h2 className="cB-row">
              <span className="cB-margin cB-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cB-main">{t}</span>
            </h2>
            {projects
              .filter((p) => p.theme === t)
              .map((p) => (
                <Plate key={p.id} p={p} />
              ))}
          </section>
        ))}

        <section className="cB-section">
          <h2 className="cB-row">
            <span className="cB-margin cB-num">04</span>
            <span className="cB-main">Publications</span>
          </h2>
          {publications.map((p) => (
            <div key={p.href} className="cB-row cB-pub">
              <span className="cB-margin">{p.year}</span>
              <p className="cB-main">
                {p.authors.split("Chan J.").map((s, i, a) => (
                  <span key={i}>
                    {s}
                    {i < a.length - 1 && <b>Chan J.</b>}
                  </span>
                ))}{" "}
                <Ext href={p.href}>{p.title}</Ext>. <i>{p.venue}</i>
                {p.note && `, ${p.note}`}.
              </p>
            </div>
          ))}
        </section>

        <footer className="cB-row cB-foot">
          <span className="cB-margin">Tools</span>
          <p className="cB-main">{person.stack.join(" · ")}</p>
        </footer>
      </div>
    </div>
  );
}
