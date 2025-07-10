import React, { useState } from 'react';
import BlockchainDemo from './components/demos/BlockchainDemo';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold mb-8">Cael Findley - Software Engineer</h1>
              <p className="text-xl text-gray-300 mb-8">
                Full-Stack Software Engineer specializing in modern web technologies, 
                cloud infrastructure, and innovative solutions.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setCurrentPage('blockchain')}
                >
                  <h3 className="text-xl font-semibold mb-2">Blockchain Demo</h3>
                  <p className="text-gray-400">Interactive blockchain explorer demo</p>
                </div>
                
                <div 
                  className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setCurrentPage('ai')}
                >
                  <h3 className="text-xl font-semibold mb-2">AI Demo</h3>
                  <p className="text-gray-400">Machine learning and AI demonstrations</p>
                </div>
                
                <div 
                  className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setCurrentPage('iot')}
                >
                  <h3 className="text-xl font-semibold mb-2">IoT Demo</h3>
                  <p className="text-gray-400">Internet of Things sensor monitoring</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'blockchain':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className="mb-6 text-teal-400 hover:text-teal-300 underline"
              >
                ← Back to Home
              </button>
              <BlockchainDemo />
            </div>
          </div>
        );
      
      case 'ai':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className="mb-6 text-teal-400 hover:text-teal-300 underline"
              >
                ← Back to Home
              </button>
              <h2 className="text-3xl font-bold mb-6">AI Demo</h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300">AI demo coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      case 'iot':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className="mb-6 text-teal-400 hover:text-teal-300 underline"
              >
                ← Back to Home
              </button>
              <h2 className="text-3xl font-bold mb-6">IoT Demo</h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300">IoT demo coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;