import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import Work from './components/Work';
import AIInterviewSimulatorProjectPage from './components/ProjectPages/AIInterviewSimulatorProjectPage';
import RealTimeCollaborationProjectPage from './components/ProjectPages/RealTimeCollaborationProjectPage';
import AdvancedAnalyticsProjectPage from './components/ProjectPages/AdvancedAnalyticsProjectPage';
import BlockchainAdvancedProjectPage from './components/ProjectPages/BlockchainAdvancedProjectPage';
import EdgeComputingProjectPage from './components/ProjectPages/EdgeComputingProjectPage';
import QuantumComputingProjectPage from './components/ProjectPages/QuantumComputingProjectPage';
import ScrollToTop from './components/ScrollToTop';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import ResumePage from './pages/ResumePage';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/motion/ScrollProgress';
import AmbientBackground from './components/motion/AmbientBackground';

// Import all demo pages
import BlockchainDemoPage from './pages/BlockchainDemoPage';
import AquacultureDemoPage from './pages/AquacultureDemoPage';
import FinancialDemoPage from './pages/FinancialDemoPage';
import HealthcareDemoPage from './pages/HealthcareDemoPage';
import LogisticsDemoPage from './pages/LogisticsDemoPage';
import PortfolioBuilderDemoPage from './pages/PortfolioBuilderDemoPage';
import RestaurantAppDemoPage from './pages/RestaurantAppDemoPage';
import ResumeAnalyzerDemoPage from './pages/ResumeAnalyzerDemoPage';
import SmartCityDemoPage from './pages/SmartCityDemoPage';
import WhiteboardDemoPage from './pages/WhiteboardDemoPage';
import GamePlatformDemoPage from './pages/GamePlatformDemoPage';
import AIAssistantDemoPage from './pages/AIAssistantDemoPage';
import SnakeAIDemoPage from './pages/SnakeAIDemoPage';
import AIAgentsDemoPage from './pages/AIAgentsDemoPage';
import SentimentAnalysisDemoPage from './pages/SentimentAnalysisDemoPage';

import RAGChatbotDemoPage from './pages/RAGChatbotDemoPage';
import BookstoreAPIDemoPage from './pages/BookstoreAPIDemoPage';
import MERNExpenseTrackerDemoPage from './pages/MERNExpenseTrackerDemoPage';
import SocialNetworkDemoPage from './pages/SocialNetworkDemoPage';
import InteractiveResumeDemoPage from './pages/InteractiveResumeDemoPage';
import FraudDetectionDemoPage from './pages/FraudDetectionDemoPage';
import DeepfakeDetectionDemoPage from './pages/DeepfakeDetectionDemoPage';
import ObjectDetectionDemoPage from './pages/ObjectDetectionDemoPage';
import AudioTranscriptionDemoPage from './pages/AudioTranscriptionDemoPage';
import EcommerceDemoPage from './pages/EcommerceDemoPage';
import RealtimeChatDemoPage from './pages/RealtimeChatDemoPage';
import SaaSAnalyticsDemoPage from './pages/SaaSAnalyticsDemoPage';
import ProductConfiguratorDemoPage from './pages/ProductConfiguratorDemoPage';

// New AI/ML projects
import AICodeGenerationDemoPage from './pages/AICodeGenerationDemoPage';
import MLTrainingDashboardDemoPage from './pages/MLTrainingDashboardDemoPage';
import ComputerVisionPipelineDemoPage from './pages/ComputerVisionPipelineDemoPage';
import NLPSentimentAPIDemoPage from './pages/NLPSentimentAPIDemoPage';

// DevOps projects
import CICDPipelineDemoPage from './pages/CICDPipelineDemoPage';
import DockerPlatformDemoPage from './pages/DockerPlatformDemoPage';
import KubernetesManagementDemoPage from './pages/KubernetesManagementDemoPage';
import TerraformIaCDemoPage from './pages/TerraformIaCDemoPage';

