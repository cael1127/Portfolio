import React, { useState } from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => { setCurrentPage('home'); setMobileNavOpen(false); }}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer"
            >
              <span className="text-2xl">🏠</span>
              <span className="font-semibold text-lg">Home</span>
            </button>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={'transition-colors ' + (
                currentPage === 'home' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('experience')}
              className={'transition-colors ' + (
                currentPage === 'experience' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
            >
              Experience
            </button>
            <button
              onClick={() => setCurrentPage('projects')}
              className={'transition-colors ' + (
                currentPage === 'projects' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
            >
              Projects
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={'transition-colors ' + (
                currentPage === 'contact' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
            >
              Contact
            </button>
            <button
              onClick={() => setCurrentPage('freelancing')}
              className={'transition-colors ' + (
                currentPage === 'freelancing' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
            >
              Freelancing
            </button>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="text-gray-300 hover:text-green-400 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => { setCurrentPage('home'); setMobileNavOpen(false); }}
              className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'home' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('experience'); setMobileNavOpen(false); }}
              className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'experience' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
            >
              Experience
            </button>
            <button
              onClick={() => { setCurrentPage('projects'); setMobileNavOpen(false); }}
              className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'projects' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
            >
              Projects
            </button>
            <button
              onClick={() => { setCurrentPage('contact'); setMobileNavOpen(false); }}
              className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'contact' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
            >
              Contact
            </button>
            <button
              onClick={() => { setCurrentPage('freelancing'); setMobileNavOpen(false); }}
              className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'freelancing' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
            >
              Freelancing
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 