import React, { useState, useEffect } from 'react';
import Scene3D from './3DScene';
import Home from './Home';
import DemoOrganizer from './DemoOrganizer';
import ResumeBuilder from './ResumeBuilder';
import Freelancing from './Freelancing';
import Contact from './Contact';
import ContactModal from './ContactModal';

const Interface3D = () => {
  const [currentPage, setCurrentPage] = useState('3d-scene');
  const [showContactModal, setShowContactModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 500);
  };

  const renderContent = () => {
    switch (currentPage) {
      case '3d-scene':
        return <Scene3D currentPage={currentPage} onNavigate={handleNavigation} />;
      case 'home':
        return <Home setCurrentPage={handleNavigation} />;
      case 'demo-organizer':
        return <DemoOrganizer setCurrentPage={handleNavigation} />;
      case 'resume-builder':
        return <ResumeBuilder />;
      case 'freelancing':
        return <Freelancing />;
      case 'contact':
        return <Contact />;
      default:
        return <Scene3D currentPage={currentPage} onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        currentPage === '3d-scene' ? 'opacity-100' : 'opacity-20'
      }`}>
        <Scene3D currentPage={currentPage} onNavigate={handleNavigation} />
      </div>

      {/* 2D Content Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        currentPage === '3d-scene' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {renderContent()}
      </div>

      {/* Floating Navigation for 2D Pages */}
      {currentPage !== '3d-scene' && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex space-x-2 bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
            <button
              onClick={() => handleNavigation('3d-scene')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm"
            >
              🎮 3D Mode
            </button>
            <button
              onClick={() => handleNavigation('home')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleNavigation('demo-organizer')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              🚀 Projects
            </button>
            <button
              onClick={() => handleNavigation('resume-builder')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              📄 Resume
            </button>
            <button
              onClick={() => handleNavigation('freelancing')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              💼 Services
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              📧 Contact
            </button>
          </div>
        </div>
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Loading...</div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

export default Interface3D; 