// Security projects
import VulnerabilityScannerDemoPage from './pages/VulnerabilityScannerDemoPage';
import PenetrationTestingDemoPage from './pages/PenetrationTestingDemoPage';
import EncryptionSystemDemoPage from './pages/EncryptionSystemDemoPage';
import SecurityMonitoringDemoPage from './pages/SecurityMonitoringDemoPage';
import WAFDemoPage from './pages/WAFDemoPage';
import SIEMDemoPage from './pages/SIEMDemoPage';
import APISecurityGatewayDemoPage from './pages/APISecurityGatewayDemoPage';
import PhishingDetectionDemoPage from './pages/PhishingDetectionDemoPage';
import OWASPScannerDemoPage from './pages/OWASPScannerDemoPage';
import NetworkTrafficAnalyzerDemoPage from './pages/NetworkTrafficAnalyzerDemoPage';
import IDSDemoPage from './pages/IDSDemoPage';
import ThreatIntelligenceDemoPage from './pages/ThreatIntelligenceDemoPage';

// Full-stack projects
import MicroservicesDemoPage from './pages/MicroservicesDemoPage';
import GraphQLAPIDemoPage from './pages/GraphQLAPIDemoPage';
import RealtimeCollaborationDemoPage from './pages/RealtimeCollaborationDemoPage';
import EventDrivenArchitectureDemoPage from './pages/EventDrivenArchitectureDemoPage';
import ServerlessPlatformDemoPage from './pages/ServerlessPlatformDemoPage';
import MultiTenantSaaSDemoPage from './pages/MultiTenantSaaSDemoPage';

// External website projects
import ThreeSistersOysterProjectPage from './components/ProjectPages/ThreeSistersOysterProjectPage';
import BapuxProjectPage from './components/ProjectPages/BapuxProjectPage';
import BPAWDProjectPage from './components/ProjectPages/BPAWDProjectPage';
import UILAcademyProjectPage from './components/ProjectPages/UILAcademyProjectPage';
import MinBodProjectPage from './components/ProjectPages/MinBodProjectPage';
import JFResumeProjectPage from './components/ProjectPages/JFResumeProjectPage';
import SystemProjectPage from './components/ProjectPages/SystemProjectPage';

