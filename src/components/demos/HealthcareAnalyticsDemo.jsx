import React, { useState } from "react";
export default function HealthcareAnalyticsDemo() {
  const [metric, setMetric] = useState('Admissions');
  const metrics = ['Admissions', 'Discharges', 'Avg Stay'];
  const values = { Admissions: 120, Discharges: 110, 'Avg Stay': 4.2 };
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Healthcare Analytics</h3>
      <div className="mb-4">
        <select className="bg-gray-800 text-white rounded px-2 py-1" value={metric} onChange={e => setMetric(e.target.value)}>
          {metrics.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
        <div className="text-teal-400 text-3xl font-bold mb-2">{values[metric]}</div>
        <div className="text-white text-lg">{metric}</div>
      </div>
    </div>
  );
} 