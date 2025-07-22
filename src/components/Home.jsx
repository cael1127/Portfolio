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
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${showAIChat ? 'w-full max-w-xs sm:max-w-sm md:w-96 h-[60vh] min-h-[350px]' : 'w-16 h-16'}`}>
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
              <div className="flex flex-col sm:flex-row gap-2">
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
};

export default Home; 