const PAGE_SLUGS = {
  home: '',
  work: 'work',
  education: 'about',
  blog: 'blog',
  resume: 'resume',
  'ai-interview-simulator': 'ai-interview-simulator',
  'real-time-collaboration': 'real-time-collaboration',
  'advanced-analytics': 'advanced-analytics',
  'blockchain-advanced': 'blockchain-advanced',
  'edge-computing': 'edge-computing',
  'quantum-computing': 'quantum-computing',
  'blockchain-demo': 'blockchain-demo',
  'aquaculture-demo': 'aquaculture-demo',
  'financial-demo': 'financial-demo',
  'healthcare-demo': 'healthcare-demo',
  'logistics-demo': 'logistics-demo',
  'portfolio-builder-demo': 'portfolio-builder-demo',
  'restaurant-app-demo': 'restaurant-app-demo',
  'resume-analyzer-demo': 'resume-analyzer-demo',
  'smart-city-demo': 'smart-city-demo',
  'whiteboard-demo': 'whiteboard-demo',
  'game-platform-demo': 'game-platform-demo',
  'ai-assistant-demo': 'ai-assistant-demo',
  'snake-ai-demo': 'snake-ai-demo',
  'ai-agents-demo': 'ai-agents-demo',
  'sentiment-analysis-demo': 'sentiment-analysis-demo',
  'rag-chatbot-demo': 'rag-chatbot-demo',
  'bookstore-api-demo': 'bookstore-api-demo',
  'mern-expense-tracker-demo': 'mern-expense-tracker-demo',
  'social-network-demo': 'social-network-demo',
  'interactive-resume-demo': 'interactive-resume-demo',
  'fraud-detection-demo': 'fraud-detection-demo',
  'deepfake-detection-demo': 'deepfake-detection-demo',
  'object-detection-demo': 'object-detection-demo',
  'audio-transcription-demo': 'audio-transcription-demo',
  'ecommerce-demo': 'ecommerce-demo',
  'realtime-chat-demo': 'realtime-chat-demo',
  'saas-analytics-demo': 'saas-analytics-demo',
  'product-configurator-demo': 'product-configurator-demo',
  'ai-code-generation-demo': 'ai-code-generation-demo',
  'ml-training-dashboard-demo': 'ml-training-dashboard-demo',
  'computer-vision-pipeline-demo': 'computer-vision-pipeline-demo',
  'nlp-sentiment-api-demo': 'nlp-sentiment-api-demo',
  'cicd-pipeline-demo': 'cicd-pipeline-demo',
  'docker-platform-demo': 'docker-platform-demo',
  'kubernetes-management-demo': 'kubernetes-management-demo',
  'terraform-iac-demo': 'terraform-iac-demo',
  'vulnerability-scanner-demo': 'vulnerability-scanner-demo',
  'penetration-testing-demo': 'penetration-testing-demo',
  'encryption-system-demo': 'encryption-system-demo',
  'security-monitoring-demo': 'security-monitoring-demo',
  'waf-demo': 'waf-demo',
  'siem-demo': 'siem-demo',
  'api-security-gateway-demo': 'api-security-gateway-demo',
  'phishing-detection-demo': 'phishing-detection-demo',
  'owasp-scanner-demo': 'owasp-scanner-demo',
  'network-traffic-analyzer-demo': 'network-traffic-analyzer-demo',
  'ids-demo': 'ids-demo',
  'threat-intelligence-demo': 'threat-intelligence-demo',
  'microservices-demo': 'microservices-demo',
  'graphql-api-demo': 'graphql-api-demo',
  'realtime-collaboration-platform-demo': 'realtime-collaboration-platform-demo',
  'event-driven-architecture-demo': 'event-driven-architecture-demo',
  'serverless-platform-demo': 'serverless-platform-demo',
  'multi-tenant-saas-demo': 'multi-tenant-saas-demo',
  'three-sisters-oyster-project': 'three-sisters-oyster-project',
  'bapux-project': 'bapux-project',
  'bpawd-project': 'bpawd-project',
  'uil-academy-project': 'uil-academy-project',
  'minbod-project': 'minbod-project',
  'jf-resume-project': 'jf-resume-project',
  aquaFarm: 'aquafarm',
  boltPlanner: 'boltplanner',
  grabby: 'grabby',
  neurals: 'neurals',
  AtlusPersonal: 'atlus',
  aisw: 'aisw',
  physics: 'physics',
  terminalUI: 'terminal-ui',
};

const SYSTEMS_PAGE_IDS = [
  'aquaFarm',
  'boltPlanner',
  'grabby',
  'neurals',
  'AtlusPersonal',
  'aisw',
  'physics',
  'terminalUI',
];

const PATH_TO_PAGE = Object.entries(PAGE_SLUGS).reduce((acc, [pageId, slug]) => {
  const normalisedSlug = (slug || '').replace(/^\/+|\/+$/g, '');
  acc[normalisedSlug] = pageId;
  if (normalisedSlug !== pageId) {
    acc[pageId] = pageId;
  }
  return acc;
}, { 'demo-organizer': 'work', projects: 'work' });

const normalisePathname = (pathname) => pathname.replace(/^\/+|\/+$/g, '');

