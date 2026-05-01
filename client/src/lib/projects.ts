export type Featured = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  status: string;
  blurb: string;
  hero: string; // svg/canvas tag identifier
  problem: string;
  approach: string[];
  results: string[];
  impact: string;
  stack: string[];
  links: { label: string; href: string }[];
  metrics: { label: string; value: string }[];
};

export const featured: Featured[] = [
  {
    slug: "neural-surrogates",
    title: "Neural Surrogates for Large-Scale Physics",
    subtitle: "Parameter-conditioned Neural ODEs for galaxy-merger N-body simulations",
    year: "2024 – 2025",
    status: "Accepted to MNRAS · arXiv:2601.13019",
    blurb:
      "A learned surrogate for cosmological N-body simulations that runs orders of magnitude faster than direct integration while preserving physical fidelity.",
    hero: "phase",
    problem:
      "Direct N-body simulations of galaxy mergers cost CPU-weeks per run, blocking large-scale parameter sweeps and population studies.",
    approach: [
      "Trained a parameter-conditioned Neural ODE on simulation snapshots, learning the underlying continuous dynamics rather than discrete step maps.",
      "Conditioned the model on simulation parameters so a single network interpolates and modestly extrapolates to unseen regimes without retraining.",
      "Coupled surrogate predictions with a semi-analytical pipeline to estimate downstream observables — black-hole merger timescales — end-to-end.",
    ],
    results: [
      "Median fractional error of ~10⁻² against direct N-body ground truth across the trained regime.",
      "Black-hole merger timescales recovered within 1–24% of direct N-body integration.",
      "Inference orders of magnitude faster than the simulator, enabling population-scale studies.",
    ],
    impact:
      "First-author paper accepted to MNRAS. Demonstrates that learned dynamics + classical pipelines can deliver tractable, calibrated population-scale physics.",
    stack: ["PyTorch", "torchdiffeq", "NumPy", "SLURM", "HPC"],
    links: [{ label: "arXiv:2601.13019", href: "https://arxiv.org/abs/2601.13019" }],
    metrics: [
      { label: "Fractional error", value: "~10⁻²" },
      { label: "Merger timescale error", value: "1–24%" },
      { label: "Venue", value: "MNRAS" },
    ],
  },
  {
    slug: "tesseract-pinn",
    title: "Backend-Agnostic Inverse PINN via Tesseract",
    subtitle: "Cross-framework JAX ↔ PyTorch autodiff for inverse 1D Burgers",
    year: "2026 – Present",
    status:
      "Honourable Mention · Tesseract Hackathon 2025 · ongoing collab with Pasteur Labs",
    blurb:
      "An inverse-problem PINN that recovers physical parameters from noisy data, with the same model swappable between JAX and PyTorch backends — gradients flow end-to-end across frameworks.",
    hero: "burgers",
    problem:
      "Production scientific ML pipelines often span multiple autodiff frameworks. Bridging gradients between JAX and PyTorch usually requires hand-written adjoints or framework lock-in.",
    approach: [
      "Built a physics-informed neural network to infer the viscosity coefficient ν of the 1D Burgers equation from sparse, noisy observations.",
      "Implemented apply, vector_jacobian_product and jacobian_vector_product endpoints for both JAX and PyTorch backends inside Tesseract.",
      "Designed a backend-agnostic inverse pipeline so the same optimisation code drives either framework — and a JAX optimiser can compute gradients through a PyTorch model.",
    ],
    results: [
      "Identical optimisation loop runs unchanged against either backend, validating cross-framework autodiff via Tesseract VJP.",
      "Awarded Honourable Mention at the Tesseract Hackathon 2025.",
      "Selected for ongoing collaboration with Pasteur Labs.",
    ],
    impact:
      "Demonstrates a path to interoperable scientific ML pipelines — pick the best framework per component without giving up end-to-end gradient-based optimisation.",
    stack: ["JAX", "PyTorch", "Tesseract", "Docker"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers",
      },
    ],
    metrics: [
      { label: "Backends", value: "JAX + PyTorch" },
      { label: "Recognition", value: "Honourable Mention" },
      { label: "Partner", value: "Pasteur Labs" },
    ],
  },
  {
    slug: "parametric-cfo",
    title: "Parametric Flow-Matched Neural Operators",
    subtitle: "One model, a family of chaotic attractors",
    year: "Apr 2026",
    status: "alphaXiv × marimo Notebook Competition",
    blurb:
      "Extends Continuous Flow Operators (ICLR 2026) to the parametric setting: a single PyTorch model that generalises zero-shot across an entire family of Lorenz attractors with no retraining.",
    hero: "lorenz",
    problem:
      "Autoregressive surrogates collapse under sparse, irregular observations and require retraining for every new system parameter. Standard CFO trains one model per fixed system.",
    approach: [
      "Reproduced the CFO paper (Hou, Huang & Perdikaris, 2025) on the Lorenz attractor as a baseline.",
      "Conditioned the velocity-field network on the system parameter ρ, enabling a single model to represent the full attractor family for ρ ∈ [15, 50].",
      "Benchmarked against autoregressive baselines under sparse and irregular sampling regimes.",
      "Delivered as a fully reproducible marimo notebook runnable in-browser.",
    ],
    results: [
      "Trajectory accuracy on unseen ρ comparable to individually trained fixed-ρ models — without retraining.",
      "Robust to sparse and irregular observations where AR baselines diverge.",
      "Live in-browser demo with real-time resolution adjustment and trajectory launching.",
    ],
    impact:
      "Shows neural operators can collapse a parameter sweep into a single inference call — promising for surrogate modelling of parameterised dynamical systems in industry.",
    stack: ["PyTorch", "marimo", "JAX", "matplotlib"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/julian-8897/flow-matched-neural-operators",
      },
      {
        label: "Live notebook",
        href: "https://molab.marimo.io/notebooks/nb_KjqXxSQBsdQUwggJE6qDh3",
      },
    ],
    metrics: [
      { label: "Parameter range", value: "ρ ∈ [15, 50]" },
      { label: "Retraining", value: "None" },
      { label: "Format", value: "Live notebook" },
    ],
  },
  {
    slug: "arxiv-semantic-search",
    title: "Semantic Search for arXiv",
    subtitle: "End-to-end deployed search over scientific abstracts",
    year: "2025",
    status: "Live demo",
    blurb:
      "A full ML product loop — embeddings, vector store, refresh job, deployed app — that lets researchers find arXiv papers by meaning instead of keyword guessing.",
    hero: "embedding",
    problem:
      "Keyword search on arXiv misses cross-domain connections. Researchers spend disproportionate time guessing the right vocabulary instead of describing the idea.",
    approach: [
      "Generated dense embeddings using Ai2 SPECTER via sentence-transformers.",
      "Indexed embeddings in FAISS for sub-second cosine similarity over thousands of abstracts.",
      "Wrapped the index in a Streamlit UI with category selection and natural-language queries.",
      "Added a refresh job so the index keeps pace with new arXiv submissions.",
    ],
    results: [
      "Live, public Streamlit deployment — single-click access for any researcher.",
      "Cross-domain retrieval: a single query surfaces papers across CS, physics, math, and biology categories.",
    ],
    impact:
      "Demonstrates end-to-end ML product skills: embeddings, vector search, deployed UI, and a maintenance loop — the full path from research artefact to working tool.",
    stack: ["Python", "sentence-transformers", "FAISS", "Streamlit"],
    links: [
      { label: "Live demo", href: "https://arxiv-llm.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/julian-8897/arxiv-semantic-search" },
    ],
    metrics: [
      { label: "Embeddings", value: "SPECTER" },
      { label: "Index", value: "FAISS" },
      { label: "Status", value: "Deployed" },
    ],
  },
];

