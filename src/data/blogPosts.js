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
    author: {
      name: 'Cael Findley',
      bio: 'Full-Stack Software Engineer with over 5 years of experience building scalable web applications.',
      social: {
        github: 'https://github.com/cael1127',
        linkedin: 'https://www.linkedin.com/in/cael-findley-a45541394/'
      }
    },
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
    author: {
      name: 'Cael Findley',
      bio: 'Full-Stack Software Engineer with over 5 years of experience building scalable web applications.',
      social: {
        github: 'https://github.com/cael1127',
        linkedin: 'https://www.linkedin.com/in/cael-findley-a45541394/'
      }
    },
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
    author: {
      name: 'Cael Findley',
      bio: 'Full-Stack Software Engineer with over 5 years of experience building scalable web applications.',
      social: {
        github: 'https://github.com/cael1127',
        linkedin: 'https://www.linkedin.com/in/cael-findley-a45541394/'
      }
    },
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
    author: {
      name: 'Cael Findley',
      bio: 'Full-Stack Software Engineer with over 5 years of experience building scalable web applications.',
      social: {
        github: 'https://github.com/cael1127',
        linkedin: 'https://www.linkedin.com/in/cael-findley-a45541394/'
      }
    },
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
    author: {
      name: 'Cael Findley',
      bio: 'Full-Stack Software Engineer with over 5 years of experience building scalable web applications.',
      social: {
        github: 'https://github.com/cael1127',
        linkedin: 'https://www.linkedin.com/in/cael-findley-a45541394/'
      }
    },
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
];
