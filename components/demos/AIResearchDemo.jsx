import React, { useState } from "react";
export default function AIResearchDemo() {
  const [experiments, setExperiments] = useState([]);
  const [name, setName] = useState('');
  function add() {
    if (!name.trim()) return;
    setExperiments(exps => [...exps, { name, acc: (80 + Math.random() * 20).toFixed(2) + '%' }]);
    setName('');
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">ML Experiment Tracker</h3>
      <div className="flex gap-2 mb-4">
        <input className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Experiment Name" value={name} onChange={e => setName(e.target.value)} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={add}>Add</button>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        {experiments.length === 0 && <div className="text-gray-400">No experiments yet.</div>}
        {experiments.map((exp, i) => (
          <div key={i} className="flex items-center justify-between mb-2">
            <div className="text-white">{exp.name}</div>
            <div className="text-teal-400 font-bold">{exp.acc}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 