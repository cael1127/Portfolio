import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './reactbits/GlassCard';

const TableOfContents = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const headings = useMemo(() => {
    if (!content) return [];
    
    // Extract headings from HTML content
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi;
    const matches = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      matches.push({ level, text, id });
    }
    
    return matches;
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <GlassCard className="p-6" glow>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-white">Table of Contents</h3>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-2"
        >
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
                heading.level === 2 ? 'text-white font-medium' : 'text-gray-300 text-sm ml-4'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </motion.nav>
      )}
    </GlassCard>
  );
};

export default TableOfContents;
