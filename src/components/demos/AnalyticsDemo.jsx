import React, { useState, useEffect } from "react";
export default function AnalyticsDemo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setData(d => [...d.slice(-19), Math.round(Math.random() * 100)]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Real-Time Analytics Stream</h3>
      <div className="flex gap-1 items-end h-32 bg-gray-800 border border-gray-600 rounded-lg p-4">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="bg-teal-400 w-4" style={{ height: `${v}px` }}></div>
            <div className="text-white text-xs mt-1">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 