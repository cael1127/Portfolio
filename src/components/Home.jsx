import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';
import FloatingParticles from './FloatingParticles';
import AnimatedCard from './AnimatedCard';
import AnimatedText from './AnimatedText';
import AnimatedCounter from './AnimatedCounter';
import AnimatedHeroBackground from './AnimatedHeroBackground';
import InteractiveGradientText from './InteractiveGradientText';
import SpotlightCard from './reactbits/SpotlightCard';
import GlassCard from './reactbits/GlassCard';
import BounceCard from './reactbits/BounceCard';
import GlareHover from './reactbits/GlareHover';
import ScrollReveal from './reactbits/ScrollReveal';
import { getIcon } from '../utils/iconMapping';
const InspirationSection = React.lazy(() => import('./InspirationSection'));
const TestimonialsSection = React.lazy(() => import('./TestimonialsSection'));
const StackStrip = React.lazy(() => import('./StackStrip'));

const Home = ({ setCurrentPage }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AnimatedHeroBackground />
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 snap-section">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <InteractiveGradientText
              text="Cael Findley"
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none pb-2 inline-block"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <AnimatedText
              text="Full-Stack Software Engineer, AI/ML Specialist & IT Systems Administrator"
              className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-medium"
              stagger={0.02}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              With over 5 years of experience, I specialize in full-stack development, AI/ML integration, 
              IT infrastructure management, and cybersecurity solutions. From concept to deployment, 
              I build scalable applications and systems that drive business growth and make a difference.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.button
              onClick={() => setCurrentPage('demo-organizer')}
              className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold py-4 px-10 rounded-xl text-lg overflow-hidden shadow-lg shadow-teal-500/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(20, 184, 166, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
            
            <motion.button
              onClick={() => setShowContactModal(true)}
              className="group relative bg-gray-800/50 backdrop-blur-sm border-2 border-teal-500/50 text-teal-400 hover:text-white font-bold py-4 px-10 rounded-xl text-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(20, 184, 166, 1)",
                boxShadow: "0 25px 50px rgba(20, 184, 166, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 backdrop-blur-sm"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-800 py-16 relative z-10 snap-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-4">Technical Expertise</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Years of experience building scalable applications with modern technologies
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.div 
              className="text-center bg-gray-700 p-6 rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedCounter 
                value={5} 
                className="text-3xl font-bold text-teal-400 block"
                suffix="+"
              />
              <p className="text-gray-400 text-sm mt-2">Years Experience</p>
            </motion.div>
            <motion.div 
              className="text-center bg-gray-700 p-6 rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedCounter 
                value={50} 
                className="text-3xl font-bold text-green-400 block"
                suffix="+"
              />
              <p className="text-gray-400 text-sm mt-2">Projects Completed</p>
            </motion.div>
            <motion.div 
              className="text-center bg-gray-700 p-6 rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedCounter 
                value={15} 
                className="text-3xl font-bold text-emerald-400 block"
                suffix="+"
              />
              <p className="text-gray-400 text-sm mt-2">Technologies</p>
            </motion.div>
            <motion.div 
              className="text-center bg-gray-700 p-6 rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedCounter 
                value={100} 
                className="text-3xl font-bold text-blue-400 block"
                suffix="%"
              />
              <p className="text-gray-400 text-sm mt-2">Client Satisfaction</p>
            </motion.div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.div 
                className="bg-teal-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">🌐</span>
              </motion.div>
              <h3 className="font-semibold mb-2 group-hover:text-teal-400 transition-colors">Frontend</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">React, TypeScript, JavaScript</p>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.div 
                className="bg-green-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">⚙️</span>
              </motion.div>
              <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors">Backend</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Node.js, Python, Java</p>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.div 
                className="bg-emerald-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">☁️</span>
              </motion.div>
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">DevOps</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">AWS, Docker, CI/CD</p>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <motion.div 
                className="bg-teal-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">🤖</span>
              </motion.div>
              <h3 className="font-semibold mb-2 group-hover:text-teal-400 transition-colors">AI/ML</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">TensorFlow, NLP, Predictive Analytics</p>
            </motion.div>

            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <motion.div 
                className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">🖥️</span>
              </motion.div>
              <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">IT & Systems</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Windows/Linux, Network Design</p>
            </motion.div>

            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <motion.div 
                className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">🔒</span>
              </motion.div>
              <h3 className="font-semibold mb-2 group-hover:text-red-400 transition-colors">Cybersecurity</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Secure Design, Access Control</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Accomplishments Section */}
      <div className="bg-gray-800 py-16 relative z-10 snap-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-4">Key Accomplishments</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Proven track record of delivering impactful solutions across full-stack development, AI/ML integration, and IT infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                iconKey: 'cicd-pipeline',
                title: 'Faster Deployment Times',
                description: 'Introduced Docker and AWS for cloud application deployment and CI/CD pipelines',
                color: 'from-teal-600 to-emerald-600'
              },
              {
                iconKey: 'security-monitoring',
                title: 'Improved System Reliability',
                description: 'Completed Windows and Linux server administration with accuracy and efficiency',
                color: 'from-green-600 to-teal-600'
              },
              {
                iconKey: 'frontend',
                title: 'Enhanced Web Performance',
                description: 'Introduced responsive UI/UX design and front-end optimization techniques',
                color: 'from-emerald-600 to-green-600'
              },
              {
                iconKey: 'backend',
                title: 'Streamlined Database Operations',
                description: 'Completed SQL database design and management with efficiency and accuracy',
                color: 'from-teal-500 to-emerald-500'
              },
              {
                iconKey: 'ai-assistant',
                title: 'AI/ML Model Integration',
                description: 'Collaborated with teams to integrate AI/ML models into production applications for predictive analytics',
                color: 'from-blue-600 to-cyan-600'
              },
              {
                iconKey: 'encryption-system',
                title: 'Stronger Cybersecurity',
                description: 'Introduced secure system design and access control protocols for enterprise-level networks',
                color: 'from-red-600 to-orange-600'
              },
              {
                iconKey: 'cicd-pipeline',
                title: 'Rapid Feature Deployment',
                description: 'Completed API integrations and backend logic with high accuracy and maintainability',
                color: 'from-purple-600 to-pink-600'
              },
              {
                iconKey: 'cicd-pipeline',
                title: 'Workflow Automation',
                description: 'Developed workflow automation tools and internal IT systems to improve operational efficiency',
                color: 'from-indigo-600 to-blue-600'
              }
            ].map((accomplishment, index) => {
              const IconComponent = getIcon(accomplishment.iconKey, 'demo');
              return (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${accomplishment.color} p-6 rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="mb-4 text-white"><IconComponent size={40} /></div>
                  <h3 className="text-lg font-semibold text-white mb-2">{accomplishment.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{accomplishment.description}</p>
                </motion.div>
              );
            })}
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
                caelfindley@gmail.com
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
            <BounceCard delay={0.1}>
              <GlareHover intensity={0.5}>
                <SpotlightCard
                  className="bg-gray-700/50 p-6 rounded-lg cursor-pointer text-left"
                  spotlightColor="rgba(20, 184, 166, 0.3)"
                  onClick={() => setCurrentPage('advanced-analytics')}
                >
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">📊</div>
                  <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-400 text-sm">Real-time data visualization and insights</p>
                </SpotlightCard>
              </GlareHover>
            </BounceCard>
            <BounceCard delay={0.15}>
              <GlareHover intensity={0.5}>
                <SpotlightCard
                  className="bg-gray-700/50 p-6 rounded-lg cursor-pointer text-left"
                  spotlightColor="rgba(20, 184, 166, 0.3)"
                  onClick={() => setCurrentPage('ai-interview-simulator')}
                >
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">🤖</div>
                  <h3 className="font-semibold mb-2">AI Interview Simulator</h3>
                  <p className="text-gray-400 text-sm">Advanced speech recognition and AI coaching</p>
                </SpotlightCard>
              </GlareHover>
            </BounceCard>
            <BounceCard delay={0.2}>
              <GlareHover intensity={0.5}>
                <SpotlightCard
                  className="bg-gray-700/50 p-6 rounded-lg cursor-pointer text-left"
                  spotlightColor="rgba(20, 184, 166, 0.3)"
                  onClick={() => setCurrentPage('real-time-collaboration')}
                >
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">👥</div>
                  <h3 className="font-semibold mb-2">Collaborative Features</h3>
                  <p className="text-gray-400 text-sm">Real-time collaboration tools</p>
                </SpotlightCard>
              </GlareHover>
            </BounceCard>
            <BounceCard delay={0.25}>
              <GlareHover intensity={0.5}>
                <SpotlightCard
                  className="bg-gray-700/50 p-6 rounded-lg cursor-pointer text-left"
                  spotlightColor="rgba(20, 184, 166, 0.3)"
                  onClick={() => setCurrentPage('edge-computing')}
                >
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">📡</div>
                  <h3 className="font-semibold mb-2">Edge Computing</h3>
                  <p className="text-gray-400 text-sm">IoT and distributed systems</p>
                </SpotlightCard>
              </GlareHover>
            </BounceCard>
          </div>
        </div>
      </div>

      {/* Cutting-Edge Technologies Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cutting-Edge Technologies</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <BounceCard delay={0.1}>
            <GlareHover intensity={0.6}>
              <SpotlightCard
                className="bg-gradient-to-br from-teal-600 to-emerald-600 p-6 rounded-lg cursor-pointer text-left"
                spotlightColor="rgba(255, 255, 255, 0.3)"
                onClick={() => setCurrentPage('quantum-computing')}
              >
                <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">⚛️</div>
                <h3 className="font-semibold mb-2">Quantum Computing</h3>
                <p className="text-gray-200 text-sm">Quantum algorithms and simulations</p>
              </SpotlightCard>
            </GlareHover>
          </BounceCard>
          <BounceCard delay={0.15}>
            <GlareHover intensity={0.6}>
              <SpotlightCard
                className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-lg cursor-pointer text-left"
                spotlightColor="rgba(255, 255, 255, 0.3)"
                onClick={() => setCurrentPage('blockchain-advanced')}
              >
                <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">⛓️</div>
                <h3 className="font-semibold mb-2">Advanced Blockchain</h3>
                <p className="text-gray-200 text-sm">Smart contracts and DeFi protocols</p>
              </SpotlightCard>
            </GlareHover>
          </BounceCard>
          <BounceCard delay={0.2}>
            <GlareHover intensity={0.6}>
              <SpotlightCard
                className="bg-gradient-to-br from-emerald-600 to-teal-600 p-6 rounded-lg cursor-pointer text-left"
                spotlightColor="rgba(255, 255, 255, 0.3)"
                onClick={() => setCurrentPage('edge-computing')}
              >
                <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">📡</div>
                <h3 className="font-semibold mb-2">Edge Computing</h3>
                <p className="text-gray-200 text-sm">IoT and distributed systems</p>
              </SpotlightCard>
            </GlareHover>
          </BounceCard>
        </div>
      </div>

      <React.Suspense fallback={null}>
        <InspirationSection />
        <TestimonialsSection />
        <StackStrip />
      </React.Suspense>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

export default Home; 