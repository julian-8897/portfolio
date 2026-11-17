// Shared copy for all design candidates. Wording follows the GitHub profile
// README (github.com/julian-8897) so candidates differ only in design.

export const person = {
  name: "Julian Chan",
  role: "Research engineer, AI for Science",
  affiliation: "University of Surrey",
  email: "julianchan8897@gmail.com",
  summary:
    "I'm a research engineer in AI for Science and a final-year PhD researcher at the University of Surrey. I build machine learning methods and tools for scientific discovery, spanning LLM agents, differentiable simulation and neural surrogates for complex dynamical systems.",
  short:
    "Machine learning methods and tools for scientific discovery: LLM agents, differentiable simulation and neural surrogates for complex dynamical systems.",
  links: {
    github: "https://github.com/julian-8897",
    scholar: "https://scholar.google.com/citations?hl=en&user=9YnAVL4AAAAJ",
    linkedin: "https://www.linkedin.com/in/julian-chan-a86b2921b",
    cv: "/julian_chan_ai_cv.pdf",
  },
  stack: ["Python", "PyTorch", "JAX", "NumPy", "SciPy", "Docker", "HPC (SLURM)"],
};

export type Link = { label: string; href: string };

export type Project = {
  id: string;
  theme: "LLM agents for scientific ML" | "Differentiable simulation" | "ML for astrophysics";
  title: string;
  year: string;
  venue?: string;
  role?: string;
  body: string;
  result?: { value: string; label: string };
  figure?: { src: string; alt: string; caption: string; aspect: string };
  links: Link[];
};

export const projects: Project[] = [
  {
    id: "llm-fno",
    theme: "LLM agents for scientific ML",
    title: "Prior or Feedback? What an LLM Uses When Adapting Neural Operators",
    year: "2026",
    venue: "NeurIPS 2026 AI4Science Workshop",
    role: "Equal contribution",
    body:
      "Studied LLM-guided adaptation of Fourier neural operators across PDE regimes. The LLM outperformed random search and TPE in nearly all matched evaluations, while controlled interventions revealed how experimental feedback influences its decisions. Reproducible experiment records and verification tools are available.",
    figure: {
      src: "/figures/llm-fno-method.png",
      alt: "Method overview: regime shift between PDE families, budgeted FNO adaptation loop with an LLM policy, and controlled policy interventions",
      caption: "Budgeted FNO adaptation (B = 20) and the controlled input interventions.",
      aspect: "589 / 539",
    },
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2610.12325" },
      { label: "Code", href: "https://github.com/julian-8897/budgeted-search-ai4science" },
    ],
  },
  {
    id: "research-brief-agent",
    theme: "LLM agents for scientific ML",
    title: "Research Brief Agent",
    year: "2026",
    body:
      "Built a tool-using LLM agent that retrieves scientific papers, synthesises technical briefs and verifies citations against source evidence. Uses FastAPI, Qdrant and automated evaluations in CI to assess reliability.",
    links: [{ label: "Code", href: "https://github.com/julian-8897/research-brief-agent" }],
  },
  {
    id: "hybrid-closure",
    theme: "Differentiable simulation",
    title: "Differentiable hybrid closure for 2D turbulence",
    year: "2026",
    venue: "Tesseract Hackathon 2026",
    body:
      "Developed a neural turbulence closure trained end-to-end through a differentiable spectral solver using PyTorch and JAX. Reduced long-horizon vorticity error by 71.7% relative to the coarse solver and 15.7% relative to conventional supervised training. Also trained with the solver and network running as separate Tesseract services.",
    result: { value: "71.7%", label: "lower long-horizon vorticity error than the coarse solver" },
    figure: {
      src: "/figures/hybrid-rollout-poster.png",
      alt: "Vorticity fields from filtered DNS, the hybrid model and the coarse solver after a 500-step rollout, with a per-cell correction map",
      caption: "Held-out 500-step rollout: filtered DNS, hybrid model and coarse solver.",
      aspect: "1408 / 770",
    },
    links: [
      { label: "Walkthrough", href: "https://julian-8897.github.io/tesseract-hybrid-closure/" },
      { label: "Code", href: "https://github.com/julian-8897/tesseract-hybrid-closure" },
    ],
  },
  {
    id: "inverse-burgers",
    theme: "Differentiable simulation",
    title: "Inverse problems and simulation-based inference for PDEs",
    year: "2025",
    venue: "Tesseract Hackathon 2025, Honourable Mention",
    role: "Presented at the Tesseract Forum 2026",
    body:
      "Built a differentiable framework for recovering PDE parameters from sparse, noisy observations, combining solver-based inference, JAX/PyTorch physics-informed neural networks and flow-matching posterior estimation. Includes uncertainty calibration and interchangeable inference methods.",
    figure: {
      src: "/figures/burgers-posterior.png",
      alt: "Corner plot of the flow-matching posterior over viscosity, amplitude and phase of the Burgers initial condition, with ground truth marked",
      caption: "Flow-matching posterior over Burgers viscosity and initial-condition parameters.",
      aspect: "2010 / 1848",
    },
    links: [{ label: "Code", href: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers" }],
  },
  {
    id: "neural-ode",
    theme: "ML for astrophysics",
    title: "Neural ODE surrogates for black hole binary evolution",
    year: "2026",
    venue: "MNRAS 2026",
    role: "First author",
    body:
      "Developed a neural ODE surrogate for the orbital evolution of supermassive black hole binaries, trained on N-body simulations of galaxy mergers. Reproduces merger timescales at a fraction of the computational cost of direct simulation.",
    figure: {
      src: "/figures/neural-ode-timescales.png",
      alt: "Eccentricity and semi-major axis against time for N-body runs and neural ODE predictions at three initial eccentricities and three particle resolutions",
      caption: "Orbital evolution, N-body (solid) against neural ODE (dashed).",
      aspect: "1265 / 873",
    },
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2601.13019" },
      { label: "Journal", href: "https://doi.org/10.1093/mnras/stag135" },
    ],
  },
];

export type Publication = { authors: string; title: string; venue: string; year: string; href: string; note?: string };

export const publications: Publication[] = [
  {
    authors: "Chan J., Mora Jimenez J.",
    title: "Prior or Feedback? What an LLM Uses When Adapting Neural Operators",
    venue: "NeurIPS AI4Science Workshop",
    year: "2026",
    href: "https://arxiv.org/abs/2610.12325",
    note: "equal contribution",
  },
  {
    authors: "Chan J., Gualandris A., Das P.",
    title: "Continuous-time modelling of black hole binary evolution with neural ODEs",
    venue: "MNRAS 546(3)",
    year: "2026",
    href: "https://doi.org/10.1093/mnras/stag135",
  },
  {
    authors: "Chan J., Gualandris A., Dehnen W., Read J.",
    title: "Perturber-driven dynamics of supermassive black hole binaries in galaxy mergers",
    venue: "MNRAS 550(4)",
    year: "2026",
    href: "https://doi.org/10.1093/mnras/stag1374",
  },
  {
    authors: "Gualandris A., Read J., Fastidio F., Chan J., François T., Khonji N., Dehnen W.",
    title: "Converging on the eccentricity of massive black hole binaries in Galactic mergers",
    venue: "MNRAS 546(1)",
    year: "2026",
    href: "https://doi.org/10.1093/mnras/stag026",
  },
];
