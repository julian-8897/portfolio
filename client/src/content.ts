// Site copy. Narratives were drafted by Codex (gpt-6.2-astra, medium) from the
// GitHub profile README, the arXiv abstracts and the project READMEs, then
// checked against those sources. Figure paths are relative so the same markup
// works on the site root and in the published artifact.

export const person = {
  name: "Julian Chan",
  email: "julianchan8897@gmail.com",
  statement:
    "I build learned models of dynamical systems, and the experiments that test their predictions, their uncertainties and the agents that tune them.",
  about: [
    "I'm a final-year astrophysics PhD researcher at the University of Surrey, where I use N-body simulations to study how pairs of supermassive black holes evolve. A question from that work, whether a learned model can recover the time to merger, connects it to scientific machine learning.",
    "I want to build models and design experiments like these as a research engineer in AI for Science.",
  ],
  stack: ["Python", "PyTorch", "JAX", "NumPy", "SciPy", "Docker", "HPC (SLURM)"],
  links: {
    github: "https://github.com/julian-8897",
    scholar: "https://scholar.google.com/citations?hl=en&user=9YnAVL4AAAAJ",
    linkedin: "https://www.linkedin.com/in/julian-chan-a86b2921b",
    cv: "julian_chan_ai_cv.pdf",
  },
};

export type Link = { label: string; href: string };
export type Figure = {
  src: string; // image, or the poster frame when video is set
  alt: string;
  caption: string;
  aspect: string;
  width?: "narrow" | "mid";
  video?: { mp4: string; webm: string };
};

export type Project = {
  id: string;
  title: string;
  year: string;
  venue?: string;
  role?: string;
  question: string;
  approach: string;
  finding: string;
  implication: string;
  figure?: Figure;
  links: Link[];
};

export type Theme = { id: string; title: string; blurb: string; projects: Project[] };

