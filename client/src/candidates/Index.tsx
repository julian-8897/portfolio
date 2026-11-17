import "@fontsource-variable/source-serif-4";
import "./index.css";
import { person, projects, publications, type Project } from "@/content";

// Candidate A, "Index": single narrow column, serif reading text, one small
// result figure per entry. Modelled on leonchlon.com, tm157.github.io and the
// greydanus.github.io post list.

const themes: Project["theme"][] = ["LLM agents for scientific ML", "Differentiable simulation", "ML for astrophysics"];

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

function Authors({ text }: { text: string }) {
  const parts = text.split("Chan J.");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <b>Chan J.</b>}
        </span>
      ))}
    </>
  );
}

function Entry({ p }: { p: Project }) {
  const meta = [p.venue, p.role].filter(Boolean).join(" · ");
  return (
    <article className="cA-entry">
      <div>
        <h3>
          <Ext href={p.links[0].href}>{p.title}</Ext>
        </h3>
        {meta && <p className="cA-meta">{meta}</p>}
        <p>{p.body}</p>
        <p className="cA-links">
          {p.links.map((l) => (
            <Ext key={l.href} href={l.href}>
              {l.label}
            </Ext>
          ))}
        </p>
      </div>
      {p.figure && (
        <a className="cA-thumb" href={p.figure.src} target="_blank" rel="noopener noreferrer" title={p.figure.caption}>
          <img src={p.figure.src} alt={p.figure.alt} loading="lazy" style={{ aspectRatio: p.figure.aspect }} />
        </a>
      )}
    </article>
  );
}

export default function IndexCandidate() {
  return (
    <div className="cA">
      <main className="cA-col">
        <header className="cA-head">
          <h1>{person.name}</h1>
          <p className="cA-role">
            Research engineer in AI for Science · PhD researcher, {person.affiliation}
          </p>
          <p>
            I build machine learning methods and tools for scientific discovery, spanning LLM agents, differentiable
            simulation and neural surrogates for complex dynamical systems. My PhD uses N-body simulations of galaxy
            mergers, which is where I learnt to judge a learned model against the simulator it replaces.
          </p>
          <nav className="cA-links" aria-label="Contact">
            <a href={`mailto:${person.email}`}>Email</a>
            <Ext href={person.links.github}>GitHub</Ext>
            <Ext href={person.links.scholar}>Scholar</Ext>
            <Ext href={person.links.linkedin}>LinkedIn</Ext>
            <Ext href={person.links.cv}>CV</Ext>
          </nav>
        </header>

        {themes.map((t) => (
          <section key={t} className="cA-section">
            <h2>{t}</h2>
            {projects
              .filter((p) => p.theme === t)
              .map((p) => (
                <Entry key={p.id} p={p} />
              ))}
          </section>
        ))}

        <section className="cA-section">
          <h2>Publications</h2>
          <ol className="cA-pubs">
            {publications.map((p) => (
              <li key={p.href}>
                <Authors text={p.authors} /> ({p.year}). <Ext href={p.href}>{p.title}</Ext>. <i>{p.venue}</i>
                {p.note && <span className="cA-note"> · {p.note}</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className="cA-section">
          <h2>Tools</h2>
          <p>{person.stack.join(", ")}.</p>
        </section>

        <footer className="cA-foot">
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <span>{person.affiliation}</span>
        </footer>
      </main>
    </div>
  );
}
