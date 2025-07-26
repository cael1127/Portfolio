import React, { useState } from 'react';
import ContactModal from './ContactModal';

const Home = ({ setCurrentPage }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Cael Findley
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Full-Stack Software Engineer & Cloud Architect
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Specializing in modern web technologies, cloud infrastructure, and innovative solutions 
            that drive business growth. From concept to deployment, I build scalable applications 
            that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('demo-organizer')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              View My Work
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-gray-400 text-sm">React, TypeScript, Next.js</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-gray-400 text-sm">Node.js, Python, GraphQL</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="font-semibold mb-2">Cloud</h3>
              <p className="text-gray-400 text-sm">AWS, Docker, Kubernetes</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">AI/ML</h3>
              <p className="text-gray-400 text-sm">TensorFlow, OpenAI, NLP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-400 mb-8">
            Ready to bring your ideas to life? I'm available for freelance projects, 
            full-time opportunities, and technical consulting.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                findleytechs@gmail.com
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <button 
                onClick={() => window.open('tel:+13619206493', '_blank')}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                +1 (361) 920-6493
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-400">Texas, United States</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Start a Conversation
          </button>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Enhanced Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <button
              onClick={() => setCurrentPage('analytics-dashboard')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-colors text-left"
            >
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 text-sm">Real-time data visualization and insights</p>
            </button>
            <button
              onClick={() => setCurrentPage('resume-builder')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-colors text-left"
            >
              <div className="text-2xl mb-3">📄</div>
              <h3 className="font-semibold mb-2">Resume Builder</h3>
              <p className="text-gray-400 text-sm">Professional resume creation tool</p>
            </button>
            <button
              onClick={() => setCurrentPage('collaborative-features')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-colors text-left"
            >
              <div className="text-2xl mb-3">👥</div>
              <h3 className="font-semibold mb-2">Collaborative Features</h3>
              <p className="text-gray-400 text-sm">Real-time collaboration tools</p>
            </button>
            <button
              onClick={() => setCurrentPage('performance-monitor')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-colors text-left"
            >
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Performance Monitor</h3>
              <p className="text-gray-400 text-sm">System performance tracking</p>
            </button>
          </div>
        </div>
      </div>

      {/* Cutting-Edge Technologies Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cutting-Edge Technologies</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('quantum-computing')}
            className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-6 rounded-lg transition-colors text-left"
          >
            <div className="text-2xl mb-3">⚛️</div>
            <h3 className="font-semibold mb-2">Quantum Computing</h3>
            <p className="text-gray-200 text-sm">Quantum algorithms and simulations</p>
          </button>
          <button
            onClick={() => setCurrentPage('blockchain-advanced')}
            className="bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 p-6 rounded-lg transition-colors text-left"
          >
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-semibold mb-2">Advanced Blockchain</h3>
            <p className="text-gray-200 text-sm">Smart contracts and DeFi protocols</p>
          </button>
          <button
            onClick={() => setCurrentPage('edge-computing')}
            className="bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 p-6 rounded-lg transition-colors text-left"
          >
            <div className="text-2xl mb-3">🌐</div>
            <h3 className="font-semibold mb-2">Edge Computing</h3>
            <p className="text-gray-200 text-sm">IoT and distributed systems</p>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

export default Home; 