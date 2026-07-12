/**
 * Case-study content for personal / systems projects that live on GitHub.
 * Written honestly: these are engineering explorations, framed by intent,
 * approach, and process rather than invented production metrics.
 */

export const systemsCaseStudies = {
  aquaFarm: {
    title: 'AquaFarm',
    subtitle: 'Aquaculture monitoring and ops tooling',
    github: 'cael1127/aquaFarm',
    accent: '#A31F34',
    problem:
      'Aquaculture operations generate constant environmental and inventory signals — water quality, stock counts, harvest timing — but the data usually lives in spreadsheets and memory. The goal was a monitoring surface that turns that noise into something an operator can act on.',
    approach:
      'A TypeScript application modeling farm sites, sensor readings, and stock, with dashboards that prioritize the few numbers that actually change a decision. Built to be understandable by ops, not just engineers.',
    process: [
      'Modeled the domain: sites, tanks/beds, readings, and stock',
      'Designed dashboards around decisions, not raw metrics',
      'Built typed data workflows for ingesting and normalizing readings',
      'Iterated on layouts that stay legible on a phone in the field',
    ],
    technicalDecisions: [
      'TypeScript end-to-end for a trustworthy domain model',
      'Kept data transforms pure and testable, away from UI',
      'Favored small, composable views over one mega-dashboard',
    ],
    stack: ['TypeScript', 'React', 'Data workflows', 'Charts'],
    challenges: [
      'Turning noisy sensor data into calm, actionable views',
      'Field-first UX: readable outdoors, on small screens',
      'Modeling perishable, living inventory honestly',
    ],
    results: [
      'A working monitoring surface for aquaculture data',
      'Typed, testable data pipeline',
      'Dashboards aimed at decisions rather than vanity charts',
    ],
    impact:
      'Groundwork for treating a farm like an observable system — where conditions and stock are visible instead of remembered.',
    lessons: [
      'Ops tooling wins by removing noise, not adding charts',
      'The domain model is the product; the UI just exposes it',
    ],
    highlights: ['Domain-driven model', 'Typed data workflows', 'Field-first dashboards'],
  },

  boltPlanner: {
    title: 'BoltPlanner',
    subtitle: 'Planning tooling for clarity and speed',
    github: 'cael1127/boltPlanner',
    accent: '#A31F34',
    problem:
      'Most planning tools optimize for feature checklists instead of the actual loop of capturing a thought, organizing it, and executing. Friction in that loop is where planning apps quietly fail.',
    approach:
      'A focused planning product built around fast capture and clean organization — the shortest path from idea to a structured, executable plan.',
    process: [
      'Mapped the capture → organize → execute loop',
      'Designed for keyboard-speed capture with minimal chrome',
      'Built a typed data layer for tasks and structure',
      'Tuned interactions so the tool disappears behind the work',
    ],
    technicalDecisions: [
      'TypeScript for confident refactors as the model grew',
      'Optimistic, keyboard-first interactions over modal-heavy flows',
      'State kept simple and predictable to avoid planning-tool bloat',
    ],
    stack: ['TypeScript', 'React', 'State management', 'UX'],
    challenges: [
      'Fast capture without sacrificing structure',
      'Avoiding the feature-bloat that kills planning tools',
      'Interaction design that respects flow state',
    ],
    results: [
      'A planning surface focused on the real work loop',
      'Low-friction capture and organization',
      'Clean, predictable execution flows',
    ],
    impact:
      'A demonstration that planning tools get better by removing steps, not adding panels.',
    lessons: [
      'Speed of capture matters more than breadth of features',
      'Every extra click is a tax on the thing being planned',
    ],
    highlights: ['Fast capture', 'Keyboard-first UX', 'Predictable state'],
  },

  grabby: {
    title: 'Grabby',
    subtitle: 'Practical capture and workflow utility',
    github: 'cael1127/grabby',
    accent: '#A31F34',
    problem:
      'Small, repetitive capture-and-transform tasks add up. Grabby explores building a lightweight utility that handles those workflows without reaching for a heavy tool.',
    approach:
      'A JavaScript utility focused on doing a narrow job well — capture, transform, and hand off — with a surface small enough to actually use daily.',
    process: [
      'Identified the repetitive workflow worth automating',
      'Built a minimal, composable core',
      'Kept the interface small and predictable',
      'Iterated based on real day-to-day use',
    ],
    technicalDecisions: [
      'Kept the dependency surface minimal for portability',
      'Composable functions over a monolithic tool',
      'Optimized for the common path, not every edge case',
    ],
    stack: ['JavaScript', 'Tooling'],
    challenges: [
      'Scoping a utility so it stays sharp',
      'Balancing flexibility against simplicity',
    ],
    results: [
      'A usable capture/workflow helper',
      'Small, composable, and portable',
    ],
    impact: 'A reminder that a tightly-scoped tool often beats a heavy one.',
    lessons: [
      'Utilities earn their keep by staying small',
      'Say no to features to keep the core sharp',
    ],
    highlights: ['Minimal core', 'Composable', 'Daily-use focus'],
  },

  neurals: {
    title: 'Neurals',
    subtitle: 'Systems-level neural building blocks in Rust',
    github: 'cael1127/neurals',
    accent: '#A31F34',
    problem:
      'Using a neural framework is different from understanding one. Neurals is a from-first-principles exploration of the compute primitives underneath, in Rust, prioritizing depth over polish.',
    approach:
      'Implement the core pieces — tensors, operations, and the math of forward/backward passes — directly, so the abstractions are earned rather than imported.',
    process: [
      'Implemented core numeric primitives from scratch',
      'Built up operations and composition',
      'Worked through forward and backward computation',
      'Prioritized correctness and clarity over benchmarks',
    ],
    technicalDecisions: [
      'Rust for control over memory and performance',
      'From-scratch primitives to expose the real mechanics',
      'Clarity-first implementation over premature optimization',
    ],
    stack: ['Rust', 'Systems', 'Numerical computing'],
    challenges: [
      'Getting the math right without a framework safety net',
      'Managing memory and performance deliberately',
      'Keeping low-level code readable',
    ],
    results: [
      'Hand-built neural/compute primitives',
      'A working mental model of what frameworks hide',
    ],
    impact:
      'Depth that pays off everywhere — knowing what the abstractions cost and why they exist.',
    lessons: [
      'Building it yourself is the fastest way to actually understand it',
      'Rust rewards deliberate design over quick hacks',
    ],
    highlights: ['From-scratch primitives', 'Rust performance', 'Depth over polish'],
  },

  AtlusPersonal: {
    title: 'Atlus',
    subtitle: 'End-to-end product exploration',
    github: 'cael1127/AtlusPersonal',
    accent: '#A31F34',
    problem:
      'It is easy to build a feature; it is harder to own a whole product — design, implementation, and the decisions in between. Atlus is that end-to-end exercise.',
    approach:
      'Take a product from concept through UI and implementation solo, making the full stack of decisions and living with the tradeoffs.',
    process: [
      'Framed the product concept and scope',
      'Designed the core flows and UI',
      'Implemented across the stack in TypeScript',
      'Refined based on using the thing end to end',
    ],
    technicalDecisions: [
      'TypeScript for a maintainable full-stack codebase',
      'Design and implementation kept in one head for coherence',
      'Scoped ruthlessly to ship something whole',
    ],
    stack: ['TypeScript', 'Full-stack', 'Product design'],
    challenges: [
      'Owning both design and engineering decisions',
      'Keeping scope shippable as a solo build',
      'Coherence from concept to UI',
    ],
    results: [
      'A complete, self-owned product build',
      'Design and implementation that hang together',
    ],
    impact: 'Proof of full-stack product ownership — not just contributing to one.',
    lessons: [
      'Coherence comes from one clear point of view',
      'Shipping whole beats shipping perfect parts',
    ],
    highlights: ['Concept to UI', 'Solo full-stack', 'Coherent product'],
  },

  aisw: {
    title: 'AISW',
    subtitle: 'Applied software experiments',
    github: 'cael1127/aisw',
    accent: '#A31F34',
    problem:
      'A sandbox for applied software patterns — a place to try interactive surfaces and implementation ideas without the ceremony of a full product.',
    approach:
      'Prototype patterns quickly in JavaScript, keep what works, and treat the repo as a living notebook of applied techniques.',
    process: [
      'Prototyped interactive patterns',
      'Kept the useful ones, discarded the rest',
      'Refined implementations worth reusing',
    ],
    technicalDecisions: [
      'JavaScript for fast iteration',
      'Bias toward small, runnable experiments',
    ],
    stack: ['JavaScript'],
    challenges: ['Keeping experiments focused', 'Extracting reusable ideas'],
    results: ['A catalog of applied patterns', 'Reusable interactive techniques'],
    impact: 'A steady way to convert curiosity into technique.',
    lessons: ['Small experiments compound', 'Prototypes teach faster than plans'],
    highlights: ['Rapid prototyping', 'Applied patterns', 'Living notebook'],
  },

  physics: {
    title: 'Physics',
    subtitle: 'Low-level simulation in C',
    github: 'cael1127/physics',
    accent: '#A31F34',
    problem:
      'Physics simulation is where performance and correctness meet. Writing it in C means owning the memory, the math, and the loop.',
    approach:
      'Implement performance-oriented simulations in C, focusing on tight loops, deliberate memory use, and numerically sound integration.',
    process: [
      'Implemented core simulation math',
      'Tuned the update loop for performance',
      'Managed memory explicitly and deliberately',
      'Validated behavior against expected physics',
    ],
    technicalDecisions: [
      'C for full control over performance and memory',
      'Explicit data layout for cache-friendly loops',
      'Correct integration over clever shortcuts',
    ],
    stack: ['C', 'Simulation', 'Numerical methods'],
    challenges: [
      'Numerical stability in the integration loop',
      'Manual memory management without leaks',
      'Performance without sacrificing correctness',
    ],
    results: [
      'Working performance-oriented simulations',
      'Hands-on control of the compute loop',
    ],
    impact: 'Low-level fluency that informs performance decisions everywhere else.',
    lessons: [
      'C makes the cost of every choice visible',
      'Correct-then-fast beats fast-then-wrong',
    ],
    highlights: ['C performance', 'Explicit memory', 'Sound integration'],
  },

  terminalUI: {
    title: 'Terminal UI',
    subtitle: 'Console UX with intent',
    github: 'cael1127/terminalUI',
    accent: '#A31F34',
    problem:
      'Terminal interfaces are often an afterthought. This explores treating the console as a real UX surface — deliberate layout, interaction, and feedback.',
    approach:
      'Build a Rust terminal UI that takes interaction seriously: clear state, responsive input, and a layout that respects the constraints of the console.',
    process: [
      'Designed the interaction model for the console',
      'Implemented rendering and input handling in Rust',
      'Refined feedback and layout for clarity',
    ],
    technicalDecisions: [
      'Rust for performance and reliability in the render loop',
      'Explicit state model for predictable UI',
      'Layout designed around terminal constraints, not against them',
    ],
    stack: ['Rust', 'CLI', 'UX'],
    challenges: [
      'Responsive interaction inside terminal limits',
      'Clear feedback without a graphical canvas',
      'Managing render state cleanly',
    ],
    results: [
      'A considered terminal UI',
      'Clean interactions inside the console',
    ],
    impact: 'A case that good UX applies even where there are no pixels to spare.',
    lessons: [
      'Constraints sharpen interaction design',
      'The terminal deserves real UX thinking',
    ],
    highlights: ['Console UX', 'Rust render loop', 'Predictable state'],
  },
};

// Order used for “next project” navigation.
export const systemsOrder = [
  'aquaFarm',
  'boltPlanner',
  'neurals',
  'AtlusPersonal',
  'grabby',
  'aisw',
  'physics',
  'terminalUI',
];

export function getSystemsCaseStudy(id) {
  return systemsCaseStudies[id] || null;
}
