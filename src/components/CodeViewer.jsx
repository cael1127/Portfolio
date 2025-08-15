import React, { useState } from 'react';

const CodeViewer = ({ code, language = 'javascript', title = 'Demo Code', isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

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
      default:
        return 'CD';
    }
  };

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
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

        {/* Code Display */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code>{code || 'No code available'}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Lines: {code ? code.split('\n').length : 0}</span>
            <span>Characters: {code ? code.length : 0}</span>
            <span>Language: {language.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer; 