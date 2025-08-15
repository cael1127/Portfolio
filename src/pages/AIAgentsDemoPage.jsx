import React from 'react';

const BlockchainDemoPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Back Button */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                console.log('Back button clicked - going to demo-organizer');
                setCurrentPage('demo-organizer');
              }}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Demos</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Blockchain Demo</h1>
            <p className="text-gray-400 text-sm">Supply chain with real-time transactions</p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Simple Test Content */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4">Blockchain Demo Test</h2>
          <p className="text-gray-300 mb-4">This is a simplified version to test Edge compatibility.</p>
          <p className="text-gray-300 mb-4">If you can see this page, the navigation is working in Edge.</p>
          <button
            onClick={() => {
              console.log('Test button clicked - going to demo-organizer');
              setCurrentPage('demo-organizer');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Demo Organizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainDemoPage; 