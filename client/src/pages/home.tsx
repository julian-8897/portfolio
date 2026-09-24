import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import "./modernist-theme.css";

const LINKS = {
  hybrid: "https://github.com/julian-8897/tesseract-hybrid-closure",
  hybridDemo: "https://julian-8897.github.io/tesseract-hybrid-closure/",
  burgers: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers",
  agent: "https://github.com/julian-8897/research-brief-agent",
  agentEvals: "https://github.com/julian-8897/research-brief-agent/tree/main/evals",
  neuralOde: "https://doi.org/10.1093/mnras/stag135",
  neuralOdeArxiv: "https://arxiv.org/abs/2601.13019",
  perturber: "https://doi.org/10.1093/mnras/stag1374",
  convergence: "https://doi.org/10.1093/mnras/stag026",
  github: "https://github.com/julian-8897",
  scholar: "https://scholar.google.com/citations?hl=en&user=9YnAVL4AAAAJ",
  cv: "/julian_chan_ai_cv.pdf",
};

const MEDIA = {
  hybrid: "/concepts/hybrid-rollout.png",
  burgers: "/concepts/inverse-burgers-architecture.png",
  neuralOde: "/concepts/neural-ode-timescales.svg",
};

function Outbound({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`outbound ${className}`}>
      {children}<ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  return (
    <div className="modernist">
      <header className="mo-nav mo-wrap">
        <a href="#top" className="mo-mark">Julian Chan</a>
        <nav aria-label="Primary">
          <a href="#projects">Projects</a>
          <a href="#research">Research</a>
          <a href="#profile">Profile</a>
        </nav>
        <a href="mailto:julianchan8897@gmail.com" className="mo-email">Email</a>
      </header>

      <main id="top">
        <section className="mo-hero mo-wrap">
          <div className="mo-hero-copy">
            <span className="mo-role">AI research engineer</span>
            <h1>
              <span className="mo-line"><b style={{ animationDelay: "0.15s" }}>I build agents</b></span>
              <span className="mo-line"><b style={{ animationDelay: "0.27s" }}>and ML systems</b></span>
              <span className="mo-line"><b style={{ animationDelay: "0.39s" }}>with evidence.</b></span>
            </h1>
            <p>Building retrieval, evaluation and ML software that makes technical decisions inspectable. Scientific ML is one demanding testbed.</p>
            <div className="mo-actions">
              <a href="#projects">Flagship projects <ArrowRight size={16} aria-hidden="true" /></a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Github size={15} aria-hidden="true" />GitHub</a>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer">CV <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="mo-hero-system" aria-label="Research Brief Agent workflow">
            <span className="mo-system-label">Research Brief Agent · built system</span>
            <strong>From question to cited decision</strong>
            <div className="mo-system-flow">
              <span>Retrieve papers</span>
              <span>Read full text</span>
              <span>Check citations</span>
              <span>Trace the run</span>
            </div>
            <p>FastAPI · Qdrant · Langfuse</p>
            <Outbound href={LINKS.agent}>Explore the agent</Outbound>
          </div>
        </section>

        <section className="mo-proof mo-wrap" aria-label="Selected evidence">
          <div><strong>2</strong><span>first-author MNRAS papers</span></div>
          <div><strong>71.7%</strong><span>lower 500-step error, turbulence closure</span></div>
          <div><strong>JAX ↔ PyTorch</strong><span>reverse-mode gradients across served components</span></div>
        </section>

        <section className="mo-work mo-wrap" id="projects">
          <h2>Flagship projects</h2>

          <article className="mo-lead-project">
            <div className="mo-lead-copy">
              <span>AI engineering · agent systems</span>
              <h3>Research Brief Agent</h3>
              <p>Streaming FastAPI service that turns a research question into a cited decision memo. Qdrant retrieval, full-text reading before synthesis, deterministic citation checks, and per-run latency, token use and cost.</p>
              <p>184 tests and a 7-case offline gate check retrieval and response contracts on synthetic fixtures. Live answer quality remains a separate evaluation task.</p>
              <div className="mo-project-links">
                <Outbound href={LINKS.agent}>Repository</Outbound>
                <Outbound href={LINKS.agentEvals}>Evaluation suite</Outbound>
              </div>
            </div>
            <aside className="mo-agent">
              <span>Run pipeline, from the documented API</span>
              <div className="mo-agent-steps">
                <div><b>Retrieve</b><i>Qdrant · SPECTER2</i></div>
                <div><b>Read</b><i>full text required</i></div>
                <div><b>Verify</b><i>citations checked</i></div>
                <div><b>Report</b><i>cost · latency · trace</i></div>
              </div>
              <div className="mo-agent-facts">
                <span>184 unit tests</span>
                <span>7 fixture cases</span>
                <span>SSE streaming</span>
                <span>Docker Compose</span>
              </div>
              <Outbound href={LINKS.agent}>Inspect the system</Outbound>
            </aside>
          </article>

          <div className="mo-project-pair">
            <article className="mo-burgers">
              <img src={MEDIA.hybrid} alt="Vorticity fields from the DNS reference, the hybrid model and the mechanistic solver" />
              <div>
                <span>Scientific ML · differentiable simulation</span>
                <h3>Hybrid closure for 2D turbulence</h3>
                <p>A PyTorch closure trained through a JAX spectral solver, with reverse-mode gradients across two served components. On 32 locked test trajectories it cuts 500-step rollout error by 71.7% versus the solver alone. The work shows how to train a learned component through an existing simulator.</p>
                <div className="mo-project-links">
                  <Outbound href={LINKS.hybridDemo}>Walkthrough</Outbound>
                  <Outbound href={LINKS.hybrid}>Repository</Outbound>
                </div>
              </div>
            </article>

            <article className="mo-burgers">
              <img src={MEDIA.burgers} alt="Architecture of the inverse Burgers solver, PINN and posterior components" />
              <div>
                <span>Inverse problems · Tesseract</span>
                <h3>Inverse estimation for the Burgers equation</h3>
                <p>Built a solver adjoint, interchangeable JAX and PyTorch PINNs, and a flow-matching posterior to infer parameters from sparse, noisy observations. The PINN backends were compared on the same synthetic observations; posterior diagnostics found the viscosity uncertainty too narrow. The shared interface makes model choices testable under one setup.</p>
                <div className="mo-project-links">
                  <Outbound href={LINKS.burgers}>Repository</Outbound>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mo-research mo-wrap" id="research">
          <h2>Research</h2>
          <article className="mo-paper-feature">
            <div className="mo-paper-copy">
              <span>First author · MNRAS 546(3), 2026</span>
              <h3>Continuous-time modelling of black hole binary evolution with neural ODEs</h3>
              <p>Built a parameterised neural ODE from N-body galaxy-merger simulations. On held-out trajectories it reaches median fractional errors of order 10⁻², with merger timescales consistent with direct simulation. It shows how a surrogate can be judged against the original simulator.</p>
              <div className="mo-paper-inline-links">
                <Outbound href={LINKS.neuralOde}>Journal article</Outbound>
                <Outbound href={LINKS.neuralOdeArxiv}>arXiv</Outbound>
              </div>
            </div>
            <figure>
              <img src={MEDIA.neuralOde} alt="Neural ODE predictions of orbital evolution and merger timescales against N-body simulation inputs" />
              <figcaption>Paper figure: predicted orbital evolution and merger timescales against simulation inputs</figcaption>
            </figure>
          </article>

          <p className="mo-research-note">Earlier numerical astrophysics</p>
          <div className="mo-paper-compact">
            <Outbound href={LINKS.perturber}>
              <span>First author · MNRAS 550(4), 2026</span>
              <strong>Perturber-driven dynamics of supermassive black hole binaries in galaxy mergers</strong>
            </Outbound>
            <Outbound href={LINKS.convergence}>
              <span>MNRAS 546(1), 2026</span>
              <strong>Converging on the eccentricity of massive black hole binaries in Galactic mergers</strong>
            </Outbound>
          </div>
          <div className="mo-research-scholar">
            <Outbound href={LINKS.scholar}>Google Scholar</Outbound>
          </div>
        </section>

        <section className="mo-profile mo-wrap" id="profile">
          <h2>Profile</h2>
          <div>
            <p>AI research engineer building agent services, ML systems and evaluation workflows. I work from a clear decision or scientific question through implementation, tests and evidence.</p>
            <p>My astrophysics PhD at the University of Surrey uses N-body simulations and neural surrogates. It gives me a rigorous setting for testing models against known physical behaviour.</p>
            <div className="mo-stack">Python · PyTorch · JAX · FastAPI · Qdrant · Langfuse · Docker · HPC</div>
            <div className="mo-availability">Open to AI research engineering, applied AI and ML engineering roles.</div>
            <div className="mo-contact-links">
              <Outbound href={LINKS.github}>GitHub</Outbound>
              <Outbound href={LINKS.scholar}>Google Scholar</Outbound>
              <Outbound href={LINKS.cv}>CV</Outbound>
              <a href="mailto:julianchan8897@gmail.com"><Mail size={14} aria-hidden="true" />Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mo-footer mo-wrap">
        <strong>Julian Chan</strong>
        <span>University of Surrey</span>
        <a href="mailto:julianchan8897@gmail.com"><Mail size={14} aria-hidden="true" />julianchan8897@gmail.com</a>
      </footer>
    </div>
  );
}