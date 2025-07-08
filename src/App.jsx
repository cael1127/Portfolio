import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Import all demo components
import BlockchainDemo from './components/demos/BlockchainDemo';
import AIOptimizationDemo from './components/demos/AIOptimizationDemo';
import DeFiDemo from './components/demos/DeFiDemo';
import AIResearchDemo from './components/demos/AIResearchDemo';
import NFTMarketplaceDemo from './components/demos/NFTMarketplaceDemo';
import AITradingBotDemo from './components/demos/AITradingBotDemo';
import BlockchainIdentityDemo from './components/demos/BlockchainIdentityDemo';
import AIContentGenerationDemo from './components/demos/AIContentGenerationDemo';
import BlockchainGovernanceDemo from './components/demos/BlockchainGovernanceDemo';
import AIPredictiveAnalyticsDemo from './components/demos/AIPredictiveAnalyticsDemo';
import ERPDemo from './components/demos/ERPDemo';
import EcommerceDemo from './components/demos/EcommerceDemo';
import CRMDemo from './components/demos/CRMDemo';
import BIDemo from './components/demos/BIDemo';
import PaymentDemo from './components/demos/PaymentDemo';
import RiskDemo from './components/demos/RiskDemo';
import TradingDemo from './components/demos/TradingDemo';
import CryptoExchangeDemo from './components/demos/CryptoExchangeDemo';
import TelemedicineDemo from './components/demos/TelemedicineDemo';
import ClinicalDemo from './components/demos/ClinicalDemo';
import HealthcareAnalyticsDemo from './components/demos/HealthcareAnalyticsDemo';
import MedicalImagingDemo from './components/demos/MedicalImagingDemo';
import SmartCityDemo from './components/demos/SmartCityDemo';
import IndustrialIoTDemo from './components/demos/IndustrialIoTDemo';
import SmartHomeDemo from './components/demos/SmartHomeDemo';
import AgriculturalIoTDemo from './components/demos/AgriculturalIoTDemo';
import MicroservicesDemo from './components/demos/MicroservicesDemo';
import AnalyticsDemo from './components/demos/AnalyticsDemo';
import ServerlessDemo from './components/demos/ServerlessDemo';
import EventDrivenDemo from './components/demos/EventDrivenDemo';
import SOCDemo from './components/demos/SOCDemo';
import ZeroTrustDemo from './components/demos/ZeroTrustDemo';
import ScannerDemo from './components/demos/ScannerDemo';
import HelpdeskDemo from './components/demos/HelpdeskDemo';

// Import page components
import LiveDataDemo from './components/pages/LiveDataDemo';
import CloudMigrationToolset from './components/pages/CloudMigrationToolset';
import FreelancingPage from './components/pages/FreelancingPage';

