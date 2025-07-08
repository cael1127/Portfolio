import React, { useState } from "react";
export default function AgriculturalIoTDemo() {
  const [moisture, setMoisture] = useState(45);
  const [ph, setPh] = useState(6.8);
  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Agricultural IoT Dashboard</h3>
      <div className="mb-4">Soil Moisture: <span className="text-teal-400 font-bold">{moisture}%</span></div>
      <div className="mb-4">Soil pH: <span className="text-teal-400 font-bold">{ph.toFixed(1)}</span></div>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={() => { setMoisture(m => m + (Math.random() * 10 - 5)); setPh(p => p + (Math.random() - 0.5) * 0.2); }}>Refresh</button>
    </div>
  );
} 