const deriveInitialPage = () => {
  if (typeof window === 'undefined') {
    return 'home';
  }
  const initialPath = normalisePathname(window.location.pathname);
  if (initialPath && PATH_TO_PAGE[initialPath]) {
    return PATH_TO_PAGE[initialPath];
  }
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');
  if (pageParam && PAGE_SLUGS[pageParam] !== undefined) {
    return pageParam;
  }
  return 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState(deriveInitialPage);
  const isInitialMountRef = useRef(true);
  const isHandlingPopRef = useRef(false);

  const scrollToTopInstant = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateTo = (nextPage) => {
    // Ensure the transition starts from the top, not the previous scroll position.
    scrollToTopInstant();
    setCurrentPage(nextPage);
  };

  // Update URL when currentPage changes (but not when handling browser back/forward)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Skip URL update if we're handling a browser navigation event
    if (isHandlingPopRef.current) {
      isHandlingPopRef.current = false;
      return;
    }

    const slug = PAGE_SLUGS[currentPage] ?? '';
    const newPath = slug ? `/${slug}` : '/';
    const currentPath = window.location.pathname;

    // Only update if the path is different
    if (currentPath !== newPath) {
      // Use replaceState on initial mount, pushState for subsequent navigations
      const historyMethod = isInitialMountRef.current ? 'replaceState' : 'pushState';
      window.history[historyMethod]({ page: currentPage }, '', newPath);
      isInitialMountRef.current = false;
    } else {
      // Path matches, but ensure we mark as mounted
      isInitialMountRef.current = false;
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handlePopState = (event) => {
      const pathSlug = normalisePathname(window.location.pathname);
      const nextPage = PATH_TO_PAGE[pathSlug] || 'home';
      
      // Set flag to prevent URL update in the other useEffect
      isHandlingPopRef.current = true;

      // Start the next page at the top for consistent transitions
      scrollToTopInstant();
      
      // Update the page state
      setCurrentPage(nextPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Empty deps - only set up once

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  const renderContent = () => {
    // Handle blog post routes (blog-{slug})
    if (currentPage.startsWith('blog-')) {
      const slug = currentPage.replace('blog-', '');
      return <BlogPost slug={slug} setCurrentPage={navigateTo} />;
    }

    // Systems / GitHub case-study pages (data-driven)
    if (SYSTEMS_PAGE_IDS.includes(currentPage)) {
      return <SystemProjectPage id={currentPage} setCurrentPage={navigateTo} />;
    }
    
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={navigateTo} />;
      case 'work':
        return <Work setCurrentPage={navigateTo} />;
      case 'education':
        return <About setCurrentPage={navigateTo} />;
      case 'blog':
        return <Blog setCurrentPage={navigateTo} />;
      case 'resume':
        return <ResumePage setCurrentPage={navigateTo} />;
      case 'ai-interview-simulator':
        return <AIInterviewSimulatorProjectPage setCurrentPage={navigateTo} />;
      case 'real-time-collaboration':
        return <RealTimeCollaborationProjectPage setCurrentPage={navigateTo} />;
      case 'advanced-analytics':
        return <AdvancedAnalyticsProjectPage setCurrentPage={navigateTo} />;
      case 'blockchain-advanced':
        return <BlockchainAdvancedProjectPage setCurrentPage={navigateTo} />;
      case 'edge-computing':
        return <EdgeComputingProjectPage setCurrentPage={navigateTo} />;
      case 'quantum-computing':
        return <QuantumComputingProjectPage setCurrentPage={navigateTo} />;
      
      // Demo pages
      case 'blockchain-demo':
        return <BlockchainDemoPage setCurrentPage={navigateTo} />;
      case 'aquaculture-demo':
        return <AquacultureDemoPage setCurrentPage={navigateTo} />;
      case 'financial-demo':
        return <FinancialDemoPage setCurrentPage={navigateTo} />;
      case 'healthcare-demo':
        return <HealthcareDemoPage setCurrentPage={navigateTo} />;
      case 'logistics-demo':
        return <LogisticsDemoPage setCurrentPage={navigateTo} />;
      case 'portfolio-builder-demo':
        return <PortfolioBuilderDemoPage setCurrentPage={navigateTo} />;
      case 'restaurant-app-demo':
        return <RestaurantAppDemoPage setCurrentPage={navigateTo} />;
      case 'resume-analyzer-demo':
        return <ResumeAnalyzerDemoPage setCurrentPage={navigateTo} />;
      case 'smart-city-demo':
        return <SmartCityDemoPage setCurrentPage={navigateTo} />;
      case 'whiteboard-demo':
        return <WhiteboardDemoPage setCurrentPage={navigateTo} />;
      case 'game-platform-demo':
        return <GamePlatformDemoPage setCurrentPage={navigateTo} />;
      case 'ai-assistant-demo':
        return <AIAssistantDemoPage setCurrentPage={navigateTo} />;
      case 'snake-ai-demo':
        return <SnakeAIDemoPage setCurrentPage={navigateTo} />;
      case 'ai-agents-demo':
        return <AIAgentsDemoPage setCurrentPage={navigateTo} />;
      case 'sentiment-analysis-demo':
        return <SentimentAnalysisDemoPage setCurrentPage={navigateTo} />;

      case 'rag-chatbot-demo':
        return <RAGChatbotDemoPage setCurrentPage={navigateTo} />;
      case 'bookstore-api-demo':
        return <BookstoreAPIDemoPage setCurrentPage={navigateTo} />;
      case 'mern-expense-tracker-demo':
        return <MERNExpenseTrackerDemoPage setCurrentPage={navigateTo} />;
      case 'social-network-demo':
        return <SocialNetworkDemoPage setCurrentPage={navigateTo} />;
      case 'interactive-resume-demo':
        return <InteractiveResumeDemoPage setCurrentPage={navigateTo} />;
      case 'fraud-detection-demo':
        return <FraudDetectionDemoPage setCurrentPage={navigateTo} />;
      case 'deepfake-detection-demo':
        return <DeepfakeDetectionDemoPage setCurrentPage={navigateTo} />;
      case 'object-detection-demo':
        return <ObjectDetectionDemoPage setCurrentPage={navigateTo} />;
      case 'audio-transcription-demo':
        return <AudioTranscriptionDemoPage setCurrentPage={navigateTo} />;
      case 'ecommerce-demo':
        return <EcommerceDemoPage setCurrentPage={navigateTo} />;
      case 'realtime-chat-demo':
        return <RealtimeChatDemoPage setCurrentPage={navigateTo} />;
      case 'saas-analytics-demo':
        return <SaaSAnalyticsDemoPage setCurrentPage={navigateTo} />;
      case 'product-configurator-demo':
        return <ProductConfiguratorDemoPage setCurrentPage={navigateTo} />;
      
      // New AI/ML projects
      case 'ai-code-generation-demo':
        return <AICodeGenerationDemoPage setCurrentPage={navigateTo} />;
      case 'ml-training-dashboard-demo':
        return <MLTrainingDashboardDemoPage setCurrentPage={navigateTo} />;
      case 'computer-vision-pipeline-demo':
        return <ComputerVisionPipelineDemoPage setCurrentPage={navigateTo} />;
      case 'nlp-sentiment-api-demo':
        return <NLPSentimentAPIDemoPage setCurrentPage={navigateTo} />;
      
      // DevOps projects
      case 'cicd-pipeline-demo':
        return <CICDPipelineDemoPage setCurrentPage={navigateTo} />;
      case 'docker-platform-demo':
        return <DockerPlatformDemoPage setCurrentPage={navigateTo} />;
      case 'kubernetes-management-demo':
        return <KubernetesManagementDemoPage setCurrentPage={navigateTo} />;
      case 'terraform-iac-demo':
        return <TerraformIaCDemoPage setCurrentPage={navigateTo} />;
      
      // Security projects
      case 'vulnerability-scanner-demo':
        return <VulnerabilityScannerDemoPage setCurrentPage={navigateTo} />;
      case 'penetration-testing-demo':
        return <PenetrationTestingDemoPage setCurrentPage={navigateTo} />;
      case 'encryption-system-demo':
        return <EncryptionSystemDemoPage setCurrentPage={navigateTo} />;
      case 'security-monitoring-demo':
        return <SecurityMonitoringDemoPage setCurrentPage={navigateTo} />;
      case 'waf-demo':
        return <WAFDemoPage setCurrentPage={navigateTo} />;
      case 'siem-demo':
        return <SIEMDemoPage setCurrentPage={navigateTo} />;
      case 'api-security-gateway-demo':
        return <APISecurityGatewayDemoPage setCurrentPage={navigateTo} />;
      case 'phishing-detection-demo':
        return <PhishingDetectionDemoPage setCurrentPage={navigateTo} />;
      case 'owasp-scanner-demo':
        return <OWASPScannerDemoPage setCurrentPage={navigateTo} />;
      case 'network-traffic-analyzer-demo':
        return <NetworkTrafficAnalyzerDemoPage setCurrentPage={navigateTo} />;
      case 'ids-demo':
        return <IDSDemoPage setCurrentPage={navigateTo} />;
      case 'threat-intelligence-demo':
        return <ThreatIntelligenceDemoPage setCurrentPage={navigateTo} />;
      
      // Full-stack projects
      case 'microservices-demo':
        return <MicroservicesDemoPage setCurrentPage={navigateTo} />;
      case 'graphql-api-demo':
        return <GraphQLAPIDemoPage setCurrentPage={navigateTo} />;
      case 'realtime-collaboration-platform-demo':
        return <RealtimeCollaborationDemoPage setCurrentPage={navigateTo} />;
      case 'event-driven-architecture-demo':
        return <EventDrivenArchitectureDemoPage setCurrentPage={navigateTo} />;
      case 'serverless-platform-demo':
        return <ServerlessPlatformDemoPage setCurrentPage={navigateTo} />;
      case 'multi-tenant-saas-demo':
        return <MultiTenantSaaSDemoPage setCurrentPage={navigateTo} />;
      
      // External website projects
      case 'three-sisters-oyster-project':
        return <ThreeSistersOysterProjectPage setCurrentPage={navigateTo} />;
      case 'bapux-project':
        return <BapuxProjectPage setCurrentPage={navigateTo} />;
      case 'bpawd-project':
        return <BPAWDProjectPage setCurrentPage={navigateTo} />;
      case 'uil-academy-project':
        return <UILAcademyProjectPage setCurrentPage={navigateTo} />;
      case 'minbod-project':
        return <MinBodProjectPage setCurrentPage={navigateTo} />;
      case 'jf-resume-project':
        return <JFResumeProjectPage setCurrentPage={navigateTo} />;
      
      default:
        return <Home setCurrentPage={navigateTo} />;
    }
  };

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'blog', label: 'Blog' },
    { id: 'education', label: 'About' },
    { id: 'resume', label: 'Resume' },
  ];

  const isActive = (id) => {
    if (id === 'work') {
      return (
        currentPage === 'work' ||
        currentPage.endsWith('-demo') ||
        currentPage.endsWith('-project') ||
        SYSTEMS_PAGE_IDS.includes(currentPage) ||
        [
          'ai-interview-simulator',
          'real-time-collaboration',
          'advanced-analytics',
          'blockchain-advanced',
          'edge-computing',
          'quantum-computing',
        ].includes(currentPage)
      );
    }
    if (id === 'blog') return currentPage === 'blog' || currentPage.startsWith('blog-');
    return currentPage === id;
  };

  return (
    <div className="App min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <AmbientBackground />
      <ScrollProgress />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
        <div className="page-shell">
          <div className="flex h-14 items-center justify-between md:h-16">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-baseline gap-2.5 text-[var(--text)]"
            >
              <span className="font-mono text-sm font-medium text-[var(--accent)]">CF</span>
              <span className="text-sm font-medium tracking-tight">Cael Findley</span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`relative px-3 py-2 text-sm transition-colors duration-200 ${
                    isActive(item.id)
                      ? 'text-[var(--text)]'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {item.label}
                  {isActive(item.id) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-[1px] h-px bg-[var(--accent)]"
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="ml-2 rounded-md border border-[var(--border)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--muted)] hover:text-[var(--text)]"
                aria-label="Open command palette"
              >
                ⌘K
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="p-2 text-[var(--muted)] hover:text-[var(--text)]"
                aria-label="Menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-[var(--border)] py-3 md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigateTo(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full px-1 py-2.5 text-left text-sm ${
                    isActive(item.id) ? 'text-[var(--text)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setPaletteOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="mt-1 block w-full px-1 py-2.5 text-left text-sm text-[var(--muted)]"
              >
                Search ⌘K
              </button>
            </div>
          )}
        </div>
      </nav>

      <main id="main-content" className="relative z-10 overflow-x-hidden pt-14 md:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <ScrollToTop />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
}

export default App;