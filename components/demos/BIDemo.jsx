import React, { useState } from "react";
export default function BIDemo() {
  const [filter, setFilter] = useState('All');
  const data = [
    { label: 'Q1', value: 120 },
    { label: 'Q2', value: 150 },
    { label: 'Q3', value: 90 },
    { label: 'Q4', value: 180 },
  ];
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">BI Dashboard</h3>
      <div className="mb-4">
        <select className="bg-gray-800 text-white rounded px-2 py-1" value={filter} onChange={e => setFilter(e.target.value)}>
          <option>All</option>
          <option>Q1</option>
          <option>Q2</option>
          <option>Q3</option>
          <option>Q4</option>
        </select>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <div className="flex gap-2 items-end h-32">
          {data.filter(d => filter === 'All' || d.label === filter).map((d, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="bg-teal-400 w-8" style={{ height: `${d.value}px` }}></div>
              <div className="text-white text-xs mt-1">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 