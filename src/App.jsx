import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DemoOrganizer from './components/DemoOrganizer';
import BlockchainDemoPage from './pages/BlockchainDemoPage';
import AquacultureDemoPage from './pages/AquacultureDemoPage';
import LogisticsDemoPage from './pages/LogisticsDemoPage';
import HealthcareDemoPage from './pages/HealthcareDemoPage';
import SmartCityDemoPage from './pages/SmartCityDemoPage';
import FinancialDemoPage from './pages/FinancialDemoPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Home 
              setCurrentPage={setCurrentPage}
              showAIChat={false}
              setShowAIChat={() => {}}
              aiMessages={[]}
              aiInputMessage=""
              setAiInputMessage={() => {}}
              isAiTyping={false}
              handleAISendMessage={() => {}}
            />
          </div>
        );
      case 'demo-organizer':
        return (
          <div className="min-h-screen bg-gray-900 text-white">
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
              <DemoOrganizer setCurrentPage={setCurrentPage} />
            </div>
          </div>
        );
      case 'blockchain':
        return <BlockchainDemoPage setCurrentPage={setCurrentPage} />;
      case 'aquaculture':
        return <AquacultureDemoPage setCurrentPage={setCurrentPage} />;
      case 'logistics':
        return <LogisticsDemoPage setCurrentPage={setCurrentPage} />;
      case 'healthcare':
        return <HealthcareDemoPage setCurrentPage={setCurrentPage} />;
      case 'smartcity':
        return <SmartCityDemoPage setCurrentPage={setCurrentPage} />;
      case 'financial':
        return <FinancialDemoPage setCurrentPage={setCurrentPage} />;
      case 'blockchain-demo':
        return (
          <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setCurrentPage('demo-organizer')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-4"
              >
                Back to Demos
              </button>
              <h1 className="text-3xl font-bold text-white mb-6">Blockchain Demo</h1>
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-300">This is a test blockchain demo page.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-400 mb-4">Page Not Found</h1>
              <p className="text-gray-300 mb-4">The page "{currentPage}" could not be found.</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;