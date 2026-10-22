export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "ai-ml" | "backend" | "hackathon" | "systems";
  badge: string;
  githubUrl: string;
  description: string;
  longDescription: string;
  problem: string;
  approach: string;
  contributions: string[];
  technologies: string[];
  challenges: string[];
  learnings: string[];
  metricsOrOutputs?: string[];
  featured?: boolean;
}

export interface ResearchDossier {
  title: string;
  status: string;
  institution: string;
  focusArea: string;
  overview: string;
  motivation: string;
  proposedArchitecture: {
    name: string;
    description: string;
  }[];
  keyInnovations: string[];
  currentProgress: string[];
  nextMilestones: string[];
}

export const RESEARCH_PROJECT: ResearchDossier = {
  title: "Hybrid Transformer Networks for Predictive Maintenance of Industrial Electrical Systems",
  status: "Active Research & Model Development",
  institution: "Integrated M.Tech CSE, VIT Vellore",
  focusArea: "Time-Series Modeling, Physics-Informed ML, Transformer Architectures",
  overview:
    "Investigating deep temporal attention mechanisms combined with physics-informed inductive constraints to predict electrical equipment degradation and early insulation failure in industrial power equipment before catastrophic breakdown.",
  motivation:
    "Traditional vibration and acoustic monitoring methods often detect machine failure only in its final stages. High-frequency electrical current and voltage signature analysis (MCSA) captures degradation early, but suffers from severe harmonic distortion, nonlinear industrial load transitions, and non-stationary operating noise.",
  proposedArchitecture: [
    {
      name: "1. Multi-Rate Temporal Patch Tokenizer",
      description:
        "Segmenting raw high-frequency electrical sensor signals into structured multi-resolution patches to retain both microscopic harmonic transients and macroscopic thermal trends while reducing quadratic attention complexity.",
    },
    {
      name: "2. Physics-Informed Inductive Bias Module",
      description:
        "Embedding physical impedance constraints, symmetrical component decompositions, and electrical phase relationships into the embedding layer to penalize unphysical model predictions.",
    },
    {
      name: "3. Dilated Cross-Attention Transformer Backbone",
      description:
        "Utilizing sparse and dilated attention layers to discover multi-scale temporal correlations across distinct motor phases without exploding memory consumption.",
    },
    {
      name: "4. Dual Remaining Useful Life (RUL) & Fault Classification Head",
      description:
        "Simultaneously estimating monotonic remaining useful operating hours alongside discrete multi-class fault categorization (inter-turn stator winding faults, bearing eccentricity, and rotor bar fractures).",
    },
  ],
  keyInnovations: [
    "Harmonic-aware tokenization strategy tailored specifically for three-phase alternating current transients.",
    "Impedance-regularized loss formulation guiding the latent attention weights toward physically plausible degradation states.",
    "Lightweight edge-deployable transformer variant minimizing memory footprint for embedded industrial microcontrollers.",
  ],
  currentProgress: [
    "Formulated baseline tokenization pipelines and simulated electrical fault dataset benchmarks.",
    "Implemented prototype self-attention layers with temporal masking in PyTorch.",
    "Conducting ablation studies comparing PatchTST, Informer, and vanilla Transformer baselines against physical domain benchmarks.",
    "Drafting formal research methodology, mathematical derivations, and experimental evaluation protocols.",
  ],
  nextMilestones: [
    "Finalizing empirical benchmarking across hardware testbed datasets.",
    "Synthesizing comparative results across synthetic noise and varying load configurations.",
    "Completing research paper manuscript for peer-reviewed conference/journal submission.",
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "physics-patch-transformer",
    title: "Physics Patch Transformer",
    subtitle: "AI-Assisted Machine Learning for Physical & Dynamic Sequential Systems",
    category: "ai-ml",
    badge: "Machine Learning / Research",
    githubUrl: "https://github.com/srijitbanerjee2026-star/Physics-Patch-Transformer",
    description:
      "Exploration of patch-based self-attention networks regularized by physical differential priors to capture temporal continuum dynamics in noisy sequential datasets.",
    longDescription:
      "Physics Patch Transformer investigates adapting modern vision and time-series patch tokenization architectures to physical time-series systems. By segmenting continuous sensor signals into semantic patches, the model preserves local gradient relationships while uncovering long-range temporal correlations.",
    problem:
      "Standard sequence models struggle when modeling physical phenomena where data exhibits high sampling rates, strong physical continuity constraints, and localized high-frequency fluctuations.",
    approach:
      "Employs 1D patch embedding to aggregate temporal sub-windows into dense tokens, passing them through self-attention layers with physical consistency regularization.",
    contributions: [
      "Designed and coded the exploratory Jupyter notebook experimental framework.",
      "Implemented patch extraction, multi-head attention blocks, and comparative loss functions.",
      "Evaluated patch stride and kernel length sensitivity against non-patch baseline models.",
    ],
    technologies: ["Python", "PyTorch", "Jupyter Notebook", "NumPy", "Matplotlib", "SciPy"],
    challenges: [
      "Determining optimal patch dimensions that balance local frequency resolution with global temporal horizon.",
      "Preventing boundary discontinuities between adjacent patches during sequence reconstruction.",
    ],
    learnings: [
      "Patch tokenization substantially lowers computation compared to point-wise attention while enhancing noise robustness.",
      "Gained deep hands-on intuition for positional encoding strategies across physical time scales.",
    ],
    featured: true,
  },
  {
    id: "medvision-health-analytics",
    title: "MedVision AI",
    subtitle: "Clinical Triage & Health Report Analyzer via FastAPI & Ensemble ML",
    category: "hackathon",
    badge: "Hackathon / Health-Tech AI",
    githubUrl: "https://github.com/srijitbanerjee2026-star/MedVision-health-analytics-llm",
    description:
      "Multimodal medical diagnostic support tool synthesizing unstructured patient report text and clinical biomarkers using DistilBERT, XGBoost, and LightGBM.",
    longDescription:
      "Developed during a collaborative hackathon, MedVision AI addresses clinical triage delays by parsing unstructured doctor notes and lab tests, performing semantic risk classification, and predicting patient anomaly indicators via a high-performance FastAPI service.",
    problem:
      "Physicians and triage personnel face severe cognitive overload when analyzing lengthy, heterogeneous clinical laboratory reports across conflicting formats.",
    approach:
      "Constructed a dual-stream analytical pipeline: transformer embeddings (DistilBERT) process clinical text narratives, while gradient boosting ensembles (XGBoost & LightGBM) evaluate structured physiological biomarkers.",
    contributions: [
      "Engineered the asynchronous FastAPI backend server, REST API schemas, and request validation pipelines.",
      "Integrated the machine learning inference pipeline orchestrating DistilBERT embeddings with tabular boosting models.",
      "Authored API endpoints for real-time document upload, parsing, and structured JSON diagnostics payload delivery.",
    ],
    technologies: ["Python", "FastAPI", "DistilBERT", "XGBoost", "LightGBM", "Hugging Face", "Pandas", "Uvicorn"],
    challenges: [
      "Achieving low-latency inference on CPU runtimes during high-concurrency hackathon evaluation.",
      "Handling heterogeneous lab test inputs with irregular missing biomarker values.",
    ],
    learnings: [
      "Mastered building production-style asynchronous endpoints with Pydantic type safety in FastAPI.",
      "Learned effective ensemble hybridization: pairing deep semantic representations with tabular gradient boosting.",
    ],
    featured: true,
  },
  {
    id: "web-be1-api",
    title: "Web-BE1 Modular Backend",
    subtitle: "High-Performance REST Architecture & API Services in TypeScript",
    category: "backend",
    badge: "Backend Engineering",
    githubUrl: "https://github.com/srijitbanerjee2026-star/web-be1-api",
    description:
      "Scalable TypeScript backend engineering project demonstrating modular service-controller architecture, strict validation, and robust error handling.",
    longDescription:
      "Web-BE1 serves as a foundational blueprint for enterprise-grade Node.js and TypeScript server applications. It demonstrates separation of concerns, defensive validation, structured logging, and scalable route orchestration.",
    problem:
      "Monolithic and loosely typed backend prototypes quickly incur technical debt, race conditions, unhandled exceptions, and poor maintainability as route complexity grows.",
    approach:
      "Designed a decoupled layered architecture: strict request schema validation at the transport boundary, isolated business service domain logic, and clean repository data-access layers.",
    contributions: [
      "Engineered the core application framework using TypeScript and modern Node.js best practices.",
      "Configured robust middleware stacks: centralized error interception, rate limiting, and structured logging.",
      "Designed RESTful endpoint contracts with complete typing across request params, query, and response bodies.",
    ],
    technologies: ["TypeScript", "Node.js", "Express", "RESTful APIs", "JWT", "Zod/Validation", "ESLint"],
    challenges: [
      "Structuring comprehensive TypeScript generics to enforce end-to-end type safety from router down to database adapters.",
      "Graceful asynchronous error propagation without crashing the event loop.",
    ],
    learnings: [
      "Deepened practical understanding of TypeScript compiler options, interface segregation, and scalable backend design patterns.",
    ],
    featured: true,
  },
  {
    id: "recommendation-model",
    title: "Recommendation Engine",
    subtitle: "Collaborative & Content-Based Item Recommendation Modeling",
    category: "ai-ml",
    badge: "Data Science / ML",
    githubUrl: "https://github.com/srijitbanerjee2026-star/recommendation-model",
    description:
      "Machine learning recommendation algorithms exploring matrix factorization, user-item latent embeddings, and similarity metrics for personalized discovery.",
    longDescription:
      "An applied machine learning investigation analyzing recommendation architectures. The system compares classical collaborative filtering, cosine similarity item matching, and latent factor matrix decomposition on sparse user-item interaction datasets.",
    problem:
      "High sparsity in user-item matrices and cold-start dilemmas make delivering relevant, non-obvious content recommendations difficult.",
    approach:
      "Evaluated singular value decomposition (SVD) and cosine similarity nearest-neighbor graphs across interaction matrices to rank top-N candidate items.",
    contributions: [
      "Engineered data pre-processing and sparse interaction matrix pipelines in Python.",
      "Implemented recommendation scoring logic, top-K ranking heuristics, and evaluation loops.",
      "Benchmarked ranking precision, recall, and coverage across varying sparsity thresholds.",
    ],
    technologies: ["Python", "Scikit-Learn", "NumPy", "Pandas", "Matrix Factorization", "Jupyter"],
    challenges: [
      "Mitigating popularity bias where top items dominate recommendation lists at the expense of long-tail items.",
      "Memory efficiency when computing large pairwise distance matrices.",
    ],
    learnings: [
      "Understood how implicit versus explicit feedback fundamentally changes model loss formulations.",
      "Gained practical experience with embedding spaces and vector similarity search.",
    ],
    featured: false,
  },
  {
    id: "onmyway-delivery",
    title: "OnMyWay Peer-to-Peer Delivery",
    subtitle: "Collaborative Distributed Logistics & Route Dispatch System",
    category: "hackathon",
    badge: "Collaborative Systems",
    githubUrl: "https://github.com/srijitbanerjee2026-star/OnMyWay-peer-to-peer-delivery",
    description:
      "Collaborative project facilitating community-driven parcel delivery along existing commuter routes, reducing localized carbon footprint.",
    longDescription:
      "Built as a collaborative team endeavor, OnMyWay optimizes micro-logistics by matching travelers with nearby parcel delivery requests heading along their planned transit paths.",
    problem:
      "Last-mile urban delivery produces severe congestion and high courier costs, while thousands of commuters travel identical corridors daily with unused cargo capacity.",
    approach:
      "Created an interactive booking and matching platform linking sender pickup requests to commuter travel trajectories based on proximity thresholds.",
    contributions: [
      "Collaborated on backend route coordination logic and payload request validation.",
      "Contributed to client-server data synchronization and status state machine for dispatch tracking.",
      "Assisted in frontend interface integration and user journey flow testing.",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "REST APIs", "Geolocation APIs", "Git"],
    challenges: [
      "Synchronizing real-time package states (requested, accepted, transit, delivered) across multiple active user views.",
      "Team code review and merge conflict resolution across rapid delivery sprints.",
    ],
    learnings: [
      "Strengthened collaborative Git workflows, code reviews, and cross-functional team coordination.",
      "Learned the critical value of well-defined API contracts between frontend and backend contributors.",
    ],
    featured: false,
  },
  {
    id: "wall-e-signal",
    title: "Wall-E Signal & Event CLI",
    subtitle: "Time-Series Signal Processing & Developer Automation Tooling",
    category: "systems",
    badge: "Systems & Signals",
    githubUrl: "https://github.com/srijitbanerjee2026-star/wall-e-signal",
    description:
      "Python-based signal analysis scripts and CLI automation experiments for streaming data inspection, filtering, and event detection.",
    longDescription:
      "Wall-E Signal encompasses experimental code for digital signal processing, sensor time-series filtering (moving averages, Fourier transforms, bandpass filtering), and command-line data extraction.",
    problem:
      "Raw sensor streams frequently suffer from high-frequency electromagnetic noise, drift, and missing timestamps, necessitating modular preprocessing pipelines.",
    approach:
      "Developed modular Python scripts to parse time-indexed telemetry, compute spectral frequency features, and isolate anomalous deviations.",
    contributions: [
      "Authored digital filtering utilities in NumPy and SciPy.",
      "Built CLI argument parsing and batch evaluation scripts for fast data inspection.",
    ],
    technologies: ["Python", "SciPy", "NumPy", "CLI Tools", "Signal Processing"],
    challenges: [
      "Preserving signal peak fidelity while eliminating industrial power frequency harmonics.",
    ],
    learnings: [
      "Understood practical frequency-domain transforms (FFT) and their utility as feature inputs for deep learning models.",
    ],
    featured: false,
  },
];

