import React, { useState } from "react";
export default function SmartHomeDemo() {
  const [lights, setLights] = useState(false);
  const [temp, setTemp] = useState(72);
  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Smart Home Panel</h3>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-white">Lights</span>
        <button className={`px-4 py-2 rounded ${lights ? 'bg-teal-600' : 'bg-gray-700'} text-white`} onClick={() => setLights(l => !l)}>{lights ? 'On' : 'Off'}</button>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-white">Temperature</span>
        <div className="flex items-center gap-2">
          <button className="bg-teal-600 text-white px-2 py-1 rounded" onClick={() => setTemp(t => t - 1)}>-</button>
          <span className="text-teal-400 font-bold">{temp}6F</span>
          <button className="bg-teal-600 text-white px-2 py-1 rounded" onClick={() => setTemp(t => t + 1)}>+</button>
        </div>
      </div>
    </div>
  );
} 