import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <motion.nav 
      className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button 
              onClick={() => { setCurrentPage('home'); setMobileNavOpen(false); }}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-2xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🏠
              </motion.span>
              <span className="font-semibold text-lg">Home</span>
            </motion.button>
          </motion.div>
          {/* Desktop Nav */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setCurrentPage('home')}
              className={'transition-colors ' + (
                currentPage === 'home' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('experience')}
              className={'transition-colors ' + (
                currentPage === 'experience' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              Experience
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('projects')}
              className={'transition-colors ' + (
                currentPage === 'projects' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              Projects
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('contact')}
              className={'transition-colors ' + (
                currentPage === 'contact' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              Contact
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('freelancing')}
              className={'transition-colors ' + (
                currentPage === 'freelancing' 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-300 hover:text-green-400'
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              Freelancing
            </motion.button>
          </div>
          {/* Mobile Hamburger */}
          <motion.div 
            className="md:hidden flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="text-gray-300 hover:text-green-400 focus:outline-none"
              aria-label="Open navigation menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="h-7 w-7" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: mobileNavOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={mobileNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} 
                />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div 
              className="md:hidden bg-gray-800 border-t border-gray-700 px-2 pt-2 pb-3 space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.button
                onClick={() => { setCurrentPage('home'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'home' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Home
              </motion.button>
              <motion.button
                onClick={() => { setCurrentPage('experience'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'experience' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Experience
              </motion.button>
              <motion.button
                onClick={() => { setCurrentPage('projects'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'projects' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Projects
              </motion.button>
              <motion.button
                onClick={() => { setCurrentPage('contact'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'contact' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.button>
              <motion.button
                onClick={() => { setCurrentPage('freelancing'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'freelancing' ? 'text-green-400 bg-gray-900' : 'text-gray-300 hover:text-green-400')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Freelancing
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation; 