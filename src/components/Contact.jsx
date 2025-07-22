import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
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
};

export default Contact; 