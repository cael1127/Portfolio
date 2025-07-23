import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Freelancing from './components/Freelancing';
// Demo Pages
import BlockchainDemoPage from './pages/BlockchainDemoPage';
import AquacultureDemoPage from './pages/AquacultureDemoPage';
import LogisticsDemoPage from './pages/LogisticsDemoPage';
import HealthcareDemoPage from './pages/HealthcareDemoPage';
import SmartCityDemoPage from './pages/SmartCityDemoPage';
import FinancialDemoPage from './pages/FinancialDemoPage';
import GamePlatformDemoPage from './pages/GamePlatformDemoPage';
import PortfolioBuilderDemoPage from './pages/PortfolioBuilderDemoPage';
import RestaurantAppDemoPage from './pages/RestaurantAppDemoPage';
import AIAssistantDemoPage from './pages/AIAssistantDemoPage';
import ResumeAnalyzerDemoPage from './pages/ResumeAnalyzerDemoPage';
import WhiteboardDemoPage from './pages/WhiteboardDemoPage';
import FraudDetectionDemoPage from './pages/FraudDetectionDemoPage';
import DeepfakeDetectionDemoPage from './pages/DeepfakeDetectionDemoPage';
import TestDemoPage from './pages/TestDemoPage';
import BlockchainProjectPage from './components/ProjectPages/BlockchainProjectPage';
import AquacultureProjectPage from './components/ProjectPages/AquacultureProjectPage';
import HealthcareProjectPage from './components/ProjectPages/HealthcareProjectPage';
import LogisticsProjectPage from './components/ProjectPages/LogisticsProjectPage';
import FinancialProjectPage from './components/ProjectPages/FinancialProjectPage';
import SmartCityProjectPage from './components/ProjectPages/SmartCityProjectPage';
import GamePlatformProjectPage from './components/ProjectPages/GamePlatformProjectPage';
import RestaurantAppProjectPage from './components/ProjectPages/RestaurantAppProjectPage';
import WhiteboardProjectPage from './components/ProjectPages/WhiteboardProjectPage';
import PortfolioBuilderProjectPage from './components/ProjectPages/PortfolioBuilderProjectPage';
import AIAssistantProjectPage from './components/ProjectPages/AIAssistantProjectPage';
import ResumeAnalyzerProjectPage from './components/ProjectPages/ResumeAnalyzerProjectPage';
import DeepfakeDetectionProjectPage from './components/ProjectPages/DeepfakeDetectionProjectPage';
import DemoOrganizer from './components/DemoOrganizer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ResumeBuilder from './components/ResumeBuilder';
import CollaborativeFeatures from './components/CollaborativeFeatures';
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm ACF, your AI assistant. I can help you with coding, data analysis, creative writing, and much more. What would you like to work on today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [aiInputMessage, setAiInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Enhanced navigation function with browser history
  const navigateToPage = (page) => {
    console.log('Navigating to:', page);
    setCurrentPage(page);
    
    // Update browser history
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', url);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      console.log('PopState event:', event);
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        // Handle direct URL access
        const path = window.location.pathname.substring(1) || 'home';
        setCurrentPage(path);
      }
    };

    // Handle initial page load
    const path = window.location.pathname.substring(1) || 'home';
    if (path !== currentPage) {
      setCurrentPage(path);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auto-scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // AI Chat functionality
  const handleAISendMessage = async () => {
    if (!aiInputMessage.trim()) return;

    const userMessage = {
      id: aiMessages.length + 1,
      type: 'user',
      content: aiInputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setAiMessages(prev => [...prev, userMessage]);
    setAiInputMessage('');
    setIsAiTyping(true);

    try {
      // Prepare context about the portfolio
      const portfolioContext = `
        You are ACF, an AI assistant for Cael Findley's portfolio website. 
        
        Portfolio Information:
        - Cael Findley is a Full-Stack Software Engineer
        - Specializes in modern web technologies, cloud infrastructure, and innovative solutions
        - Current role: Software Engineer at Three Sisters Oyster Company (since 2025)
        - Location: Texas, United States
        - Contact: caelfindley@gmail.com, +1 (361) 920-6493
        
        Available Pages/Sections:
        - Home: Overview, skills, live demos
        - Experience: Current role and certifications (AWS Certified Developer, Google Cloud Professional Data Engineer, CompTIA Security+)
        - Projects: Aquaculture Tracking System, Smart Logistics Platform, DeFi Yield Farming Platform, Healthcare Analytics Platform, Smart City Infrastructure, Financial Analytics Platform, Interactive Game Platform, E-Learning Management System, Creative Portfolio Builder, Real Estate Marketplace, Restaurant Management App, ACF AI Assistant
        - Contact: Contact information and social links
        - Freelancing: Services offered (Full-Stack Development, Cloud Infrastructure, Security & Compliance, AI & Machine Learning, Mobile Development, Consulting & Strategy)
        
        Live Demos Available:
        - Blockchain Demo: Supply chain with real-time transactions
        - Aquaculture Demo: Live sensor and tank data
        - Logistics Demo: Fleet and route optimization
        - Healthcare Demo: AI-powered analytics
        - Smart City Demo: Infrastructure and traffic data
        - Financial Demo: AI-powered analytics and market data
        - Game Platform Demo: Interactive multiplayer gaming
        - Portfolio Builder Demo: Drag-and-drop website builder
        - Restaurant App Demo: Complete management solution
        - AI Assistant Demo: ACF (this assistant)
        
        Skills: React, Node.js, AWS, Docker, Kubernetes, Python, TensorFlow, MongoDB, PostgreSQL, Redis, Socket.IO, HIPAA compliance, security, cloud architecture
        
        Be helpful, professional, and guide users to relevant sections of the portfolio. You can help them navigate to specific pages, explain projects, or answer questions about Cael's work and services.
      `;

      // Call the LLM API
      const response = await fetch('http://localhost:3002/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: aiInputMessage,
          context: portfolioContext,
          conversationHistory: aiMessages.slice(-5) // Send last 5 messages for context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiResponse = {
        id: aiMessages.length + 2,
        type: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString()
      };

      setAiMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI API Error:', error);
      
      // Fallback to local responses if API fails
      const request = aiInputMessage.toLowerCase();
      let response = '';

      if (request.includes('navigate') || request.includes('page') || request.includes('section')) {
        response = "I can help you navigate the portfolio! Here are the main sections:\n\n🏠 **Home**: Overview and live demos\n👨‍💼 **Experience**: Current role and certifications\n💼 **Projects**: All my projects and demos\n📞 **Contact**: Get in touch\n💼 **Freelancing**: Services I offer\n\nWhat would you like to explore?";
      } else if (request.includes('project') || request.includes('work')) {
        response = "Here are some of my key projects:\n\n🌊 **Aquaculture Tracking System**: Real-time oyster farm monitoring\n🚚 **Smart Logistics Platform**: AI-powered route optimization\n💰 **DeFi Platform**: Yield farming and DeFi solutions\n🏥 **Healthcare Analytics**: AI-powered patient monitoring\n🏙️ **Smart City Infrastructure**: Traffic and system management\n\nWould you like to know more about any specific project?";
      } else if (request.includes('skill') || request.includes('technology')) {
        response = "My technical skills include:\n\n💻 **Full-Stack**: React, Node.js, Python\n☁️ **Cloud**: AWS, Docker, Kubernetes\n🔒 **Security**: HIPAA compliance, zero-trust architecture\n🤖 **AI/ML**: TensorFlow, predictive analytics\n📱 **Mobile**: React Native, PWA development\n\nWhat area interests you most?";
      } else if (request.includes('contact') || request.includes('hire') || request.includes('freelance')) {
        response = "I'm available for freelance work! Here's how to reach me:\n\n📧 **Email**: caelfindley@gmail.com\n📱 **Phone**: +1 (361) 920-6493\n💼 **Services**: Full-stack development, cloud architecture, AI/ML, security\n💰 **Rates**: Starting at $75/hour\n\nCheck out the 'Freelancing' page for more details!";
      } else if (request.includes('demo') || request.includes('live')) {
        response = "I have several live demos you can try:\n\n🔗 **Blockchain Demo**: Supply chain transactions\n🌊 **Aquaculture Demo**: Sensor data visualization\n🚚 **Logistics Demo**: Route optimization\n🏥 **Healthcare Demo**: Patient analytics\n🏙️ **Smart City Demo**: Infrastructure monitoring\n📊 **Financial Demo**: Market analytics\n🎮 **Game Platform Demo**: Interactive gaming\n🎨 **Portfolio Builder Demo**: Website builder\n🍽️ **Restaurant App Demo**: Management system\n\nClick on any demo card on the home page to try them!";
      } else {
        response = "I'm ACF, your AI assistant for Cael Findley's portfolio! I can help you navigate the site, learn about projects, explore skills, or get contact information. What would you like to know?";
      }

      const aiResponse = {
        id: aiMessages.length + 2,
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setAiMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const renderContent = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <Home 
              setCurrentPage={navigateToPage}
              showAIChat={showAIChat}
              setShowAIChat={setShowAIChat}
              aiMessages={aiMessages}
              aiInputMessage={aiInputMessage}
              setAiInputMessage={setAiInputMessage}
              isAiTyping={isAiTyping}
              handleAISendMessage={handleAISendMessage}
            />
          </div>
        );
      
      case 'experience':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <Experience />
          </div>
        );

      case 'projects':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <Projects setCurrentPage={navigateToPage} />
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <Contact />
          </div>
        );
      
      case 'freelancing':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <Freelancing />
          </div>
        );
      
      case 'blockchain':
        return <BlockchainDemoPage setCurrentPage={navigateToPage} />;
      case 'aquaculture':
        return <AquacultureDemoPage setCurrentPage={navigateToPage} />;
      case 'logistics':
        return <LogisticsDemoPage setCurrentPage={navigateToPage} />;
      case 'healthcare':
        return <HealthcareDemoPage setCurrentPage={navigateToPage} />;
      case 'smartcity':
        return <SmartCityDemoPage setCurrentPage={navigateToPage} />;
      case 'financial':
        return <FinancialDemoPage setCurrentPage={navigateToPage} />;
      case 'gameplatform':
        return <GamePlatformDemoPage setCurrentPage={navigateToPage} />;
      case 'portfoliobuilder':
        return <PortfolioBuilderDemoPage setCurrentPage={navigateToPage} />;
      case 'restaurantapp':
        return <RestaurantAppDemoPage setCurrentPage={navigateToPage} />;
      case 'aiassistant':
        return <AIAssistantDemoPage setCurrentPage={navigateToPage} />;
      case 'resumeanalyzer':
        return <ResumeAnalyzerDemoPage setCurrentPage={navigateToPage} />;
      case 'whiteboard':
        return <WhiteboardDemoPage setCurrentPage={navigateToPage} />;
      
      // New trending project demos
      case 'fraud-detection':
        return <FraudDetectionDemoPage setCurrentPage={navigateToPage} />;
      case 'deepfake-detection':
        return <DeepfakeDetectionDemoPage setCurrentPage={navigateToPage} />;
      
      case 'blockchain-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <BlockchainProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'demo-organizer':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <DemoOrganizer setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'aquaculture-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <AquacultureProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'healthcare-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <HealthcareProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'logistics-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <LogisticsProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'financial-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <FinancialProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'smartcity-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <SmartCityProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'gameplatform-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <GamePlatformProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'restaurantapp-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <RestaurantAppProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'whiteboard-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <WhiteboardProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'portfoliobuilder-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <PortfolioBuilderProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'ai-assistant-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <AIAssistantProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'resume-analyzer-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <ResumeAnalyzerProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'deepfake-detection-project':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <DeepfakeDetectionProjectPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      case 'analytics-dashboard':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <AnalyticsDashboard />
          </div>
        );
      
      case 'resume-builder':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <ResumeBuilder />
          </div>
        );
      
      case 'collaborative-features':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <CollaborativeFeatures />
          </div>
        );
      
      case 'performance-monitor':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <PerformanceMonitor />
          </div>
        );
      
      case 'test-demo':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={navigateToPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <TestDemoPage setCurrentPage={navigateToPage} />
            </div>
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;