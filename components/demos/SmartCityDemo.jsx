import React from "react";
export default function SmartCityDemo() {
  const sensors = [
    { id: 1, type: 'Air Quality', value: 42, unit: 'AQI' },
    { id: 2, type: 'Traffic', value: 78, unit: '%' },
    { id: 3, type: 'Noise', value: 55, unit: 'dB' },
    { id: 4, type: 'Water', value: 98, unit: '%' },
  ];
  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Smart City IoT Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sensors.map(s => (
          <div key={s.id} className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
            <div className="text-teal-400 text-lg font-bold mb-1">{s.value} {s.unit}</div>
            <div className="text-gray-300 text-xs uppercase">{s.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 