import React from 'react';

const Home = ({ setCurrentPage, showAIChat, setShowAIChat, aiMessages, aiInputMessage, setAiInputMessage, isAiTyping, handleAISendMessage }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        {/* Featured Demos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Demos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg cursor-pointer hover:from-green-700 hover:via-teal-600 hover:to-cyan-600 transition-colors border border-green-700 hover:border-green-600"
              onClick={() => setCurrentPage('demo-organizer')}
            >
              <h3 className="text-xl font-semibold mb-2">🎯 All Demos</h3>
              <p className="text-gray-300">Explore our complete collection of interactive demos organized by category.</p>
            </div>
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
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">🚀 Enhanced Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              className="bg-gradient-to-br from-purple-800 via-purple-700 to-purple-600 p-6 rounded-lg cursor-pointer hover:from-purple-700 hover:via-purple-600 hover:to-purple-500 transition-colors border border-purple-700 hover:border-purple-600"
              onClick={() => setCurrentPage('analytics-dashboard')}
            >
              <h3 className="text-xl font-semibold mb-2">📊 Analytics Dashboard</h3>
              <p className="text-gray-300">Real-time insights and performance metrics for portfolio analytics.</p>
            </div>
            <div 
              className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 p-6 rounded-lg cursor-pointer hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 transition-colors border border-blue-700 hover:border-blue-600"
              onClick={() => setCurrentPage('resume-builder')}
            >
              <h3 className="text-xl font-semibold mb-2">📄 Resume Builder</h3>
              <p className="text-gray-300">Interactive resume builder with real-time preview and multiple templates.</p>
            </div>
            <div 
              className="bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-600 p-6 rounded-lg cursor-pointer hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-500 transition-colors border border-yellow-700 hover:border-yellow-600"
              onClick={() => setCurrentPage('collaborative-features')}
            >
              <h3 className="text-xl font-semibold mb-2">🤝 Collaborative Features</h3>
              <p className="text-gray-300">Real-time collaboration tools and team management features.</p>
            </div>
            <div 
              className="bg-gradient-to-br from-red-800 via-red-700 to-red-600 p-6 rounded-lg cursor-pointer hover:from-red-700 hover:via-red-600 hover:to-red-500 transition-colors border border-red-700 hover:border-red-600"
              onClick={() => setCurrentPage('performance-monitor')}
            >
              <h3 className="text-xl font-semibold mb-2">⚡ Performance Monitor</h3>
              <p className="text-gray-300">Real-time performance tracking and optimization insights.</p>
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
        <div className={'fixed bottom-4 right-4 z-50 transition-all duration-300 ' + (showAIChat ? 'w-full max-w-xs sm:max-w-sm md:w-96 h-[60vh] min-h-[350px]' : 'w-16 h-16')}>
          {/* AI Chat Toggle Button */}
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-all duration-300"
          >
            {showAIChat ? '✕' : '🤖'}
          </button>

          {/* AI Chat Interface */}
          {showAIChat && (
            <div className="absolute bottom-20 right-0 w-80 h-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col">
              {/* Chat Header */}
              <div className="bg-gray-700 px-4 py-3 rounded-t-lg flex justify-between items-center">
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <button
                  onClick={() => setShowAIChat(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {aiMessages.map((message, index) => (
                  <div
                    key={index}
                    className={'flex ' + (message.type === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={'max-w-xs px-3 py-2 rounded-lg ' + (
                        message.type === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-white'
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
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
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                  <button
                    onClick={handleAISendMessage}
                    disabled={!aiInputMessage.trim() || isAiTyping}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Home; 