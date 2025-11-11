import React, { useState, useEffect, useRef } from 'react';
import Home from './components/Home';
import DemoOrganizer from './components/DemoOrganizer';
import Freelancing from './components/Freelancing';
import Contact from './components/Contact';
import AIInterviewSimulatorProjectPage from './components/ProjectPages/AIInterviewSimulatorProjectPage';
import RealTimeCollaborationProjectPage from './components/ProjectPages/RealTimeCollaborationProjectPage';
import AdvancedAnalyticsProjectPage from './components/ProjectPages/AdvancedAnalyticsProjectPage';
import BlockchainAdvancedProjectPage from './components/ProjectPages/BlockchainAdvancedProjectPage';
import EdgeComputingProjectPage from './components/ProjectPages/EdgeComputingProjectPage';
import QuantumComputingProjectPage from './components/ProjectPages/QuantumComputingProjectPage';
import FloatingParticles from './components/FloatingParticles';
import ScrollToTop from './components/ScrollToTop';

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
  freelancing: 'freelancing',
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
  const hasMountedRef = useRef(false);
  const isHandlingPopRef = useRef(false);

  // Scroll to top when page changes
  useEffect(() => {
    // Use instant scroll for immediate positioning, then smooth if needed
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Also ensure it happens after a brief delay to catch any late-rendering content
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  useEffect(() => {
    const slug = PAGE_SLUGS[currentPage] ?? '';
    const newPath = slug ? `/${slug}` : '/';
    if (typeof window === 'undefined') {
      return;
    }

    if (isHandlingPopRef.current) {
      isHandlingPopRef.current = false;
      return;
    }

    if (window.location.pathname === newPath) {
      hasMountedRef.current = true;
      return;
    }

    const historyMethod = hasMountedRef.current ? 'pushState' : 'replaceState';
    window.history[historyMethod]({}, '', newPath);
    hasMountedRef.current = true;
  }, [currentPage]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handlePopState = () => {
      const pathSlug = normalisePathname(window.location.pathname);
      const nextPage = PATH_TO_PAGE[pathSlug] || 'home';
      if (nextPage !== currentPage) {
        isHandlingPopRef.current = true;
      }
      setCurrentPage(nextPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  const renderContent = () => {
    console.log('App.jsx - Current page:', currentPage);
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'demo-organizer':
        return <DemoOrganizer setCurrentPage={setCurrentPage} />;
      case 'freelancing':
        return <Freelancing setCurrentPage={setCurrentPage} />;
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
    const navItems = [
      { id: 'home', label: 'Home', icon: '' },
      { id: 'demo-organizer', label: 'Projects', icon: '' },
      { id: 'freelancing', label: 'Services', icon: '' },
      { id: 'contact', label: 'Contact', icon: '' },
    ];

    return (
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2 text-white font-bold text-lg hover:text-teal-400 transition-colors"
              >
                <span className="text-2xl">CF</span>
                <span>Cael Findley</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                      currentPage === item.id
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-500/30'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {currentPage === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 animate-pulse"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                ))}
                
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  mobileMenu.classList.toggle('hidden');
                }}
                className="text-gray-300 hover:text-white p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div id="mobile-menu" className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div className="App min-h-screen bg-gray-900 relative overflow-x-hidden overscroll-behavior scroll-smooth">
      <FloatingParticles />
      <Navigation />
      <main className="relative z-10 overflow-x-hidden snap-container">
        {renderContent()}
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;