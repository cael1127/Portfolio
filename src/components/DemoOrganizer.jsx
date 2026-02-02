import React, { useState, useMemo } from 'react';
import AnimatedCard from './AnimatedCard';
import FloatingParticles from './FloatingParticles';
import GlassCard from './reactbits/GlassCard';
import EnhancedCard from './reactbits/EnhancedCard';
import BounceCard from './reactbits/BounceCard';
import SpotlightCard from './reactbits/SpotlightCard';
import ScrollReveal from './reactbits/ScrollReveal';
import GlareHover from './reactbits/GlareHover';
import { motion } from 'framer-motion';
import { getIcon, categoryIcons } from '../utils/iconMapping';

const DemoOrganizer = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'compact'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'name', 'difficulty', 'newest'
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const demoCategories = {
    'ai-ml': {
      name: 'AI & Machine Learning',
      description: 'Artificial intelligence and machine learning applications',
      iconKey: 'ai-ml',
      demos: [
        {
          id: 'fraud-detection',
          name: 'Fraud Detection System',
          description: 'AI-powered financial fraud detection with real-time analysis',
          iconKey: 'fraud-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'TensorFlow', 'Scikit-learn'],
          features: ['Real-time analysis', 'Pattern recognition', 'Risk scoring']
        },
        {
          id: 'deepfake-detection',
          name: 'Deepfake Detection',
          description: 'Advanced deepfake detection using computer vision',
          iconKey: 'deepfake-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'OpenCV', 'TensorFlow'],
          features: ['Face analysis', 'Video processing', 'Confidence scoring'],
          hasProjectPage: true
        },
        {
          id: 'resume-analyzer',
          name: 'AI Resume Analyzer',
          description: 'Intelligent resume analysis with skill matching',
          iconKey: 'resume-analyzer',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'Machine Learning'],
          features: ['Skill extraction', 'Candidate scoring', 'Recommendations'],
          hasProjectPage: true
        },
        {
          id: 'ai-assistant',
          name: 'AI Assistant',
          description: 'Intelligent conversational AI with natural language processing',
          iconKey: 'ai-assistant',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'API Integration'],
          features: ['Natural conversations', 'Context awareness', 'Smart responses'],
          hasProjectPage: true
        },
        {
          id: 'snake-ai',
          name: 'Snake AI with Reinforcement Learning',
          description: 'AI learns to play Snake using neural networks and genetic algorithms',
          iconKey: 'snake-ai',
          difficulty: 'Advanced',
          technologies: ['Python', 'Neural Networks', 'Genetic Algorithms'],
          features: ['Reinforcement Learning', 'Real-time training', 'Performance metrics'],
          hasProjectPage: true
        },
        {
          id: 'ai-agents',
          name: 'AI Agents in Pure Python',
          description: 'Multi-agent system with different AI behaviors and coordination',
          iconKey: 'ai-agents',
          difficulty: 'Advanced',
          technologies: ['Python', 'Multi-Agent Systems', 'Behavior Trees'],
          features: ['Agent coordination', 'Behavior patterns', 'Environment simulation'],
          hasProjectPage: true
        },
        {
          id: 'sentiment-analysis',
          name: 'Sentiment Analysis with Transformers',
          description: 'Advanced sentiment analysis using VADER, Transformers, and NLTK',
          iconKey: 'sentiment-analysis',
          difficulty: 'Intermediate',
          technologies: ['Python', 'Transformers', 'NLTK', 'VADER'],
          features: ['Text analysis', 'Sentiment scoring', 'Detailed breakdowns'],
          hasProjectPage: true
        },
        {
          id: 'ai-language-model',
          name: 'Personal AI Language Model Development',
          description: 'Built transformer-based language model from scratch, exploring tokenization, embeddings, attention mechanisms, and training workflows',
          iconKey: 'ai-language-model',
          difficulty: 'Advanced',
          technologies: ['Python', 'Neural Networks', 'Transformers', 'Machine Learning'],
          features: ['Transformer architecture', 'Tokenization', 'Embeddings', 'Attention mechanisms', 'Training workflows'],
          hasProjectPage: false,
          isResumeProject: true
        },
        {
          id: 'bert-language-model',
          name: 'BERT Style Language Model Implementation',
          description: 'Implemented BERT-like model with base programming libraries, emphasizing neural network components, optimizers, and applied ML theory',
          iconKey: 'bert-language-model',
          difficulty: 'Advanced',
          technologies: ['Python', 'BERT', 'Neural Networks', 'Optimizers', 'ML Theory'],
          features: ['BERT architecture', 'Neural network components', 'Optimizers', 'Applied ML theory'],
          hasProjectPage: false,
          isResumeProject: true
        },
        {
          id: 'object-detection',
          name: 'Real-time Object Detection',
          description: 'Live webcam detection with bounding boxes and confidence',
          iconKey: 'object-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'TensorFlow', 'OpenCV'],
          features: ['Live detection', 'Bounding boxes', 'Confidence heatmap'],
          hasProjectPage: true
        },
        {
          id: 'audio-transcription',
          name: 'Audio Transcription',
          description: 'Accurate audio-to-text with timestamps and speaker segments',
          iconKey: 'audio-transcription',
          difficulty: 'Intermediate',
          technologies: ['Python', 'ASR', 'WebAudio'],
          features: ['Upload audio', 'Timestamps', 'Export SRT'],
          hasProjectPage: true
        },
        {
          id: 'ai-code-generation',
          name: 'AI Code Generation Assistant',
          description: 'Multi-model code generation with GPT-4, Claude, and CodeLlama',
          iconKey: 'ai-code-generation',
          difficulty: 'Advanced',
          technologies: ['React', 'OpenAI API', 'Anthropic API', 'Python'],
          features: ['Multi-model support', 'Real-time generation', 'Code history', 'Syntax highlighting'],
          hasProjectPage: true
        },
        {
          id: 'ml-training-dashboard',
          name: 'ML Model Training Dashboard',
          description: 'Real-time training visualization and hyperparameter tuning',
          iconKey: 'ml-training-dashboard',
          difficulty: 'Advanced',
          technologies: ['TensorFlow', 'Keras', 'Python', 'React'],
          features: ['Real-time metrics', 'Hyperparameter tuning', 'Model comparison', 'Visualization'],
          hasProjectPage: true
        },
        {
          id: 'computer-vision-pipeline',
          name: 'Computer Vision Pipeline',
          description: 'End-to-end image processing, augmentation, and model inference',
          iconKey: 'computer-vision-pipeline',
          difficulty: 'Advanced',
          technologies: ['OpenCV', 'TensorFlow', 'Python', 'NumPy'],
          features: ['Image preprocessing', 'Data augmentation', 'Feature extraction', 'Model inference'],
          hasProjectPage: true
        },
        {
          id: 'nlp-sentiment-api',
          name: 'NLP Sentiment Analysis API',
          description: 'Production-ready REST API for multi-language sentiment analysis',
          iconKey: 'nlp-sentiment-api',
          difficulty: 'Intermediate',
          technologies: ['Flask', 'Python', 'Transformers', 'BERT'],
          features: ['Multi-language support', 'Batch processing', 'REST API', 'Real-time analysis'],
          hasProjectPage: true
        }
      ]
    },
    'devops': {
      name: 'DevOps & Infrastructure',
      description: 'CI/CD, containerization, orchestration, and infrastructure as code',
      iconKey: 'devops',
      demos: [
        {
          id: 'cicd-pipeline',
          name: 'CI/CD Pipeline with GitHub Actions',
          description: 'Automated testing, deployment, and monitoring',
          iconKey: 'cicd-pipeline',
          difficulty: 'Intermediate',
          technologies: ['GitHub Actions', 'YAML', 'Docker', 'Node.js'],
          features: ['Automated build', 'Testing', 'Deployment', 'Monitoring'],
          hasProjectPage: true
        },
        {
          id: 'docker-platform',
          name: 'Docker Containerization Platform',
          description: 'Multi-stage builds, orchestration, and production deployment',
          iconKey: 'docker-platform',
          difficulty: 'Intermediate',
          technologies: ['Docker', 'Docker Compose', 'Multi-stage Builds', 'Health Checks'],
          features: ['Containerization', 'Orchestration', 'Health checks', 'Volume management'],
          hasProjectPage: true
        },
        {
          id: 'kubernetes-management',
          name: 'Kubernetes Cluster Management',
          description: 'Deployment, service mesh, auto-scaling, and monitoring',
          iconKey: 'kubernetes-management',
          difficulty: 'Advanced',
          technologies: ['Kubernetes', 'Kubectl', 'Helm', 'Prometheus'],
          features: ['Deployment management', 'Auto-scaling', 'Service discovery', 'Monitoring'],
          hasProjectPage: true
        },
        {
          id: 'terraform-iac',
          name: 'Infrastructure as Code (Terraform)',
          description: 'AWS/GCP infrastructure provisioning, state management, and modules',
          iconKey: 'terraform-iac',
          difficulty: 'Advanced',
          technologies: ['Terraform', 'AWS', 'GCP', 'HCL'],
          features: ['Infrastructure as code', 'State management', 'Modules', 'Multi-cloud'],
          hasProjectPage: true
        },
        {
          id: 'network-design',
          name: 'Network Design and Security Simulation',
          description: 'Designed network architectures with focus on reliability, scalability, and security principles including segmentation and access control',
          iconKey: 'network-design',
          difficulty: 'Advanced',
          technologies: ['Network Architecture', 'Security Design', 'Access Control', 'Network Segmentation'],
          features: ['Enterprise network design', 'Security principles', 'Network segmentation', 'Access control'],
          hasProjectPage: false,
          isResumeProject: true
        },
        {
          id: 'academic-network-design',
          name: 'Academic Network Design Competition',
          description: 'Led team in creating enterprise network solution balancing performance, security, and cost efficiency; presented full technical documentation',
          iconKey: 'academic-network-design',
          difficulty: 'Advanced',
          technologies: ['Network Design', 'Enterprise Solutions', 'Technical Documentation'],
          features: ['Team leadership', 'Enterprise network solution', 'Performance optimization', 'Cost efficiency'],
          hasProjectPage: false,
          isResumeProject: true
        }
      ]
    },
    'security': {
      name: 'Security & Cybersecurity',
      description: 'Vulnerability assessment, penetration testing, encryption, and monitoring',
      iconKey: 'security',
      demos: [
        {
          id: 'vulnerability-scanner',
          name: 'Vulnerability Scanner',
          description: 'Automated scanning, risk assessment, reporting, and remediation guides',
          iconKey: 'vulnerability-scanner',
          difficulty: 'Advanced',
          technologies: ['Python', 'Nmap', 'CVE Database', 'OWASP'],
          features: ['Automated scanning', 'SQL injection detection', 'XSS detection', 'Security headers'],
          hasProjectPage: true
        },
        {
          id: 'penetration-testing',
          name: 'Penetration Testing Framework',
          description: 'Reconnaissance, exploitation, post-exploitation, and reporting',
          iconKey: 'penetration-testing',
          difficulty: 'Advanced',
          technologies: ['Python', 'Nmap', 'SQLMap', 'Metasploit'],
          features: ['Reconnaissance', 'Vulnerability assessment', 'Exploitation', 'Reporting'],
          hasProjectPage: true
        },
        {
          id: 'encryption-system',
          name: 'Encryption & Key Management System',
          description: 'AES/RSA encryption, key rotation, secure storage, and API integration',
          iconKey: 'encryption-system',
          difficulty: 'Advanced',
          technologies: ['Python', 'Cryptography', 'AES', 'RSA'],
          features: ['Symmetric encryption', 'Asymmetric encryption', 'Key rotation', 'Secure storage'],
          hasProjectPage: true
        },
        {
          id: 'security-monitoring',
          name: 'Security Monitoring Dashboard',
          description: 'Real-time threat detection, log analysis, alerting, and incident response',
          iconKey: 'security-monitoring',
          difficulty: 'Advanced',
          technologies: ['Python', 'ELK Stack', 'Splunk', 'SIEM'],
          features: ['Threat detection', 'Log analysis', 'Alerting', 'Incident response'],
          hasProjectPage: true
        },
        {
          id: 'waf',
          name: 'Web Application Firewall (WAF)',
          description: 'Request filtering, rate limiting, SQL injection protection, and XSS blocking',
          iconKey: 'waf',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'Express', 'React', 'Rule Engine'],
          features: ['Request filtering', 'Rate limiting', 'SQL injection protection', 'XSS blocking', 'IP whitelisting'],
          hasProjectPage: true
        },
        {
          id: 'siem',
          name: 'SIEM/Log Analysis System',
          description: 'Real-time log ingestion, threat detection, alerting, and dashboard visualization',
          iconKey: 'siem',
          difficulty: 'Advanced',
          technologies: ['Python', 'ELK Stack', 'React', 'WebSocket'],
          features: ['Real-time log ingestion', 'Threat detection', 'Alerting', 'Dashboard visualization', 'Log correlation'],
          hasProjectPage: true
        },
        {
          id: 'api-security-gateway',
          name: 'API Security Gateway',
          description: 'API authentication, authorization, rate limiting, and request validation',
          iconKey: 'api-security-gateway',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'Express', 'JWT', 'OAuth2', 'Rate Limiting'],
          features: ['API authentication', 'Authorization', 'Rate limiting', 'Request validation', 'API key management'],
          hasProjectPage: true
        },
        {
          id: 'phishing-detection',
          name: 'Phishing Detection System',
          description: 'Email analysis, URL scanning, domain reputation checking, and ML-based classification',
          iconKey: 'phishing-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'Machine Learning', 'NLP', 'React'],
          features: ['Email analysis', 'URL scanning', 'Domain reputation', 'ML-based classification', 'Threat scoring'],
          hasProjectPage: true
        },
        {
          id: 'owasp-scanner',
          name: 'OWASP Top 10 Security Scanner',
          description: 'Automated vulnerability scanning with OWASP Top 10 coverage and detailed reporting',
          iconKey: 'owasp-scanner',
          difficulty: 'Advanced',
          technologies: ['Python', 'OWASP ZAP', 'React'],
          features: ['Automated vulnerability scanning', 'OWASP Top 10 coverage', 'Detailed reporting', 'Remediation recommendations'],
          hasProjectPage: true
        },
        {
          id: 'network-traffic-analyzer',
          name: 'Network Traffic Analyzer',
          description: 'Packet capture, protocol analysis, anomaly detection, and traffic visualization',
          iconKey: 'network-traffic-analyzer',
          difficulty: 'Advanced',
          technologies: ['Python', 'Scapy', 'React', 'WebSocket'],
          features: ['Packet capture', 'Protocol analysis', 'Anomaly detection', 'Traffic visualization', 'Real-time monitoring'],
          hasProjectPage: true
        },
        {
          id: 'ids',
          name: 'Network Intrusion Detection System (IDS)',
          description: 'Signature-based detection, anomaly detection, and alert generation',
          iconKey: 'ids',
          difficulty: 'Advanced',
          technologies: ['Python', 'Snort', 'Network Analysis'],
          features: ['Signature-based detection', 'Anomaly detection', 'Alert generation', 'Network monitoring'],
          hasProjectPage: true
        },
        {
          id: 'threat-intelligence',
          name: 'Threat Intelligence Platform',
          description: 'IOC collection, threat feed aggregation, and reputation checking',
          iconKey: 'threat-intelligence',
          difficulty: 'Advanced',
          technologies: ['Python', 'Threat Feeds', 'API Integration'],
          features: ['IOC collection', 'Threat feed aggregation', 'Reputation checking', 'Threat analysis'],
          hasProjectPage: true
        }
      ]
    },
    'external-websites': {
      name: 'Live Websites & Deployments',
      description: 'Production websites and applications currently running and serving users',
      iconKey: 'external-websites',
      demos: [
        {
          id: 'three-sisters-oyster-project',
          name: 'Three Sisters Oyster Co.',
          description: 'Full-stack e-commerce platform for premium Texas oysters',
          iconKey: 'three-sisters-oyster-project',
          difficulty: 'Advanced',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          features: ['E-commerce', 'Inventory management', 'Payment processing', 'Responsive design'],
          hasProjectPage: true
        },
        {
          id: 'bapux-project',
          name: 'Bapux',
          description: 'Full-stack web application',
          iconKey: 'bapux-project',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'Tailwind CSS'],
          features: ['Full-stack', 'Responsive design', 'Modern UI'],
          hasProjectPage: true
        },
        {
          id: 'bpawd-project',
          name: 'BPAWD',
          description: 'Full-stack web application',
          iconKey: 'bpawd-project',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'Tailwind CSS'],
          features: ['Full-stack', 'Modern stack', 'Fast performance'],
          hasProjectPage: true
        },
        {
          id: 'uil-academy-project',
          name: 'UIL Academy',
          description: 'Educational platform with learning management features',
          iconKey: 'uil-academy-project',
          difficulty: 'Advanced',
          technologies: ['React', 'Node.js', 'MongoDB'],
          features: ['Learning management', 'Course catalog', 'Progress tracking'],
          hasProjectPage: true
        },
        {
          id: 'minbod-project',
          name: 'MinBod',
          description: 'Health and wellness application with health tracking features',
          iconKey: 'minbod-project',
          difficulty: 'Advanced',
          technologies: ['React', 'Node.js', 'MongoDB'],
          features: ['Health directory', 'Professional listings', 'Health tracking'],
          hasProjectPage: true
        },
        {
          id: 'jf-resume-project',
          name: 'JF Resume',
          description: 'Interactive resume builder application',
          iconKey: 'jf-resume-project',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'PDF Generation'],
          features: ['Resume builder', 'Real-time editing', 'PDF export'],
          hasProjectPage: true
        }
      ]
    },
    'blockchain': {
      name: 'Blockchain & Web3',
      description: 'Decentralized applications and blockchain technology',
      iconKey: 'blockchain',
      demos: [
        {
          id: 'blockchain',
          name: 'Blockchain Supply Chain',
          description: 'Complete blockchain implementation with smart contracts',
          iconKey: 'blockchain',
          difficulty: 'Advanced',
          technologies: ['Solidity', 'Web3.js', 'React'],
          features: ['Smart contracts', 'Transaction mining', 'Supply chain tracking'],
          hasProjectPage: true
        }
      ]
    },
    'frontend': {
      name: 'Frontend & Web Development',
      description: 'Modern frontend applications and web development',
      iconKey: 'frontend',
      demos: [
        {
          id: 'interactive-resume',
          name: 'Interactive Resume Web App',
          description: 'Real-time editing resume with responsive design',
          iconKey: 'interactive-resume',
          difficulty: 'Intermediate',
          technologies: ['React', 'CSS3', 'Form Validation'],
          features: ['Real-time editing', 'Responsive design', 'Auto-save'],
          hasProjectPage: true
        },
        {
          id: 'ecommerce',
          name: 'E-commerce Storefront',
          description: 'Product catalog, cart, and checkout with Stripe',
          iconKey: 'ecommerce',
          difficulty: 'Intermediate',
          technologies: ['React', 'Stripe', 'Tailwind'],
          features: ['Product catalog', 'Cart', 'Checkout'],
          hasProjectPage: true
        }
      ]
    },
    'backend': {
      name: 'Backend & Full-Stack',
      description: 'Backend APIs and full-stack applications',
      iconKey: 'backend',
      demos: [
        {
          id: 'rag-chatbot',
          name: 'RAG Chatbot with Next.js',
          description: 'Retrieval-Augmented Generation chatbot with context awareness',
          iconKey: 'rag-chatbot',
          difficulty: 'Advanced',
          technologies: ['Next.js', 'LangChain', 'OpenAI'],
          features: ['Context awareness', 'Source attribution', 'Smart responses'],
          hasProjectPage: true
        },
        {
          id: 'bookstore-api',
          name: 'Bookstore REST API',
          description: 'Complete REST API for bookstore management',
          iconKey: 'bookstore-api',
          difficulty: 'Intermediate',
          technologies: ['Express.js', 'REST API', 'CRUD Operations'],
          features: ['Full CRUD', 'Data validation', 'Error handling'],
          hasProjectPage: true
        },
        {
          id: 'mern-expense-tracker',
          name: 'MERN Expense Tracker',
          description: 'Full-stack expense tracker with MongoDB and React',
          iconKey: 'mern-expense-tracker',
          difficulty: 'Intermediate',
          technologies: ['MERN Stack', 'MongoDB', 'Express', 'React'],
          features: ['Real-time stats', 'Category breakdown', 'Data visualization'],
          hasProjectPage: true
        },
        {
          id: 'social-network',
          name: 'Mini Social Network',
          description: 'Social media platform with user authentication and posts',
          iconKey: 'social-network',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'MongoDB', 'Auth'],
          features: ['User authentication', 'Real-time posts', 'Comments & likes'],
          hasProjectPage: true
        },
        {
          id: 'realtime-chat',
          name: 'Real-time Chat',
          description: 'Rooms, presence, and typing indicators with WebSocket',
          iconKey: 'realtime-chat',
          difficulty: 'Intermediate',
          technologies: ['WebSocket', 'Node.js', 'React'],
          features: ['Rooms', 'Typing indicator', 'Presence'],
          hasProjectPage: true
        },
        {
          id: 'microservices',
          name: 'Microservices Architecture Platform',
          description: 'Service discovery, load balancing, inter-service communication, and health monitoring',
          iconKey: 'microservices',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'Docker', 'Kubernetes', 'API Gateway', 'Service Mesh'],
          features: ['Service discovery', 'Load balancing', 'Inter-service communication', 'Health monitoring', 'Service topology'],
          hasProjectPage: true
        },
        {
          id: 'graphql-api',
          name: 'GraphQL API with React Frontend',
          description: 'Type-safe queries, real-time subscriptions, query optimization, and caching',
          iconKey: 'graphql-api',
          difficulty: 'Advanced',
          technologies: ['GraphQL', 'Apollo Server', 'React', 'Apollo Client'],
          features: ['Type-safe queries', 'Real-time subscriptions', 'Query optimization', 'Caching', 'GraphQL playground'],
          hasProjectPage: true
        },
        {
          id: 'realtime-collaboration-platform',
          name: 'Real-time Collaboration Platform',
          description: 'Multi-user collaboration, presence indicators, conflict resolution, and real-time sync',
          iconKey: 'realtime-collaboration-platform',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'WebSocket', 'Redis', 'React'],
          features: ['Multi-user collaboration', 'Presence indicators', 'Conflict resolution', 'Real-time sync', 'Collaborative editing'],
          hasProjectPage: true
        },
        {
          id: 'event-driven-architecture',
          name: 'Event-Driven Architecture System',
          description: 'Event streaming, event replay, CQRS pattern, and event visualization',
          iconKey: 'event-driven-architecture',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'Event Sourcing', 'Message Queue', 'React'],
          features: ['Event streaming', 'Event replay', 'CQRS pattern', 'Event visualization', 'System state reconstruction'],
          hasProjectPage: true
        },
        {
          id: 'serverless-platform',
          name: 'Serverless Application Platform',
          description: 'Function deployment, auto-scaling, cost optimization, and monitoring',
          iconKey: 'serverless-platform',
          difficulty: 'Advanced',
          technologies: ['AWS Lambda', 'Serverless Framework', 'API Gateway', 'React'],
          features: ['Function deployment', 'Auto-scaling', 'Cost optimization', 'Monitoring', 'Invocation testing'],
          hasProjectPage: true
        },
        {
          id: 'multi-tenant-saas',
          name: 'Multi-tenant SaaS Platform',
          description: 'Tenant isolation, subscription management, usage tracking, and billing integration',
          iconKey: 'multi-tenant-saas',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'PostgreSQL', 'Row-level Security', 'React'],
          features: ['Tenant isolation', 'Subscription management', 'Usage tracking', 'Billing integration', 'Data isolation'],
          hasProjectPage: true
        }
      ]
    },
    'iot-sensors': {
      name: 'IoT & Sensor Systems',
      description: 'Internet of Things and sensor monitoring applications',
      iconKey: 'iot-sensors',
      demos: [
        {
          id: 'aquaculture',
          name: 'AquaFarm Intelligent Monitoring System',
          description: 'Full stack system for real-time environmental monitoring and data visualization using TypeScript, emphasizing scalable architecture and efficient data flow',
          iconKey: 'aquaculture',
          difficulty: 'Advanced',
          technologies: ['TypeScript', 'React', 'Real-time Data', 'Data Visualization'],
          features: ['Real-time monitoring', 'Environmental data tracking', 'Scalable architecture', 'Efficient data flow'],
          hasProjectPage: true,
          isResumeProject: true
        },
        {
          id: 'smart-city',
          name: 'Smart City Infrastructure',
          description: 'Comprehensive smart city monitoring and management',
          iconKey: 'smart-city',
          difficulty: 'Advanced',
          technologies: ['IoT', 'React', 'Data Analytics'],
          features: ['Traffic management', 'Energy monitoring', 'Infrastructure'],
          hasProjectPage: true
        }
      ]
    },
    'business-apps': {
      name: 'Business Applications',
      description: 'Enterprise and business management solutions',
      iconKey: 'business-apps',
      demos: [
        {
          id: 'logistics',
          name: 'Smart Logistics Platform',
          description: 'AI-powered fleet management and route optimization',
          iconKey: 'logistics',
          difficulty: 'Advanced',
          technologies: ['React', 'AI/ML', 'GPS Integration'],
          features: ['Route optimization', 'Fleet tracking', 'Predictive analytics'],
          hasProjectPage: true
        },
        {
          id: 'healthcare',
          name: 'Healthcare Analytics',
          description: 'AI-powered patient monitoring and medical analytics',
          iconKey: 'healthcare',
          difficulty: 'Advanced',
          technologies: ['React', 'AI/ML', 'HIPAA Compliance'],
          features: ['Patient monitoring', 'Predictive diagnostics', 'Medical alerts'],
          hasProjectPage: true
        },
        {
          id: 'financial',
          name: 'Financial Analytics Platform',
          description: 'Advanced financial analysis and portfolio management',
          iconKey: 'financial',
          difficulty: 'Advanced',
          technologies: ['React', 'Financial APIs', 'Data Visualization'],
          features: ['Portfolio management', 'Market analysis', 'Risk assessment'],
          hasProjectPage: true
        },
        {
          id: 'restaurant-app',
          name: 'Restaurant Management System',
          description: 'Complete restaurant management and ordering platform',
          iconKey: 'restaurant-app',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'Real-time updates'],
          features: ['Order management', 'Inventory tracking', 'Analytics'],
          hasProjectPage: true
        },
        {
          id: 'saas-analytics',
          name: 'SaaS Analytics Dashboard',
          description: 'Cohorts, retention, and funnels for product analytics',
          iconKey: 'saas-analytics',
          difficulty: 'Intermediate',
          technologies: ['React', 'D3', 'Node.js'],
          features: ['Cohorts', 'Retention', 'Funnels'],
          hasProjectPage: true
        },
        {
          id: 'daily-planner',
          name: 'Daily Planner and Productivity Application',
          description: 'Comprehensive productivity app with task management and scheduling',
          iconKey: 'daily-planner',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'Database'],
          features: ['Task management', 'Scheduling', 'Productivity tracking'],
          hasProjectPage: false,
          isResumeProject: true
        },
        {
          id: 'advanced-analytics',
          routeId: 'advanced-analytics',
          name: 'Advanced Analytics Suite',
          description: 'Predictive BI dashboards with ML-driven forecasting',
          iconKey: 'advanced-analytics',
          difficulty: 'Advanced',
          technologies: ['React', 'Machine Learning', 'Data Pipelines'],
          features: ['Predictive analytics', 'Anomaly detection', 'Executive dashboards']
        },
        {
          id: 'real-time-collaboration',
          routeId: 'real-time-collaboration',
          name: 'Enterprise Collaboration Hub',
          description: 'Real-time workspace with shared canvases and task sync',
          iconKey: 'real-time-collaboration',
          difficulty: 'Advanced',
          technologies: ['WebRTC', 'Realtime Presence', 'React'],
          features: ['Live presence', 'Shared documents', 'Enterprise SSO']
        },
        {
          id: 'ai-interview-simulator',
          routeId: 'ai-interview-simulator',
          name: 'AI Interview Simulator',
          description: 'Adaptive hiring assistant with scenario-based evaluations',
          iconKey: 'ai-interview-simulator',
          difficulty: 'Advanced',
          technologies: ['AI Assistants', 'Speech Analysis', 'React'],
          features: ['Context aware Q&A', 'Feedback reports', 'Skill scoring']
        },
        {
          id: 'edge-computing',
          routeId: 'edge-computing',
          name: 'Edge Computing Platform',
          description: 'Distributed orchestration across edge clusters',
          iconKey: 'edge-computing',
          difficulty: 'Advanced',
          technologies: ['Edge Devices', 'Kubernetes', 'Realtime Metrics'],
          features: ['Latency monitoring', 'Edge orchestration', 'Failover automation']
        },
        {
          id: 'quantum-computing',
          routeId: 'quantum-computing',
          name: 'Quantum Computing Lab',
          description: 'Visualize qubits, circuits, and post-quantum workflows',
          iconKey: 'quantum-computing',
          difficulty: 'Advanced',
          technologies: ['Qiskit', 'Visualization', 'React'],
          features: ['Circuit composer', 'State visualization', 'Quantum tutorials']
        },
        {
          id: 'blockchain-advanced',
          routeId: 'blockchain-advanced',
          name: 'Blockchain Operations Center',
          description: 'Enterprise blockchain governance & monitoring console',
          iconKey: 'blockchain-advanced',
          difficulty: 'Advanced',
          technologies: ['Smart Contracts', 'Node Monitoring', 'Security'],
          features: ['Network health', 'Contract audits', 'Compliance tooling']
        }
      ]
    },
    'creative-tools': {
      name: 'Creative & Development Tools',
      description: 'Creative applications and development tools',
      iconKey: 'creative-tools',
      demos: [
        {
          id: 'whiteboard',
          name: 'Collaborative Whiteboard',
          description: 'Real-time collaborative drawing and design platform',
          iconKey: 'whiteboard',
          difficulty: 'Intermediate',
          technologies: ['React', 'Canvas API', 'WebRTC'],
          features: ['Real-time collaboration', 'Drawing tools', 'Project management'],
          hasProjectPage: true
        },
        {
          id: 'portfolio-builder',
          name: 'Portfolio Builder',
          description: 'Drag-and-drop website builder for portfolios',
          iconKey: 'portfolio-builder',
          difficulty: 'Intermediate',
          technologies: ['React', 'Drag & Drop', 'Template System'],
          features: ['Visual editor', 'Template library', 'Deployment'],
          hasProjectPage: true
        },
        {
          id: 'product-configurator',
          name: '3D Product Configurator',
          description: 'Configure colors, materials, and variants in 3D',
          iconKey: 'product-configurator',
          difficulty: 'Advanced',
          technologies: ['React', 'Three.js', 'WebGL'],
          features: ['Color/material variants', 'Orbit controls', 'Export'],
          hasProjectPage: true
        }
      ]
    },
    'entertainment': {
      name: 'Entertainment & Gaming',
      description: 'Gaming and entertainment applications',
      iconKey: 'entertainment',
      demos: [
        {
          id: 'game-platform',
          name: 'Multiplayer Gaming Platform',
          description: 'Interactive multiplayer gaming with real-time features',
          iconKey: 'game-platform',
          difficulty: 'Intermediate',
          technologies: ['React', 'WebSocket', 'Game Engine'],
          features: ['Multiplayer games', 'Real-time chat', 'Leaderboards'],
          hasProjectPage: true
        }
      ]
    }
  };

  const getDemoRouteId = (demo) => {
    if (demo.routeId) {
      return demo.routeId;
    }

    const isExternalWebsite = demo.id.includes('-project');
    return isExternalWebsite ? demo.id : `${demo.id}-demo`;
  };

  const allDemos = useMemo(() => {
    return Object.entries(demoCategories).flatMap(([categoryKey, category]) => 
      category.demos.map(demo => ({ ...demo, category: category.name, categoryKey }))
    );
  }, []);

  // Get all unique technologies for filtering
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    allDemos.forEach(demo => {
      demo.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allDemos]);

  const filteredDemos = useMemo(() => {
    let filtered = allDemos.filter(demo => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || demo.categoryKey === selectedCategory;
      
      // Search filter
      const matchesSearch = searchTerm === '' || 
                           demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           demo.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || demo.difficulty === selectedDifficulty;
      
      // Technology filter
      const matchesTechnologies = selectedTechnologies.length === 0 || 
                                  selectedTechnologies.some(tech => demo.technologies.includes(tech));
      
      return matchesCategory && matchesSearch && matchesDifficulty && matchesTechnologies;
    });

    // Sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        filtered.sort((a, b) => (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0));
        break;
      case 'newest':
        // For now, just reverse the array (can be enhanced with actual dates)
        filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [allDemos, selectedCategory, searchTerm, selectedDifficulty, selectedTechnologies, sortBy]);


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  // Helper function to render icon
  const renderIcon = (iconKey, type = 'demo', size = 24, className = '') => {
    if (!iconKey) return null;
    const IconComponent = getIcon(iconKey, type);
    if (!IconComponent) {
      console.warn('Icon not found for:', iconKey, type);
      return null;
    }
    return <IconComponent className={className} size={size} />;
  };

  const renderDemoCard = (demo, index, categoryKey = 'grid') => {
    const routeId = getDemoRouteId(demo);

    if (viewMode === 'list') {
      return (
        <motion.div
          key={`${demo.id}-${categoryKey}-${index}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          className="cursor-pointer"
        >
          <EnhancedCard
            tilt={false}
            magnetic={false}
            gradientBorder={true}
            glow={true}
            className="h-full"
            onClick={() => {
              setCurrentPage(routeId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <SpotlightCard
              className="p-4 relative overflow-hidden group h-full"
              spotlightColor="rgba(34, 197, 94, 0.2)"
            >
              <button
                className="absolute inset-0 w-full h-full bg-transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentPage(routeId);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                style={{ zIndex: 1 }}
              />
              <div className="flex items-center gap-4 relative" style={{ zIndex: 2 }}>
                <div className="flex-shrink-0 text-green-400">{renderIcon(demo.iconKey || demo.id, 'demo', 24)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-white truncate">{demo.name}</h3>
                    <div className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyBg(demo.difficulty)}`}>
                      {demo.difficulty}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-1">{demo.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {demo.technologies.slice(0, 5).map((tech, idx) => (
                      <span
                        key={`${demo.id}-tech-${idx}`}
                        className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {demo.technologies.length > 5 && (
                      <span className="text-gray-500 text-xs">+{demo.technologies.length - 5}</span>
                    )}
                  </div>
                </div>
                <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-all">
                  →
                </div>
              </div>
            </SpotlightCard>
          </EnhancedCard>
        </motion.div>
      );
    }

    if (viewMode === 'compact') {
      return (
        <motion.div
          key={`${demo.id}-${categoryKey}-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: index * 0.02 }}
          className="cursor-pointer"
        >
          <EnhancedCard
            tilt={false}
            magnetic={false}
            gradientBorder={true}
            glow={false}
            className="h-full"
            onClick={() => {
              setCurrentPage(routeId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <SpotlightCard
              className="p-4 relative overflow-hidden group h-full"
              spotlightColor="rgba(34, 197, 94, 0.2)"
            >
              <button
                className="absolute inset-0 w-full h-full bg-transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentPage(routeId);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                style={{ zIndex: 1 }}
              />
              <div className="relative" style={{ zIndex: 2 }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-green-400">{renderIcon(demo.iconKey || demo.id, 'demo', 20)}</div>
                  <h3 className="text-sm font-semibold text-white truncate flex-1">{demo.name}</h3>
                </div>
                <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${getDifficultyBg(demo.difficulty)}`}>
                  {demo.difficulty}
                </div>
                <p className="text-gray-400 text-xs line-clamp-2 mb-2">{demo.description}</p>
                <div className="flex flex-wrap gap-1">
                  {demo.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={`${demo.id}-tech-${idx}`}
                      className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </EnhancedCard>
        </motion.div>
      );
    }

    // Default grid view
    return (
      <motion.div
        key={`${demo.id}-${categoryKey}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="cursor-pointer"
      >
        <EnhancedCard
          tilt={false}
          magnetic={false}
          gradientBorder={true}
          glow={true}
          className="h-full"
          onClick={() => {
            setCurrentPage(routeId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <SpotlightCard
            className="p-6 relative overflow-hidden group h-full"
            spotlightColor="rgba(34, 197, 94, 0.3)"
          >
          <button
            className="absolute inset-0 w-full h-full bg-transparent"
            onClick={(event) => {
              event.stopPropagation();
              setCurrentPage(routeId);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            style={{ zIndex: 1 }}
          />

          <div className="flex items-start justify-between mb-4 relative" style={{ zIndex: 2 }}>
            <div className="flex items-center">
              <div className="mr-3 transition-transform duration-300 group-hover:scale-110 text-green-400">{renderIcon(demo.iconKey || demo.id, 'demo', 32)}</div>
              <div>
                <h3 className="text-lg font-semibold text-white transition-colors">
                  {demo.name}
                </h3>
                <div className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${getDifficultyBg(demo.difficulty)}`}>
                  {demo.difficulty}
                </div>
              </div>
            </div>
            <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              →
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 transition-colors">{demo.description}</p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2 transition-colors">Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {demo.technologies.map((tech, idx) => (
                <span
                  key={`${demo.id}-tech-${idx}`}
                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2 transition-colors">Key Features</h4>
            <ul className="space-y-1">
              {demo.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={`${demo.id}-feature-${idx}`}
                  className="text-gray-300 text-xs flex items-center transition-all duration-300"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <span className="text-green-400 mr-1 transition-transform duration-300">•</span>
                  {feature}
                </li>
              ))}
              {demo.features.length > 3 && (
                <li className="text-gray-400 text-xs transition-colors">+{demo.features.length - 3} more features</li>
              )}
            </ul>
          </div>

          {demo.hasProjectPage && (
            <div className="mt-4 pt-4 border-t border-gray-600 transition-colors">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage(routeId);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="text-green-400 hover:text-green-300 text-xs font-semibold transition-transform duration-300"
              >
                View Project Details →
              </button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </SpotlightCard>
        </EnhancedCard>
      </motion.div>
    );
  };

  const showCategorySections = selectedCategory === 'all' && searchTerm.trim() === '';

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6 sm:p-6 relative overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingParticles />
      </div>
      <div className="max-w-7xl mx-auto relative z-10 pb-8">
        {/* Header */}
        <div className="mb-8 snap-section">
          <AnimatedCard delay={0} direction="down" className="mb-4">
            <h1 className="text-4xl font-bold text-green-400">Demo Collection</h1>
          </AnimatedCard>
          <AnimatedCard delay={100} direction="down" className="mb-4">
            <p className="text-gray-300 text-lg">
              Explore our comprehensive collection of interactive demos organized by category
            </p>
          </AnimatedCard>
        </div>

        {/* Search and Filter */}
        <AnimatedCard delay={200} direction="up" className="mb-8 snap-section" hover={false}>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search demos by name, technology, or feature..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSearchSuggestions(e.target.value.length > 0);
                    if (e.target.value.length > 0) {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 500);
                    }
                  }}
                  onFocus={() => setShowSearchSuggestions(searchTerm.length > 0)}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-green-500/20"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setShowSearchSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                
                {/* Search Suggestions */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-400">
                        <div className="animate-spin inline-block w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                        <span className="ml-2">Searching...</span>
                      </div>
                    ) : (
                      <>
                        {/* Quick Filters */}
                        <div className="p-3 border-b border-gray-600">
                          <div className="text-xs text-gray-400 mb-2">Quick Filters:</div>
                          <div className="flex flex-wrap gap-2">
                            {['AI/ML', 'Blockchain', 'React', 'Python', 'Node.js'].map((filter) => (
                              <button
                                key={filter}
                                onClick={() => {
                                  setSearchTerm(filter);
                                  setShowSearchSuggestions(false);
                                }}
                                className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                              >
                                {filter}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Search Results Preview */}
                        <div className="p-3">
                          <div className="text-xs text-gray-400 mb-2">Found {filteredDemos.length} results:</div>
                          {filteredDemos.slice(0, 3).map((demo) => {
                            const routeId = getDemoRouteId(demo);
                            return (
                              <button
                                key={demo.id}
                                onClick={() => {
                                  setSearchTerm('');
                                  setShowSearchSuggestions(false);
                                  setCurrentPage(routeId);
                                  window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                className="w-full text-left p-2 hover:bg-gray-700 rounded transition-colors"
                              >
                              <div className="flex items-center">
                                <span className="mr-2 text-green-400">{renderIcon(demo.iconKey || demo.id, 'demo', 20)}</span>
                                  <div>
                                    <div className="text-sm text-white font-medium">{demo.name}</div>
                                    <div className="text-xs text-gray-400">{demo.description}</div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Filters and View Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All Demos
                </button>
                {Object.entries(demoCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === key
                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* View Mode and Sort Controls */}
              <div className="flex gap-3 items-center">
                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-sm focus:border-green-400 focus:outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-sm focus:border-green-400 focus:outline-none"
                >
                  <option value="default">Default</option>
                  <option value="name">Name</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode Switcher */}
                <div className="flex gap-1 bg-gray-800 p-1 rounded-lg border border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Grid View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="List View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'compact' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Compact View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Technology Filter Chips */}
            {selectedTechnologies.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-400">Filtered by:</span>
                {selectedTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTechnologies(prev => prev.filter(t => t !== tech))}
                    className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-2 hover:bg-green-700 transition-colors"
                  >
                    {tech}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedTechnologies([])}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Popular Technologies */}
            {selectedCategory === 'all' && searchTerm === '' && (
              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-3">Popular Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Python', 'Node.js', 'TypeScript', 'TensorFlow', 'Docker', 'MongoDB', 'AWS'].map((tech) => {
                    const isSelected = selectedTechnologies.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTechnologies(prev => prev.filter(t => t !== tech));
                          } else {
                            setSelectedTechnologies(prev => [...prev, tech]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          isSelected
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>

         {/* Category Overview */}
         {selectedCategory === 'all' && searchTerm.trim() === '' && (
           <div className="mb-8 snap-section">
             <h2 className="text-2xl font-bold text-white mb-6">Categories</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {Object.entries(demoCategories).map(([key, category], index) => (
                 <BounceCard
                   key={key}
                   delay={index * 0.05}
                   className="cursor-pointer"
                   onClick={() => setSelectedCategory(key)}
                 >
                   <GlareHover intensity={0.6}>
                     <GlassCard className="p-6 hover:border-green-400 transition-all" glow>
                      <div className="flex items-center mb-4">
                        <div className="mr-3 text-green-400">{renderIcon(category.iconKey || key, 'category', 32)}</div>
                         <div>
                           <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                           <p className="text-gray-400 text-sm">{category.demos.length} demos</p>
                         </div>
                       </div>
                       <p className="text-gray-300 text-sm">{category.description}</p>
                     </GlassCard>
                   </GlareHover>
                 </BounceCard>
               ))}
             </div>
           </div>
         )}

        {/* Demos Showcase */}
        <div className="mb-8 snap-section">
          <AnimatedCard delay={100} direction="up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === 'all' ? 'All Demos' : demoCategories[selectedCategory]?.name}
              </h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-400">{filteredDemos.length} {filteredDemos.length === 1 ? 'demo' : 'demos'} found</p>
                {searchTerm && (
                  <span className="text-sm text-green-400 bg-green-900/20 px-2 py-1 rounded">
                    Searching: "{searchTerm}"
                  </span>
                )}
              </div>
            </div>
          </AnimatedCard>

          {filteredDemos.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-2">No demos found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm
                  ? `No demos match "${searchTerm}". Try adjusting your search terms.`
                  : 'No demos available in this category.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : showCategorySections ? (
            <div className="space-y-12">
              {Object.entries(demoCategories).map(([key, category], index) => (
                <section key={key} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <span className="text-green-400">{renderIcon(category.iconKey || key, 'category', 24)}</span>
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">{category.demos.length} demos</span>
                      </h3>
                      <p className="text-gray-400 text-sm max-w-2xl">{category.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(key)}
                      className="self-start px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:text-white hover:border-green-400 transition-colors"
                    >
                      View all demos
                    </button>
                  </div>

                  <div className={
                    viewMode === 'list' 
                      ? 'space-y-3' 
                      : viewMode === 'compact'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                      : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  } style={{ isolation: 'isolate' }}>
                    {category.demos.slice(0, viewMode === 'compact' ? 5 : 3).map((demo, idx) => renderDemoCard(demo, idx, key))}
                  </div>

                  {category.demos.length > (viewMode === 'compact' ? 5 : 3) && (
                    <div className="text-right">
                      <button
                        onClick={() => setSelectedCategory(key)}
                        className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300"
                      >
                        Explore {category.demos.length - (viewMode === 'compact' ? 5 : 3)} more →
                      </button>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className={
              viewMode === 'list' 
                ? 'space-y-3' 
                : viewMode === 'compact'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            } style={{ isolation: 'isolate' }}>
              {filteredDemos.map((demo, index) => renderDemoCard(demo, index, selectedCategory))}
            </div>
          )}
        </div>

         {/* Quick Stats */}
         <ScrollReveal delay={0.2} direction="up" className="snap-section">
           <GlareHover intensity={0.4}>
             <GlassCard className="bg-gradient-to-br from-purple-900/50 via-purple-800/50 to-purple-700/50 p-6 border-purple-800 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all" glow>
               <h2 className="text-2xl font-bold text-white mb-4">Demo Statistics</h2>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="text-center">
                   <div className="text-3xl font-bold text-purple-400">{allDemos.length}</div>
                   <div className="text-gray-300 text-sm">Total Demos</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-purple-400">{Object.keys(demoCategories).length}</div>
                   <div className="text-gray-300 text-sm">Categories</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-purple-400">
                     {allDemos.filter(demo => demo.difficulty === 'Advanced').length}
                   </div>
                   <div className="text-gray-300 text-sm">Advanced Projects</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-purple-400">
                     {new Set(allDemos.flatMap(demo => demo.technologies)).size}
                   </div>
                   <div className="text-gray-300 text-sm">Technologies Used</div>
                 </div>
               </div>
             </GlassCard>
           </GlareHover>
         </ScrollReveal>
      </div>
    </div>
  );
};

export default DemoOrganizer; 