import React, { useState } from 'react';
import BlockchainDemo from './components/demos/BlockchainDemo';
import AquacultureDemo from './components/demos/AquacultureDemo';
import LogisticsDemo from './components/demos/LogisticsDemo';
import HealthcareDemo from './components/demos/HealthcareDemo';
import SmartCityDemo from './components/demos/SmartCityDemo';
import FinancialDemo from './components/demos/FinancialDemo';
import GamePlatformDemo from './components/demos/GamePlatformDemo';
import PortfolioBuilderDemo from './components/demos/PortfolioBuilderDemo';
import RestaurantAppDemo from './components/demos/RestaurantAppDemo';
import AIAssistantDemo from './components/demos/AIAssistantDemo';

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

  // Navigation component that appears on all pages
  const Navigation = () => (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold text-green-400 cursor-pointer"
            >
              CF
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`transition-colors ${
                currentPage === 'home' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('experience')}
              className={`transition-colors ${
                currentPage === 'experience' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setCurrentPage('projects')}
              className={`transition-colors ${
                currentPage === 'projects' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`transition-colors ${
                currentPage === 'contact' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setCurrentPage('freelancing')}
              className={`transition-colors ${
                currentPage === 'freelancing' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              Freelancing
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-6 pb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent leading-[1.3]">
                  Cael Findley
                </h1>
                <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Full-Stack Software Engineer specializing in modern web technologies, 
                  cloud infrastructure, and innovative solutions that drive business growth.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage('experience')}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    View Experience
                  </button>
                  <button
                    onClick={() => setCurrentPage('projects')}
                    className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  >
                    View Projects
                  </button>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Full-Stack Development</h3>
                  <p className="text-gray-300">Modern web applications with React, Node.js, and cloud-native architectures.</p>
                </div>
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">☁️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cloud Infrastructure</h3>
                  <p className="text-gray-300">AWS, Docker, Kubernetes, and serverless architectures for scalable solutions.</p>
                </div>
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Security & Compliance</h3>
                  <p className="text-gray-300">Zero-trust security, HIPAA compliance, and enterprise-grade security solutions.</p>
                </div>
              </div>

              {/* Live Demos Section */}
              <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800">
                <h2 className="text-3xl font-bold text-white mb-8">Live Demos</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('blockchain')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🔗 Blockchain Demo</h3>
                    <p className="text-gray-300">Blockchain supply chain with real-time transactions and traceability.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('aquaculture')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🌊 Aquaculture Demo</h3>
                    <p className="text-gray-300">Aquaculture tracking system with live sensor and tank data.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('logistics')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🚚 Logistics Demo</h3>
                    <p className="text-gray-300">Smart logistics platform with live fleet and route optimization.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('healthcare')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🏥 Healthcare Demo</h3>
                    <p className="text-gray-300">AI-powered healthcare analytics and patient monitoring.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('smartcity')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🏙️ Smart City Demo</h3>
                    <p className="text-gray-300">Smart city infrastructure with live system and traffic data.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('financial')}
                  >
                    <h3 className="text-xl font-semibold mb-2">📊 Financial Demo</h3>
                    <p className="text-gray-300">AI-powered financial analytics and live market data.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('gameplatform')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🎮 Game Platform Demo</h3>
                    <p className="text-gray-300">Interactive multiplayer gaming with real-time features.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('portfoliobuilder')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🎨 Portfolio Builder Demo</h3>
                    <p className="text-gray-300">Drag-and-drop website builder for creatives.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('restaurantapp')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🍽️ Restaurant App Demo</h3>
                    <p className="text-gray-300">Complete restaurant management solution.</p>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
                    onClick={() => setCurrentPage('aiassistant')}
                  >
                    <h3 className="text-xl font-semibold mb-2">🤖 AI Assistant Demo</h3>
                    <p className="text-gray-300">ACF - Your intelligent AI companion.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 border-t border-gray-700 mt-16">
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>📧 caelfindley@gmail.com</p>
                      <p>📱 +1 (361) 920-6493</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
                    <div className="space-y-2">
                      <a
                        href="https://github.com/cael1127"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-green-400 transition-colors block"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://linkedin.com/in/caelfindley"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-green-400 transition-colors block"
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

            {/* AI Chat Widget */}
            <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${showAIChat ? 'w-96 h-[500px]' : 'w-16 h-16'}`}>
              {showAIChat ? (
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 rounded-lg border border-green-800 shadow-2xl h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-green-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">ACF</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">AI Assistant</h3>
                        <p className="text-green-400 text-xs">Online</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAIChat(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {aiMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-2 rounded-lg text-sm ${
                            message.type === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-200'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                        </div>
                      </div>
                    ))}
                    {isAiTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-gray-200 p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-xs">ACF is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-green-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aiInputMessage}
                        onChange={(e) => setAiInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAISendMessage();
                          }
                        }}
                        placeholder="Ask ACF anything..."
                        className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none text-sm"
                      />
                      <button
                        onClick={handleAISendMessage}
                        disabled={!aiInputMessage.trim() || isAiTyping}
                        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAIChat(true)}
                  className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full shadow-lg hover:from-green-700 hover:to-teal-700 transition-all flex items-center justify-center"
                >
                  <span className="text-white text-2xl">🤖</span>
                </button>
              )}
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-4xl font-bold mb-8 text-green-400">Experience & Certifications</h2>
              
              <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800 mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">Current Role</h3>
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">Software Engineer</h4>
                    <p className="text-green-400 font-medium">Three Sisters Oyster Company</p>
                    <p className="text-gray-400 text-sm">Since 2025</p>
                    <p className="text-gray-300 mt-3">
                      Developing and maintaining scalable software solutions for aquaculture data tracking, 
                      logistics management, and environmental monitoring.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800">
                <h3 className="text-2xl font-semibold text-white mb-6">Certifications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-4 rounded-lg border border-green-700 hover:border-green-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">☁️</span>
                      <div>
                        <h4 className="font-semibold text-white">AWS Certified Developer</h4>
                        <p className="text-gray-400 text-sm">2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-4 rounded-lg border border-green-700 hover:border-green-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h4 className="font-semibold text-white">Google Cloud Professional Data Engineer</h4>
                        <p className="text-gray-400 text-sm">2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-4 rounded-lg border border-green-700 hover:border-green-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <h4 className="font-semibold text-white">CompTIA Security+</h4>
                        <p className="text-gray-400 text-sm">2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-4xl font-bold mb-8 text-green-400">Projects</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🌊</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Aquaculture Tracking System</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Enterprise-grade full-stack application for real-time oyster farm monitoring using IoT sensors, 
                      machine learning analytics, and an intuitive React dashboard.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Real-time sensor data visualization</div>
                      <div>• Advanced alert system with configurable thresholds</div>
                      <div>• Historical data analysis with trend detection</div>
                      <div>• Mobile-responsive dashboard with offline capability</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Node.js</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">AWS</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">MongoDB</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Socket.IO</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🚚</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Smart Logistics Platform</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      AI-powered logistics optimization platform that streamlines supply chain operations through 
                      intelligent route planning and predictive analytics.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• AI-powered route optimization with real-time traffic</div>
                      <div>• Predictive analytics for delivery time estimation</div>
                      <div>• Real-time GPS tracking with geofencing</div>
                      <div>• Automated dispatch and driver assignment</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">TensorFlow</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Docker</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Redis</span>
                  </div>
                  <div className="text-yellow-400 text-sm font-medium">Status: In Development</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">💰</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">DeFi Yield Farming Platform</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Decentralized finance platform enabling users to earn yield through automated liquidity 
                      provision and yield farming strategies across multiple blockchain networks.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Multi-chain yield farming with automated strategies</div>
                      <div>• Real-time APY tracking and performance analytics</div>
                      <div>• Smart contract security audits and insurance</div>
                      <div>• Cross-chain bridge functionality</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Solidity</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Web3.js</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Redis</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🏢</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Enterprise Resource Planning System</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Comprehensive ERP solution integrating finance, HR, inventory, and customer relationship 
                      management with advanced analytics and reporting capabilities.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Unified dashboard for all business operations</div>
                      <div>• Advanced financial reporting and forecasting</div>
                      <div>• HR management with payroll integration</div>
                      <div>• Inventory tracking with automated reorder points</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Java</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Spring Boot</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Redis</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">💳</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Payment Gateway & Processing Platform</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Secure payment processing platform supporting multiple payment methods, currencies, 
                      and compliance standards with advanced fraud detection and analytics.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Multi-currency payment processing</div>
                      <div>• Advanced fraud detection using ML</div>
                      <div>• PCI DSS compliance with encryption</div>
                      <div>• Comprehensive transaction analytics</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Node.js</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Stripe API</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Redis</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🏥</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Telemedicine Platform</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Comprehensive telemedicine solution enabling virtual consultations, electronic health 
                      records management, and integrated healthcare workflows.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• High-quality video consultations</div>
                      <div>• Electronic health records with HIPAA compliance</div>
                      <div>• Prescription management and e-prescribing</div>
                      <div>• Secure messaging and file sharing</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Node.js</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">WebRTC</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">HIPAA</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🎮</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Interactive Game Platform</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Multiplayer gaming platform with real-time gameplay, leaderboards, and social features. 
                      Includes puzzle games, strategy games, and collaborative challenges.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Real-time multiplayer gameplay</div>
                      <div>• Global leaderboards and achievements</div>
                      <div>• Social features and friend system</div>
                      <div>• Cross-platform compatibility</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Socket.io</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">MongoDB</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">WebGL</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Redis</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">📚</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">E-Learning Management System</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Comprehensive learning platform with course creation, student progress tracking, 
                      interactive assessments, and virtual classroom capabilities.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Course creation and management tools</div>
                      <div>• Interactive quizzes and assessments</div>
                      <div>• Student progress analytics</div>
                      <div>• Virtual classroom with whiteboard</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Vue.js</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Laravel</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">MySQL</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">WebRTC</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Canvas API</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🎨</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Creative Portfolio Builder</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Drag-and-drop website builder for creatives, with customizable templates, 
                      image galleries, and integrated e-commerce for selling artwork.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Drag-and-drop website builder</div>
                      <div>• Customizable templates and themes</div>
                      <div>• Image gallery and portfolio showcase</div>
                      <div>• Integrated e-commerce functionality</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Django</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Stripe</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">AWS S3</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🏠</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Real Estate Marketplace</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Comprehensive real estate platform with property listings, virtual tours, 
                      mortgage calculator, and agent management system.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Property search and filtering</div>
                      <div>• Virtual tours and 360° views</div>
                      <div>• Mortgage calculator and financing tools</div>
                      <div>• Agent profiles and reviews</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Next.js</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Node.js</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">MongoDB</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Three.js</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Mapbox</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🍽️</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Restaurant Management App</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Complete restaurant management solution with order management, inventory tracking, 
                      staff scheduling, and customer loyalty program.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Order management and POS system</div>
                      <div>• Inventory tracking and alerts</div>
                      <div>• Staff scheduling and time tracking</div>
                      <div>• Customer loyalty and rewards</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React Native</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Firebase</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Cloud Firestore</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Stripe</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Push Notifications</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
                  <div className="mb-4">
                    <div className="text-3xl mb-2">🤖</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">ACF - AI Assistant</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      Advanced AI assistant with natural language processing, code generation, data analysis, 
                      and creative writing capabilities.
                    </p>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div>• Natural language processing and understanding</div>
                      <div>• Code generation for multiple programming languages</div>
                      <div>• Data analysis and visualization</div>
                      <div>• Creative writing and content generation</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">OpenAI API</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">NLP</span>
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Machine Learning</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Real-time Chat</span>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Status: Live</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-4xl font-bold mb-8 text-green-400">Contact</h2>
              
              <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400">Email</p>
                        <p className="text-white">caelfindley@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Phone</p>
                        <p className="text-white">+1 (361) 920-6493</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Location</p>
                        <p className="text-white">Texas, United States</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
                    <div className="space-y-4">
                      <a
                        href="https://github.com/cael1127"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-green-400 hover:text-green-300 transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://linkedin.com/in/caelfindley"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-green-400 hover:text-green-300 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'freelancing':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-4xl font-bold mb-8 text-green-400">Freelancing Services</h2>
              
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800 mb-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Ready to Build Your Next Project?</h3>
                  <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                    I specialize in creating scalable, modern web applications and cloud infrastructure solutions. 
                    Let's turn your ideas into reality with cutting-edge technology and best practices.
                  </p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="mailto:caelfindley@gmail.com"
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Get Started
                    </a>
                    <a
                      href="tel:+13619206493"
                      className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Full-Stack Development</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• React, Node.js, Python applications</li>
                    <li>• RESTful APIs and GraphQL</li>
                    <li>• Database design and optimization</li>
                    <li>• Third-party integrations</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">Starting at $75/hour</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">☁️</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Cloud Infrastructure</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• AWS, Azure, Google Cloud setup</li>
                    <li>• Docker and Kubernetes deployment</li>
                    <li>• CI/CD pipeline automation</li>
                    <li>• Serverless architecture</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">Starting at $85/hour</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Security & Compliance</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• HIPAA compliance implementation</li>
                    <li>• Security audits and penetration testing</li>
                    <li>• Zero-trust security architecture</li>
                    <li>• Data encryption and protection</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">Starting at $95/hour</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-white mb-3">AI & Machine Learning</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Predictive analytics models</li>
                    <li>• Natural language processing</li>
                    <li>• Computer vision applications</li>
                    <li>• Automated decision systems</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">Starting at $100/hour</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Mobile Development</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• React Native applications</li>
                    <li>• Progressive Web Apps (PWA)</li>
                    <li>• Cross-platform solutions</li>
                    <li>• App store optimization</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">Starting at $80/hour</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Consulting & Strategy</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Technical architecture planning</li>
                    <li>• Technology stack recommendations</li>
                    <li>• Performance optimization</li>
                    <li>• Team training and mentoring</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-green-400 font-semibold">Starting at $120/hour</p>
                  </div>
                </div>
              </div>

              {/* Process Section */}
              <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">My Process</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Discovery</h4>
                    <p className="text-gray-400 text-sm">Understanding your requirements, goals, and technical constraints</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Planning</h4>
                    <p className="text-gray-400 text-sm">Creating detailed technical specifications and project timeline</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Development</h4>
                    <p className="text-gray-400 text-sm">Building your solution with regular updates and feedback</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Deployment</h4>
                    <p className="text-gray-400 text-sm">Launching and maintaining your application with ongoing support</p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 rounded-xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
                  <p className="text-gray-100 mb-6">Let's discuss your requirements and create something amazing together.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="mailto:caelfindley@gmail.com?subject=Freelance Project Inquiry"
                      className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Send Email
                    </a>
                    <a
                      href="tel:+13619206493"
                      className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'blockchain':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <BlockchainDemo />
            </div>
          </div>
        );
      case 'aquaculture':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <AquacultureDemo />
            </div>
          </div>
        );
      case 'logistics':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <LogisticsDemo />
            </div>
          </div>
        );
      case 'healthcare':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <HealthcareDemo />
            </div>
          </div>
        );
      case 'smartcity':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <SmartCityDemo />
            </div>
          </div>
        );
      case 'financial':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <FinancialDemo />
            </div>
          </div>
        );
      case 'gameplatform':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <GamePlatformDemo />
            </div>
          </div>
        );
      case 'portfoliobuilder':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <PortfolioBuilderDemo />
            </div>
          </div>
        );
      case 'restaurantapp':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <RestaurantAppDemo />
            </div>
          </div>
        );
      case 'aiassistant':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
              <AIAssistantDemo />
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