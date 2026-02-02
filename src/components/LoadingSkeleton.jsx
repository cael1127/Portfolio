import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 1, className = '' }) => {
  const shimmerAnimation = {
    background: 'linear-gradient(90deg, #374151 0%, #4B5563 50%, #374151 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  };

  const renderCardSkeleton = () => (
    <motion.div 
      className="bg-gray-800 p-6 rounded-xl border border-gray-600 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-700 rounded-lg mr-3 animate-pulse"></div>
          <div>
            <div className="h-5 bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-full mb-4 animate-pulse relative z-10"></div>
      <div className="space-y-2 relative z-10">
        <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>
      </div>
    </motion.div>
  );

  const renderTextSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  );

  const renderButtonSkeleton = () => (
    <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
  );

  const renderContent = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'text':
        return renderTextSkeleton();
      case 'button':
        return renderButtonSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`animate-fade-in ${className}`} style={{ animationDelay: `${index * 100}ms` }}>
          {renderContent()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
