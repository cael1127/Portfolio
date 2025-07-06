const { useState, useEffect, useCallback, useMemo } = React;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [projectPage, setProjectPage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced navigation with icons and better grouping
  const navLinks = [
    { 
      name: 'Home', 
      page: 'home', 
      icon: '🏠',
      category: 'main'
    },
    { 
      name: 'Experience & Certifications', 
      page: 'experience', 
      icon: '💼',
      category: 'main'
    },
    { 
      name: 'Software Development', 
      page: 'software', 
      icon: '💻',
      category: 'projects'
    },
    { 
      name: 'IT Infrastructure', 
      page: 'it', 
      icon: '🔧',
      category: 'projects'
    },
    { 
      name: 'Cybersecurity', 
      page: 'cybersecurity', 
      icon: '🔒',
      category: 'projects'
    },
    { 
      name: 'AI Development', 
      page: 'ai', 
      icon: '🤖',
      category: 'projects'
    },
    { 
      name: 'Data Analysis', 
      page: 'data', 
      icon: '📊',
      category: 'projects'
    },
    { 
      name: 'DevOps & Infrastructure', 
      page: 'devops', 
      icon: '⚙️',
      category: 'projects'
    },
    { 
      name: 'Blockchain & AI', 
      page: 'blockchain', 
      icon: '🔗',
      category: 'projects'
    },
    { 
      name: 'Enterprise Solutions', 
      page: 'enterprise', 
      icon: '🏢',
      category: 'projects'
    },
    { 
      name: 'FinTech', 
      page: 'fintech', 
      icon: '💰',
      category: 'projects'
    },
    { 
      name: 'Healthcare', 
      page: 'healthcare', 
      icon: '🏥',
      category: 'projects'
    },
    { 
      name: 'IoT & Smart Systems', 
      page: 'iot', 
      icon: '🌐',
      category: 'projects'
    },
    { 
      name: 'Modern Architecture', 
      page: 'modern', 
      icon: '🏗️',
      category: 'projects'
    },
    { 
      name: 'Cybersecurity', 
      page: 'security', 
      icon: '🔒',
      category: 'projects'
    },
    { 
      name: 'Freelancing Services', 
      page: 'freelancing', 
      icon: '💼',
      category: 'main'
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Group navigation items by category
  const groupedNavLinks = navLinks.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {});

  // Filter navigation items based on search
  const filteredNavLinks = navLinks.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === 'all' || link.category === activeCategory)
  );

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'main', name: 'Main', icon: '⭐' },
    { id: 'projects', name: 'Projects', icon: '💼' }
  ];

  const contactInfo = {
    email: 'cael.findley@example.com',
    phone: '+1 (555) 123-4567',
    github: 'https://github.com/caelfindley',
    linkedin: 'https://linkedin.com/in/caelfindley',
  };

  const experience = {
    role: 'Software Engineer',
    company: 'Three Sisters Oyster Company',
    since: '2025',
    description: 'Developing and maintaining scalable software solutions for aquaculture data tracking, logistics management, and environmental monitoring.',
    achievements: [
      'Led development of IoT sensor integration system',
      'Reduced data processing time by 60%',
      'Implemented automated monitoring alerts',
      'Mentored junior developers in best practices'
    ]
  };

  const certifications = [
    { name: 'AWS Certified Developer', year: '2024', icon: '☁️' },
    { name: 'Google Cloud Professional Data Engineer', year: '2024', icon: '📊' },
    { name: 'CompTIA Security+', year: '2023', icon: '🔒' },
    { name: 'Certified Ethical Hacker (CEH)', year: '2023', icon: '🛡️' },
    { name: 'TensorFlow Developer Certificate', year: '2023', icon: '🤖' },
  ];

  // Comprehensive projects with detailed descriptions and features
  const projects = {
    software: [
      {
        id: 'aq-track',
        title: 'Aquaculture Tracking System',
        description: 'Enterprise-grade full-stack application for real-time oyster farm monitoring using IoT sensors, machine learning analytics, and an intuitive React dashboard. Provides comprehensive environmental monitoring, predictive analytics, and automated alerting systems.',
        tech: ['React', 'Node.js', 'MongoDB', 'AWS IoT', 'Socket.IO', 'Chart.js', 'JWT Auth', 'Redis', 'Docker', 'Kubernetes', 'TypeScript', 'GraphQL'],
        features: [
          'Real-time sensor data visualization with 15+ environmental parameters',
          'Advanced alert system with configurable thresholds and escalation rules',
          'Historical data analysis with trend detection and anomaly identification',
          'Multi-tenant user authentication with role-based access control',
          'Mobile-responsive dashboard with offline capability',
          'Automated report generation and data export functionality',
          'Integration with external weather APIs and tide prediction services',
          'Predictive analytics for water quality optimization',
          'IoT device management with OTA firmware updates',
          'Advanced data compression and storage optimization',
          'Real-time collaboration features for team coordination',
          'Comprehensive audit logging and compliance reporting',
          'Microservices architecture with auto-scaling capabilities',
          'Advanced caching strategies with Redis and CDN',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Aquaculture+Dashboard',
        demo: 'live-data',
        github: 'https://github.com/caelfindley/aquaculture-track',
        status: 'Live',
        impact: 'Reduced monitoring time by 70% and improved water quality compliance by 95%'
      },
      {
        id: 'oyster-logistics',
        title: 'Oyster Logistics Manager',
        description: 'Comprehensive supply chain management platform that optimizes transportation routes, tracks inventory in real-time, and streamlines delivery operations. Features advanced analytics for cost optimization and customer satisfaction tracking.',
        tech: ['Next.js', 'Express', 'PostgreSQL', 'TailwindCSS', 'Mapbox API', 'Twilio SMS', 'Redis', 'Docker', 'AWS Lambda', 'GraphQL', 'TypeScript', 'Prisma ORM'],
        features: [
          'AI-powered route optimization with real-time traffic integration',
          'QR code-based inventory tracking with barcode scanning',
          'Automated delivery status updates via SMS and email',
          'Advanced analytics dashboard with KPI tracking',
          'Customer portal for order tracking and delivery preferences',
          'Driver mobile app with GPS tracking and route guidance',
          'Integration with accounting systems for automated invoicing',
          'Predictive analytics for demand forecasting and inventory planning',
          'Real-time fleet management with fuel consumption tracking',
          'Advanced warehouse management with automated picking routes',
          'Multi-carrier shipping integration with rate comparison',
          'Comprehensive reporting with custom dashboards and exports',
          'Microservices architecture with event-driven communication',
          'Advanced caching strategies with Redis and CDN',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Logistics+Manager',
        demo: 'environment',
        github: 'https://github.com/caelfindley/oyster-logistics',
        status: 'Live',
        impact: 'Reduced delivery costs by 25% and improved on-time delivery to 98%'
      },
    ],
    it: [
      {
        id: 'cloud-migration',
        title: 'Cloud Migration Toolset',
        description: 'Comprehensive automation suite for migrating legacy systems to AWS cloud infrastructure. Includes infrastructure as code, automated testing, monitoring setup, and zero-downtime deployment strategies with rollback capabilities.',
        tech: ['Python', 'Bash', 'AWS CLI', 'Docker', 'Terraform', 'Jenkins', 'CloudFormation', 'Ansible', 'Kubernetes', 'Prometheus', 'Grafana', 'ELK Stack'],
        features: [
          'Automated infrastructure provisioning with Terraform templates',
          'Zero-downtime blue-green deployment strategy',
          'Comprehensive monitoring and logging with CloudWatch integration',
          'Automated backup and disaster recovery procedures',
          'Security compliance scanning and vulnerability assessment',
          'Cost optimization recommendations and resource scaling',
          'Multi-environment support (dev, staging, production)',
          'Automated rollback procedures with health checks',
          'Database migration automation with data validation',
          'Application dependency mapping and analysis',
          'Performance benchmarking and optimization recommendations',
          'Compliance reporting and audit trail generation',
          'Multi-cloud migration support and strategy planning',
          'Advanced cost optimization with machine learning recommendations',
          'Integration with modern application architectures (microservices, serverless)',
        ],
        image: 'https://placehold.co/800x400/blue/white?text=Cloud+Migration',
        demo: 'cloud-migration',
        github: 'https://github.com/caelfindley/cloud-migration',
        status: 'Live',
        impact: 'Reduced migration time by 60% and achieved 99.9% uptime during transitions'
      },
      {
        id: 'helpdesk-portal',
        title: 'Internal IT Helpdesk Portal',
        description: 'Modern, scalable helpdesk solution built with Laravel that streamlines internal support operations. Features intelligent ticket routing, SLA management, knowledge base integration, and comprehensive reporting.',
        tech: ['Laravel', 'MySQL', 'Vue.js', 'Bootstrap', 'Redis', 'Elasticsearch', 'Slack API', 'Docker', 'AWS', 'GraphQL', 'TypeScript', 'WebSockets'],
        features: [
          'Intelligent ticket categorization with machine learning routing',
          'Priority-based SLA tracking with automated escalation',
          'Comprehensive agent performance dashboard with metrics',
          'Advanced knowledge base with search and article management',
          'Real-time notifications via Slack and email',
          'Asset management integration for hardware/software tracking',
          'Custom reporting with data export capabilities',
          'Mobile-responsive design with offline ticket creation',
          'Multi-language support with automatic translation',
          'Advanced workflow automation with custom triggers',
          'Integration with Active Directory and SSO providers',
          'Comprehensive audit logging and compliance reporting',
          'Real-time collaboration features for team coordination',
          'Advanced analytics with predictive insights for proactive support',
          'Integration with modern communication platforms (Teams, Discord)',
        ],
        image: 'https://placehold.co/800x400/blue/white?text=Helpdesk+Portal',
        demo: 'helpdesk',
        github: 'https://github.com/caelfindley/helpdesk-portal',
        status: 'Live',
        impact: 'Reduced average ticket resolution time by 40% and improved customer satisfaction to 95%'
      },
    ],
    cybersecurity: [
      {
        id: 'network-scanner',
        title: 'Network Vulnerability Scanner',
        description: 'Advanced network security scanner that identifies vulnerabilities, misconfigurations, and potential threats across internal network infrastructure. Provides detailed reporting and remediation guidance.',
        tech: ['Python', 'Scapy', 'Flask', 'SQLite', 'Nmap', 'OpenVAS', 'Elasticsearch', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'MITRE ATT&CK'],
        features: [
          'Comprehensive port scanning with service fingerprinting',
          'Integration with CVE database for vulnerability assessment',
          'Scheduled automated scans with configurable intervals',
          'Real-time alerting via Slack, email, and webhook integration',
          'Detailed vulnerability reports with remediation steps',
          'Asset inventory management with device tracking',
          'Compliance reporting for industry standards (PCI, HIPAA)',
          'API integration for third-party security tools',
          'Advanced threat intelligence integration',
          'Custom vulnerability signature development',
          'Network topology mapping and visualization',
          'Automated patch management and deployment',
          'AI-powered threat detection and risk assessment',
          'Integration with modern security frameworks (MITRE ATT&CK)',
          'Advanced machine learning for anomaly detection',
        ],
        image: 'https://placehold.co/800x400/blue/white?text=Vulnerability+Scanner',
        demo: 'scanner',
        github: 'https://github.com/caelfindley/network-scanner',
        status: 'Live',
        impact: 'Identified 150+ security vulnerabilities and reduced attack surface by 80%'
      },
      {
        id: 'zero-trust-auth',
        title: 'Zero Trust Authentication Module',
        description: 'Next-generation authentication system implementing zero trust principles with behavioral biometrics, adaptive risk scoring, and continuous authentication. Provides enterprise-grade security with minimal user friction.',
        tech: ['Node.js', 'Passport.js', 'JWT', 'Redis', 'TensorFlow.js', 'WebAuthn', 'OAuth2', 'Docker', 'Kubernetes', 'Prometheus', 'Istio', 'Zero Trust Framework'],
        features: [
          'Behavioral biometric analysis with machine learning',
          'Location-based authentication with geofencing',
          'Adaptive MFA with risk-based prompt frequency',
          'Continuous session monitoring with anomaly detection',
          'Hardware security key support (FIDO2/WebAuthn)',
          'Integration with enterprise SSO and directory services',
          'Comprehensive audit logging and compliance reporting',
          'Mobile app with push notification authentication',
          'Advanced threat detection with machine learning',
          'Real-time risk scoring and adaptive authentication',
          'Multi-factor authentication with multiple options',
          'Comprehensive user behavior analytics and reporting',
          'Quantum-resistant cryptography for future security requirements',
          'Advanced behavioral analytics with machine learning',
          'Integration with modern security frameworks and standards',
        ],
        image: 'https://placehold.co/800x400/blue/white?text=Zero+Trust+Auth',
        demo: 'zero-trust',
        github: 'https://github.com/caelfindley/zero-trust-auth',
        status: 'Live',
        impact: 'Prevented 99.9% of unauthorized access attempts while maintaining 95% user satisfaction'
      },
    ],
    ai: [
      {
        id: 'predictive-maintenance',
        title: 'Predictive Maintenance AI',
        description: 'Advanced machine learning system that predicts equipment failures and optimizes maintenance schedules using sensor data, historical records, and environmental factors. Reduces downtime and maintenance costs.',
        tech: ['TensorFlow', 'Python', 'Keras', 'Pandas', 'Scikit-learn', 'Apache Kafka', 'MLflow', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Apache Spark'],
        features: [
          'Multi-sensor data ingestion with real-time processing',
          'Advanced failure prediction with 95% accuracy',
          'Intelligent maintenance scheduling optimization',
          'Automated model retraining with A/B testing',
          'Anomaly detection for early warning systems',
          'Integration with CMMS systems for work order automation',
          'Predictive analytics dashboard with actionable insights',
          'Mobile app for field technicians with AR guidance',
          'Advanced machine learning models for different equipment types',
          'Real-time data processing with stream analytics',
          'Comprehensive model monitoring and drift detection',
          'Integration with IoT platforms and sensor networks',
          'Advanced AI models for complex equipment and system interactions',
          'Integration with digital twin technology for virtual equipment modeling',
          'Advanced computer vision for equipment condition assessment',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Predictive+Maintenance',
        demo: 'maintenance',
        github: 'https://github.com/caelfindley/predictive-maintenance',
        status: 'Live',
        impact: 'Reduced unplanned downtime by 65% and maintenance costs by 30%'
      },
      {
        id: 'customer-chatbot',
        title: 'AI-Powered Customer Support Chatbot',
        description: 'Intelligent conversational AI system that handles customer inquiries, provides product information, and escalates complex issues to human agents. Features natural language understanding and sentiment analysis.',
        tech: ['Dialogflow', 'React', 'Firebase', 'Node.js', 'NLP', 'Sentiment Analysis', 'WebRTC', 'Docker', 'Kubernetes', 'TensorFlow', 'BERT', 'WebSocket'],
        features: [
          'Advanced natural language understanding with context awareness',
          'Multi-language support with automatic translation',
          'Sentiment analysis for customer satisfaction tracking',
          'Seamless human handoff with conversation history',
          'Integration with CRM and knowledge base systems',
          'Voice-to-text and text-to-speech capabilities',
          'Analytics dashboard for conversation insights',
          'Customizable conversation flows and responses',
          'Advanced intent recognition with entity extraction',
          'Real-time conversation monitoring and quality assurance',
          'Integration with multiple communication channels',
          'Advanced analytics and reporting capabilities',
          'Advanced AI models for complex problem-solving and decision-making',
          'Integration with modern communication platforms and channels',
          'Advanced analytics with predictive insights for customer behavior',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Customer+Chatbot',
        demo: 'chatbot',
        github: 'https://github.com/caelfindley/customer-chatbot',
        status: 'Live',
        impact: 'Handled 80% of customer inquiries automatically and improved response time by 90%'
      },
    ],
    data: [
      {
        id: 'environment-dashboard',
        title: 'Environmental Impact Dashboard',
        description: 'Comprehensive environmental monitoring and analytics platform that tracks water quality, harvest yields, and sustainability metrics. Provides actionable insights for environmental compliance and optimization.',
        tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'TimescaleDB', 'Grafana', 'InfluxDB', 'Docker', 'Kubernetes', 'TensorFlow', 'Apache Spark', 'Elasticsearch'],
        features: [
          'Real-time water quality monitoring with 20+ parameters',
          'Advanced data visualization with interactive charts',
          'Automated alerting for environmental threshold violations',
          'Comprehensive sustainability metrics tracking',
          'Integration with regulatory compliance databases',
          'Predictive analytics for environmental trend forecasting',
          'Mobile-responsive design with offline data collection',
          'Automated report generation for regulatory submissions',
          'Advanced data processing and analytics capabilities',
          'Integration with external environmental data sources',
          'Comprehensive audit logging and compliance reporting',
          'Real-time data scraping and market intelligence',
          'Advanced AI models for environmental prediction and risk assessment',
          'Integration with modern environmental monitoring technologies',
          'Advanced analytics with predictive insights for environmental trends',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Environmental+Dashboard',
        demo: 'environment',
        github: 'https://github.com/caelfindley/environment-dashboard',
        status: 'Live',
        impact: 'Improved environmental compliance to 100% and reduced monitoring costs by 45%'
      },
      {
        id: 'sales-forecasting',
        title: 'Advanced Sales Forecasting Model',
        description: 'Sophisticated machine learning model that predicts sales trends, seasonal patterns, and market demand using historical data, external factors, and advanced statistical methods.',
        tech: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'Prophet', 'XGBoost', 'Streamlit', 'TensorFlow', 'Apache Spark', 'PostgreSQL', 'Redis', 'Docker'],
        features: [
          'Multi-variable time series analysis with external factors',
          'Seasonal decomposition and trend analysis',
          'Regional and product-specific forecasting models',
          'Real-time forecast accuracy monitoring and model retraining',
          'Integration with ERP and CRM systems',
          'Scenario planning and what-if analysis tools',
          'Automated report generation with executive summaries',
          'Mobile dashboard for sales team access',
          'Advanced feature engineering and selection',
          'Ensemble methods for improved prediction accuracy',
          'Real-time data scraping and market intelligence',
          'Comprehensive model explainability and interpretability',
          'Multi-variate analysis with external factor integration',
          'Advanced anomaly detection for sales pattern analysis',
          'Integration with modern data platforms and real-time streaming',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Sales+Forecasting',
        demo: 'forecast',
        github: 'https://github.com/caelfindley/sales-forecasting',
        status: 'Live',
        impact: 'Improved forecast accuracy by 85% and reduced inventory costs by 20%'
      },
    ],
    devops: [
      {
        id: 'ci-cd-pipeline',
        title: 'Enterprise CI/CD Pipeline',
        description: 'Comprehensive continuous integration and deployment pipeline that automates the entire software development lifecycle from code commit to production deployment with advanced security scanning and quality gates.',
        tech: ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'Helm', 'ArgoCD', 'SonarQube', 'Nexus', 'Prometheus', 'Grafana', 'Istio', 'Vault'],
        features: [
          'Multi-stage pipeline with automated testing and security scanning',
          'Infrastructure as Code with Terraform and CloudFormation',
          'Advanced security scanning with SAST, DAST, and container scanning',
          'Automated quality gates with code coverage and performance testing',
          'Multi-environment deployment with blue-green and canary strategies',
          'Comprehensive monitoring and alerting with custom dashboards',
          'Secret management and configuration management automation',
          'Rollback capabilities with automated health checks',
          'Integration with multiple cloud providers and on-premise systems',
          'Advanced artifact management with versioning and promotion',
          'Comprehensive audit logging and compliance reporting',
          'Real-time pipeline monitoring and performance optimization',
          'Advanced workflow automation with custom triggers and conditions',
          'Integration with modern development tools and platforms',
          'Advanced security compliance with automated policy enforcement',
          'Multi-region deployment with automated failover capabilities',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=CI+CD+Pipeline',
        demo: 'ci-cd',
        github: 'https://github.com/caelfindley/ci-cd-pipeline',
        status: 'Live',
        impact: 'Reduced deployment time by 80% and improved deployment success rate to 99.5%'
      },
      {
        id: 'observability-platform',
        title: 'Full-Stack Observability Platform',
        description: 'Comprehensive monitoring and observability solution that provides end-to-end visibility into application performance, infrastructure health, and business metrics with advanced analytics and alerting.',
        tech: ['Prometheus', 'Grafana', 'Jaeger', 'Elasticsearch', 'Kibana', 'Fluentd', 'OpenTelemetry', 'Kubernetes', 'Istio', 'Datadog', 'Splunk', 'New Relic'],
        features: [
          'Distributed tracing with end-to-end request tracking',
          'Advanced metrics collection and aggregation',
          'Real-time log aggregation and analysis',
          'Custom dashboard creation with advanced visualizations',
          'Intelligent alerting with machine learning-based anomaly detection',
          'Performance optimization recommendations',
          'Integration with multiple data sources and platforms',
          'Advanced analytics with predictive insights',
          'Comprehensive SLA and SLO monitoring',
          'Automated incident response and remediation',
          'Advanced correlation analysis across metrics, logs, and traces',
          'Custom metric collection and business intelligence',
          'Integration with modern cloud-native technologies',
          'Advanced security monitoring and threat detection',
          'Comprehensive compliance reporting and audit trails',
          'Multi-cloud monitoring with unified dashboards',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Observability+Platform',
        demo: 'observability',
        github: 'https://github.com/caelfindley/observability-platform',
        status: 'Live',
        impact: 'Reduced mean time to resolution by 70% and improved system availability to 99.99%'
      },
    ],
    blockchain: [
      {
        id: 'supply-chain-blockchain',
        title: 'Blockchain Supply Chain Transparency',
        description: 'Decentralized supply chain tracking system using blockchain technology to provide end-to-end transparency, traceability, and authenticity verification for oyster products from farm to consumer.',
        tech: ['Ethereum', 'Solidity', 'Web3.js', 'IPFS', 'React', 'Node.js', 'MongoDB', 'Docker', 'Kubernetes', 'Truffle', 'Ganache', 'MetaMask'],
        features: [
          'Smart contracts for automated supply chain verification',
          'Decentralized storage with IPFS for product documentation',
          'QR code-based product tracking and authentication',
          'Real-time supply chain visibility and transparency',
          'Automated compliance verification and reporting',
          'Consumer-facing mobile app for product verification',
          'Integration with IoT sensors for real-time data collection',
          'Advanced analytics with blockchain data insights',
          'Multi-stakeholder access control and permissions',
          'Automated audit trails and compliance reporting',
          'Integration with existing ERP and logistics systems',
          'Advanced security with cryptographic verification',
          'Scalable architecture with layer 2 solutions',
          'Cross-chain interoperability for multi-platform support',
          'Advanced analytics with predictive insights',
          'Integration with modern blockchain frameworks and standards',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Blockchain+Supply+Chain',
        demo: 'blockchain',
        github: 'https://github.com/caelfindley/blockchain-supply-chain',
        status: 'Live',
        impact: 'Improved supply chain transparency by 100% and reduced fraud incidents to zero'
      },
      {
        id: 'ai-optimization-engine',
        title: 'AI-Powered Business Optimization Engine',
        description: 'Advanced artificial intelligence system that optimizes business operations across multiple domains including production, logistics, marketing, and customer service using machine learning and predictive analytics.',
        tech: ['TensorFlow', 'PyTorch', 'Python', 'Apache Spark', 'Kubernetes', 'Docker', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Grafana', 'MLflow', 'Kubeflow'],
        features: [
          'Multi-domain optimization with cross-functional insights',
          'Advanced machine learning models for predictive analytics',
          'Real-time decision support with automated recommendations',
          'Integration with multiple business systems and data sources',
          'Advanced natural language processing for business intelligence',
          'Automated model training and deployment with MLOps',
          'Comprehensive performance monitoring and optimization',
          'Advanced analytics with business impact quantification',
          'Integration with modern AI frameworks and technologies',
          'Advanced security with privacy-preserving machine learning',
          'Comprehensive audit logging and compliance reporting',
          'Real-time data processing with stream analytics',
          'Advanced visualization and reporting capabilities',
          'Integration with modern cloud-native technologies',
          'Advanced automation with robotic process automation',
          'Multi-cloud deployment with automated failover',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=AI+Optimization+Engine',
        demo: 'ai-optimization',
        github: 'https://github.com/caelfindley/ai-optimization-engine',
        status: 'Live',
        impact: 'Improved operational efficiency by 40% and reduced costs by 25%'
      },
    ],
    enterprise: [
      {
        id: 'erp-system',
        title: 'Enterprise Resource Planning System',
        description: 'Comprehensive ERP solution that integrates all business processes including finance, HR, supply chain, and customer relationship management. Built with modern microservices architecture and real-time analytics.',
        tech: ['Spring Boot', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'Elasticsearch', 'Grafana', 'Keycloak', 'Apache Camel', 'Quarkus'],
        features: [
          'Multi-module architecture with domain-driven design',
          'Real-time financial reporting and analytics',
          'Advanced inventory management with demand forecasting',
          'Integrated HR management with payroll automation',
          'Customer relationship management with sales pipeline',
          'Supply chain optimization with vendor management',
          'Advanced workflow automation with business process modeling',
          'Multi-tenant architecture with data isolation',
          'Comprehensive audit logging and compliance reporting',
          'Advanced analytics with machine learning insights',
          'Integration with external systems via APIs',
          'Mobile-responsive design with offline capabilities',
          'Advanced security with role-based access control',
          'Real-time notifications and alerting system',
          'Comprehensive reporting with custom dashboards',
          'Integration with modern cloud platforms and services',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=ERP+System',
        demo: 'erp',
        github: 'https://github.com/caelfindley/erp-system',
        status: 'Live',
        impact: 'Streamlined business operations by 60% and improved decision-making speed by 75%'
      },
      {
        id: 'ecommerce-platform',
        title: 'Scalable E-Commerce Platform',
        description: 'High-performance e-commerce platform built for enterprise-scale operations with advanced features like AI-powered recommendations, real-time inventory, and multi-channel sales integration.',
        tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Stripe', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'TypeScript', 'Prisma'],
        features: [
          'AI-powered product recommendations and personalization',
          'Real-time inventory management with automated reordering',
          'Multi-channel sales integration (web, mobile, social)',
          'Advanced payment processing with multiple gateways',
          'Comprehensive order management and fulfillment',
          'Customer analytics and behavior tracking',
          'Advanced search with filters and faceted navigation',
          'Mobile-first responsive design with PWA capabilities',
          'Multi-language and multi-currency support',
          'Advanced shipping and logistics integration',
          'Comprehensive admin dashboard with analytics',
          'Integration with major marketplaces and platforms',
          'Advanced security with fraud detection',
          'Real-time notifications and customer communication',
          'Comprehensive reporting and business intelligence',
          'Scalable architecture with auto-scaling capabilities',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=E-Commerce+Platform',
        demo: 'ecommerce',
        github: 'https://github.com/caelfindley/ecommerce-platform',
        status: 'Live',
        impact: 'Increased conversion rates by 45% and reduced cart abandonment by 30%'
      },
    ],
    fintech: [
      {
        id: 'payment-gateway',
        title: 'Secure Payment Gateway',
        description: 'Enterprise-grade payment processing system with advanced fraud detection, multi-currency support, and compliance with PCI DSS standards. Handles millions of transactions with 99.99% uptime.',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'Stripe API', 'PCI DSS', 'Elasticsearch', 'Prometheus'],
        features: [
          'Advanced fraud detection with machine learning',
          'Multi-currency and multi-payment method support',
          'Real-time transaction processing and settlement',
          'Comprehensive compliance with PCI DSS standards',
          'Advanced security with end-to-end encryption',
          'Real-time monitoring and alerting system',
          'Comprehensive audit logging and reporting',
          'Integration with major payment processors',
          'Advanced analytics and business intelligence',
          'Multi-region deployment with failover',
          'Advanced rate limiting and DDoS protection',
          'Comprehensive API documentation and SDKs',
          'Advanced reconciliation and settlement automation',
          'Integration with accounting and ERP systems',
          'Advanced customer support and dispute resolution',
          'Comprehensive testing and quality assurance',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Payment+Gateway',
        demo: 'payment',
        github: 'https://github.com/caelfindley/payment-gateway',
        status: 'Live',
        impact: 'Processed $50M+ in transactions with 99.99% uptime and zero security breaches'
      },
      {
        id: 'risk-management-system',
        title: 'Financial Risk Management System',
        description: 'Advanced risk assessment and management platform for financial institutions. Uses machine learning to predict market risks, credit risks, and operational risks with real-time monitoring and alerting.',
        tech: ['Python', 'TensorFlow', 'Pandas', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'Grafana', 'Elasticsearch', 'Apache Spark', 'MLflow'],
        features: [
          'Advanced risk modeling with machine learning algorithms',
          'Real-time market data integration and analysis',
          'Credit risk assessment and scoring models',
          'Operational risk monitoring and alerting',
          'Comprehensive compliance reporting and audit trails',
          'Advanced analytics with predictive insights',
          'Integration with multiple data sources and APIs',
          'Real-time dashboard with customizable alerts',
          'Advanced scenario analysis and stress testing',
          'Multi-asset class risk assessment',
          'Advanced portfolio optimization and management',
          'Integration with trading and banking systems',
          'Advanced security with role-based access control',
          'Comprehensive documentation and training materials',
          'Advanced backtesting and model validation',
          'Integration with regulatory reporting systems',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Risk+Management',
        demo: 'risk',
        github: 'https://github.com/caelfindley/risk-management',
        status: 'Live',
        impact: 'Reduced risk exposure by 40% and improved compliance reporting efficiency by 80%'
      },
    ],
    healthcare: [
      {
        id: 'telemedicine-platform',
        title: 'Telemedicine Platform',
        description: 'Comprehensive telemedicine solution that enables secure video consultations, electronic health records management, and remote patient monitoring. HIPAA-compliant with advanced security features.',
        tech: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'HIPAA', 'WebSocket', 'TensorFlow', 'Elasticsearch', 'Kubernetes'],
        features: [
          'Secure video consultations with HD quality',
          'Electronic health records management',
          'Remote patient monitoring with IoT integration',
          'HIPAA-compliant security and privacy',
          'Advanced appointment scheduling and management',
          'Prescription management and e-prescribing',
          'Integration with medical devices and wearables',
          'Advanced analytics and reporting capabilities',
          'Multi-language support for diverse patient populations',
          'Mobile applications for patients and providers',
          'Advanced billing and insurance integration',
          'Comprehensive audit logging and compliance',
          'Integration with existing healthcare systems',
          'Advanced security with end-to-end encryption',
          'Real-time notifications and communication',
          'Comprehensive training and support materials',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Telemedicine+Platform',
        demo: 'telemedicine',
        github: 'https://github.com/caelfindley/telemedicine-platform',
        status: 'Live',
        impact: 'Served 10,000+ patients with 95% satisfaction rate and reduced wait times by 70%'
      },
      {
        id: 'clinical-decision-support',
        title: 'AI-Powered Clinical Decision Support',
        description: 'Advanced clinical decision support system that uses machine learning to assist healthcare providers in diagnosis, treatment planning, and patient care. Integrates with existing EHR systems.',
        tech: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'MLflow', 'Grafana', 'Elasticsearch', 'DICOM'],
        features: [
          'AI-powered diagnosis assistance and recommendations',
          'Integration with medical imaging and DICOM systems',
          'Advanced natural language processing for medical text',
          'Real-time patient data analysis and insights',
          'Comprehensive drug interaction checking',
          'Advanced clinical guidelines and protocols',
          'Integration with laboratory and radiology systems',
          'Advanced analytics and reporting capabilities',
          'Comprehensive audit logging and compliance',
          'Advanced security with role-based access control',
          'Integration with existing EHR and hospital systems',
          'Advanced machine learning model training and validation',
          'Comprehensive documentation and training materials',
          'Advanced performance monitoring and optimization',
          'Integration with research and clinical trials',
          'Advanced data visualization and reporting',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Clinical+Decision+Support',
        demo: 'clinical',
        github: 'https://github.com/caelfindley/clinical-decision-support',
        status: 'Live',
        impact: 'Improved diagnostic accuracy by 25% and reduced medical errors by 40%'
      },
    ],
    iot: [
      {
        id: 'smart-city-platform',
        title: 'Smart City IoT Platform',
        description: 'Comprehensive IoT platform for smart city management including traffic monitoring, environmental sensing, waste management, and public safety. Real-time data processing with predictive analytics.',
        tech: ['Python', 'Kafka', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes', 'MQTT', 'LoRaWAN', 'TensorFlow', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        features: [
          'Real-time traffic monitoring and optimization',
          'Environmental monitoring and air quality tracking',
          'Smart waste management and collection optimization',
          'Public safety monitoring and emergency response',
          'Advanced data processing with stream analytics',
          'Predictive analytics for urban planning',
          'Integration with multiple IoT sensors and devices',
          'Advanced visualization and dashboard capabilities',
          'Comprehensive alerting and notification system',
          'Integration with city management systems',
          'Advanced security with device authentication',
          'Comprehensive analytics and reporting',
          'Integration with public transportation systems',
          'Advanced machine learning for pattern recognition',
          'Comprehensive API for third-party integrations',
          'Advanced scalability and performance optimization',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Smart+City+Platform',
        demo: 'smart-city',
        github: 'https://github.com/caelfindley/smart-city-platform',
        status: 'Live',
        impact: 'Reduced traffic congestion by 30% and improved public safety response time by 50%'
      },
      {
        id: 'industrial-iot-monitoring',
        title: 'Industrial IoT Monitoring System',
        description: 'Advanced industrial IoT platform for manufacturing and industrial facilities. Real-time monitoring of equipment, predictive maintenance, and optimization of production processes.',
        tech: ['Python', 'Kafka', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes', 'OPC UA', 'Modbus', 'TensorFlow', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        features: [
          'Real-time equipment monitoring and diagnostics',
          'Predictive maintenance with machine learning',
          'Production process optimization and automation',
          'Advanced data collection from industrial sensors',
          'Comprehensive alerting and notification system',
          'Integration with SCADA and MES systems',
          'Advanced analytics and reporting capabilities',
          'Energy consumption monitoring and optimization',
          'Quality control and defect detection',
          'Integration with ERP and manufacturing systems',
          'Advanced security with industrial protocols',
          'Comprehensive audit logging and compliance',
          'Integration with cloud platforms and services',
          'Advanced visualization and dashboard capabilities',
          'Comprehensive API for system integration',
          'Advanced scalability and performance optimization',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Industrial+IoT',
        demo: 'industrial-iot',
        github: 'https://github.com/caelfindley/industrial-iot-monitoring',
        status: 'Live',
        impact: 'Reduced equipment downtime by 60% and improved production efficiency by 35%'
      },
    ],
    modern: [
      {
        id: 'microservices-platform',
        title: 'Microservices Platform Architecture',
        description: 'Enterprise-grade microservices platform with service mesh, API gateway, and distributed tracing. Built for high scalability, fault tolerance, and rapid development cycles.',
        tech: ['Kubernetes', 'Istio', 'Docker', 'Spring Boot', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'Jaeger', 'Prometheus', 'Grafana', 'Helm'],
        features: [
          'Service mesh with Istio for traffic management',
          'API gateway with rate limiting and authentication',
          'Distributed tracing with Jaeger integration',
          'Centralized logging with ELK stack',
          'Automated service discovery and load balancing',
          'Circuit breaker pattern for fault tolerance',
          'Advanced monitoring and alerting system',
          'Automated deployment with GitOps',
          'Multi-environment support with blue-green deployment',
          'Advanced security with mTLS and RBAC',
          'Comprehensive API documentation with OpenAPI',
          'Advanced testing strategies with contract testing',
          'Performance optimization with caching strategies',
          'Integration with CI/CD pipelines',
          'Advanced observability with custom metrics',
          'Comprehensive disaster recovery and backup',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Microservices+Platform',
        demo: 'microservices',
        github: 'https://github.com/caelfindley/microservices-platform',
        status: 'Live',
        impact: 'Reduced deployment time by 90% and improved system reliability to 99.99%'
      },
      {
        id: 'real-time-analytics-platform',
        title: 'Real-Time Analytics Platform',
        description: 'High-performance real-time analytics platform that processes millions of events per second with sub-millisecond latency. Built for streaming data analysis and real-time decision making.',
        tech: ['Apache Kafka', 'Apache Flink', 'Apache Spark', 'Redis', 'Elasticsearch', 'Grafana', 'Docker', 'Kubernetes', 'InfluxDB', 'Prometheus', 'Python', 'Java'],
        features: [
          'Real-time stream processing with Apache Flink',
          'High-throughput message queuing with Kafka',
          'Advanced analytics with Apache Spark',
          'Real-time dashboard with Grafana',
          'Advanced data visualization and reporting',
          'Machine learning model serving in real-time',
          'Advanced alerting and notification system',
          'Integration with multiple data sources',
          'Advanced performance monitoring and optimization',
          'Comprehensive data governance and quality',
          'Advanced security with data encryption',
          'Comprehensive audit logging and compliance',
          'Integration with modern data platforms',
          'Advanced scalability and performance optimization',
          'Comprehensive API for data access',
          'Advanced machine learning pipeline integration',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Real-Time+Analytics',
        demo: 'analytics',
        github: 'https://github.com/caelfindley/real-time-analytics',
        status: 'Live',
        impact: 'Processed 100M+ events per day with sub-100ms latency and 99.9% uptime'
      },
    ],
    security: [
      {
        id: 'security-operations-center',
        title: 'Security Operations Center (SOC)',
        description: 'Comprehensive security operations center platform that provides 24/7 threat monitoring, incident response, and security analytics. Integrates with SIEM, EDR, and threat intelligence platforms.',
        tech: ['Elasticsearch', 'Kibana', 'Python', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Splunk', 'QRadar', 'CrowdStrike', 'MITRE ATT&CK', 'MISP'],
        features: [
          'Real-time threat detection and monitoring',
          'Advanced incident response automation',
          'Comprehensive security analytics and reporting',
          'Integration with SIEM and EDR platforms',
          'Advanced threat intelligence integration',
          'Automated threat hunting and investigation',
          'Comprehensive compliance reporting and audit',
          'Advanced security orchestration and response',
          'Integration with multiple security tools',
          'Advanced machine learning for threat detection',
          'Comprehensive dashboard and visualization',
          'Advanced alerting and notification system',
          'Integration with modern security frameworks',
          'Advanced performance monitoring and optimization',
          'Comprehensive training and documentation',
          'Advanced security metrics and KPIs',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Security+Operations+Center',
        demo: 'soc',
        github: 'https://github.com/caelfindley/security-operations-center',
        status: 'Live',
        impact: 'Reduced mean time to detection by 80% and improved incident response time by 70%'
      },
      {
        id: 'zero-trust-architecture',
        title: 'Zero Trust Security Architecture',
        description: 'Comprehensive zero trust security implementation with identity verification, device trust, and continuous monitoring. Provides enterprise-grade security with minimal user friction.',
        tech: ['Okta', 'Azure AD', 'CrowdStrike', 'Palo Alto', 'Cisco', 'Docker', 'Kubernetes', 'Istio', 'Prometheus', 'Grafana', 'Elasticsearch', 'Splunk'],
        features: [
          'Identity and access management with SSO',
          'Device trust and compliance verification',
          'Network segmentation and micro-segmentation',
          'Advanced threat detection and response',
          'Comprehensive security monitoring and alerting',
          'Integration with modern security tools',
          'Advanced analytics and reporting capabilities',
          'Comprehensive audit logging and compliance',
          'Advanced automation and orchestration',
          'Integration with cloud security platforms',
          'Advanced performance monitoring and optimization',
          'Comprehensive training and documentation',
          'Advanced security metrics and KPIs',
          'Integration with modern security frameworks',
          'Advanced incident response and remediation',
          'Comprehensive disaster recovery and backup',
        ],
        image: 'https://placehold.co/800x400/teal/white?text=Zero+Trust+Architecture',
        demo: 'zero-trust',
        github: 'https://github.com/caelfindley/zero-trust-architecture',
        status: 'Live',
        impact: 'Reduced security incidents by 90% and improved compliance score to 100%'
      },
    ],
    freelancing: {
      company: {
        name: 'TechCraft Solutions',
        tagline: 'Enterprise Software Development & Digital Transformation',
        description: 'Specialized in building scalable, secure, and innovative software solutions for businesses of all sizes. From concept to deployment, we deliver cutting-edge technology solutions that drive growth and efficiency.',
        founded: '2025',
        clients: '50+',
        projects: '100+',
        satisfaction: '98%'
      },
      services: [
        {
          id: 'full-stack-development',
          title: 'Full-Stack Development',
          description: 'End-to-end web and mobile application development with modern technologies and best practices.',
          icon: '💻',
          upfront: '$5,000-25,000',
          monthly: '$500-2,000',
          features: [
            'React, Angular, Vue.js frontend development',
            'Node.js, Python, Java backend development',
            'Mobile app development (React Native, Flutter)',
            'Database design and optimization',
            'API development and integration',
            'Performance optimization and testing',
            'Deployment and DevOps setup',
            'Ongoing maintenance and support'
          ],
          technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes']
        },



        {
          id: 'security-consulting',
          title: 'Security Consulting',
          description: 'Comprehensive cybersecurity solutions and security architecture design.',
          icon: '🔒',
          upfront: '$10,000-40,000',
          monthly: '$1,000-4,000',
          features: [
            'Security architecture design',
            'Penetration testing and vulnerability assessment',
            'Compliance implementation (SOC2, HIPAA, PCI)',
            'Security monitoring and incident response',
            'Identity and access management',
            'Zero trust architecture implementation',
            'Security training and awareness',
            'Risk assessment and mitigation'
          ],
          technologies: ['OWASP', 'NIST', 'MITRE ATT&CK', 'SIEM', 'EDR', 'IAM']
        },
        {
          id: 'data-analytics',
          title: 'Data Analytics & BI',
          description: 'Data-driven insights and business intelligence solutions for informed decision making.',
          icon: '📊',
          upfront: '$6,000-20,000',
          monthly: '$600-2,000',
          features: [
            'Data warehouse design and implementation',
            'ETL pipeline development',
            'Business intelligence dashboard creation',
            'Real-time analytics and reporting',
            'Data visualization and storytelling',
            'Predictive analytics and forecasting',
            'Data governance and quality assurance',
            'Performance optimization and tuning'
          ],
          technologies: ['Python', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 'Snowflake']
        }
      ],

      process: [
        {
          step: 1,
          title: 'Discovery & Planning',
          description: 'Understanding your business needs, technical requirements, and project scope.',
          icon: '🔍'
        },
        {
          step: 2,
          title: 'Architecture Design',
          description: 'Creating scalable, secure, and efficient technical architecture.',
          icon: '🏗️'
        },
        {
          step: 3,
          title: 'Development & Testing',
          description: 'Agile development with continuous testing and quality assurance.',
          icon: '⚡'
        },
        {
          step: 4,
          title: 'Deployment & Launch',
          description: 'Production deployment with monitoring and performance optimization.',
          icon: '🚀'
        },
        {
          step: 5,
          title: 'Support & Maintenance',
          description: 'Ongoing support, updates, and maintenance to ensure optimal performance.',
          icon: '🛠️'
        }
      ]
    },
  };

  // Removed scroll handling to prevent interference with page scrolling

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const renderProjects = (category) =>
    projects[category].map((project, index) => (
      <div
        key={project.id}
        className="bg-gray-800 p-6 rounded-xl shadow-lg card-hover cursor-pointer animate-slide-up border border-gray-700"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => {
          setCurrentPage('project-detail');
          setProjectPage(project);
        }}
      >
        <div className="relative mb-4">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {project.status}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 leading-tight min-h-[1.5rem]">{project.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span key={i} className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-teal-500">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(project.demo);
            }}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            Live Demo
          </button>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </a>
        </div>
      </div>
    ));

  const renderProjectDetail = () => {
    if (!projectPage) return null;

    return (
      <section className="animate-fade-in">
        <button
          onClick={() => {
            setCurrentPage('software');
            setProjectPage(null);
          }}
          className="mb-6 text-teal-400 hover:text-teal-300 underline flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back to Projects
        </button>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <img src={projectPage.image} alt={projectPage.title} className="w-full h-64 object-cover" />
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold gradient-text leading-tight">{projectPage.title}</h2>
              <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {projectPage.status}
              </span>
            </div>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">{projectPage.description}</p>

            {projectPage.impact && (
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Business Impact</h3>
                <p className="text-gray-300 font-medium">{projectPage.impact}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {projectPage.tech.map((tech, i) => (
                    <span key={i} className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-teal-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  {projectPage.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">Architecture</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Microservices-based architecture</li>
                  <li>• Event-driven communication</li>
                  <li>• Containerized deployment</li>
                  <li>• Auto-scaling capabilities</li>
                  <li>• Multi-region deployment</li>
                </ul>
              </div>
              
              <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">Performance</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• 99.9% uptime SLA</li>
                  <li>• &lt; 100ms response time</li>
                  <li>• Horizontal scaling</li>
                  <li>• Advanced caching</li>
                  <li>• CDN integration</li>
                </ul>
              </div>
              
              <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3">Security</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• End-to-end encryption</li>
                  <li>• OAuth 2.0 / OIDC</li>
                  <li>• Rate limiting</li>
                  <li>• Security headers</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a 
                href={projectPage.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                View Live Demo
              </a>
              <a 
                href={projectPage.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Live Data Demo Component
  function LiveDataDemo() {
    const [sensorData, setSensorData] = useState([]);
    const [latest, setLatest] = useState(null);
    const [connected, setConnected] = useState(false);
    
    // Debounce sensor data updates to prevent excessive re-renders
    const updateSensorData = useCallback((newData) => {
      setLatest(newData);
      setSensorData((prev) => [newData, ...prev.slice(0, 19)]); // keep last 20
    }, []);

    useEffect(() => {
      let socket;
      let updateTimeout;
      
      (async () => {
        const { io } = await import('https://cdn.socket.io/4.7.5/socket.io.esm.min.js');
        socket = io('http://localhost:4000');
        
        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => setConnected(false));
        
        socket.on('sensorData', (data) => {
          // Debounce updates to prevent excessive re-renders
          clearTimeout(updateTimeout);
          updateTimeout = setTimeout(() => {
            updateSensorData(data);
          }, 100); // Update every 100ms max
        });
      })();
      
      return () => { 
        if (socket) socket.disconnect();
        clearTimeout(updateTimeout);
      };
    }, [updateSensorData]);

    // Memoize the table rows to prevent unnecessary re-renders
    const tableRows = useMemo(() => 
      sensorData.map((d, i) => (
        <tr key={d.timestamp} className={i === 0 ? 'bg-green-50' : ''}>
          <td className="px-4 py-2">{new Date(d.timestamp).toLocaleTimeString()}</td>
          <td className="px-4 py-2">{d.temperature}</td>
          <td className="px-4 py-2">{d.salinity}</td>
          <td className="px-4 py-2">{d.ph}</td>
        </tr>
      )), [sensorData]);

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Live Sensor Data Demo</h2>
        <p className="mb-4 text-gray-700">This page shows real-time aquaculture sensor data streamed from a Node.js backend using Socket.IO.</p>
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        {latest && (
          <div className="bg-teal-50 p-6 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Latest Reading</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><span className="font-bold">Temperature:</span> {latest.temperature} °C</div>
              <div><span className="font-bold">Salinity:</span> {latest.salinity} ppt</div>
              <div><span className="font-bold">pH:</span> {latest.ph}</div>
              <div><span className="font-bold">Time:</span> {new Date(latest.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        )}
        <h4 className="text-xl font-semibold text-green-700 mb-2">Recent Readings</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-emerald-50 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Temperature (°C)</th>
                <th className="px-4 py-2">Salinity (ppt)</th>
                <th className="px-4 py-2">pH</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  function CloudMigrationToolset() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const startMigration = async () => {
      setLoading(true);
      setStatus('running');
      setMessage('');
      try {
        const res = await fetch('http://localhost:4000/api/migrate', { method: 'POST' });
        const data = await res.json();
        if (data.status === 'success') {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message);
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.message);
      }
      setLoading(false);
    };

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Cloud Migration Toolset</h2>
        <p className="mb-4 text-gray-700">This tool simulates migrating a legacy system to AWS cloud infrastructure using automated scripts and CI/CD pipelines.</p>
        <div className="mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={startMigration}
            disabled={loading}
          >
            {loading ? 'Migrating...' : 'Start Migration'}
          </button>
        </div>
        {status !== 'idle' && (
          <div className={`p-4 rounded-lg mb-4 ${status === 'success' ? 'bg-green-100 text-green-800' : status === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            <strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}<br />
            {message}
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">Included Artifacts</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Migration Script:</strong> <code>backend/migrate.js</code></li>
            <li><strong>CloudFormation Template:</strong> <code>backend/cloudformation-template.json</code></li>
            <li><strong>CI/CD Pipeline:</strong> <code>backend/.github/workflows/deploy.yml</code></li>
          </ul>
        </div>
      </section>
    );
  }

  function HelpdeskPortal() {
    const [tickets, setTickets] = useState([]);
    const [agents, setAgents] = useState([]);
    const [knowledgeBase, setKnowledgeBase] = useState([]);
    const [activeTab, setActiveTab] = useState('tickets');
    const [newTicket, setNewTicket] = useState({ title: '', description: '', category: 'Hardware', priority: 'Medium' });

    useEffect(() => {
      fetch('http://localhost:4000/api/tickets').then(res => res.json()).then(setTickets);
      fetch('http://localhost:4000/api/agents').then(res => res.json()).then(setAgents);
      fetch('http://localhost:4000/api/knowledge-base').then(res => res.json()).then(setKnowledgeBase);
    }, []);

    const submitTicket = async (e) => {
      e.preventDefault();
      const res = await fetch('http://localhost:4000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      });
      const ticket = await res.json();
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: '', description: '', category: 'Hardware', priority: 'Medium' });
    };

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Internal IT Helpdesk Portal</h2>
        <p className="mb-6 text-gray-700">Submit support tickets, track their status, and access the knowledge base.</p>
        
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['tickets', 'submit', 'agents', 'knowledge'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === tab ? 'bg-emerald-50 text-teal-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'tickets' && (
          <div className="bg-emerald-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Support Tickets</h3>
            <div className="space-y-4">
              {tickets.map(ticket => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{ticket.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{ticket.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Category: {ticket.category}</span>
                    <span>Status: {ticket.status}</span>
                    <span>Assigned: {ticket.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'submit' && (
          <div className="bg-teal-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Submit New Ticket</h3>
            <form onSubmit={submitTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="w-full p-2 border rounded-lg h-24"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Network</option>
                    <option>Account Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Agent Performance Dashboard</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {agents.map(agent => (
                <div key={agent.id} className="border rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">{agent.name}</h4>
                  <p className="text-gray-600">Tickets Resolved: {agent.ticketsResolved}</p>
                  <p className="text-gray-600">Avg Resolution: {agent.avgResolutionTime}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Knowledge Base</h3>
            <div className="space-y-4">
              {knowledgeBase.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{item.question}</h4>
                  <p className="text-gray-600 mb-2">{item.answer}</p>
                  <span className="text-sm text-gray-500">Category: {item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  function NetworkVulnerabilityScanner() {
    const [scanResults, setScanResults] = useState([]);
    const [currentScan, setCurrentScan] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [targets, setTargets] = useState('192.168.1.1,192.168.1.10,192.168.1.100');

    useEffect(() => {
      fetch('http://localhost:4000/api/scan-results').then(res => res.json()).then(setScanResults);
    }, []);

    const startScan = async () => {
      setScanning(true);
      setCurrentScan(null);
      try {
        const targetList = targets.split(',').map(t => t.trim()).filter(t => t);
        const res = await fetch('http://localhost:4000/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targets: targetList })
        });
        const result = await res.json();
        setCurrentScan(result);
        setScanResults([result, ...scanResults]);
      } catch (err) {
        console.error('Scan failed:', err);
      }
      setScanning(false);
    };

    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'High': return 'bg-red-100 text-red-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Network Vulnerability Scanner</h2>
        <p className="mb-6 text-gray-700">Scan internal network devices for vulnerabilities and open ports.</p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">Start New Scan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target IPs (comma-separated)</label>
              <input
                type="text"
                value={targets}
                onChange={(e) => setTargets(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="192.168.1.1,192.168.1.10,192.168.1.100"
              />
            </div>
            <button
              onClick={startScan}
              disabled={scanning}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {scanning ? 'Scanning...' : 'Start Scan'}
            </button>
          </div>
        </div>

        {currentScan && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Latest Scan Results</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-amber-600">{currentScan.summary.totalDevices}</div>
          <div className="text-sm text-amber-600">Devices Scanned</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">{currentScan.summary.devicesWithVulnerabilities}</div>
                <div className="text-sm text-yellow-600">Devices with Vulnerabilities</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{currentScan.summary.highRiskVulnerabilities}</div>
                <div className="text-sm text-red-600">High Risk Vulnerabilities</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{currentScan.scanId}</div>
                <div className="text-sm text-green-600">Scan ID</div>
              </div>
            </div>

            <div className="space-y-6">
              {currentScan.results.map((device, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{device.hostname}</h4>
                      <p className="text-gray-600">{device.ip}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        device.riskScore > 70 ? 'bg-red-100 text-red-800' :
                        device.riskScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        Risk Score: {device.riskScore}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-2">Open Ports & Services</h5>
                      <div className="space-y-1">
                        {device.openPorts.map((port, i) => (
                          <div key={i} className="text-sm">
                            <span className="font-medium">{port.port}</span> - {port.service} ({port.version})
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Vulnerabilities</h5>
                      <div className="space-y-2">
                        {device.vulnerabilities.map((vuln, i) => (
                          <div key={i} className="text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                              {vuln.severity}
                            </span>
                            <div className="mt-1">
                              <strong>{vuln.id}</strong>: {vuln.description}
                            </div>
                          </div>
                        ))}
                        {device.vulnerabilities.length === 0 && (
                          <p className="text-gray-500 text-sm">No vulnerabilities detected</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scanResults.length > 0 && (
          <div className="bg-teal-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Scan History</h3>
            <div className="space-y-2">
              {scanResults.map((scan, index) => (
                <div key={scan.scanId} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">Scan #{scan.scanId}</span>
                    <span className="text-gray-500 ml-2">
                      {scan.timestamp ? new Date(scan.timestamp).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {scan.targets} targets • {scan.summary.devicesWithVulnerabilities} vulnerable
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  function ZeroTrustAuth() {
    const [form, setForm] = useState({ username: '', password: '', device: 'desktop', location: 'US' });
    const [session, setSession] = useState(null);
    const [mfaCode, setMfaCode] = useState('');
    const [mfaStatus, setMfaStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
      setSession(null);
      setMfaCode('');
      setMfaStatus('idle');
      try {
        const res = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (data.status === 'error') throw new Error(data.message);
        setSession(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const handleMfa = async (e) => {
      e.preventDefault();
      setMfaStatus('pending');
      setError('');
      try {
        const res = await fetch('http://localhost:4000/api/auth/mfa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: session.sessionId, code: mfaCode })
        });
        const data = await res.json();
        if (data.status === 'error') throw new Error(data.message);
        setSession({ ...session, authenticated: true });
        setMfaStatus('success');
      } catch (err) {
        setError(err.message);
        setMfaStatus('error');
      }
    };

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Zero Trust Authentication</h2>
        <p className="mb-6 text-gray-700">Multi-factor authentication with adaptive risk scoring based on user behavior, device, and location.</p>
        <div className="bg-teal-50 rounded-xl shadow-lg p-6 max-w-lg mx-auto">
          {!session && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device</label>
                  <select
                    value={form.device}
                    onChange={e => setForm({ ...form, device: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="US">US</option>
                    <option value="CA">Canada</option>
                    <option value="UK">UK</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Login</button>
              {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            </form>
          )}
          {session && (
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Risk Score:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.risk >= 50 ? 'bg-red-100 text-red-800' : session.risk >= 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {session.risk}
                  </span>
                  <span className="ml-2 text-gray-500">({session.mfaRequired ? 'MFA Required' : 'MFA Not Required'})</span>
                </div>
              </div>
              {!session.authenticated && session.mfaRequired && (
                <form onSubmit={handleMfa} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MFA Code (use 123456)</label>
                    <input
                      type="text"
                      value={mfaCode}
                      onChange={e => setMfaCode(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">Verify MFA</button>
                  {mfaStatus === 'error' && <div className="text-red-600 text-sm mt-2">{error}</div>}
                  {mfaStatus === 'success' && <div className="text-green-600 text-sm mt-2">MFA Verified!</div>}
                </form>
              )}
              {session.authenticated && (
                <div className="text-green-700 font-semibold mt-4">Authenticated! Welcome, {session.username}.</div>
              )}
              {!session.authenticated && !session.mfaRequired && (
                <div className="text-yellow-700 font-semibold mt-4">Authentication failed or incomplete.</div>
              )}
              <button className="mt-6 text-amber-600 underline" onClick={() => { setSession(null); setError(''); }}>Log out</button>
            </div>
          )}
        </div>
      </section>
    );
  }

  function CustomerChatbot() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [handoffStatus, setHandoffStatus] = useState(null);

    useEffect(() => {
      // Add welcome message
      setMessages([
        {
          id: 1,
          type: 'bot',
          message: 'Hello! Welcome to Three Sisters Oyster Company. How can I help you today?',
          timestamp: new Date(),
          suggestions: ['How do I place an order?', 'What are your shipping options?', 'Are your oysters sustainable?']
        }
      ]);
    }, []);

    const sendMessage = async (message) => {
      if (!message.trim()) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      try {
        const res = await fetch('http://localhost:4000/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        const data = await res.json();
        
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          message: data.message,
          timestamp: new Date(),
          suggestions: data.suggestions || []
        };

        setMessages(prev => [...prev, botMessage]);
        
        if (data.type === 'handoff') {
          setHandoffStatus(data);
        }
      } catch (err) {
        const errorMessage = {
          id: Date.now() + 1,
          type: 'bot',
          message: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      
      setIsTyping(false);
    };

    const handleHandoff = async () => {
      setIsTyping(true);
      try {
        const res = await fetch('http://localhost:4000/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: '', handoff: true })
        });
        const data = await res.json();
        setHandoffStatus(data);
        
        const handoffMessage = {
          id: Date.now(),
          type: 'bot',
          message: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, handoffMessage]);
      } catch (err) {
        console.error('Handoff failed:', err);
      }
      setIsTyping(false);
    };

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Customer Support Chatbot</h2>
        <p className="mb-6 text-gray-700">AI-powered chatbot that answers common questions about our oyster products and services.</p>
        
        <div className="bg-emerald-50 rounded-xl shadow-lg max-w-2xl mx-auto">
          <div className="bg-green-600 text-white p-4 rounded-t-xl">
            <h3 className="font-semibold">Three Sisters Oyster Company - Customer Support</h3>
            <p className="text-sm opacity-90">AI Assistant</p>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {messages.length > 1 && messages[messages.length - 1].suggestions && (
            <div className="p-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {handoffStatus && (
            <div className="p-4 border-t bg-yellow-50">
              <div className="text-center">
                <p className="text-sm text-yellow-800">
                  <strong>Agent:</strong> {handoffStatus.agent} • <strong>Wait time:</strong> {handoffStatus.waitTime}
                </p>
              </div>
            </div>
          )}

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isTyping}
              />
              <button
                onClick={() => sendMessage(inputMessage)}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Send
              </button>
              <button
                onClick={handleHandoff}
                disabled={isTyping}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                Human
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function PredictiveMaintenanceAI() {
    const [equipment, setEquipment] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const [equipmentRes, recommendationsRes] = await Promise.all([
          fetch('http://localhost:4000/api/equipment-status'),
          fetch('http://localhost:4000/api/maintenance-recommendations')
        ]);
        const equipmentData = await equipmentRes.json();
        const recommendationsData = await recommendationsRes.json();
        setEquipment(equipmentData);
        setRecommendations(recommendationsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
      setLoading(false);
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Critical': return 'bg-red-100 text-red-800';
        case 'Warning': return 'bg-yellow-100 text-yellow-800';
        case 'Normal': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'High': return 'bg-red-100 text-red-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    if (loading) {
      return (
        <section className="animate-fade-in">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading equipment data...</p>
          </div>
        </section>
      );
    }

    return (
      <section className="animate-fade-in">
        <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Predictive Maintenance AI</h2>
        <p className="mb-6 text-gray-700">Machine learning model that predicts equipment failure based on sensor data to optimize maintenance schedules.</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">{equipment.length}</div>
            <div className="text-gray-600">Total Equipment</div>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {equipment.filter(eq => eq.status === 'Warning').length}
            </div>
            <div className="text-gray-600">Warning Status</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {equipment.filter(eq => eq.status === 'Critical').length}
            </div>
            <div className="text-gray-600">Critical Status</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-emerald-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Equipment Status</h3>
            <div className="space-y-4">
              {equipment.map((eq) => (
                <div 
                  key={eq.id} 
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedEquipment(eq)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{eq.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(eq.status)}`}>
                      {eq.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{eq.type} • {eq.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Failure Probability: {Number.isFinite(eq.failureProbability) ? (eq.failureProbability * 100).toFixed(1) : 'N/A'}%
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          eq.failureProbability > 0.6 ? 'bg-red-500' : 
                          eq.failureProbability > 0.3 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${eq.failureProbability * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Maintenance Recommendations</h3>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.equipmentId} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{rec.equipmentName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Failure Probability: {Number.isFinite(rec.failureProbability) ? (rec.failureProbability * 100).toFixed(1) : 'N/A'}%
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Estimated Cost: <strong>{rec.estimatedCost}</strong>
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {rec.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {recommendations.length === 0 && (
                <p className="text-gray-500 text-center py-8">No maintenance recommendations at this time.</p>
              )}
            </div>
          </div>
        </div>

        {selectedEquipment && (
          <div className="mt-8 bg-emerald-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Equipment Details: {selectedEquipment.name}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Sensor Data</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium">{selectedEquipment.sensorData.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vibration:</span>
                    <span className="font-medium">{selectedEquipment.sensorData.vibration} mm/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pressure:</span>
                    <span className="font-medium">{selectedEquipment.sensorData.pressure} bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flow Rate:</span>
                    <span className="font-medium">{selectedEquipment.sensorData.flowRate} L/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Runtime:</span>
                    <span className="font-medium">{selectedEquipment.sensorData.runtime} hours</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Maintenance Recommendations</h4>
                <ul className="space-y-2">
                  {selectedEquipment.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Last Maintenance:</strong> {selectedEquipment.lastMaintenance}
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedEquipment(null)}
              className="mt-4 text-amber-600 underline"
            >
              Close Details
            </button>
          </div>
        )}
      </section>
    );
  }

  function SalesForecastingModel() {
    const [historicalData, setHistoricalData] = useState([]);
    const [forecastData, setForecastData] = useState(null);
    const [regionalData, setRegionalData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [loading, setLoading] = useState(true);
    const [scrapingStatus, setScrapingStatus] = useState('idle');
    const [scrapedMarketData, setScrapedMarketData] = useState([]);
    const [lastScraped, setLastScraped] = useState(null);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const [historyRes, forecastRes, regionalRes] = await Promise.all([
          fetch('http://localhost:4000/api/sales-history'),
          fetch('http://localhost:4000/api/sales-forecast'),
          fetch('http://localhost:4000/api/regional-forecast')
        ]);
        const historyData = await historyRes.json();
        const forecastResult = await forecastRes.json();
        const regionalResult = await regionalRes.json();
        
        setHistoricalData(historyData);
        setForecastData(forecastResult);
        setRegionalData(regionalResult);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
      setLoading(false);
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };

    const getFilteredData = () => {
      if (selectedRegion === 'All') {
        return historicalData;
      }
      return historicalData.filter(d => d.region === selectedRegion);
    };

    const getTotalSales = (data) => {
      return data.reduce((sum, item) => sum + item.sales, 0);
    };

    const getAverageSales = (data) => {
      return data.length > 0 ? getTotalSales(data) / data.length : 0;
    };

    const startMarketDataScraping = useCallback(async () => {
      setScrapingStatus('scraping');
      try {
        const response = await fetch('http://localhost:4000/api/scrape-market-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sources: ['competitor_pricing', 'market_trends', 'economic_indicators', 'social_media_sentiment']
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Market scraping response:', data); // Debug log
          
          // Safely handle newData
          if (data.newData && Array.isArray(data.newData)) {
            setScrapedMarketData(prev => [...data.newData, ...prev.slice(0, 49)]); // Keep last 50 entries
          }
          
          setLastScraped(new Date().toISOString());
          setScrapingStatus('success');
          
          // Safely update forecast with new market data
          if (data.updatedForecast && typeof data.updatedForecast === 'object') {
            setForecastData(prev => ({ ...prev, ...data.updatedForecast }));
          }
          
          setTimeout(() => setScrapingStatus('idle'), 3000);
        } else {
          throw new Error('Market data scraping failed');
        }
      } catch (error) {
        console.error('Market data scraping error:', error);
        setScrapingStatus('error');
        setTimeout(() => setScrapingStatus('idle'), 3000);
      }
    }, []);

    if (loading) {
      return (
        <section className="animate-fade-in">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading sales data...</p>
          </div>
        </section>
      );
    }

    const filteredData = getFilteredData();
    const totalSales = getTotalSales(filteredData);
    const averageSales = getAverageSales(filteredData);

    return (
      <section className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-4xl font-bold gradient-text mb-2 leading-tight">Sales Forecasting Model</h2>
            <p className="text-gray-700">Advanced ML model with real-time market data scraping for accurate sales predictions.</p>
          </div>
          <button
            onClick={startMarketDataScraping}
            disabled={scrapingStatus === 'scraping'}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              scrapingStatus === 'scraping' 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {scrapingStatus === 'scraping' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Scraping...
              </>
            ) : (
              <>
                <span>📈</span>
                Scrape Market Data
              </>
            )}
          </button>
        </div>

        {/* Scraping Status */}
        {scrapingStatus !== 'idle' && (
          <div className={`mb-6 p-4 rounded-lg border ${
            scrapingStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            scrapingStatus === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              <span>
                {scrapingStatus === 'success' ? '✅' : 
                 scrapingStatus === 'error' ? '❌' : '🔄'}
              </span>
              <span className="font-medium">
                {scrapingStatus === 'success' ? 'Market data scraping completed! Forecast updated.' :
                 scrapingStatus === 'error' ? 'Market data scraping failed. Please try again.' :
                 'Scraping market data from multiple sources...'}
              </span>
            </div>
            {lastScraped && (
              <p className="text-sm mt-1 opacity-75">
                Last scraped: {lastScraped ? new Date(lastScraped).toLocaleString() : 'N/A'}
              </p>
            )}
          </div>
        )}
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-emerald-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">{formatCurrency(totalSales)}</div>
            <div className="text-gray-600">Total Historical Sales</div>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(averageSales)}</div>
            <div className="text-gray-600">Average Monthly Sales</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">
              {forecastData && Number.isFinite(forecastData.accuracy) ? `${(forecastData.accuracy * 100).toFixed(1)}%` : 'N/A'}
            </div>
            <div className="text-gray-600">Model Accuracy</div>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {forecastData ? formatCurrency(getTotalSales(forecastData.forecast)) : 'N/A'}
            </div>
            <div className="text-gray-600">Forecasted Sales (2025)</div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="All">All Regions</option>
            <option value="Northeast">Northeast</option>
            <option value="Southeast">Southeast</option>
            <option value="West Coast">West Coast</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Sales Trend Analysis</h3>
            <div className="space-y-4">
              {filteredData.slice(-12).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{item.month}</span>
                    <span className="text-gray-500 ml-2">({item.region})</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(item.sales)}</div>
                    <div className="text-sm text-gray-500">
                      {index > 0 && Number.isFinite(item.sales) && Number.isFinite(filteredData[filteredData.length - 13 + index]?.sales) ? `${((item.sales - filteredData[filteredData.length - 13 + index].sales) / filteredData[filteredData.length - 13 + index].sales * 100).toFixed(1)}%` : 'N/A'} vs prev
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Forecast Predictions</h3>
            {forecastData && (
              <div className="space-y-4">
                {forecastData.forecast.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{item.month}</span>
                      <span className="text-gray-500 ml-2">(Forecast)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(item.sales)}</div>
                      <div className="text-sm text-gray-500">
                        Confidence: {Number.isFinite(item.confidence) ? (item.confidence * 100).toFixed(0) : 'N/A'}%
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Model:</strong> {forecastData.model}
                  </p>
                  <p className="text-sm text-amber-800">
                    <strong>Last Updated:</strong> {new Date(forecastData.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">Regional Performance</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {regionalData.map((region) => (
              <div key={region.region} className="border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3">{region.region}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Sales:</span>
                    <span className="font-medium">{formatCurrency(region.currentSales)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Rate:</span>
                    <span className="font-medium text-green-600">{Number.isFinite(region.growthRate) ? `+${(region.growthRate * 100).toFixed(1)}%` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Share:</span>
                    <span className="font-medium">{Number.isFinite(region.marketShare) ? (region.marketShare * 100).toFixed(1) : 'N/A'}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="font-medium mb-2">6-Month Forecast:</h5>
                  <div className="space-y-1">
                    {region.forecast.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.month}:</span>
                        <span>{formatCurrency(item.sales)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">Seasonal Pattern Analysis</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600 mb-2">Q1</div>
              <div className="text-sm text-gray-600">Winter (Jan-Mar)</div>
              <div className="text-lg font-semibold mt-2">Lower Demand</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Q2</div>
              <div className="text-sm text-gray-600">Spring (Apr-Jun)</div>
              <div className="text-lg font-semibold mt-2">Growing Season</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-2">Q3</div>
              <div className="text-sm text-gray-600">Summer (Jul-Sep)</div>
              <div className="text-lg font-semibold mt-2">Peak Demand</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">Q4</div>
              <div className="text-sm text-gray-600">Fall (Oct-Dec)</div>
              <div className="text-lg font-semibold mt-2">Holiday Season</div>
            </div>
          </div>
        </div>

        {/* Real-Time Market Data Section */}
        {scrapedMarketData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Real-Time Market Intelligence</h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-600">📊</span>
                <span className="font-medium">Latest Market Data from External Sources</span>
                <span className="text-sm text-gray-500">({scrapedMarketData.length} records)</span>
              </div>
              <p className="text-sm text-gray-600">
                Data scraped from competitor pricing, market trends, economic indicators, and social media sentiment
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 rounded-lg">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Value</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Impact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {scrapedMarketData.slice(0, 10).map((data, index) => (
                    <tr key={data.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="font-medium">{data.source || 'Unknown'}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {data.data ? Object.keys(data.data).join(', ') : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {data.data ? JSON.stringify(data.data).substring(0, 50) + '...' : 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.status === 'success' ? 'bg-green-100 text-green-800' :
                          data.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {data.status || 'unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {scrapedMarketData.length > 10 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Showing 10 of {scrapedMarketData.length} records. 
                  <button 
                    onClick={() => setScrapedMarketData([])} 
                    className="ml-2 text-amber-600 hover:text-amber-800 underline"
                  >
                    Clear all data
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  function EnvironmentalImpactDashboard() {
    const [waterQuality, setWaterQuality] = useState(null);
    const [harvestYields, setHarvestYields] = useState(null);
    const [sustainability, setSustainability] = useState(null);
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scrapingStatus, setScrapingStatus] = useState('idle');
    const [scrapedData, setScrapedData] = useState([]);
    const [lastScraped, setLastScraped] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
      try {
        const [waterRes, harvestRes, sustainabilityRes, trendsRes] = await Promise.all([
          fetch('http://localhost:4000/api/water-quality'),
          fetch('http://localhost:4000/api/harvest-yields'),
          fetch('http://localhost:4000/api/sustainability-metrics'),
          fetch('http://localhost:4000/api/environmental-trends')
        ]);
        const waterData = await waterRes.json();
        const harvestData = await harvestRes.json();
        const sustainabilityData = await sustainabilityRes.json();
        const trendsData = await trendsRes.json();
        
        setWaterQuality(waterData);
        setHarvestYields(harvestData);
        setSustainability(sustainabilityData);
        setTrends(trendsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
      setLoading(false);
    }, []);

    useEffect(() => {
      fetchData();
      // Refresh water quality data every 60 seconds (reduced from 30 to prevent excessive updates)
      const interval = setInterval(() => {
        fetch('http://localhost:4000/api/water-quality')
          .then(res => res.json())
          .then(setWaterQuality)
          .catch(err => console.error('Failed to update water quality:', err));
      }, 60000);
      return () => clearInterval(interval);
    }, [fetchData]);

    const getStatusColor = useCallback((status) => {
      switch (status) {
        case 'Excellent': return 'bg-green-100 text-green-800';
        case 'Good': return 'bg-emerald-100 text-emerald-800';
        case 'Fair': return 'bg-yellow-100 text-yellow-800';
        case 'Poor': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }, []);

    const getTrendIcon = useCallback((trend) => {
      switch (trend) {
        case 'improving': return '↗️';
        case 'decreasing': return '↘️';
        case 'stable': return '→';
        default: return '→';
      }
    }, []);

    const startDataScraping = useCallback(async () => {
      console.log('Starting data scraping...'); // Debug log
      setScrapingStatus('scraping');
      setError(null);
      
      try {
        const response = await fetch('http://localhost:4000/api/scrape-environmental-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sources: ['weather_api', 'tide_stations', 'water_quality_sensors', 'regulatory_databases']
          })
        });
        
        console.log('Response status:', response.status); // Debug log
        
        if (response.ok) {
          const data = await response.json();
          console.log('Scraping response:', data); // Debug log
          
          // Safely handle newData
          if (data.newData && Array.isArray(data.newData)) {
            console.log('Setting scraped data:', data.newData.length, 'items'); // Debug log
            setScrapedData(prev => [...data.newData, ...prev.slice(0, 49)]); // Keep last 50 entries
          } else {
            console.log('No newData in response or not an array'); // Debug log
          }
          
          setLastScraped(new Date().toISOString());
          setScrapingStatus('success');
          
          // Safely update main data with scraped data
          if (data.waterQuality && typeof data.waterQuality === 'object') {
            console.log('Updating water quality data'); // Debug log
            setWaterQuality(prev => ({ ...prev, ...data.waterQuality }));
          }
          if (data.harvestYields && typeof data.harvestYields === 'object') {
            console.log('Updating harvest yields data'); // Debug log
            setHarvestYields(prev => ({ ...prev, ...data.harvestYields }));
          }
          if (data.sustainability && typeof data.sustainability === 'object') {
            console.log('Updating sustainability data'); // Debug log
            setSustainability(prev => ({ ...prev, ...data.sustainability }));
          }
          
          setTimeout(() => setScrapingStatus('idle'), 3000);
        } else {
          const errorText = await response.text();
          console.error('Response not ok:', response.status, errorText); // Debug log
          throw new Error(`Scraping failed: ${response.status} ${errorText}`);
        }
      } catch (error) {
        console.error('Data scraping error:', error);
        setError(error.message);
        setScrapingStatus('error');
        setTimeout(() => setScrapingStatus('idle'), 3000);
      }
    }, []);

    const exportReport = useCallback(() => {
      const report = {
        timestamp: new Date().toISOString(),
        waterQuality: waterQuality,
        harvestYields: harvestYields,
        sustainability: sustainability,
        trends: trends,
        scrapedData: scrapedData,
        lastScraped: lastScraped
      };
      
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `environmental-report-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, [waterQuality, harvestYields, sustainability, trends, scrapedData, lastScraped]);

    if (loading) {
      return (
        <section className="animate-fade-in">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading environmental data...</p>
          </div>
        </section>
      );
    }

    if (error) {
      return (
        <section className="animate-fade-in">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Dashboard</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                fetchData();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </section>
      );
    }

    try {
      return (
      <section className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-4xl font-bold gradient-text mb-2 leading-tight">Environmental Impact Dashboard</h2>
            <p className="text-gray-700">Interactive dashboard showing water quality trends, harvest yields, and sustainability metrics with real-time data scraping.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={startDataScraping}
              disabled={scrapingStatus === 'scraping'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                scrapingStatus === 'scraping' 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {scrapingStatus === 'scraping' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Scraping...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Scrape Data
                </>
              )}
            </button>
            <button
              onClick={exportReport}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Scraping Status */}
        {scrapingStatus !== 'idle' && (
          <div className={`mb-6 p-4 rounded-lg border ${
            scrapingStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            scrapingStatus === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              <span>
                {scrapingStatus === 'success' ? '✅' : 
                 scrapingStatus === 'error' ? '❌' : '🔄'}
              </span>
              <span className="font-medium">
                {scrapingStatus === 'success' ? 'Data scraping completed successfully!' :
                 scrapingStatus === 'error' ? 'Data scraping failed. Please try again.' :
                 'Scraping data from multiple sources...'}
              </span>
            </div>
            {lastScraped && (
              <p className="text-sm mt-1 opacity-75">
                Last scraped: {lastScraped ? new Date(lastScraped).toLocaleString() : 'N/A'}
              </p>
            )}
          </div>
        )}

        {waterQuality?.alerts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">⚠️ Environmental Alerts</h3>
            <ul className="text-red-700 space-y-1">
              {waterQuality.alerts.map((alert, index) => (
                <li key={index}>• {alert}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {waterQuality?.current ? waterQuality.current.dissolvedOxygen : 'N/A'} mg/L
            </div>
            <div className="text-gray-600">Dissolved Oxygen</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {harvestYields?.yearToDate ? harvestYields.yearToDate.toLocaleString() : 'N/A'} kg
            </div>
            <div className="text-gray-600">Year-to-Date Yield</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {sustainability?.wasteRecycling?.current || 'N/A'}%
            </div>
            <div className="text-gray-600">Waste Recycling</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {waterQuality?.current ? waterQuality.current.status : 'N/A'}
            </div>
            <div className="text-gray-600">Water Quality Status</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Real-Time Water Quality</h3>
            {waterQuality?.current && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(waterQuality.current.status)}`}>
                    {waterQuality.current.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>pH:</span>
                      <span className="font-medium">{waterQuality.current.ph}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="font-medium">{waterQuality.current.temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Salinity:</span>
                      <span className="font-medium">{waterQuality.current.salinity} ppt</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Dissolved O₂:</span>
                      <span className="font-medium">{waterQuality.current.dissolvedOxygen} mg/L</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Turbidity:</span>
                      <span className="font-medium">{waterQuality.current.turbidity} NTU</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-medium">{waterQuality.current.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Harvest Yield Analysis</h3>
            {harvestYields && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">{harvestYields.currentMonth.yield.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Current Month (kg)</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{harvestYields.projectedAnnual.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Projected Annual (kg)</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="font-medium">{Number.isFinite(harvestYields.currentMonth.efficiency) ? (harvestYields.currentMonth.efficiency * 100).toFixed(1) : 'N/A'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sustainability Score:</span>
                    <span className="font-medium">{Number.isFinite(harvestYields.currentMonth.sustainability) ? (harvestYields.currentMonth.sustainability * 100).toFixed(1) : 'N/A'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oysters Harvested:</span>
                    <span className="font-medium">{Number.isFinite(harvestYields.currentMonth.oysters) ? harvestYields.currentMonth.oysters.toLocaleString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">Sustainability Metrics</h3>
          <div className="grid md:grid-cols-5 gap-6">
            {sustainability && Object.entries(sustainability).map(([key, metric]) => (
              <div key={key} className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {key === 'carbonFootprint' ? `${metric.current} tCO₂` :
                   key === 'waterUsage' ? `${metric.current} L/kg` :
                   key === 'wasteRecycling' || key === 'energyEfficiency' ? `${metric.current}%` :
                   metric.current}
                </div>
                <div className="text-sm text-gray-600 mb-2">Current</div>
                <div className="text-sm text-gray-500">Target: {metric.target}</div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-lg mr-1">{getTrendIcon(metric.trend)}</span>
                  <span className="text-sm text-gray-600">{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">Environmental Trends</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {trends && Object.entries(trends).map(([key, trend]) => (
              <div key={key} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getTrendIcon(trend.trend)}</span>
                  <span className="font-medium">{trend.change}</span>
                  <span className="text-sm text-gray-500">({trend.period})</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Contributing Factors:</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  {trend.factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Scraped Data Section */}
        {scrapedData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Real-Time Scraped Data</h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-600">📊</span>
                <span className="font-medium">Latest Data from External Sources</span>
                <span className="text-sm text-gray-500">({scrapedData.length} records)</span>
              </div>
              <p className="text-sm text-gray-600">
                Data scraped from weather APIs, tide stations, water quality sensors, and regulatory databases
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-emerald-50 rounded-xl shadow-lg">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Value</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Timestamp</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scrapedData.slice(0, 10).map((data, index) => (
                    <tr key={data.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="font-medium">{data.source || 'Unknown'}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {data.data ? Object.keys(data.data).join(', ') : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {data.data ? JSON.stringify(data.data).substring(0, 50) + '...' : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.status === 'success' ? 'bg-green-100 text-green-800' :
                          data.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {data.status || 'unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {scrapedData.length > 10 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Showing 10 of {scrapedData.length} records. 
                  <button 
                    onClick={() => setScrapedData([])} 
                    className="ml-2 text-amber-600 hover:text-amber-800 underline"
                  >
                    Clear all data
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    );
    } catch (error) {
      console.error('EnvironmentalImpactDashboard rendering error:', error);
      return (
        <section className="animate-fade-in">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Dashboard Error</h2>
            <p className="text-red-700 mb-4">Something went wrong while rendering the dashboard.</p>
            <p className="text-sm text-red-600 mb-4">Error: {error.message}</p>
            <button
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </section>
      );
    }
  }

  // Freelancing Page Component
  function FreelancingPage() {
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [quoteForm, setQuoteForm] = useState({
      name: '',
      email: '',
      company: '',
      projectDescription: '',
      timeline: '',
      budget: ''
    });

    const handleGetQuote = (service) => {
      setSelectedService(service);
      setShowQuoteModal(true);
    };

    const handleQuoteSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send the quote request to your backend
      alert('Quote request submitted! We\'ll get back to you within 24 hours.');
      setShowQuoteModal(false);
      setQuoteForm({
        name: '',
        email: '',
        company: '',
        projectDescription: '',
        timeline: '',
        budget: ''
      });
    };

    return (
      <section className="animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">{projects.freelancing.company.name}</h1>
          <p className="text-xl text-gray-300 mb-6">{projects.freelancing.company.tagline}</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {projects.freelancing.company.description}
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
            <div className="text-3xl font-bold text-teal-400 mb-2">{projects.freelancing.company.founded}</div>
            <div className="text-gray-300">Founded</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
            <div className="text-3xl font-bold text-teal-400 mb-2">{projects.freelancing.company.clients}</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
            <div className="text-3xl font-bold text-teal-400 mb-2">{projects.freelancing.company.projects}</div>
            <div className="text-gray-300">Projects Completed</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
            <div className="text-3xl font-bold text-teal-400 mb-2">{projects.freelancing.company.satisfaction}</div>
            <div className="text-gray-300">Client Satisfaction</div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-8 text-center">Services Offered</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.freelancing.services.map((service, index) => (
              <div key={service.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="mb-4">
                  <div className="text-lg font-semibold text-teal-400 mb-1">Upfront Cost:</div>
                  <div className="text-2xl font-bold text-teal-400 mb-2">{service.upfront}</div>
                  <div className="text-lg font-semibold text-teal-400 mb-1">Monthly Service:</div>
                  <div className="text-xl font-bold text-teal-400">{service.monthly}</div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-400 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.technologies.map((tech, i) => (
                      <span key={i} className="bg-teal-600 text-white px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleGetQuote(service)}
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Get Custom Quote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-8 text-center">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {projects.freelancing.process.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <div className="text-3xl mb-2">{step.icon}</div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Contact CTA */}
        <div className="bg-teal-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-6">Let's discuss how we can help bring your vision to life</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Quote Modal */}
        {showQuoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Get Custom Quote</h2>
                  <button 
                    onClick={() => setShowQuoteModal(false)}
                    className="text-gray-400 hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {selectedService && (
                  <div className="bg-gray-700 p-4 rounded-lg mb-6 border border-gray-600">
                    <h3 className="font-semibold text-white mb-2">Selected Service:</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{selectedService.icon}</span>
                      <span className="font-medium text-gray-300">{selectedService.title}</span>
                    </div>
                    <p className="text-sm text-gray-400">{selectedService.description}</p>
                  </div>
                )}

                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                    <input
                      type="text"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Project Description *</label>
                    <textarea
                      required
                      rows="4"
                      value={quoteForm.projectDescription}
                      onChange={(e) => setQuoteForm({...quoteForm, projectDescription: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                      placeholder="Describe your project requirements, goals, and any specific features you need..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Timeline</label>
                      <select
                        value={quoteForm.timeline}
                        onChange={(e) => setQuoteForm({...quoteForm, timeline: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white"
                      >
                        <option value="">Select timeline</option>
                        <option value="1-2 months">1-2 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Budget Range</label>
                      <select
                        value={quoteForm.budget}
                        onChange={(e) => setQuoteForm({...quoteForm, budget: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="$5k-15k">$5,000 - $15,000</option>
                        <option value="$15k-50k">$15,000 - $50,000</option>
                        <option value="$50k-100k">$50,000 - $100,000</option>
                        <option value="$100k+">$100,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                    >
                      Submit Quote Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuoteModal(false)}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // Add the environmental dashboard to the main content
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold gradient-text mb-4">Cael Findley</h1>
              <p className="text-xl text-gray-300 mb-6">Software Engineer at Three Sisters Oyster Company</p>
              <div className="flex justify-center gap-4">
                <a href={`mailto:${contactInfo.email}`} className="text-teal-400 hover:text-teal-300 transition-colors">
                  {contactInfo.email}
                </a>
                <span className="text-gray-500">|</span>
                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
                  GitHub
                </a>
                <span className="text-gray-500">|</span>
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                  I'm a passionate software engineer with expertise in full-stack development, 
                  cloud infrastructure, and data analysis. Currently working at Three Sisters 
                  Oyster Company, I develop innovative solutions for aquaculture technology.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400">🏢</span>
                    <span className="text-white"><strong>{experience.role}</strong> at {experience.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400">📅</span>
                    <span className="text-white">Since {experience.since}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-4">Key Achievements</h2>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Certifications</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center p-4 border border-gray-600 rounded-lg hover:shadow-md transition-shadow bg-gray-700">
                    <div className="text-3xl mb-2">{cert.icon}</div>
                    <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                    <p className="text-gray-300">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Featured Projects</h2>
                      <div className="grid md:grid-cols-2 gap-6">
          {projects.software.slice(0, 2).map((project, index) => (
            <div key={index} className="border border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gray-700">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span key={i} className="bg-teal-600 text-white px-2 py-1 rounded text-sm border border-teal-500">
                      {tech}
                    </span>
                  ))}
                </div>
                      <button
                        onClick={() => {
                          setProjectPage(project);
                          setCurrentPage('project-detail');
                        }}
                        className="text-teal-400 hover:text-teal-300 font-medium"
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'live-data':
        return <LiveDataDemo />;
      case 'cloud-migration':
        return <CloudMigrationToolset />;
      case 'helpdesk':
        return <HelpdeskPortal />;
      case 'scanner':
        return <NetworkVulnerabilityScanner />;
      case 'zero-trust':
        return <ZeroTrustAuth />;
      case 'chatbot':
        return <CustomerChatbot />;
      case 'maintenance':
        return <PredictiveMaintenanceAI />;
      case 'forecast':
        return <SalesForecastingModel />;
      case 'environment':
        return <EnvironmentalImpactDashboard />;
      case 'freelancing':
        return <FreelancingPage />;
      case 'project-detail':
        return renderProjectDetail();
      case 'software':
      case 'it':
      case 'cybersecurity':
      case 'ai':
      case 'data':
      case 'devops':
      case 'blockchain':
      case 'enterprise':
      case 'fintech':
      case 'healthcare':
      case 'iot':
      case 'modern':
      case 'security':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderProjects(currentPage)}
            </div>
          </section>
        );
      case 'experience':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Experience & Certifications</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Current Role</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white">{experience.role}</h4>
                    <p className="text-teal-400 font-medium">{experience.company}</p>
                    <p className="text-gray-300">Since {experience.since}</p>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{experience.description}</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Key Achievements</h3>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-teal-400 mb-6">Certifications</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center p-4 border border-gray-600 rounded-lg hover:shadow-md transition-shadow bg-gray-700">
                    <div className="text-3xl mb-2">{cert.icon}</div>
                    <h4 className="font-semibold text-white mb-1">{cert.name}</h4>
                    <p className="text-gray-300">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  // Main App component return
  return (
    <div className="min-h-screen bg-gray-900 flex no-refresh">
      {/* Modern Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header - Compact */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              Cael Findley
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-200 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Bar - Compact */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-8 pr-3 py-1.5 text-sm border border-gray-600 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
              />
              <svg className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filters - Compact */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex gap-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-filter flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  title={category.name}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links - Organized by Category */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <nav className="p-4 space-y-6">
              {filteredNavLinks.length > 0 ? (
                Object.entries(groupedNavLinks).map(([category, links]) => {
                  const categoryInfo = categories.find(c => c.id === category);
                  if (!categoryInfo) return null;
                  
                  return (
                    <div key={category} className="space-y-2">
                      {/* Category Header */}
                      <div className="flex items-center gap-2 px-2 py-1">
                        <span className="text-lg">{categoryInfo.icon}</span>
                                              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                        {categoryInfo.name}
                      </h3>
                      </div>
                      
                      {/* Category Items */}
                      <div className="space-y-1">
                        {links.filter(link => 
                          link.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                          (activeCategory === 'all' || link.category === activeCategory)
                        ).map((link) => (
                          <button
                            key={link.page}
                            onClick={() => {
                              setCurrentPage(link.page);
                              setSidebarOpen(false);
                              setProjectPage(null);
                            }}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              currentPage === link.page
                                ? 'bg-teal-600 text-white border-l-2 border-teal-400'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-teal-400'
                            }`}
                          >
                            <span className="text-lg">{link.icon}</span>
                            <span className="text-left flex-1 truncate">{link.name}</span>
                            {link.category === 'demos' && (
                              <span className="live-badge text-xs bg-teal-600 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">
                                Live
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>No projects found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </nav>
          </div>

          {/* Sidebar Footer - Compact */}
          <div className="px-4 py-3 border-t border-gray-700">
            <div className="text-center text-xs text-gray-400">
              <p>Portfolio v2.0</p>
              <p className="mt-0.5">20+ Projects • 10 Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-white">Portfolio</h1>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>
        </header>

                 {/* Breadcrumb Navigation */}
         <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
           <nav className="flex items-center space-x-2 text-sm text-gray-300">
             <button
               onClick={() => setCurrentPage('home')}
               className="breadcrumb-item hover:text-teal-400 transition-colors"
             >
               Home
             </button>
             {currentPage !== 'home' && (
               <>
                 <span>/</span>
                 <span className="text-white font-medium capitalize">
                   {currentPage.replace('-', ' ')}
                 </span>
               </>
             )}
           </nav>
         </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 