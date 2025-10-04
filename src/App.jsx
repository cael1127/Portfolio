import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import DemoOrganizer from './components/DemoOrganizer';
import Freelancing from './components/Freelancing';
import Contact from './components/Contact';
import AIInterviewSimulator from './components/AIInterviewSimulator';
import RealTimeCollaboration from './components/RealTimeCollaboration';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import BlockchainAdvanced from './components/BlockchainAdvanced';
import EdgeComputing from './components/EdgeComputing';
import QuantumComputingDemo from './components/QuantumComputingDemo';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
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
        return <AIInterviewSimulator setCurrentPage={setCurrentPage} />;
      case 'real-time-collaboration':
        return <RealTimeCollaboration setCurrentPage={setCurrentPage} />;
      case 'advanced-analytics':
        return <AdvancedAnalytics setCurrentPage={setCurrentPage} />;
      case 'blockchain-advanced':
        return <BlockchainAdvanced setCurrentPage={setCurrentPage} />;
      case 'edge-computing':
        return <EdgeComputing setCurrentPage={setCurrentPage} />;
      case 'quantum-computing':
        return <QuantumComputingDemo setCurrentPage={setCurrentPage} />;
      
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

    const enterpriseItems = [
      { id: 'ai-interview-simulator', label: 'AI Interview', icon: '' },
      { id: 'real-time-collaboration', label: 'Collaboration', icon: '' },
      { id: 'advanced-analytics', label: 'Analytics', icon: '' },
      { id: 'blockchain-advanced', label: 'Blockchain', icon: '' },
      { id: 'edge-computing', label: 'Edge Computing', icon: '' },
      { id: 'quantum-computing', label: 'Quantum', icon: '' },
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
                
                {/* Enterprise Features Dropdown */}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30">
                    Enterprise
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {enterpriseItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
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
              
              {/* Mobile Enterprise Features */}
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Enterprise Features
                </div>
                {enterpriseItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
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