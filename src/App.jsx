import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Home from './components/Home';
import DemoOrganizer from './components/DemoOrganizer';
import Contact from './components/Contact';
import AIInterviewSimulatorProjectPage from './components/ProjectPages/AIInterviewSimulatorProjectPage';
import RealTimeCollaborationProjectPage from './components/ProjectPages/RealTimeCollaborationProjectPage';
import AdvancedAnalyticsProjectPage from './components/ProjectPages/AdvancedAnalyticsProjectPage';
import BlockchainAdvancedProjectPage from './components/ProjectPages/BlockchainAdvancedProjectPage';
import EdgeComputingProjectPage from './components/ProjectPages/EdgeComputingProjectPage';
import QuantumComputingProjectPage from './components/ProjectPages/QuantumComputingProjectPage';
import FloatingParticles from './components/FloatingParticles';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Education from './components/Education';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

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

const PAGE_SLUGS = {
  home: '',
  'demo-organizer': 'demo-organizer',
  education: 'about',
  blog: 'blog',
  contact: 'contact',
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
};

const PATH_TO_PAGE = Object.entries(PAGE_SLUGS).reduce((acc, [pageId, slug]) => {
  const normalisedSlug = (slug || '').replace(/^\/+|\/+$/g, '');
  acc[normalisedSlug] = pageId;
  if (normalisedSlug !== pageId) {
    acc[pageId] = pageId;
  }
  return acc;
}, {});

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
    console.log('App.jsx - Current page:', currentPage);
    
    // Handle blog post routes (blog-{slug})
    if (currentPage.startsWith('blog-')) {
      const slug = currentPage.replace('blog-', '');
      return <BlogPost slug={slug} setCurrentPage={setCurrentPage} />;
    }
    
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'demo-organizer':
        return <DemoOrganizer setCurrentPage={setCurrentPage} />;
      case 'education':
        return <Education setCurrentPage={setCurrentPage} />;
      case 'blog':
        return <Blog setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      case 'ai-interview-simulator':
        return <AIInterviewSimulatorProjectPage setCurrentPage={setCurrentPage} />;
      case 'real-time-collaboration':
        return <RealTimeCollaborationProjectPage setCurrentPage={setCurrentPage} />;
      case 'advanced-analytics':
        return <AdvancedAnalyticsProjectPage setCurrentPage={setCurrentPage} />;
      case 'blockchain-advanced':
        return <BlockchainAdvancedProjectPage setCurrentPage={setCurrentPage} />;
      case 'edge-computing':
        return <EdgeComputingProjectPage setCurrentPage={setCurrentPage} />;
      case 'quantum-computing':
        return <QuantumComputingProjectPage setCurrentPage={setCurrentPage} />;
      
      // Demo pages
      case 'blockchain-demo':
        return <BlockchainDemoPage setCurrentPage={setCurrentPage} />;
      case 'aquaculture-demo':
        return <AquacultureDemoPage setCurrentPage={setCurrentPage} />;
      case 'financial-demo':
        return <FinancialDemoPage setCurrentPage={setCurrentPage} />;
      case 'healthcare-demo':
        return <HealthcareDemoPage setCurrentPage={setCurrentPage} />;
      case 'logistics-demo':
        return <LogisticsDemoPage setCurrentPage={setCurrentPage} />;
      case 'portfolio-builder-demo':
        return <PortfolioBuilderDemoPage setCurrentPage={setCurrentPage} />;
      case 'restaurant-app-demo':
        return <RestaurantAppDemoPage setCurrentPage={setCurrentPage} />;
      case 'resume-analyzer-demo':
        return <ResumeAnalyzerDemoPage setCurrentPage={setCurrentPage} />;
      case 'smart-city-demo':
        return <SmartCityDemoPage setCurrentPage={setCurrentPage} />;
      case 'whiteboard-demo':
        return <WhiteboardDemoPage setCurrentPage={setCurrentPage} />;
      case 'game-platform-demo':
        return <GamePlatformDemoPage setCurrentPage={setCurrentPage} />;
      case 'ai-assistant-demo':
        return <AIAssistantDemoPage setCurrentPage={setCurrentPage} />;
      case 'snake-ai-demo':
        return <SnakeAIDemoPage setCurrentPage={setCurrentPage} />;
      case 'ai-agents-demo':
        return <AIAgentsDemoPage setCurrentPage={setCurrentPage} />;
      case 'sentiment-analysis-demo':
        return <SentimentAnalysisDemoPage setCurrentPage={setCurrentPage} />;

      case 'rag-chatbot-demo':
        return <RAGChatbotDemoPage setCurrentPage={setCurrentPage} />;
      case 'bookstore-api-demo':
        return <BookstoreAPIDemoPage setCurrentPage={setCurrentPage} />;
      case 'mern-expense-tracker-demo':
        return <MERNExpenseTrackerDemoPage setCurrentPage={setCurrentPage} />;
      case 'social-network-demo':
        return <SocialNetworkDemoPage setCurrentPage={setCurrentPage} />;
      case 'interactive-resume-demo':
        return <InteractiveResumeDemoPage setCurrentPage={setCurrentPage} />;
      case 'fraud-detection-demo':
        return <FraudDetectionDemoPage setCurrentPage={setCurrentPage} />;
      case 'deepfake-detection-demo':
        return <DeepfakeDetectionDemoPage setCurrentPage={setCurrentPage} />;
      case 'object-detection-demo':
        return <ObjectDetectionDemoPage setCurrentPage={setCurrentPage} />;
      case 'audio-transcription-demo':
        return <AudioTranscriptionDemoPage setCurrentPage={setCurrentPage} />;
      case 'ecommerce-demo':
        return <EcommerceDemoPage setCurrentPage={setCurrentPage} />;
      case 'realtime-chat-demo':
        return <RealtimeChatDemoPage setCurrentPage={setCurrentPage} />;
      case 'saas-analytics-demo':
        return <SaaSAnalyticsDemoPage setCurrentPage={setCurrentPage} />;
      case 'product-configurator-demo':
        return <ProductConfiguratorDemoPage setCurrentPage={setCurrentPage} />;
      
      // New AI/ML projects
      case 'ai-code-generation-demo':
        return <AICodeGenerationDemoPage setCurrentPage={setCurrentPage} />;
      case 'ml-training-dashboard-demo':
        return <MLTrainingDashboardDemoPage setCurrentPage={setCurrentPage} />;
      case 'computer-vision-pipeline-demo':
        return <ComputerVisionPipelineDemoPage setCurrentPage={setCurrentPage} />;
      case 'nlp-sentiment-api-demo':
        return <NLPSentimentAPIDemoPage setCurrentPage={setCurrentPage} />;
      
      // DevOps projects
      case 'cicd-pipeline-demo':
        return <CICDPipelineDemoPage setCurrentPage={setCurrentPage} />;
      case 'docker-platform-demo':
        return <DockerPlatformDemoPage setCurrentPage={setCurrentPage} />;
      case 'kubernetes-management-demo':
        return <KubernetesManagementDemoPage setCurrentPage={setCurrentPage} />;
      case 'terraform-iac-demo':
        return <TerraformIaCDemoPage setCurrentPage={setCurrentPage} />;
      
      // Security projects
      case 'vulnerability-scanner-demo':
        return <VulnerabilityScannerDemoPage setCurrentPage={setCurrentPage} />;
      case 'penetration-testing-demo':
        return <PenetrationTestingDemoPage setCurrentPage={setCurrentPage} />;
      case 'encryption-system-demo':
        return <EncryptionSystemDemoPage setCurrentPage={setCurrentPage} />;
      case 'security-monitoring-demo':
        return <SecurityMonitoringDemoPage setCurrentPage={setCurrentPage} />;
      case 'waf-demo':
        return <WAFDemoPage setCurrentPage={setCurrentPage} />;
      case 'siem-demo':
        return <SIEMDemoPage setCurrentPage={setCurrentPage} />;
      case 'api-security-gateway-demo':
        return <APISecurityGatewayDemoPage setCurrentPage={setCurrentPage} />;
      case 'phishing-detection-demo':
        return <PhishingDetectionDemoPage setCurrentPage={setCurrentPage} />;
      case 'owasp-scanner-demo':
        return <OWASPScannerDemoPage setCurrentPage={setCurrentPage} />;
      case 'network-traffic-analyzer-demo':
        return <NetworkTrafficAnalyzerDemoPage setCurrentPage={setCurrentPage} />;
      case 'ids-demo':
        return <IDSDemoPage setCurrentPage={setCurrentPage} />;
      case 'threat-intelligence-demo':
        return <ThreatIntelligenceDemoPage setCurrentPage={setCurrentPage} />;
      
      // Full-stack projects
      case 'microservices-demo':
        return <MicroservicesDemoPage setCurrentPage={setCurrentPage} />;
      case 'graphql-api-demo':
        return <GraphQLAPIDemoPage setCurrentPage={setCurrentPage} />;
      case 'realtime-collaboration-platform-demo':
        return <RealtimeCollaborationDemoPage setCurrentPage={setCurrentPage} />;
      case 'event-driven-architecture-demo':
        return <EventDrivenArchitectureDemoPage setCurrentPage={setCurrentPage} />;
      case 'serverless-platform-demo':
        return <ServerlessPlatformDemoPage setCurrentPage={setCurrentPage} />;
      case 'multi-tenant-saas-demo':
        return <MultiTenantSaaSDemoPage setCurrentPage={setCurrentPage} />;
      
      // External website projects
      case 'three-sisters-oyster-project':
        return <ThreeSistersOysterProjectPage setCurrentPage={setCurrentPage} />;
      case 'bapux-project':
        return <BapuxProjectPage setCurrentPage={setCurrentPage} />;
      case 'bpawd-project':
        return <BPAWDProjectPage setCurrentPage={setCurrentPage} />;
      case 'uil-academy-project':
        return <UILAcademyProjectPage setCurrentPage={setCurrentPage} />;
      case 'minbod-project':
        return <MinBodProjectPage setCurrentPage={setCurrentPage} />;
      case 'jf-resume-project':
        return <JFResumeProjectPage setCurrentPage={setCurrentPage} />;
      
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  // Navigation component
  const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navItems = [
      { id: 'home', label: 'Home', icon: '' },
      { id: 'demo-organizer', label: 'Projects', icon: '' },
      { id: 'blog', label: 'Blog', icon: '' },
      { id: 'education', label: 'About', icon: '' },
      { id: 'contact', label: 'Contact', icon: '' },
    ];

    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center space-x-2 text-white font-bold text-lg group"
                >
                  <motion.span 
                    className="text-2xl bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    CF
                  </motion.span>
                  <span className="group-hover:text-teal-400 transition-colors">Cael Findley</span>
                </button>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className={`relative z-10 transition-colors ${
                        currentPage === item.id
                          ? 'text-white'
                          : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>
                      
                      {/* Active indicator */}
                      {currentPage === item.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-emerald-600/80 rounded-lg backdrop-blur-sm"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      {currentPage !== item.id && (
                        <motion.div
                          className="absolute inset-0 bg-gray-700/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      
                      {/* Underline animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: currentPage === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-300 hover:text-white p-2"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </motion.svg>
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <motion.div
              initial={false}
              animate={{
                height: mobileMenuOpen ? "auto" : 0,
                opacity: mobileMenuOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-teal-600/80 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </nav>
        <ScrollProgress />
      </>
    );
  };

  return (
    <div className="App min-h-screen bg-gray-900 relative overflow-x-hidden scroll-smooth">
      <FloatingParticles />
      <Navigation />
      <main className="relative z-10 overflow-x-hidden pt-16">
        {renderContent()}
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;