// Import UI components
import LiveChart from './components/ui/LiveChart';
import GalleryDemo from './components/ui/GalleryDemo';
import DataTableDemo from './components/ui/DataTableDemo';
import ChatbotDemo from './components/ui/ChatbotDemo';
import LoginDemo from './components/ui/LoginDemo';
import IoTDemo from './components/ui/IoTDemo';
import DevOpsDemo from './components/ui/DevOpsDemo';

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
    email: 'caelfindley@gmail.com',
    phone: '+1 (361) 920-6493',
    github: 'https://github.com/cael1127',
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
          'Mobile-responsive dashboard with offline capability',
          'Automated reporting and data export functionality',
          'Multi-user role-based access control system'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Aquaculture+Tracking+System',
        demo: '#',
        github: '#',
        impact: 'Reduced manual monitoring time by 80% and improved data accuracy by 95%'
      },
      {
        id: 'smart-logistics',
        title: 'Smart Logistics Platform',
        description: 'AI-powered logistics optimization platform that streamlines supply chain operations through intelligent route planning, real-time tracking, and predictive analytics for delivery optimization.',
        tech: ['Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'Docker', 'AWS Lambda', 'React Native', 'GraphQL', 'Kubernetes'],
        features: [
          'AI-powered route optimization with real-time traffic integration',
          'Predictive analytics for delivery time estimation',
          'Real-time GPS tracking with geofencing capabilities',
          'Automated dispatch and driver assignment',
          'Comprehensive reporting and analytics dashboard',
          'Integration with major shipping carriers and APIs'
        ],
        status: 'In Development',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Smart+Logistics+Platform',
        demo: '#',
        github: '#',
        impact: 'Optimized delivery routes resulting in 25% fuel savings and 30% faster deliveries'
      }
    ],
    devops: [
      {
        id: 'cloud-migration',
        title: 'Cloud Migration Toolset',
        description: 'Comprehensive toolset for automating the migration of legacy systems to modern cloud infrastructure, including assessment, planning, and execution phases.',
        tech: ['Terraform', 'AWS CloudFormation', 'Docker', 'Kubernetes', 'Jenkins', 'Python', 'Bash', 'Ansible'],
        features: [
          'Automated infrastructure assessment and dependency mapping',
          'Zero-downtime migration strategies with rollback capabilities',
          'Cost optimization analysis and recommendations',
          'Security compliance validation and remediation',
          'Performance benchmarking and optimization',
          'Comprehensive migration documentation and reporting'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Cloud+Migration+Toolset',
        demo: '#',
        github: '#',
        impact: 'Reduced migration time by 70% and eliminated 95% of manual configuration errors'
      }
    ],
    blockchain: [
      {
        id: 'defi-platform',
        title: 'DeFi Yield Farming Platform',
        description: 'Decentralized finance platform enabling users to earn yield through automated liquidity provision, staking, and yield farming strategies across multiple blockchain networks.',
        tech: ['Solidity', 'Web3.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        features: [
          'Multi-chain yield farming with automated strategy execution',
          'Real-time APY tracking and performance analytics',
          'Smart contract security audits and insurance integration',
          'Cross-chain bridge functionality for asset transfers',
          'Governance token system with voting mechanisms',
          'Mobile app with push notifications for yield updates'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=DeFi+Yield+Farming+Platform',
        demo: '#',
        github: '#',
        impact: 'Processed over $50M in TVL with average user APY of 15-25%'
      }
    ],
    enterprise: [
      {
        id: 'erp-system',
        title: 'Enterprise Resource Planning System',
        description: 'Comprehensive ERP solution integrating finance, HR, inventory, and customer relationship management with advanced analytics and reporting capabilities.',
        tech: ['Java Spring Boot', 'React', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Docker', 'Kubernetes', 'AWS'],
        features: [
          'Unified dashboard for all business operations',
          'Advanced financial reporting and forecasting',
          'HR management with payroll and benefits integration',
          'Inventory tracking with automated reorder points',
          'Customer relationship management with sales pipeline',
          'Real-time analytics and business intelligence'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Enterprise+Resource+Planning+System',
        demo: '#',
        github: '#',
        impact: 'Streamlined operations reducing administrative overhead by 40%'
      }
    ],
    fintech: [
      {
        id: 'payment-gateway',
        title: 'Payment Gateway & Processing Platform',
        description: 'Secure payment processing platform supporting multiple payment methods, currencies, and compliance standards with advanced fraud detection and analytics.',
        tech: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'Stripe API', 'PCI DSS', 'Docker', 'AWS'],
        features: [
          'Multi-currency payment processing with real-time conversion',
          'Advanced fraud detection using machine learning',
          'PCI DSS compliance with end-to-end encryption',
          'Comprehensive transaction analytics and reporting',
          'Webhook integration for real-time notifications',
          'Mobile SDK for iOS and Android applications'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Payment+Gateway+%26+Processing+Platform',
        demo: '#',
        github: '#',
        impact: 'Processed over $100M in transactions with 99.99% uptime'
      }
    ],
    healthcare: [
      {
        id: 'telemedicine',
        title: 'Telemedicine Platform',
        description: 'Comprehensive telemedicine solution enabling virtual consultations, electronic health records management, and integrated healthcare workflows.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'HIPAA', 'Docker', 'AWS', 'Twilio'],
        features: [
          'High-quality video consultations with screen sharing',
          'Electronic health records with HIPAA compliance',
          'Prescription management and e-prescribing',
          'Appointment scheduling and calendar integration',
          'Secure messaging and file sharing',
          'Analytics dashboard for healthcare providers'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Telemedicine+Platform',
        demo: '#',
        github: '#',
        impact: 'Enabled 10,000+ virtual consultations with 98% patient satisfaction'
      }
    ],
    iot: [
      {
        id: 'smart-city',
        title: 'Smart City IoT Platform',
        description: 'Comprehensive IoT platform for smart city management, integrating traffic monitoring, environmental sensors, and public safety systems.',
        tech: ['Python', 'React', 'MongoDB', 'MQTT', 'Docker', 'Kubernetes', 'AWS IoT', 'TensorFlow'],
        features: [
          'Real-time traffic monitoring and optimization',
          'Environmental monitoring with air quality sensors',
          'Smart lighting and energy management',
          'Public safety monitoring and emergency response',
          'Citizen engagement portal with real-time updates',
          'Predictive analytics for urban planning'
        ],
        status: 'In Development',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Smart+City+IoT+Platform',
        demo: '#',
        github: '#',
        impact: 'Reduced traffic congestion by 30% and energy consumption by 25%'
      }
    ],
    modern: [
      {
        id: 'microservices',
        title: 'Microservices Architecture Platform',
        description: 'Scalable microservices platform with service mesh, API gateway, and comprehensive monitoring for modern distributed applications.',
        tech: ['Docker', 'Kubernetes', 'Istio', 'React', 'Node.js', 'MongoDB', 'Redis', 'Prometheus'],
        features: [
          'Service mesh with traffic management and security',
          'API gateway with rate limiting and authentication',
          'Distributed tracing and monitoring',
          'Auto-scaling and load balancing',
          'Circuit breaker and fault tolerance patterns',
          'Comprehensive logging and alerting'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Microservices+Architecture+Platform',
        demo: '#',
        github: '#',
        impact: 'Improved system reliability to 99.99% and reduced deployment time by 80%'
      }
    ],
    security: [
      {
        id: 'zero-trust',
        title: 'Zero Trust Security Platform',
        description: 'Comprehensive zero trust security solution implementing identity verification, continuous monitoring, and adaptive access controls.',
        tech: ['Python', 'React', 'PostgreSQL', 'Redis', 'OAuth 2.0', 'Docker', 'AWS', 'SAML'],
        features: [
          'Multi-factor authentication and biometric verification',
          'Continuous user behavior monitoring',
          'Adaptive access controls based on risk assessment',
          'Real-time threat detection and response',
          'Comprehensive audit logging and compliance reporting',
          'Integration with existing identity providers'
        ],
        status: 'Live',
        image: 'https://placehold.co/800x400/14b8a6/fff?text=Zero+Trust+Security+Platform',
        demo: '#',
        github: '#',
        impact: 'Reduced security incidents by 90% and improved compliance scores by 95%'
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const renderProjects = (category) => {
    const categoryProjects = projects[category] || [];
    
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-teal-500 transition-all duration-300 cursor-pointer group"
            onClick={() => setProjectPage(project)}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'Live' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs border border-gray-600">
                    +{project.tech.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-teal-400 text-sm font-medium">View Details →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (projectPage.demo) {
                    setCurrentPage(projectPage.demo);
                  }
                }}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                View Live Demo
              </button>
              {projectPage.github && (
                <a 
                  href={projectPage.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderContent = () => {
    if (projectPage) {
      return renderProjectDetail();
    }

    // Handle demo components
    const demoComponents = {
      'blockchain': BlockchainDemo,
      'ai-optimization': AIOptimizationDemo,
      'defi': DeFiDemo,
      'ai-research': AIResearchDemo,
      'nft-marketplace': NFTMarketplaceDemo,
      'ai-trading-bot': AITradingBotDemo,
      'blockchain-identity': BlockchainIdentityDemo,
      'ai-content-generation': AIContentGenerationDemo,
      'blockchain-governance': BlockchainGovernanceDemo,
      'ai-predictive-analytics': AIPredictiveAnalyticsDemo,
      'erp': ERPDemo,
      'ecommerce': EcommerceDemo,
      'crm': CRMDemo,
      'bi': BIDemo,
      'payment': PaymentDemo,
      'risk': RiskDemo,
      'trading': TradingDemo,
      'crypto-exchange': CryptoExchangeDemo,
      'telemedicine': TelemedicineDemo,
      'clinical': ClinicalDemo,
      'healthcare-analytics': HealthcareAnalyticsDemo,
      'medical-imaging': MedicalImagingDemo,
      'smart-city': SmartCityDemo,
      'industrial-iot': IndustrialIoTDemo,
      'smart-home': SmartHomeDemo,
      'agricultural-iot': AgriculturalIoTDemo,
      'microservices': MicroservicesDemo,
      'analytics': AnalyticsDemo,
      'serverless': ServerlessDemo,
      'event-driven': EventDrivenDemo,
      'soc': SOCDemo,
      'zero-trust': ZeroTrustDemo,
      'scanner': ScannerDemo,
      'helpdesk': HelpdeskDemo
    };

    // If currentPage is a demo component, render it
    if (demoComponents[currentPage]) {
      const DemoComponent = demoComponents[currentPage];
      return (
        <div className="animate-fade-in">
          <button
            onClick={() => setCurrentPage('home')}
            className="mb-6 text-teal-400 hover:text-teal-300 underline flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Home
          </button>
          <DemoComponent />
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <section className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold gradient-text mb-6 leading-tight">
                Cael Findley
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Full-Stack Software Engineer specializing in modern web technologies, 
                cloud infrastructure, and innovative solutions that drive business growth.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentPage('experience')}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  View Experience
                </button>
                <button
                  onClick={() => setCurrentPage('software')}
                  className="bg-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  View Projects
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold text-white mb-2">Full-Stack Development</h3>
                <p className="text-gray-300">Modern web applications with React, Node.js, and cloud-native architectures.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">☁️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Cloud Infrastructure</h3>
                <p className="text-gray-300">AWS, Docker, Kubernetes, and serverless architectures for scalable solutions.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-white mb-2">Security & Compliance</h3>
                <p className="text-gray-300">Zero-trust security, HIPAA compliance, and enterprise-grade security solutions.</p>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Latest Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.values(projects).flat().slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-teal-500 transition-colors cursor-pointer"
                    onClick={() => setProjectPage(project)}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{project.description.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech, index) => (
                        <span key={index} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'experience':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Experience & Certifications</h2>
            
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Current Role</h3>
              <div className="flex items-start gap-4">
                <div className="bg-teal-600 p-3 rounded-lg">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{experience.role}</h4>
                  <p className="text-teal-400 font-medium">{experience.company}</p>
                  <p className="text-gray-400 text-sm">Since {experience.since}</p>
                  <p className="text-gray-300 mt-3">{experience.description}</p>
                  
                  <h5 className="text-lg font-semibold text-white mt-4 mb-2">Key Achievements:</h5>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-teal-400 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Certifications</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white">{cert.name}</h4>
                        <p className="text-gray-400 text-sm">{cert.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'software':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Software Development Projects</h2>
            {renderProjects('software')}
          </section>
        );

      case 'devops':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">DevOps & Infrastructure Projects</h2>
            {renderProjects('devops')}
          </section>
        );

      case 'blockchain':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Blockchain & AI Projects</h2>
            {renderProjects('blockchain')}
          </section>
        );

      case 'enterprise':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Enterprise Solutions</h2>
            {renderProjects('enterprise')}
          </section>
        );

      case 'fintech':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">FinTech Projects</h2>
            {renderProjects('fintech')}
          </section>
        );

      case 'healthcare':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Healthcare Solutions</h2>
            {renderProjects('healthcare')}
          </section>
        );

      case 'iot':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">IoT & Smart Systems</h2>
            {renderProjects('iot')}
          </section>
        );

      case 'modern':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Modern Architecture</h2>
            {renderProjects('modern')}
          </section>
        );

      case 'security':
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Cybersecurity Solutions</h2>
            {renderProjects('security')}
          </section>
        );

      case 'freelancing':
        return <FreelancingPage />;

      default:
        return (
          <section className="animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-8">Page Not Found</h2>
            <p className="text-gray-300">The page you're looking for doesn't exist.</p>
          </section>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="text-2xl font-bold gradient-text cursor-pointer"
              >
                CF
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => setCurrentPage(link.page)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === link.page
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => {
                      setCurrentPage(link.page);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      currentPage === link.page
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>📧 {contactInfo.email}</p>
                <p>📱 {contactInfo.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="space-y-2">
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  GitHub
                </a>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
              <div className="space-y-2 text-gray-300">
                <p>• Full-Stack Development</p>
                <p>• Cloud Architecture</p>
                <p>• DevOps Consulting</p>
                <p>• Security Implementation</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cael Findley. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;