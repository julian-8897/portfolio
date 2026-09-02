import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import "./design-concepts.css";

const links = {
  hybrid: "https://github.com/julian-8897/tesseract-hybrid-closure",
  hybridDemo: "https://julian-8897.github.io/tesseract-hybrid-closure/",
  burgers: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers",
  agent: "https://github.com/julian-8897/research-brief-agent",
  neuralOde: "https://doi.org/10.1093/mnras/stag135",
  perturber: "https://doi.org/10.1093/mnras/stag1374",
  convergence: "https://doi.org/10.1093/mnras/stag026",
  github: "https://github.com/julian-8897",
  scholar: "https://scholar.google.com/citations?hl=en&user=9YnAVL4AAAAJ",
};

const media = {
  hybrid: "/concepts/hybrid-rollout.png",
  burgers: "/concepts/inverse-burgers-architecture.png",
  neuralOde: "/concepts/neural-ode-timescales.svg",
};

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function ConceptSwitcher({ active }: { active: string }) {
  const concepts = [
    ["editorial", "A  Scientific modernist"],
    ["dossier", "B  Instrument panel"],
    ["research", "C  Research record"],
  ];

  return (
    <nav className="taste-switcher" aria-label="Design candidates">
      <span>taste-skill candidates</span>
      <div>
        {concepts.map(([slug, label]) => (
          <Link key={slug} href={`/concepts/${slug}`} className={active === slug ? "is-active" : ""}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Outbound({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <ExternalLink href={href} className={`outbound ${className}`}>
      {children}<ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
    </ExternalLink>
  );
}

function ModernistConcept() {
  return (
    <div className="modernist">
      <ConceptSwitcher active="editorial" />
      <header className="mo-nav mo-wrap">
        <a href="#mo-top" className="mo-mark">Julian Chan</a>
        <nav aria-label="Primary navigation"><a href="#mo-work">Work</a><a href="#mo-research">Research</a><a href="#mo-profile">Profile</a></nav>
        <a href="mailto:julianchan8897@gmail.com" className="mo-email">Email</a>
      </header>

      <main id="mo-top">
        <section className="mo-hero mo-wrap">
          <div className="mo-hero-copy">
            <span className="mo-role">Research engineer in AI for science</span>
            <h1>Machine learning systems for scientific problems.</h1>
            <p>Differentiable simulation, inverse problems and agents for research, each taken from question to tested system. Finishing a PhD in astrophysics at the University of Surrey.</p>
            <div className="mo-actions"><a href="#mo-work">View systems<ArrowRight size={16} /></a><ExternalLink href={links.github}><Github size={16} />GitHub</ExternalLink></div>
          </div>
          <figure className="mo-hero-figure">
            <img src={media.hybrid} alt="Held-out turbulence rollout comparing the hybrid closure with DNS and the mechanistic solver" />
            <figcaption>Hybrid turbulence closure, held-out 500-step rollout</figcaption>
          </figure>
        </section>

        <section className="mo-proof mo-wrap" aria-label="Selected evidence">
          <div><strong>2</strong><span>first-author MNRAS papers</span></div>
          <div><strong>71.7%</strong><span>lower 500-step error than the solver alone</span></div>
          <div><strong>JAX + PyTorch</strong><span>reverse-mode gradients across served components</span></div>
        </section>

        <section className="mo-work mo-wrap" id="mo-work">
          <h2>Selected systems</h2>
          <article className="mo-lead-project">
            <div className="mo-lead-copy">
              <span>Scientific machine learning</span>
              <h3>Differentiable closure for 2D turbulence</h3>
              <p>A PyTorch CNN trained through a JAX spectral solver. The evaluation uses fixed splits, matched baselines and 32 locked test trajectories.</p>
              <dl><div><dt>500</dt><dd>rollout steps</dd></div><div><dt>32 / 32</dt><dd>paired test wins</dd></div><div><dt>822,977</dt><dd>differentiated parameters</dd></div></dl>
              <div className="mo-project-links"><Outbound href={links.hybridDemo}>Walkthrough</Outbound><Outbound href={links.hybrid}>Repository</Outbound></div>
            </div>
            <img src={media.hybrid} alt="Vorticity fields from the DNS reference, hybrid model and mechanistic solver" />
          </article>

          <div className="mo-project-pair">
            <article className="mo-burgers">
              <img src={media.burgers} alt="Architecture of the inverse Burgers solver, PINN and posterior components" />
              <div><span>Inverse problems</span><h3>One PDE. Three inference strategies.</h3><p>Solver adjoints, cross-framework PINNs and flow-matching posterior estimation behind typed, swappable Tesseract components.</p><Outbound href={links.burgers}>Explore inverse Burgers</Outbound></div>
            </article>
            <article className="mo-agent">
              <span>AI engineering</span>
              <h3>A research agent that must read its evidence.</h3>
              <p>Semantic retrieval, full-text paper reading and deterministic citation checks, served through a streaming FastAPI system with tracing and cost controls.</p>
              <div className="mo-agent-path" aria-label="Research agent evidence path"><b>Retrieve</b><i></i><b>Read</b><i></i><b>Verify</b><i></i><b>Report</b></div>
              <div className="mo-agent-facts"><span>184 tests</span><span>7-case quality gate</span><span>Anthropic and OpenAI-compatible</span></div>
              <Outbound href={links.agent}>Inspect the agent</Outbound>
            </article>
          </div>
        </section>

        <section className="mo-research mo-wrap" id="mo-research">
          <h2>Published research</h2>
          <article className="mo-paper-feature">
            <div className="mo-paper-copy"><span>First author, MNRAS 546(3)</span><h3>Continuous-time modelling of black hole binary evolution with neural ODEs</h3><p>A parameter-conditioned surrogate for N-body galaxy-merger simulations, tested on held-out trajectories and a partly unseen high-resolution case.</p><Outbound href={links.neuralOde}>Read the paper</Outbound></div>
            <figure><img src={media.neuralOde} alt="Black hole binary orbital evolution predicted from simulation data and the neural ODE surrogate" /><figcaption>Predicted orbital evolution and merger timescales</figcaption></figure>
          </article>
          <div className="mo-paper-pair">
            <Outbound href={links.perturber} className="mo-paper-link"><span>First author, MNRAS 550(4)</span><strong>Perturber-driven dynamics of supermassive black hole binaries in galaxy mergers</strong></Outbound>
            <Outbound href={links.convergence} className="mo-paper-link"><span>MNRAS 546(1), 2026</span><strong>Converging on the eccentricity of massive black hole binaries in Galactic mergers</strong></Outbound>
          </div>
        </section>

        <section className="mo-profile mo-wrap" id="mo-profile">
          <h2>Research and engineering.</h2>
          <div><p>I work across the full path from scientific question to evaluated system: simulation, modelling, implementation, validation and communication.</p><ul><li>Differentiable simulation and neural ODEs</li><li>Inverse problems and simulation-based inference</li><li>Agent systems, retrieval and evaluation</li><li>Python, JAX, PyTorch, FastAPI and Docker</li></ul></div>
        </section>
      </main>
      <footer className="mo-footer mo-wrap"><strong>Julian Chan</strong><span>Open to AI for science and AI engineering roles</span><a href="mailto:julianchan8897@gmail.com"><Mail size={15} />Email</a></footer>
    </div>
  );
}

function InstrumentConcept() {
  return (
    <div className="instrument">
      <ConceptSwitcher active="dossier" />
      <header className="in-nav in-wrap"><a href="#in-top" className="in-mark">JC</a><nav><a href="#in-work">Systems</a><a href="#in-papers">Papers</a><a href="#in-method">Method</a></nav><a href="mailto:julianchan8897@gmail.com">Email</a></header>
      <main id="in-top">
        <section className="in-hero in-wrap">
          <div className="in-hero-copy"><span className="in-role">Scientific ML and AI engineering</span><h1>Scientific software,<br />under test.</h1><p>Research engineering across differentiable simulation, inverse methods and source-grounded agents.</p><div><a href="#in-work">See the systems<ArrowRight size={16} /></a><ExternalLink href={links.scholar}>Scholar<ArrowUpRight size={15} /></ExternalLink></div></div>
          <figure><img src={media.hybrid} alt="Turbulence simulation fields across the reference, learned hybrid and mechanistic solver" /><figcaption>Actual output from the hybrid closure evaluation</figcaption></figure>
        </section>

        <section className="in-ledger in-wrap" aria-label="Evidence summary">
          <div><span>Publication record</span><strong>3 MNRAS papers</strong><small>2 first-author</small></div>
          <div><span>Scientific evaluation</span><strong>32 locked seeds</strong><small>500-step rollouts</small></div>
          <div><span>Systems evaluation</span><strong>184 tests</strong><small>agent repository</small></div>
          <div><span>Cross-framework AD</span><strong>822,977 parameters</strong><small>finite served gradients</small></div>
        </section>

        <section className="in-work in-wrap" id="in-work">
          <h2>Three systems. Three kinds of proof.</h2>
          <article className="in-project in-project-hybrid">
            <div><span>Mechanistic model + learned closure</span><h3>Differentiable turbulence</h3><p>The model, solver and gradient path are independently inspectable. Headline results are pinned to tracked reports and a released checkpoint.</p><Outbound href={links.hybrid}>Code and verification</Outbound></div>
            <dl><div><dt>−71.7%</dt><dd>error against solver alone</dd></div><div><dt>−15.7%</dt><dd>error against matched a-priori CNN</dd></div><div><dt>500</dt><dd>steps, all trajectories finite</dd></div></dl>
          </article>

          <article className="in-project in-project-burgers">
            <figure><img src={media.burgers} alt="Typed component architecture for inverse parameter estimation in the Burgers equation" /><figcaption>Solver, PINN and posterior components</figcaption></figure>
            <div><span>Inference from sparse observations</span><h3>Inverse Burgers</h3><p>A common outer system compares solver adjoints, JAX and PyTorch PINNs, and amortised posterior inference without hiding their different assumptions.</p><div className="in-tags"><b>VJP contracts</b><b>Validated configuration</b><b>Atomic checkpoints</b><b>Seed sweeps</b></div><Outbound href={links.burgers}>Open repository</Outbound></div>
          </article>

          <article className="in-project in-project-agent">
            <div><span>Evidence-grounded agent system</span><h3>Research Brief Agent</h3><p>The system blocks synthesis until full text has been read or records a degraded run. Every run exposes citations, tool use, latency and cost.</p><Outbound href={links.agent}>Review implementation</Outbound></div>
            <div className="in-process"><div><strong>Question</strong><span>technical decision</span></div><div><strong>Evidence</strong><span>SPECTER2 + Qdrant</span></div><div><strong>Reading</strong><span>full-text requirement</span></div><div><strong>Memo</strong><span>citations + uncertainty</span></div></div>
          </article>
        </section>

        <section className="in-papers in-wrap" id="in-papers">
          <div className="in-papers-head"><h2>Research record</h2><p>Machine learning for dynamical systems, grounded in numerical astrophysics.</p></div>
          <article className="in-paper-lead"><img src={media.neuralOde} alt="Neural ODE and simulation predictions for black hole binary orbital evolution" /><div><span>First author, 2026</span><h3>Continuous-time modelling of black hole binary evolution with neural ODEs</h3><p>Monthly Notices of the Royal Astronomical Society, 546(3), stag135.</p><Outbound href={links.neuralOde}>Journal article</Outbound></div></article>
          <div className="in-paper-links"><Outbound href={links.perturber}><span>First author</span>Perturber-driven dynamics of supermassive black hole binaries</Outbound><Outbound href={links.convergence}><span>MNRAS 546(1)</span>Converging on massive black hole binary eccentricity</Outbound><Outbound href={links.scholar}><span>Complete profile</span>Google Scholar</Outbound></div>
        </section>

        <section className="in-method in-wrap" id="in-method"><h2>How I build</h2><div><article><strong>Define the boundary</strong><p>Separate physical assumptions, learned components and serving contracts.</p></article><article><strong>Lock the evaluation</strong><p>Use disjoint splits, matched baselines and reproducible seeds.</p></article><article><strong>Trace the result</strong><p>Record metrics, artefacts, cost and known limitations.</p></article></div></section>
      </main>
      <footer className="in-footer in-wrap"><strong>Julian Chan</strong><span>Research engineer, University of Surrey</span><a href="mailto:julianchan8897@gmail.com">Email</a></footer>
    </div>
  );
}

function RecordConcept() {
  return (
    <div className="record">
      <ConceptSwitcher active="research" />
      <header className="re-nav re-wrap"><a href="#re-top" className="re-mark">Julian Chan</a><nav><a href="#re-papers">Research</a><a href="#re-software">Software</a><a href="#re-about">About</a></nav><ExternalLink href={links.github}>GitHub</ExternalLink></header>
      <main id="re-top">
        <section className="re-hero re-wrap">
          <div className="re-hero-copy"><span className="re-role">Computational astrophysics and scientific ML</span><h1>From equations<br />to working software.</h1><p>I study physical dynamics, build learned models and test the systems that carry them.</p><div><a href="#re-papers">Read the research<ArrowRight size={16} /></a><ExternalLink href={links.scholar}>Google Scholar<ArrowUpRight size={15} /></ExternalLink></div></div>
          <figure><img src={media.neuralOde} alt="Orbital evolution and merger timescale predictions from the neural ODE study" /><figcaption>Neural ODE predictions compared with N-body simulation inputs</figcaption></figure>
        </section>

        <section className="re-statement re-wrap"><blockquote>Machine learning is useful here when the model respects the dynamics and the evaluation respects the science.</blockquote><p>My work combines surrogate modelling, numerical simulation and research software for systems where errors have physical meaning.</p></section>

        <section className="re-papers re-wrap" id="re-papers">
          <h2>Published research</h2>
          <article className="re-lead-paper"><div><span>First author, MNRAS 546(3)</span><h3>Continuous-time modelling of black hole binary evolution with neural ODEs</h3><p>A single parameter-conditioned vector field learns orbital evolution across an ensemble of galaxy-merger simulations.</p><Outbound href={links.neuralOde}>Read the article</Outbound></div><img src={media.neuralOde} alt="Neural ODE predictions of black hole binary evolution through merger" /></article>
          <div className="re-other-papers"><Outbound href={links.perturber}><span>First author, MNRAS 550(4)</span><strong>Perturber-driven dynamics of supermassive black hole binaries in galaxy mergers</strong><p>Testing physical eccentricity stochasticity beyond numerical noise.</p></Outbound><Outbound href={links.convergence}><span>MNRAS 546(1), 2026</span><strong>Converging on the eccentricity of massive black hole binaries in Galactic mergers</strong><p>Resolution requirements for reliable binary eccentricities.</p></Outbound></div>
        </section>

        <section className="re-software re-wrap" id="re-software">
          <h2>Software as a research output</h2>
          <article className="re-software-lead"><img src={media.hybrid} alt="Held-out turbulence rollout produced by the differentiable hybrid closure" /><div><span>Differentiable simulation</span><h3>Hybrid closure for 2D turbulence</h3><p>A learned PyTorch closure composed with a JAX solver, including the reverse gradient path through both served components.</p><dl><div><dt>71.7%</dt><dd>lower error</dd></div><div><dt>32</dt><dd>test trajectories</dd></div><div><dt>500</dt><dd>rollout steps</dd></div></dl><Outbound href={links.hybridDemo}>Open walkthrough</Outbound></div></article>
          <div className="re-software-pair"><ExternalLink href={links.burgers}><img src={media.burgers} alt="Inverse Burgers component architecture" /><div><span>Inverse problems</span><h3>Solver adjoints, PINNs and posterior inference</h3><p>Three methods exposed as swappable scientific components.</p><b>Repository <ArrowUpRight size={14} /></b></div></ExternalLink><ExternalLink href={links.agent} className="re-agent"><div><span>AI engineering</span><h3>Source-grounded research briefs</h3><p>A streaming agent that retrieves papers, reads full text and reports uncertainty, latency and cost.</p><b>Repository <ArrowUpRight size={14} /></b></div><strong>retrieve<br />read<br />verify<br />report</strong></ExternalLink></div>
        </section>

        <section className="re-about re-wrap" id="re-about"><h2>Researcher and engineer</h2><div><p>I am completing a PhD at the University of Surrey. I work across simulation, modelling, software design, evaluation and technical communication.</p><p>I am looking for AI for science and AI engineering roles where research quality and system quality are treated as the same problem.</p><div><ExternalLink href={links.scholar}>Scholar<ArrowUpRight size={14} /></ExternalLink><ExternalLink href={links.github}>GitHub<ArrowUpRight size={14} /></ExternalLink><a href="mailto:julianchan8897@gmail.com">Email<Mail size={14} /></a></div></div></section>
      </main>
      <footer className="re-footer re-wrap"><strong>Julian Chan</strong><span>University of Surrey</span><a href="mailto:julianchan8897@gmail.com">julianchan8897@gmail.com</a></footer>
    </div>
  );
}

export default function DesignConcepts() {
  const [location] = useLocation();
  const concept = location.split("/")[2] || "editorial";
  if (concept === "dossier") return <InstrumentConcept />;
  if (concept === "research") return <RecordConcept />;
  return <ModernistConcept />;
}
