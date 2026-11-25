export type Link = { label: string; href: string };

export type Figure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  video?: { mp4: string; webm: string };
};

export const person = {
  name: "Julian Chan",
  email: "julianchan8897@gmail.com",
  statement: "I build neural surrogates for physical systems and test how AI agents make decisions in scientific experiments.",
  links: {
    github: "https://github.com/julian-8897",
    scholar: "https://scholar.google.com/citations?hl=en&user=9YnAVL4AAAAJ",
    linkedin: "https://www.linkedin.com/in/julian-chan-a86b2921b",
    cv: "julian_chan_ai_cv.pdf",
  },
};

export const featuredPaper = {
  title: "Prior or Feedback? What an LLM Uses When Adapting Neural Operators",
  venue: "NeurIPS 2026 AI4Science Workshop",
  summary: "We gave an LLM 20 trials to adapt a Fourier neural operator to a new PDE regime. We then changed the task description and the validation scores separately to see what shaped its next choice.",
  finding: "The PDE description shifted its first choice of learning rate. Reassigning validation scores changed the next proposal in all 18 traces tested.",
  figure: {
    src: "figures/llm-fno-workflow.png",
    alt: "Figure 1 shows the Burgers and advection regime shifts, the 20-trial propose, fine-tune and validate loop, and the separate interventions on the PDE description and validation history.",
    caption: "Figure 1 from the paper. The adaptation loop and the two interventions on its inputs.",
    width: 1471,
    height: 1348,
  },
  links: [
    { label: "Read the paper", href: "https://arxiv.org/abs/2610.12325" },
    { label: "Code", href: "https://github.com/julian-8897/budgeted-search-ai4science" },
  ],
};

export type SimulationProject = {
  id: string;
  category: string;
  title: string;
  context: string;
  summary: string;
  finding: string;
  figure: Figure;
  links: Link[];
};

export const simulationProjects: SimulationProject[] = [
  {
    id: "hybrid-closure",
    category: "Differentiable simulation",
    title: "Learning a turbulence closure",
    context: "Tesseract Hackathon 2026",
    summary: "I trained a neural correction through a coarse spectral solver so it could learn from errors that build up along a trajectory.",
    finding: "Across 32 test trajectories, it reduced mean squared vorticity error over 500 steps by 71.7% versus the coarse solver and 15.7% versus the same network trained on individual corrections.",
    figure: {
      src: "media/closure_poster.jpg",
      alt: "Three synchronised vorticity maps show filtered direct numerical simulation, the coarse solver and the solver with a learned closure. A growing chart compares the two solvers’ errors against the reference.",
      caption: "One validation rollout. The lines show each solver’s spatial mean squared vorticity error at the current step.",
      width: 1200,
      height: 760,
      video: { mp4: "media/closure.mp4", webm: "media/closure.webm" },
    },
    links: [
      { label: "Interactive walkthrough", href: "https://julian-8897.github.io/tesseract-hybrid-closure/" },
      { label: "Code", href: "https://github.com/julian-8897/tesseract-hybrid-closure" },
    ],
  },
  {
    id: "inverse-burgers",
    category: "Inverse problems",
    title: "Inferring viscosity from sparse sensors",
    context: "Tesseract Hackathon 2025 · Honourable Mention",
    summary: "I used a differentiable Burgers solver and a flow-matching model to infer viscosity and the initial flow jointly from sparse, noisy observations.",
    finding: "The joint posterior passed a coverage check. Simulation-based calibration showed that uncertainty in viscosity alone was too narrow.",
    figure: {
      src: "media/burgers_poster.jpg",
      alt: "A velocity front steepens and diffuses within a posterior predictive band. A space-time map fills in as sensor readings appear, beside the viscosity posterior and true value.",
      caption: "A flow reconstructed from 64 sensor readings, with a predictive band from 256 posterior draws.",
      width: 1440,
      height: 850,
      video: { mp4: "media/burgers.mp4", webm: "media/burgers.webm" },
    },
    links: [{ label: "Code", href: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers" }],
  },
];

export const researchBrief = {
  title: "Research Brief Agent",
  summary: "A literature agent that records which papers it retrieved and read, so researchers can trace a recommendation back to the evidence.",
  links: [{ label: "Code", href: "https://github.com/julian-8897/research-brief-agent" }],
};

export const astrophysics = {
  intro: "In my PhD at the University of Surrey, I use N-body simulations to study how supermassive black hole binaries form and evolve in galaxy mergers. That work led me to neural surrogates: could a learned model recover the orbital evolution needed to estimate when the two black holes merge?",
  figure: {
    src: "figures/galaxy-bulge.webp",
    alt: "Projected stellar surface density of a simulated galaxy bulge. Orange markers show massive perturbers around the central supermassive black hole.",
    caption: "Initial conditions for a galaxy-merger simulation. Orange marks the massive perturbers around the central black hole.",
    width: 960,
    height: 873,
  },
  papers: [
    {
      title: "Continuous-time modelling of black hole binary evolution with neural ODEs",
      line: "A neural ODE surrogate for orbital evolution, trained on N-body simulations and evaluated on merger timescales.",
      href: "https://doi.org/10.1093/mnras/stag135",
    },
    {
      title: "Perturber-driven dynamics of supermassive black hole binaries in galaxy mergers",
      line: "How encounters with massive perturbers change a binary’s eccentricity at formation.",
      href: "https://doi.org/10.1093/mnras/stag1374",
    },
    {
      title: "Converging on the eccentricity of massive black hole binaries in Galactic mergers",
      href: "https://doi.org/10.1093/mnras/stag026",
    },
  ],
};

export const interests = {
  summary: "I’m interested in neural surrogates for dynamical systems, differentiable simulation, simulation-based inference and the evaluation of AI agents for scientific experiments.",
  invitation: "If you’re working on related problems or hiring for AI for Science research engineering, I’d like to hear from you.",
};