export const TECHNICAL_SKILLS = [
  {
    category: "AI, Machine Learning & Research",
    status: "Active Implementation",
    skills: [
      { name: "Python", level: "Proficient", highlight: "Primary language for research and ML" },
      { name: "PyTorch", level: "Core Stack", highlight: "Model architectures, tensors, custom loss" },
      { name: "Transformers", level: "Core Stack", highlight: "Attention mechanisms, PatchTST, Hugging Face" },
      { name: "Time-Series Modeling", level: "Focus Area", highlight: "Predictive maintenance, sensor signals" },
      { name: "XGBoost & LightGBM", level: "Proficient", highlight: "Tabular benchmarks and clinical analytics" },
      { name: "Scikit-Learn", level: "Proficient", highlight: "Data preprocessing, evaluation, pipelines" },
      { name: "NumPy & Pandas", level: "Proficient", highlight: "Vectorized manipulation, sensor telemetry" },
    ],
  },
  {
    category: "Backend Engineering & Systems",
    status: "Active Implementation",
    skills: [
      { name: "TypeScript", level: "Proficient", highlight: "Type-safe backend services & APIs" },
      { name: "Node.js & Express", level: "Proficient", highlight: "Modular REST architectures" },
      { name: "FastAPI", level: "Proficient", highlight: "High-concurrency async ML microservices" },
      { name: "RESTful API Design", level: "Proficient", highlight: "Strict schema contracts & validation" },
      { name: "SQL & Databases", level: "Working Knowledge", highlight: "Relational modeling & query optimization" },
      { name: "Linux & Git", level: "Proficient", highlight: "Version control, bash scripting, dev workflows" },
    ],
  },
  {
    category: "Creative Engineering & 3D Web",
    status: "Active Exploration",
    skills: [
      { name: "Three.js & WebGL", level: "Intermediate", highlight: "Photorealistic shaders, scene graphs, lighting" },
      { name: "GLSL Shader Programming", level: "Intermediate", highlight: "Simplex noise, raymarching, black hole physics" },
      { name: "React & Next.js", level: "Proficient", highlight: "App router, SSR/CSR, interactive components" },
      { name: "Tailwind CSS", level: "Proficient", highlight: "Modern responsive design systems" },
      { name: "Framer Motion", level: "Proficient", highlight: "Kinetic UI micro-animations and transitions" },
    ],
  },
  {
    category: "Active Learning & Horizon",
    status: "Currently Exploring",
    skills: [
      { name: "Physics-Informed Neural Networks (PINNs)", level: "Exploring", highlight: "Integrating differential equations into loss" },
      { name: "Distributed Systems & Kafka", level: "Exploring", highlight: "High-throughput stream processing" },
      { name: "Quantitative Computing", level: "Exploring", highlight: "Financial time series & statistical arbitrage" },
    ],
  },
];

