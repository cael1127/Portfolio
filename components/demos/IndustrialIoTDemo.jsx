import React, { useState } from "react";
export default function IndustrialIoTDemo() {
  const [alerts, setAlerts] = useState([
    { id: 1, sensor: 'Temp', value: 85, status: 'OK' },
    { id: 2, sensor: 'Pressure', value: 120, status: 'ALERT' },
    { id: 3, sensor: 'Humidity', value: 40, status: 'OK' },
  ]);
  function ack(id) {
    setAlerts(a => a.map(al => al.id === id ? { ...al, status: 'OK' } : al));
  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Industrial IoT Alerts</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        {alerts.map(a => (
          <div key={a.id} className="flex items-center justify-between mb-2">
            <div className="text-white">{a.sensor}: {a.value}</div>
            <div className={`font-bold ${a.status === 'ALERT' ? 'text-red-400' : 'text-green-400'}`}>{a.status}</div>
            {a.status === 'ALERT' && <button className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded" onClick={() => ack(a.id)}>Acknowledge</button>}
          </div>
        ))}
      </div>
    </div>
  );
} 