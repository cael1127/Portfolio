import React from 'react';

const Freelancing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <p className="text-green-400 font-semibold">According to each project</p>
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
              <p className="text-green-400 font-semibold">According to each project</p>
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
              <p className="text-green-400 font-semibold">According to each project</p>
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
              <p className="text-green-400 font-semibold">According to each project</p>
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
};

export default Freelancing; 