export const TIMELINE_MILESTONES = [
  {
    period: "2026 - Present",
    title: "Integrated M.Tech in Computer Science & Engineering",
    organization: "Vellore Institute of Technology (VIT), Vellore",
    description:
      "Enrolled in the 5-year integrated post-graduate program. Focusing deeply on advanced algorithmic foundations, distributed systems, deep learning mathematics, and computational modeling.",
    type: "academic",
    tags: ["Computer Science", "Higher Education", "AI / ML"],
  },
  {
    period: "2026",
    title: "Initiated Electrical Predictive Maintenance Research",
    organization: "Independent Academic Research",
    description:
      "Began designing 'Hybrid Transformer Networks for Predictive Maintenance of Industrial Electrical Systems'. Formulated patch-based tokenization pipelines and physical impedance inductive biases for early insulation degradation detection.",
    type: "research",
    tags: ["Transformers", "Predictive Maintenance", "Sensors", "PyTorch"],
  },
  {
    period: "2026",
    title: "MedVision AI & Hackathon Innovation",
    organization: "Health-Tech Hackathon",
    description:
      "Co-developed MedVision, an AI clinical triage tool. Engineered the FastAPI backend and integrated DistilBERT with tabular gradient boosting ensembles for automated patient report parsing.",
    type: "project",
    tags: ["FastAPI", "DistilBERT", "XGBoost", "Hackathon"],
  },
  {
    period: "2026",
    title: "Backend Microservices & Algorithmic Rigor",
    organization: "Continuous Engineering Practice",
    description:
      "Architected Web-BE1 modular REST services in TypeScript. Practiced competitive programming and data structure fundamentals on LeetCode to build rock-solid engineering habits.",
    type: "engineering",
    tags: ["TypeScript", "REST APIs", "LeetCode", "Algorithms"],
  },
  {
    period: "Foundations",
    title: "First Lines of Code & Scientific Curiosity",
    organization: "Self-Directed Discovery",
    description:
      "Discovered the power of Python, mathematical simulation, and creative web technologies. Developed a strong fascination for astrophysics, black hole physics, and computer graphics that inspired this portfolio.",
    type: "genesis",
    tags: ["Python", "Astrophysics", "Creative Coding"],
  },
];

export const FAQ_TERMINAL_COMMANDS: Record<string, string> = {
  help: "Available commands: bio, research, projects, stack, timeline, github, clear, audio",
  bio: "Srijit Banerjee // 1st Year Integrated M.Tech CSE at VIT Vellore, India. Focused on AI/ML, backend APIs, time-series forecasting, and 3D web systems.",
  research:
    "Flagship Research: 'Hybrid Transformer Networks for Predictive Maintenance of Industrial Electrical Systems'. Combining physics-informed inductive constraints with multi-rate temporal patch transformers.",
  projects:
    "Key Repositories: 1. Physics-Patch-Transformer | 2. MedVision AI (Hackathon) | 3. Web-BE1 (TypeScript API) | 4. Recommendation-Model | 5. OnMyWay (Delivery) | 6. Wall-E Signal",
  stack:
    "Primary: Python, PyTorch, Transformers, FastAPI, TypeScript, Node.js, Three.js, GLSL, SQL, Next.js, Tailwind CSS.",
  timeline:
    "VIT Vellore (Integrated M.Tech CSE) -> Applied Transformer Research -> Hackathon Engineering -> 3D Web Graphics.",
  github: "https://github.com/srijitbanerjee2026-star",
};