export const themes: Theme[] = [
  {
    id: "agents",
    title: "Agents for scientific experimentation",
    blurb:
      "What evidence shapes an agent's next decision, whether it is choosing the next experiment or recommending a method from the literature?",
    projects: [
      {
        id: "llm-fno",
        title: "Prior or Feedback? What an LLM Uses When Adapting Neural Operators",
        year: "2026",
        venue: "NeurIPS 2026 AI4Science Workshop",
        role: "Equal contribution",
        question:
          "When an LLM chooses a good experiment, how much can we attribute to what it knew before seeing any results?",
        approach:
          "We gave it a fixed trial budget to adapt Fourier neural operators across PDE regimes, then varied the task description and the feedback it saw.",
        finding:
          "After 20 trials it reached lower held-out error than random search in all 36 matched runs and than Bayesian optimisation (TPE) in 35 of 36. Its first learning rate shifted with the PDE description, and reassigning validation scores among completed trials changed its next proposal in every trace tested.",
        implication: "These interventions separate a useful starting choice from a response to experimental evidence.",
        figure: {
          src: "figures/llm-fno-interventions.png",
          alt: "Two panels. Left: share of cold-start learning-rate proposals at each value under advection text, Burgers text and no text. Right: distribution of the action-distance gap between score reassignment and a notation control across 18 traces, all above zero.",
          caption: "Two controlled interventions. (a) The PDE description alone shifts the proposed learning rate before any feedback. (b) Reassigning validation scores among completed trials moves the next proposal in all 18 traces, relative to a rewrite that preserves the scores.",
          aspect: "1611 / 627",
        },
        links: [
          { label: "arXiv", href: "https://arxiv.org/abs/2610.12325" },
          { label: "Code", href: "https://github.com/julian-8897/budgeted-search-ai4science" },
        ],
      },
      {
        id: "research-brief-agent",
        title: "Tracing a research brief back to its sources",
        year: "2026",
        question:
          "When an agent recommends a method from the literature, how can a researcher tell which papers it actually consulted?",
        approach:
          "I built an agent that retrieves papers, reads promising candidates in full where possible and records when that reading fails. Before returning the brief, it removes citation markers that point outside the retrieved evidence.",
        finding:
          "The agent passed offline checks for retrieval, citation handling and uncertainty reporting on a synthetic corpus. Full-text use is measured separately in live runs.",
        implication: "A reader can trace a recommendation to its sources and judge whether the cited work supports it.",
        links: [{ label: "Code", href: "https://github.com/julian-8897/research-brief-agent" }],
      },
    ],
  },
  {
    id: "differentiable",
    title: "Differentiable simulation and inverse problems",
    blurb:
      "Can training through a solver improve predictions over long trajectories, and when the solver is used to infer physical parameters from sparse data, how well can the uncertainty be quantified?",
    projects: [
      {
        id: "hybrid-closure",
        title: "Training a turbulence closure through the solver",
        year: "2026",
        venue: "Tesseract Hackathon 2026",
        question:
          "Can a coarse turbulence simulation predict how vortices evolve when its grid cannot resolve the smaller scales of motion?",
        approach:
          "I trained a neural correction through a differentiable spectral solver, so that training penalised errors as they accumulated along a trajectory, and compared it with the same network trained on individual corrections.",
        finding:
          "On 32 held-out trajectories of freely decaying two-dimensional turbulence, training through the solver reduced 500-step vorticity error by 71.7% relative to the solver alone and by 15.7% relative to the separately trained network.",
        implication: "Even with the same network, the training objective determines the trajectory it produces.",
        figure: {
          src: "media/closure_poster.jpg",
          alt: "Animation of a held-out turbulence rollout. Top: filtered DNS vorticity beside the hybrid model's free rollout. Bottom: the per-step correction implied by DNS beside the correction the CNN predicts, which show matching small-scale patterns.",
          caption: "A validation trajectory over 500 steps. Top: filtered DNS and the hybrid, run freely from the same initial state. Bottom: the correction the CNN adds at each step beside the correction implied by filtered DNS for the same coarse step.",
          aspect: "1440 / 1560",
          width: "mid",
          video: { mp4: "media/closure.mp4", webm: "media/closure.webm" },
        },
        links: [
          { label: "Walkthrough", href: "https://julian-8897.github.io/tesseract-hybrid-closure/" },
          { label: "Code", href: "https://github.com/julian-8897/tesseract-hybrid-closure" },
        ],
      },
      {
        id: "inverse-burgers",
        title: "How well can sparse observations constrain viscosity?",
        year: "2025",
        venue: "Tesseract Hackathon 2025, Honourable Mention",
        role: "Presented at the Tesseract Forum 2026",
        question:
          "How precisely can viscosity be inferred from sparse, noisy observations of a flow whose initial conditions are also uncertain?",
        approach:
          "I used the Burgers equation to compare a differentiable solver with a physics-informed neural network for estimating viscosity, then trained a flow-matching model to infer viscosity and the initial conditions jointly.",
        finding:
          "The solver gave the more accurate viscosity estimate at lower cost per optimisation step. The posterior passed a joint coverage check, yet simulation-based calibration showed that its viscosity marginal was too narrow.",
        implication:
          "Checking uncertainty for the physical parameter of interest can reveal overconfidence that a joint diagnostic misses.",
        figure: {
          src: "media/burgers_poster.jpg",
          alt: "Animation of the Burgers inverse problem. A velocity profile steepens into a front and diffuses, with a narrow predictive band around the truth; below, a space-time map fills in as sensor readings appear; right, the viscosity posterior with the true value marked.",
          caption: "Top: the velocity front steepening and diffusing, with the 5th to 95th percentile band from 256 posterior draws pushed through the solver. Below: the space-time field with the 64 noisy sensor readings. Right: the viscosity posterior against the true value (dashed).",
          aspect: "1440 / 850",
          video: { mp4: "media/burgers.mp4", webm: "media/burgers.webm" },
        },
        links: [{ label: "Code", href: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers" }],
      },
    ],
  }

];

export const earlierWork = [
  {
    year: "2026",
    venue: "MNRAS 546(3)",
    title: "Continuous-time modelling of black hole binary evolution with neural ODEs",
    line: "A neural ODE surrogate for the orbital evolution of supermassive black hole binaries, trained on N-body galaxy-merger simulations and checked against direct simulation on merger timescales.",
    links: [
      { label: "Journal", href: "https://doi.org/10.1093/mnras/stag135" },
      { label: "arXiv", href: "https://arxiv.org/abs/2601.13019" },
    ],
  },
];

export const notes = [
  {
    date: "2026",
    title: "Hybrid turbulence closure, interactive walkthrough",
    href: "https://julian-8897.github.io/tesseract-hybrid-closure/",
    line: "A marimo notebook that compares vorticity fields, rollout errors and energy spectra along a held-out validation trajectory.",
  },
];

export const software = [
  { repo: "budgeted-search-ai4science", line: "Runs budget-matched searches over neural operator configurations and replays the feedback given to the controller." },
  { repo: "research-brief-agent", line: "Retrieves papers and writes cited technical briefs with a record of the evidence consulted." },
  { repo: "tesseract-hybrid-closure", line: "Trains a PyTorch turbulence closure through a JAX spectral solver and evaluates it on held-out rollouts." },
  { repo: "tesseract-pinn-inverse-burgers", line: "Infers Burgers parameters from sparse observations and checks posterior calibration against simulated data." },
];

export const openProblems = [
  "Under a fixed trial budget, when does an agent's response to validation feedback actually improve its final choice?",
  "Does a closure trained on freely decaying turbulence keep its long-rollout accuracy when the flow is continuously forced?",
  "Can a few gradient steps through the solver improve the calibration of an amortised viscosity posterior?",
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
