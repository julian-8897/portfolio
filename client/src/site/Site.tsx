import { notes, openProblems, person, publications, software, themes, type Project } from "@/content";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

const figureNumber = new Map(
  themes.flatMap((t) => t.projects).filter((p) => p.figure).map((p, i) => [p.id, i + 1]),
);

function ProjectEntry({ p }: { p: Project }) {
  const n = figureNumber.get(p.id);
  const fig = p.figure;
  return (
    <article className="s-row s-project" id={p.id}>
      <aside className="s-margin">
        <span>{p.year}</span>
        {p.venue && <span>{p.venue}</span>}
        {p.role && <span>{p.role}</span>}
        <span className="s-mlinks">
          {p.links.map((l) => (
            <Ext key={l.href} href={l.href}>
              {l.label} ↗
            </Ext>
          ))}
        </span>
      </aside>
      <div className="s-main">
        <h4>{p.title}</h4>
        <p>
          {p.question} {p.approach}
        </p>
        <p>
          {p.finding} {p.implication}
        </p>
        {fig && (
          <figure className={`s-fig${fig.width ? ` s-fig--${fig.width}` : ""}`}>
            <img src={fig.src} alt={fig.alt} loading="lazy" style={{ aspectRatio: fig.aspect }} />
            <figcaption>
              <b>Fig. {n}.</b> {fig.caption}
            </figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="s-section" id={id}>
      <div className="s-row">
        <h2>{title}</h2>
        {intro ? <p className="s-main s-section-intro">{intro}</p> : <span />}
      </div>
      {children}
    </section>
  );
}

function Authors({ text }: { text: string }) {
  const parts = text.split("Chan J.");
  return (
    <>
      {parts.map((s, i) => (
        <span key={i}>
          {s}
          {i < parts.length - 1 && <b>Chan J.</b>}
        </span>
      ))}
    </>
  );
}

export default function Site({ showCv = true }: { showCv?: boolean }) {
  return (
    <div className="site">
      <div className="s-wrap">
        <header className="s-row s-head">
          <aside className="s-margin">
            <span>University of Surrey</span>
            <span>Final-year PhD</span>
          </aside>
          <div className="s-main">
            <h1>{person.name}</h1>
            <p className="s-statement">{person.statement}</p>
            <div className="s-contact">
              <span className="s-email">{person.email}</span>
              <Ext href={person.links.github}>GitHub</Ext>
              <Ext href={person.links.scholar}>Scholar</Ext>
              <Ext href={person.links.linkedin}>LinkedIn</Ext>
            </div>
            <nav className="s-nav" aria-label="Sections">
              <a href="#research">Research</a>
              <a href="#notes">Notes</a>
              <a href="#software">Software</a>
              <a href="#publications">Publications</a>
              <a href="#open-problems">Open problems</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </header>

        <section className="s-section" id="research">
          <div className="s-row">
            <h2>Research</h2>
            <span />
          </div>
          {themes.map((t) => (
            <div key={t.id} className="s-theme" id={t.id}>
              <div className="s-row">
                <span />
                <div className="s-main">
                  <h3>{t.title}</h3>
                  <p className="s-theme-blurb">{t.blurb}</p>
                </div>
              </div>
              {t.projects.map((p) => (
                <ProjectEntry key={p.id} p={p} />
              ))}
            </div>
          ))}
        </section>

        <Section id="notes" title="Notes">
          <div className="s-list">
            {notes.map((n) => (
              <div key={n.href} className="s-row">
                <span className="s-margin">{n.date}</span>
                <div className="s-main">
                  <p>
                    <Ext href={n.href}>{n.title}</Ext>
                  </p>
                  <p className="s-sub">{n.line}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="software" title="Software">
          <div className="s-list">
            {software.map((s) => (
              <div key={s.repo} className="s-row">
                <span className="s-margin" />
                <div className="s-main">
                  <p className="s-repo">
                    <Ext href={`${person.links.github}/${s.repo}`}>{s.repo}</Ext>
                  </p>
                  <p className="s-sub">{s.line}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="publications" title="Publications">
          <div className="s-list">
            {publications.map((p) => (
              <div key={p.href} className="s-row s-pub">
                <span className="s-margin">{p.year}</span>
                <p className="s-main">
                  <Authors text={p.authors} /> <Ext href={p.href}>{p.title}</Ext>. <i>{p.venue}</i>
                  {p.note && `, ${p.note}`}.
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="open-problems" title="Open problems" intro="Questions I would like to work on with others. If one overlaps with yours, email me.">
          <div className="s-row">
            <span />
            <ol className="s-main s-problems">
              {openProblems.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="about" title="About">
          <div className="s-row s-about">
            <span />
            <div className="s-main">
              {person.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
              <p className="s-stack">{person.stack.join(" · ")}</p>
              {showCv && (
                <p>
                  <Ext href={person.links.cv}>CV (PDF)</Ext>
                </p>
              )}
            </div>
          </div>
        </Section>

        <footer className="s-row s-foot">
          <span />
          <p className="s-main">
            {person.name} · <span className="s-email">{person.email}</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
