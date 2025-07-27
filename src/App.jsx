import React, { useState } from 'react';
import Home from './components/Home';
import DemoOrganizer from './components/DemoOrganizer';
import ResumeBuilder from './components/ResumeBuilder';
import Freelancing from './components/Freelancing';
import Contact from './components/Contact';
import AIInterviewSimulator from './components/AIInterviewSimulator';
import RealTimeCollaboration from './components/RealTimeCollaboration';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import BlockchainAdvanced from './components/BlockchainAdvanced';
import EdgeComputing from './components/EdgeComputing';
import QuantumComputingDemo from './components/QuantumComputingDemo';

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
import ThreeDPortfolioDemoPage from './pages/ThreeDPortfolioDemoPage';
import RAGChatbotDemoPage from './pages/RAGChatbotDemoPage';
import BookstoreAPIDemoPage from './pages/BookstoreAPIDemoPage';
import MERNExpenseTrackerDemoPage from './pages/MERNExpenseTrackerDemoPage';
import SocialNetworkDemoPage from './pages/SocialNetworkDemoPage';
import InteractiveResumeDemoPage from './pages/InteractiveResumeDemoPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'demo-organizer':
        return <DemoOrganizer setCurrentPage={setCurrentPage} />;
      case 'resume-builder':
        return <ResumeBuilder setCurrentPage={setCurrentPage} />;
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
      case '3d-portfolio-demo':
        return <ThreeDPortfolioDemoPage setCurrentPage={setCurrentPage} />;
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
      
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;