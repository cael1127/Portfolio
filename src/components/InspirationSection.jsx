import React from 'react';

const InspirationSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 border-t border-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Inspiration</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://www.jameswilliams.design/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-800/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div className="text-3xl">🧭</div>
            <div className="text-gray-500 group-hover:text-gray-400">↗</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">James Williams</h3>
          <p className="text-gray-400 text-sm">Clean typography, flowing latest work</p>
        </a>
        <a href="https://webflow.com/blog/web-developer-portfolio-examples" target="_blank" rel="noopener noreferrer" className="group block bg-gray-800/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div className="text-3xl">🧩</div>
            <div className="text-gray-500 group-hover:text-gray-400">↗</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">Clarity & structure</h3>
          <p className="text-gray-400 text-sm">Simple navigation and concise content</p>
        </a>
        <a href="https://careerfoundry.com/en/blog/web-development/web-developer-portfolio/" target="_blank" rel="noopener noreferrer" className="group block bg-gray-800/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div className="text-3xl">✨</div>
            <div className="text-gray-500 group-hover:text-gray-400">↗</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">Micro‑interactions</h3>
          <p className="text-gray-400 text-sm">Tasteful motion and engagement</p>
        </a>
      </div>
    </div>
  );
};

export default InspirationSection;


