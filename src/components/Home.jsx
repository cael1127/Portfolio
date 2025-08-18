import React, { useState } from 'react';
import ContactModal from './ContactModal';
import FloatingParticles from './FloatingParticles';
import AnimatedCard from './AnimatedCard';

const Home = ({ setCurrentPage }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      <FloatingParticles />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10 snap-section">
        <div className="text-center max-w-4xl mx-auto">
          <AnimatedCard delay={0} direction="down" className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Cael Findley
            </h1>
          </AnimatedCard>
          <AnimatedCard delay={150} direction="down" className="mb-8">
            <p className="text-2xl md:text-3xl text-gray-300">
              Full-Stack Software Engineer & Cloud Architect
            </p>
          </AnimatedCard>
          <AnimatedCard delay={300} direction="down" className="mb-12">
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Specializing in modern web technologies, cloud infrastructure, and innovative solutions 
              that drive business growth. From concept to deployment, I build scalable applications 
              that make a difference.
            </p>
          </AnimatedCard>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('demo-organizer')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 text-lg animate-pulse-slow group relative overflow-hidden"
            >
              <span className="relative z-10">🚀 View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-transparent border-2 border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10">💬 Get In Touch</span>
              <div className="absolute inset-0 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-800 py-16 relative z-10 snap-section">
        <div className="container mx-auto px-4">
          <AnimatedCard delay={0} direction="down" className="mb-12">
            <h2 className="text-3xl font-bold text-center">Technical Expertise</h2>
          </AnimatedCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatedCard delay={200} direction="left" className="text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 group cursor-pointer">
              <div className="bg-teal-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 group-hover:bg-teal-500">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🌐</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-teal-400 transition-colors">Frontend</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">React, TypeScript, Next.js</p>
            </AnimatedCard>
            <AnimatedCard delay={300} direction="up" className="text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 group cursor-pointer">
              <div className="bg-green-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 group-hover:bg-green-500">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">⚙️</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors">Backend</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Node.js, Python, GraphQL</p>
            </AnimatedCard>
            <AnimatedCard delay={400} direction="up" className="text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 group cursor-pointer">
              <div className="bg-emerald-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-500">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">☁️</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">Cloud</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">AWS, Docker, Kubernetes</p>
            </AnimatedCard>
            <AnimatedCard delay={500} direction="right" className="text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 group cursor-pointer">
              <div className="bg-teal-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 group-hover:bg-teal-400">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🤖</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-teal-400 transition-colors">AI/ML</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">TensorFlow, OpenAI, NLP</p>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16 relative z-10 snap-section">
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
                className="text-teal-400 hover:text-teal-300 transition-colors"
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
              <div className="text-3xl mb-4">📷</div>
              <h3 className="font-semibold mb-2">Instagram</h3>
              <a 
                href="https://instagram.com/findleytech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                @findleytech
              </a>
            </div>
          </div>
          
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
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
              onClick={() => setCurrentPage('advanced-analytics')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20 text-left"
            >
              <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 text-sm">Real-time data visualization and insights</p>
            </button>
            <button
              onClick={() => setCurrentPage('ai-interview-simulator')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20 text-left"
            >
              <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="font-semibold mb-2">AI Interview Simulator</h3>
              <p className="text-gray-400 text-sm">Advanced speech recognition and AI coaching</p>
            </button>
            <button
              onClick={() => setCurrentPage('real-time-collaboration')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20 text-left"
            >
              <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="font-semibold mb-2">Collaborative Features</h3>
              <p className="text-gray-400 text-sm">Real-time collaboration tools</p>
            </button>
            <button
              onClick={() => setCurrentPage('edge-computing')}
              className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20 text-left"
            >
              <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">📡</div>
              <h3 className="font-semibold mb-2">Edge Computing</h3>
              <p className="text-gray-400 text-sm">IoT and distributed systems</p>
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
            className="bg-gradient-to-br from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 text-left"
          >
            <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">⚛️</div>
            <h3 className="font-semibold mb-2">Quantum Computing</h3>
            <p className="text-gray-200 text-sm">Quantum algorithms and simulations</p>
          </button>
          <button
            onClick={() => setCurrentPage('blockchain-advanced')}
            className="bg-gradient-to-br from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 text-left"
          >
            <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">⛓️</div>
            <h3 className="font-semibold mb-2">Advanced Blockchain</h3>
            <p className="text-gray-200 text-sm">Smart contracts and DeFi protocols</p>
          </button>
          <button
            onClick={() => setCurrentPage('edge-computing')}
            className="bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 text-left"
          >
            <div className="text-2xl mb-3 hover:scale-110 transition-transform duration-300">📡</div>
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