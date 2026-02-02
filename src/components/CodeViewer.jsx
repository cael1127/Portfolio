import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeViewer = ({ 
  code, 
  language = 'javascript', 
  title = 'Demo Code', 
  isOpen, 
  onClose,
  explanation,
  technologies = [],
  concepts = [],
  features = []
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageIcon = (lang) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
      case 'js':
        return 'JS';
      case 'jsx':
        return 'RX';
      case 'python':
        return 'PY';
      case 'html':
        return 'HT';
      case 'css':
        return 'CS';
      case 'sql':
        return 'SQ';
      case 'solidity':
        return 'SO';
      case 'typescript':
        return 'TS';
      default:
        return 'CD';
    }
  };

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  const tabs = [
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'explanation', label: 'Explanation', icon: '📖' },
    { id: 'technologies', label: 'Technologies', icon: '⚙️' },
    { id: 'concepts', label: 'Concepts', icon: '🧠' }
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header - Fixed at top */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0 bg-gray-900">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getLanguageIcon(language)}</span>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <span className="text-sm text-gray-400 px-2 py-1 bg-gray-800 rounded">
              {language.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs - Fixed below header */}
        <div className="flex border-b border-gray-700 flex-shrink-0 bg-gray-900">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-blue-400 bg-gray-800'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content - Scrollable area */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code>{code || 'No code available'}</code>
                </pre>
              </motion.div>
            )}

            {activeTab === 'explanation' && (
              <motion.div
                key="explanation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed">
                    {explanation || 'No explanation available'}
                  </div>
                </div>
                {features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2 text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-green-400 mt-1">•</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'technologies' && (
              <motion.div
                key="technologies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-4">Technologies Used</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                          {tech.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{tech.name}</h4>
                          <p className="text-sm text-gray-400">{tech.description}</p>
                          <div className="flex gap-2 mt-2">
                            {tech.tags?.map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'concepts' && (
              <motion.div
                key="concepts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-4">Key Concepts</h3>
                <div className="space-y-3">
                  {concepts.map((concept, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                    >
                      <h4 className="font-semibold text-white mb-2">{concept.name}</h4>
                      <p className="text-gray-300 text-sm">{concept.description}</p>
                      {concept.example && (
                        <div className="mt-2 p-2 bg-gray-900 rounded text-xs text-gray-400 font-mono">
                          {concept.example}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Lines: {code ? code.split('\n').length : 0}</span>
            <span>Characters: {code ? code.length : 0}</span>
            <span>Language: {language.toUpperCase()}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
};

export default CodeViewer; 