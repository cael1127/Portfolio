import React, { useState } from "react";
export default function SOCDemo() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Malware', status: 'Open' },
    { id: 2, type: 'Phishing', status: 'Open' },
    { id: 3, type: 'DDoS', status: 'Resolved' },
  ]);
  function resolve(id) {
    setAlerts(a => a.map(al => al.id === id ? { ...al, status: 'Resolved' } : al));
  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">SOC Dashboard</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        {alerts.map(a => (
          <div key={a.id} className="flex items-center justify-between mb-2">
            <div className="text-white">{a.type}</div>
            <div className={`font-bold ${a.status === 'Open' ? 'text-red-400' : 'text-green-400'}`}>{a.status}</div>
            {a.status === 'Open' && <button className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded" onClick={() => resolve(a.id)}>Resolve</button>}
          </div>
        ))}
      </div>
    </div>
  );
} 