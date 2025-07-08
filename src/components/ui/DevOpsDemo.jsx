import React, { useState, useEffect } from 'react';

export default function DevOpsDemo({ title }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => setProgress(p => Math.min(100, p + Math.random() * 10)), 700);
    return () => clearInterval(interval);
  }, [progress]);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-2xl font-bold text-teal-400 mb-2">{progress.toFixed(0)}%</div>
      <div className="text-white mb-2">{title} Deployment Progress</div>
      <div className="w-full h-4 bg-gray-700 rounded">
        <div className="h-4 bg-teal-500 rounded transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
} 