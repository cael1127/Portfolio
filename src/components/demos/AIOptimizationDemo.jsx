import React, { useState } from "react";
export default function AIOptimizationDemo() {
  const [param, setParam] = useState(50);
  const [result, setResult] = useState(null);
  function optimize() {
    setResult(100 - Math.abs(param - 70) + Math.random() * 10);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">AI Optimization Dashboard</h3>
      <div className="mb-4">Parameter: <input type="range" min="0" max="100" value={param} onChange={e => setParam(Number(e.target.value))} className="w-2/3" /> <span className="text-teal-400 font-bold">{param}</span></div>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-4" onClick={optimize}>Optimize</button>
      {result && <div className="text-white">Optimization Score: <span className="text-teal-400 font-bold">{result.toFixed(2)}</span></div>}
    </div>
  );
} 