export type Selected = {
  title: string;
  blurb: string;
  href: string;
  stack: string[];
  stars?: number;
};

export const selected: Selected[] = [
  {
    title: "Hyperbolic Latent VAE",
    blurb:
      "Variational autoencoder with non-Euclidean (hyperbolic) latent space using wrapped normal pushforward measures — better fit for hierarchical data manifolds.",
    href: "https://github.com/julian-8897/hyperbolic-latent-vae",
    stack: ["PyTorch", "geoopt", "CelebA"],
    stars: 12,
  },
  {
    title: "Convolutional VAE",
    blurb:
      "Reference PyTorch implementation of a convolutional variational autoencoder, benchmarked on CelebA with reconstruction and generation experiments.",
    href: "https://github.com/julian-8897/conv-vae-pytorch",
    stack: ["PyTorch", "CelebA", "VAE"],
    stars: 20,
  },
];

export const skills = {
  Languages: ["Python", "SQL", "Bash", "C++"],
  "ML & data": [
    "PyTorch",
    "JAX",
    "scikit-learn",
    "pandas",
    "NumPy",
    "Hugging Face",
    "Pyro",
    "sentence-transformers",
    "FAISS",
  ],
  "Tooling & infra": [
    "Git",
    "Docker",
    "Streamlit",
    "Weights & Biases",
    "Linux",
    "SLURM / HPC",
    "marimo",
  ],
  Methods: [
    "Neural ODEs",
    "Neural operators",
    "PINNs",
    "Gaussian processes",
    "Bayesian inference",
    "Uncertainty quantification",
    "Time-series forecasting",
  ],
};

export const recognition = [
  {
    title: "Neural Surrogates for Large-Scale Physics Simulations",
    venue: "MNRAS · accepted",
    year: "2025",
    href: "https://arxiv.org/abs/2601.13019",
    type: "Publication",
  },
  {
    title: "Inverse-Problem PINN Solver via Tesseract",
    venue: "Tesseract Hackathon · Honourable Mention",
    year: "2025",
    href: "https://github.com/julian-8897/tesseract-pinn-inverse-burgers",
    type: "Award",
  },
  {
    title: "Parametric Flow-Matched Neural Operators",
    venue: "alphaXiv × marimo Notebook Competition",
    year: "2026",
    href: "https://github.com/julian-8897/flow-matched-neural-operators",
    type: "Competition",
  },
];
