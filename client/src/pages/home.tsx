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
            <span className="mo-role">Research engineer · AI for science</span>
            <h1>Machine learning systems for scientific problems.</h1>
            <p>Differentiable simulation, inverse problems and agents for research, each taken from question to tested system. Finishing a PhD in astrophysics at the University of Surrey.</p>
            <div className="mo-actions">
              <a href="#projects">Flagship projects <ArrowRight size={16} aria-hidden="true" /></a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Github size={15} aria-hidden="true" />GitHub</a>
            </div>
          </div>
          <figure className="mo-hero-figure">
            <img src={MEDIA.hybrid} alt="Held-out turbulence rollout comparing the hybrid closure with the DNS reference and the mechanistic solver" />
            <figcaption>Hybrid turbulence closure, held-out 500-step rollout</figcaption>
          </figure>
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
              <p>184 unit tests and a 7-case quality gate run in CI, with tracing to Langfuse.</p>
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
                <span>7-case quality gate</span>
                <span>SSE streaming</span>
                <span>Docker Compose · Fly</span>
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
                <p>A PyTorch closure trained through a JAX spectral solver, with reverse-mode gradients composed across two served Tesseract components. On 32 locked test trajectories it cuts 500-step rollout error by 71.7% versus the solver alone.</p>
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
                <p>Recovers the viscosity of the Burgers equation from sparse, noisy measurements with three methods: a differentiable solver adjoint, JAX and PyTorch PINNs behind one schema, and an amortised flow-matching posterior.</p>
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
              <p>A parameterised neural ODE trained on an ensemble of N-body galaxy-merger simulations. Reproduces held-out orbital trajectories with median fractional errors of order 10⁻², and merger timescales consistent with direct simulation.</p>
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
            <p>I research massive black hole binary dynamics with N-body simulations and neural surrogates, and I ship the systems that make the results reproducible.</p>
            <p>Working method: lock the evaluation before optimising, keep the system inspectable, report limitations with the results.</p>
            <div className="mo-stack">Python · PyTorch · JAX · FastAPI · Qdrant · Langfuse · Docker · HPC</div>
            <div className="mo-availability">Open to AI for science and AI engineering roles.</div>
            <div className="mo-contact-links">
              <Outbound href={LINKS.github}>GitHub</Outbound>
              <Outbound href={LINKS.scholar}>Google Scholar</Outbound>
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