import React from 'react';

const ProjectLayout = ({ title, subtitle, emoji, onBack, children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to work</span>
            </button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">
                <span className="mr-2">{emoji}</span>
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-400 text-sm">{subtitle}</p>
              )}
            </div>
            <div className="w-24" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
};

export default ProjectLayout;


