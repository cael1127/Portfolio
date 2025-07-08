import React from "react";
export default function RiskDemo() {
  const grid = Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => Math.random()));
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Risk Analytics Heatmap</h3>
      <div className="grid grid-cols-5 gap-1">
        {grid.flat().map((v, i) => (
          <div key={i} className="w-12 h-12 flex items-center justify-center rounded" style={{ background: `rgba(20,184,166,${0.2 + v * 0.8})` }}>
            <span className="text-white font-bold">{Math.round(v * 100)}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 