import React, { useState, useEffect } from 'react';

export default function IoTDemo({ title }) {
  const [value, setValue] = useState(Math.random() * 100);
  
  useEffect(() => {
    const interval = setInterval(() => setValue(Math.random() * 100), 1500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-5xl font-bold text-teal-400 mb-2">{value.toFixed(1)}</div>
      <div className="text-white mb-2">{title} Sensor Value</div>
      <div className="w-full h-2 bg-gray-700 rounded">
        <div className="h-2 bg-teal-500 rounded" style={{ width: `${Math.min(100, value)}%` }}></div>
      </div>
    </div>
  );
} 