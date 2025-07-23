import React from 'react';
import LogisticsDemo from '../components/demos/LogisticsDemo';

const LogisticsDemoPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Back Button */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('demo-organizer')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Demos</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">🚚 Logistics Demo</h1>
            <p className="text-gray-400 text-sm">Fleet and route optimization</p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Demo Content */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <LogisticsDemo />
      </div>
    </div>
  );
};

export default LogisticsDemoPage; 