import React from 'react';
import TrendingProjects from './TrendingProjects';

const Projects = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h2 className="text-4xl font-bold mb-8 text-green-400">Projects</h2>

        {/* Live Projects Section (migrated from Home) */}
        <div className="bg-gray-800/60 p-8 rounded-xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Live Projects</h2>
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
            <div 
              className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
              onClick={() => setCurrentPage('resumeanalyzer')}
            >
              <h3 className="text-xl font-semibold mb-2">📝 AI Resume Analyzer</h3>
              <p className="text-gray-300">Upload your resume and get instant AI-powered feedback and keyword optimization tips.</p>
            </div>
            <div 
              className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
              onClick={() => setCurrentPage('whiteboard')}
            >
              <h3 className="text-xl font-semibold mb-2">🖊️ Collaborative Whiteboard</h3>
              <p className="text-gray-300">Real-time collaborative drawing and brainstorming with others online.</p>
            </div>
          </div>
        </div>

        {/* Trending Projects Section */}
        <TrendingProjects setCurrentPage={setCurrentPage} />

        {/* Portfolio Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
            <div className="mb-4">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">AI Resume Analyzer</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Upload your resume and get instant AI-powered feedback on strengths, weaknesses, and keyword optimization for job descriptions.
              </p>
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <div>• PDF/Word resume upload and parsing</div>
                <div>• Skill and experience analysis</div>
                <div>• ATS keyword optimization tips</div>
                <div>• Visualize skill coverage and job match score</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
              <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Node.js</span>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Python</span>
              <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">NLP</span>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Machine Learning</span>
            </div>
            <div className="text-yellow-400 text-sm font-medium">Status: In Development</div>
          </div>
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-colors group cursor-pointer">
            <div className="mb-4">
              <div className="text-3xl mb-2">🖊️</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">Collaborative Whiteboard</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Real-time collaborative whiteboard for drawing, diagramming, and brainstorming with others online.
              </p>
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <div>• Real-time multi-user drawing and typing</div>
                <div>• WebSocket-based sync</div>
                <div>• Save and export boards</div>
                <div>• User authentication and access control</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">React</span>
              <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Node.js</span>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Socket.IO</span>
              <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs">Canvas API</span>
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Security</span>
            </div>
            <div className="text-yellow-400 text-sm font-medium">Status: In Development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 