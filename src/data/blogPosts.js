const author = {
  name: 'Cael Findley',
  bio: 'Full-Stack Software Engineer with over 5 years of experience building scalable web applications.',
  social: {
    github: 'https://github.com/cael1127',
    linkedin: 'https://www.linkedin.com/in/cael-findley-a45541394/'
  }
};

export const blogPosts = [
  {
    id: '1',
    title: 'Getting Started with Full-Stack Development',
    slug: 'getting-started-fullstack',
    excerpt: 'A comprehensive guide to building modern full-stack applications with React, Node.js, and MongoDB.',
    content: `
      <h2>Introduction</h2>
      <p>Full-stack development is one of the most sought-after skills in today's tech industry. This guide will walk you through the fundamentals of building modern web applications.</p>
      
      <h2>What is Full-Stack Development?</h2>
      <p>Full-stack development involves working on both the frontend (client-side) and backend (server-side) of web applications. A full-stack developer is proficient in:</p>
      <ul>
        <li>Frontend technologies (HTML, CSS, JavaScript, React, etc.)</li>
        <li>Backend technologies (Node.js, Express, databases, APIs)</li>
        <li>DevOps and deployment</li>
      </ul>
      
      <h2>Setting Up Your Development Environment</h2>
      <p>Before diving into development, you'll need to set up your environment:</p>
      <pre><code>npm install -g create-react-app
npm install -g nodemon</code></pre>
      
      <h2>Building Your First Full-Stack App</h2>
      <p>Start with a simple project structure and gradually add complexity. Focus on understanding the data flow between frontend and backend.</p>
      
      <h3>Frontend Setup</h3>
      <p>Use React for building interactive user interfaces. React's component-based architecture makes it perfect for scalable applications.</p>
      
      <h3>Backend Setup</h3>
      <p>Node.js with Express provides a robust backend framework. MongoDB offers flexible data storage for your applications.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Follow RESTful API design principles</li>
        <li>Implement proper error handling</li>
        <li>Use environment variables for configuration</li>
        <li>Write clean, maintainable code</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Full-stack development is a journey. Start with the basics, build projects, and continuously learn new technologies.</p>
    `,
    author,
    category: 'Full-Stack Development',
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Web Development'],
    publishedDate: '2024-01-15',
    updatedDate: '2024-01-15',
    featured: true,
    coverImage: null,
    seo: {
      metaDescription: 'Learn full-stack development with React, Node.js, and MongoDB. Comprehensive guide for beginners.',
      keywords: ['full-stack', 'react', 'nodejs', 'mongodb', 'web development']
    }
  },
  {
    id: '2',
    title: 'AI and Machine Learning in Modern Applications',
    slug: 'ai-ml-modern-applications',
    excerpt: 'Exploring how to integrate AI and ML models into production applications for enhanced user experiences.',
    content: `
      <h2>Introduction to AI/ML Integration</h2>
      <p>Artificial Intelligence and Machine Learning are transforming how we build applications. This post explores practical integration strategies.</p>
      
      <h2>Choosing the Right Model</h2>
      <p>Selecting the appropriate ML model depends on your use case. Consider factors like accuracy, latency, and resource requirements.</p>
      
      <h2>API Integration</h2>
      <p>Most modern applications integrate AI through APIs. Services like OpenAI, Anthropic, and custom models provide flexible options.</p>
      
      <h2>Performance Optimization</h2>
      <p>Optimize your AI integrations for production by implementing caching, batch processing, and efficient data pipelines.</p>
      
      <h2>Real-World Examples</h2>
      <p>From chatbots to recommendation systems, AI is powering innovative features across industries.</p>
    `,
    author,
    category: 'AI & Machine Learning',
    tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow', 'APIs'],
    publishedDate: '2024-01-20',
    updatedDate: '2024-01-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Learn how to integrate AI and ML models into production applications.',
      keywords: ['AI', 'machine learning', 'python', 'tensorflow', 'APIs']
    }
  },
  {
    id: '3',
    title: 'IT Infrastructure Best Practices',
    slug: 'it-infrastructure-best-practices',
    excerpt: 'Essential practices for managing IT infrastructure, from server administration to network security.',
    content: `
      <h2>Infrastructure Management</h2>
      <p>Effective IT infrastructure management is crucial for maintaining reliable systems. This guide covers essential practices.</p>
      
      <h2>Server Administration</h2>
      <p>Whether working with Windows or Linux servers, proper administration ensures system reliability and security.</p>
      
      <h2>Network Design</h2>
      <p>Designing scalable and secure networks requires understanding of segmentation, access control, and performance optimization.</p>
      
      <h2>Security Considerations</h2>
      <p>Implementing security best practices protects your infrastructure from threats and vulnerabilities.</p>
      
      <h2>Monitoring and Maintenance</h2>
      <p>Regular monitoring and proactive maintenance prevent issues before they impact users.</p>
    `,
    author,
    category: 'IT Infrastructure',
    tags: ['IT', 'Infrastructure', 'Networking', 'Security', 'DevOps'],
    publishedDate: '2024-01-25',
    updatedDate: '2024-01-25',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Best practices for managing IT infrastructure, server administration, and network security.',
      keywords: ['IT', 'infrastructure', 'networking', 'security', 'devops']
    }
  },
  {
    id: '4',
    title: 'Building Scalable React Applications',
    slug: 'scalable-react-applications',
    excerpt: 'Learn how to structure and optimize React applications for scale, performance, and maintainability.',
    content: `
      <h2>Component Architecture</h2>
      <p>Proper component architecture is the foundation of scalable React applications. Organize components logically and reuse code effectively.</p>
      
      <h2>State Management</h2>
      <p>Choose the right state management solution for your application size. From useState to Redux, each has its place.</p>
      
      <h2>Performance Optimization</h2>
      <p>Optimize React applications using techniques like code splitting, lazy loading, and memoization.</p>
      
      <h2>Testing Strategies</h2>
      <p>Comprehensive testing ensures your application remains reliable as it scales.</p>
    `,
    author,
    category: 'Frontend Development',
    tags: ['React', 'JavaScript', 'Frontend', 'Performance', 'Best Practices'],
    publishedDate: '2024-02-01',
    updatedDate: '2024-02-01',
    featured: true,
    coverImage: null,
    seo: {
      metaDescription: 'Learn how to build scalable and performant React applications.',
      keywords: ['react', 'javascript', 'frontend', 'performance', 'scalability']
    }
  },
  {
    id: '5',
    title: 'Cybersecurity Fundamentals for Developers',
    slug: 'cybersecurity-fundamentals',
    excerpt: 'Essential cybersecurity practices every developer should know to build secure applications.',
    content: `
      <h2>Security First</h2>
      <p>Security should be a priority from the start of development, not an afterthought.</p>
      
      <h2>Common Vulnerabilities</h2>
      <p>Understanding common vulnerabilities like SQL injection, XSS, and CSRF helps prevent security issues.</p>
      
      <h2>Authentication and Authorization</h2>
      <p>Implement secure authentication and proper authorization to protect user data and resources.</p>
      
      <h2>Secure Coding Practices</h2>
      <p>Follow secure coding practices and regularly update dependencies to patch vulnerabilities.</p>
    `,
    author,
    category: 'Cybersecurity',
    tags: ['Security', 'Cybersecurity', 'Best Practices', 'Authentication', 'Web Security'],
    publishedDate: '2024-02-05',
    updatedDate: '2024-02-05',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Essential cybersecurity practices for developers building secure applications.',
      keywords: ['security', 'cybersecurity', 'authentication', 'web security', 'best practices']
    }
  }
  ,
  {
    id: '6',
    title: 'Building a Real Portfolio That Engineers Respect',
    slug: 'portfolio-engineers-respect',
    excerpt: 'How to curate projects, write better case studies, and make your work feel credible to senior engineers.',
    content: `
      <h2>Why portfolios fail (even when the work is good)</h2>
      <p>Most portfolios aren’t rejected because the builder lacks skill. They’re rejected because the story feels vague: too many projects, not enough depth, and no evidence of real constraints.</p>

      <h2>Curate hard</h2>
      <ul>
        <li><strong>Fewer projects</strong> beats more projects. Aim for 4–8 “I can defend this” builds.</li>
        <li><strong>Remove duplicates</strong> (three dashboards = one dashboard).</li>
        <li><strong>Ship something real</strong>: a live site, a repo with tests, or a demo with a clear scope.</li>
      </ul>

      <h2>Write case studies like an engineer</h2>
      <ul>
        <li><strong>Problem</strong>: what was broken, slow, expensive, or risky?</li>
        <li><strong>Constraints</strong>: latency, cost, security, timeline, data quality.</li>
        <li><strong>Decisions</strong>: what you chose and what you rejected (and why).</li>
        <li><strong>Results</strong>: measurable improvement, or at least clear outcomes.</li>
      </ul>

      <h2>Make it easy to evaluate</h2>
      <p>Engineers skim. Make the first 10 seconds count: short summary, tech stack, what you personally built, and a link to the repo or live demo.</p>
    `,
    author,
    category: 'Career',
    tags: ['Portfolio', 'Career', 'Software Engineering', 'Writing'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: true,
    coverImage: null,
    seo: {
      metaDescription: 'A practical guide to building a portfolio senior engineers respect: curation, case studies, and credibility.',
      keywords: ['portfolio', 'career', 'software engineering', 'case study']
    }
  },
  {
    id: '7',
    title: 'From Demo to Production: Turning a Prototype into a Shippable System',
    slug: 'demo-to-production',
    excerpt: 'A checklist for turning a cool prototype into something reliable: errors, observability, security, and user experience.',
    content: `
      <h2>The gap between “works” and “shippable”</h2>
      <p>Demos prove an idea. Production systems survive bad inputs, bad networks, bad users, and bad days.</p>

      <h2>Minimum production checklist</h2>
      <ul>
        <li><strong>Input validation</strong> on every boundary (UI + API).</li>
        <li><strong>Error handling</strong> with user-friendly messages and safe fallbacks.</li>
        <li><strong>Observability</strong>: structured logs, basic metrics, and alerting.</li>
        <li><strong>Security defaults</strong>: least privilege, rate limiting, sane headers.</li>
        <li><strong>Performance budget</strong>: measure the slow paths and fix the worst one first.</li>
      </ul>

      <h2>Ship in slices</h2>
      <p>Instead of one big release, ship small slices that are complete end-to-end. Each slice should be testable, observable, and reversible.</p>
    `,
    author,
    category: 'Software Engineering',
    tags: ['Production', 'Architecture', 'Reliability', 'Shipping'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'A practical checklist for turning prototypes into production-ready systems.',
      keywords: ['production', 'reliability', 'architecture', 'shipping']
    }
  },
  {
    id: '8',
    title: 'Practical Threat Modeling for Full-Stack Apps',
    slug: 'practical-threat-modeling',
    excerpt: 'A lightweight threat modeling workflow you can do in 30 minutes that meaningfully improves security.',
    content: `
      <h2>Threat modeling doesn’t have to be heavy</h2>
      <p>You don’t need a 40-page doc. You need a repeatable process that catches obvious risks before they ship.</p>

      <h2>Start with data flow</h2>
      <ul>
        <li>What data do we collect?</li>
        <li>Where do we store it?</li>
        <li>Who can access it?</li>
        <li>How does it leave the system?</li>
      </ul>

      <h2>Common risk buckets</h2>
      <ul>
        <li><strong>Auth</strong>: session fixation, weak reset flows, missing MFA options.</li>
        <li><strong>Abuse</strong>: credential stuffing, scraping, bot signups.</li>
        <li><strong>Injection</strong>: SQL/NoSQL injection, template injection.</li>
        <li><strong>Data exposure</strong>: logs, backups, misconfigured buckets.</li>
      </ul>

      <h2>Pick three mitigations and implement them</h2>
      <p>Threat modeling only matters if it changes the system. Pick the top three risks and ship mitigations: rate limits, tighter auth checks, and safer defaults.</p>
    `,
    author,
    category: 'Cybersecurity',
    tags: ['Threat Modeling', 'Security', 'Web Apps'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'A lightweight threat modeling workflow for full-stack apps: faster, practical, and effective.',
      keywords: ['threat modeling', 'security', 'full-stack', 'web security']
    }
  },
  {
    id: '9',
    title: 'Rate Limiting, Abuse Prevention, and WAF Rules That Actually Work',
    slug: 'rate-limiting-and-waf',
    excerpt: 'How to think about real abuse scenarios and build layered defenses that don’t punish good users.',
    content: `
      <h2>Abuse is a product problem</h2>
      <p>Attackers optimize. If you only have one control, they’ll route around it. The goal is layered defense with graceful UX.</p>

      <h2>Layered controls</h2>
      <ul>
        <li><strong>Edge</strong>: basic WAF rules for common injection patterns.</li>
        <li><strong>Rate limits</strong>: per-IP + per-account limits; different buckets per endpoint.</li>
        <li><strong>Proof of work / challenges</strong> for suspicious traffic.</li>
        <li><strong>Detection</strong>: log abnormal patterns, alert on spikes.</li>
      </ul>

      <h2>Don’t block yourself</h2>
      <p>Implement allowlists for internal traffic, and test rate limits in staging with realistic load patterns.</p>
    `,
    author,
    category: 'Cybersecurity',
    tags: ['WAF', 'Rate Limiting', 'Abuse Prevention', 'Security'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Practical rate limiting and WAF guidance for real-world abuse prevention.',
      keywords: ['rate limiting', 'waf', 'abuse prevention', 'security']
    }
  },
  {
    id: '10',
    title: 'CI/CD That Doesn’t Break: A Minimal Pipeline With Real Guarantees',
    slug: 'cicd-minimal-guarantees',
    excerpt: 'A small CI/CD pipeline design that catches real failures without slowing you down.',
    content: `
      <h2>What CI should guarantee</h2>
      <ul>
        <li>Build succeeds from a clean checkout</li>
        <li>Tests run deterministically</li>
        <li>Linting prevents obvious regressions</li>
        <li>Deployments are traceable and rollbackable</li>
      </ul>

      <h2>Keep the pipeline simple</h2>
      <p>Start with three stages: <strong>verify</strong> (lint/test), <strong>build</strong>, <strong>deploy</strong>. Add complexity only when a failure mode justifies it.</p>

      <h2>Fast feedback wins</h2>
      <p>Run the cheapest checks first (format/lint), then unit tests, then slow integration tests. The goal is fast signal.</p>
    `,
    author,
    category: 'DevOps',
    tags: ['CI/CD', 'DevOps', 'GitHub Actions', 'Quality'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'A minimal CI/CD pipeline design that delivers real guarantees without unnecessary complexity.',
      keywords: ['ci/cd', 'devops', 'github actions', 'pipeline']
    }
  },
  {
    id: '11',
    title: 'RAG Without the Hype: What Matters',
    slug: 'rag-without-hype',
    excerpt: 'If you’re building RAG, focus on retrieval quality, evaluation, and UX—not fancy prompts.',
    content: `
      <h2>RAG is mostly retrieval</h2>
      <p>If retrieval is wrong, generation will be wrong confidently. Invest in chunking, embeddings, and filters.</p>

      <h2>Three high-leverage improvements</h2>
      <ul>
        <li><strong>Chunking</strong>: chunk by meaning (headings/sections), not fixed token windows.</li>
        <li><strong>Metadata</strong>: tag docs by source, date, and type for better filtering.</li>
        <li><strong>Evaluation</strong>: keep a small set of questions and track accuracy over time.</li>
      </ul>

      <h2>UX beats cleverness</h2>
      <p>Show sources, allow users to refine, and provide a “not sure” fallback. Great UX prevents silent failure.</p>
    `,
    author,
    category: 'AI & Machine Learning',
    tags: ['RAG', 'LLMs', 'Search', 'Evaluation'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Practical guidance for building RAG systems: chunking, retrieval, evaluation, and UX.',
      keywords: ['rag', 'llm', 'retrieval', 'evaluation']
    }
  },
  {
    id: '12',
    title: 'Shipping AI Features Safely: Guardrails, Fallbacks, and Observability',
    slug: 'shipping-ai-safely',
    excerpt: 'How to make AI features reliable in production: handle failure, prevent abuse, and measure outcomes.',
    content: `
      <h2>Assume the model will fail</h2>
      <p>Providers rate-limit, networks fail, and outputs drift. Your product needs safe defaults when AI is unavailable.</p>

      <h2>Guardrails</h2>
      <ul>
        <li><strong>Input checks</strong>: limit size, remove obvious prompt injection patterns.</li>
        <li><strong>Output checks</strong>: detect empty/unsafe output and retry or degrade gracefully.</li>
        <li><strong>Cost controls</strong>: cap tokens, cache repeated prompts, batch where possible.</li>
      </ul>

      <h2>Measure the right thing</h2>
      <p>Track user success (did the user accomplish the task?), not just latency. Add logging around failures and “I don’t know” cases.</p>
    `,
    author,
    category: 'AI & Machine Learning',
    tags: ['AI', 'Production', 'Reliability', 'Observability'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Best practices for shipping AI features safely with guardrails, fallbacks, and observability.',
      keywords: ['ai', 'production', 'guardrails', 'observability']
    }
  },
  {
    id: '13',
    title: 'Rust for Builders: Why It’s Worth It (and when it isn’t)',
    slug: 'rust-for-builders',
    excerpt: 'A pragmatic take on Rust: where it shines, where it slows you down, and how to adopt it sanely.',
    content: `
      <h2>Rust shines when failure is expensive</h2>
      <p>Rust pays off when correctness and performance matter: long-running services, tooling, and systems code.</p>

      <h2>What makes Rust worth it</h2>
      <ul>
        <li><strong>Memory safety</strong> without garbage collection</li>
        <li><strong>Fearless refactoring</strong> with strong types</li>
        <li><strong>Performance</strong> you can predict</li>
      </ul>

      <h2>When not to use Rust</h2>
      <p>If you’re iterating on product-market fit and performance doesn’t matter yet, Rust can be overkill. Pick the simplest tool that ships.</p>
    `,
    author,
    category: 'Systems',
    tags: ['Rust', 'Systems', 'Performance', 'Tooling'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'A pragmatic guide to using Rust: benefits, tradeoffs, and adoption strategies.',
      keywords: ['rust', 'systems', 'performance', 'programming languages']
    }
  },
  {
    id: '14',
    title: 'Designing for Performance: Frontend Wins Users Actually Feel',
    slug: 'frontend-performance-wins',
    excerpt: 'Small changes that make your UI feel fast: loading states, layout stability, and rendering strategy.',
    content: `
      <h2>Perceived performance is the product</h2>
      <p>Users don’t care about your Lighthouse score if the interface feels sluggish. Make the UI feel responsive first.</p>

      <h2>High-impact wins</h2>
      <ul>
        <li><strong>Skeleton loading</strong> instead of spinners</li>
        <li><strong>Prevent layout shift</strong> with fixed aspect ratios</li>
        <li><strong>Render less</strong>: paginate, virtualize, memoize</li>
        <li><strong>Defer non-critical work</strong> after first paint</li>
      </ul>

      <h2>Measure, then optimize</h2>
      <p>Pick one slow path, instrument it, then fix it. Repeat. That’s how performance improves sustainably.</p>
    `,
    author,
    category: 'Frontend Development',
    tags: ['Performance', 'React', 'UX', 'Web'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'Practical frontend performance improvements that users can feel.',
      keywords: ['frontend performance', 'react', 'ux', 'web performance']
    }
  },
  {
    id: '15',
    title: 'Debugging Like a Pro: A Repeatable Workflow for Hard Bugs',
    slug: 'debugging-workflow',
    excerpt: 'A step-by-step debugging process that scales from small issues to production incidents.',
    content: `
      <h2>Start with a reproduction</h2>
      <p>If you can’t reproduce a bug, you can’t reliably fix it. Reduce the problem until it’s stable and repeatable.</p>

      <h2>Make a hypothesis</h2>
      <p>Don’t thrash. Write down what you think is happening, then design a test that could prove you wrong.</p>

      <h2>Instrument aggressively</h2>
      <ul>
        <li>Add logs with context (not spam)</li>
        <li>Capture inputs that trigger the issue</li>
        <li>Measure timing for race conditions</li>
      </ul>

      <h2>Fix the class of bug</h2>
      <p>Prefer fixes that prevent the entire category: validation, timeouts, retries, and better invariants.</p>
    `,
    author,
    category: 'Software Engineering',
    tags: ['Debugging', 'Reliability', 'Engineering'],
    publishedDate: '2026-04-20',
    updatedDate: '2026-04-20',
    featured: false,
    coverImage: null,
    seo: {
      metaDescription: 'A repeatable debugging workflow for hard bugs and production issues.',
      keywords: ['debugging', 'reliability', 'software engineering']
    }
  }
];
