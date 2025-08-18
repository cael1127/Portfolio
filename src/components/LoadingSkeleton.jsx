import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1, className = '' }) => {
  const renderCardSkeleton = () => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-600 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-700 rounded-lg mr-3"></div>
          <div>
            <div className="h-5 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
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
