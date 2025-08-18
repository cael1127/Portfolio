import React, { useState } from 'react';
import ContactModal from './ContactModal';
import FloatingParticles from './FloatingParticles';
import AnimatedCard from './AnimatedCard';

const Freelancing = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      <FloatingParticles />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedCard delay={0} direction="down" className="mb-8">
            <h1 className="text-4xl font-bold text-center">Freelance Services</h1>
          </AnimatedCard>
          
          {/* Hero Section */}
          <AnimatedCard delay={150} direction="down" className="text-center mb-12 snap-section">
            <p className="text-xl text-gray-300 mb-6">
              Available for freelance projects, consulting, and full-time opportunities
            </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30"
              >
                Start a Project
              </button>
              <a
                href="https://linkedin.com/in/caelfindley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30"
              >
                View LinkedIn
              </a>
            </div>
          </AnimatedCard>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 snap-section">
            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 group cursor-pointer border border-transparent hover:border-teal-500/30">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🌐</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-400 transition-colors">Web Development</h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                Full-stack web applications using React, Node.js, and modern technologies
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center group-hover:text-gray-200 transition-colors">
                  <span className="text-teal-400 mr-2 group-hover:scale-110 transition-transform duration-300">•</span>
                  React & Next.js Applications
                </li>
                <li className="flex items-center group-hover:text-gray-200 transition-colors">
                  <span className="text-teal-400 mr-2 group-hover:scale-110 transition-transform duration-300">•</span>
                  RESTful APIs & GraphQL
                </li>
                <li className="flex items-center group-hover:text-gray-200 transition-colors">
                  <span className="text-teal-400 mr-2 group-hover:scale-110 transition-transform duration-300">•</span>
                  Database Design & Optimization
                </li>
                <li className="flex items-center group-hover:text-gray-200 transition-colors">
                  <span className="text-teal-400 mr-2 group-hover:scale-110 transition-transform duration-300">•</span>
                  E-commerce Solutions
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all">
              <div className="text-3xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold mb-3">Cloud Architecture</h3>
              <p className="text-gray-400 mb-4">
                Scalable cloud solutions using AWS, Docker, and Kubernetes
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• AWS Infrastructure Setup</li>
                <li>• Docker & Kubernetes</li>
                <li>• CI/CD Pipeline Development</li>
                <li>• Serverless Architecture</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI/ML Integration</h3>
              <p className="text-gray-400 mb-4">
                Machine learning solutions and AI-powered applications
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Custom ML Models</li>
                <li>• OpenAI API Integration</li>
                <li>• Data Analysis & Visualization</li>
                <li>• NLP & Chatbot Development</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Cybersecurity</h3>
              <p className="text-gray-400 mb-4">
                Security audits, penetration testing, and secure development
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Security Audits & Assessments</li>
                <li>• Penetration Testing</li>
                <li>• Secure Code Review</li>
                <li>• Compliance Implementation</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Data Solutions</h3>
              <p className="text-gray-400 mb-4">
                Data engineering, analytics, and business intelligence
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Data Pipeline Development</li>
                <li>• Analytics Dashboard Creation</li>
                <li>• Database Optimization</li>
                <li>• Business Intelligence</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">MD</div>
              <h3 className="text-xl font-semibold mb-3">Mobile Development</h3>
              <p className="text-gray-400 mb-4">
                Cross-platform mobile applications and PWA development
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• React Native Applications</li>
                <li>• Progressive Web Apps</li>
                <li>• Mobile-First Design</li>
                <li>• App Store Optimization</li>
              </ul>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-800 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing & Rates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Hourly Rate</h3>
                <div className="text-3xl font-bold text-teal-400 mb-4">$75-125/hr</div>
                <p className="text-gray-400 text-sm mb-4">
                  Flexible hourly rates based on project complexity
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Quick fixes & consultations</li>
                  <li>• Ongoing maintenance</li>
                  <li>• Technical support</li>
                </ul>
              </div>

              <div className="bg-teal-600 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Project-Based</h3>
                <div className="text-3xl font-bold text-white mb-4">Custom Quote</div>
                <p className="text-teal-100 text-sm mb-4">
                  Fixed pricing for complete project delivery
                </p>
                <ul className="text-sm text-teal-200 space-y-1">
                  <li>• Full application development</li>
                  <li>• Complete feature implementation</li>
                  <li>• End-to-end solutions</li>
                </ul>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Retainer</h3>
                <div className="text-3xl font-bold text-green-400 mb-4">$2,500+/mo</div>
                <p className="text-gray-400 text-sm mb-4">
                  Dedicated development time and priority support
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Guaranteed availability</li>
                  <li>• Priority support</li>
                  <li>• Ongoing development</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">How I Work</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Discovery</h3>
                <p className="text-gray-400 text-sm">
                  Understanding your requirements and project goals
                </p>
              </div>
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Planning</h3>
                <p className="text-gray-400 text-sm">
                  Creating detailed project roadmap and timeline
                </p>
              </div>
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Development</h3>
                <p className="text-gray-400 text-sm">
                  Building your solution with regular updates
                </p>
              </div>
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Delivery</h3>
                <p className="text-gray-400 text-sm">
                  Launching your project with ongoing support
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and how I can help bring your vision to life. 
              I'm available for a free consultation to understand your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Start a Project
              </button>
              <button
                onClick={() => window.open('tel:+13619206493', '_blank')}
                className="bg-transparent border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Call Now
              </button>
            </div>
          </div>
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

export default Freelancing; 