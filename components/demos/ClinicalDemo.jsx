import React, { useState } from "react";
export default function ClinicalDemo() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', status: 'Admitted' },
    { id: 2, name: 'Jane Smith', status: 'Discharged' },
  ]);
  function updateStatus(id) {
    setPatients(ps => ps.map(p => p.id === id ? { ...p, status: p.status === 'Admitted' ? 'Discharged' : 'Admitted' } : p));
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Clinical Workflow</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        {patients.map(p => (
          <div key={p.id} className="flex items-center justify-between mb-2">
            <div className="text-white">{p.name}</div>
            <div className="text-teal-400 font-bold">{p.status}</div>
            <button className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded" onClick={() => updateStatus(p.id)}>Toggle</button>
          </div>
        ))}
      </div>
    </div>
  );
} 