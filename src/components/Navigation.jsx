import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <motion.nav 
      className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-50"
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
              className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
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
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' 
                  : 'text-[var(--text)] hover:text-[var(--accent)]'
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
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' 
                  : 'text-[var(--text)] hover:text-[var(--accent)]'
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
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' 
                  : 'text-[var(--text)] hover:text-[var(--accent)]'
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
              onClick={() => setCurrentPage('freelancing')}
              className={'transition-colors ' + (
                currentPage === 'freelancing' 
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' 
                  : 'text-[var(--text)] hover:text-[var(--accent)]'
              )}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              Freelancing
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('freelancing')}
              className={'transition-colors ' + (
                currentPage === 'freelancing' 
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' 
                  : 'text-[var(--text)] hover:text-[var(--accent)]'
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
              className="text-[var(--text)] hover:text-[var(--accent)] focus:outline-none"
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
              className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] px-2 pt-2 pb-3 space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.button
                onClick={() => { setCurrentPage('home'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'home' ? 'text-[var(--accent)] bg-[var(--bg)]' : 'text-[var(--text)] hover:text-[var(--accent)]')}
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
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'experience' ? 'text-[var(--accent)] bg-[var(--bg)]' : 'text-[var(--text)] hover:text-[var(--accent)]')}
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
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'projects' ? 'text-[var(--accent)] bg-[var(--bg)]' : 'text-[var(--text)] hover:text-[var(--accent)]')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Projects
              </motion.button>
              <motion.button
              <motion.button
                onClick={() => { setCurrentPage('freelancing'); setMobileNavOpen(false); }}
                className={'block w-full text-left px-3 py-2 rounded-md text-base font-medium ' + (currentPage === 'freelancing' ? 'text-[var(--accent)] bg-[var(--bg)]' : 'text-[var(--text)] hover:text-[var(--accent)]')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
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