import React, { useState } from "react";
export default function MedicalImagingDemo() {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Medical Imaging Viewer</h3>
      <div className="flex flex-col items-center">
        <img src="https://placehold.co/320x200/222/fff?text=CT+Scan" alt="CT Scan" style={{ transform: `scale(${zoom})` }} className="rounded border border-gray-600 mb-4" />
        <div className="flex gap-2">
          <button className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>-</button>
          <span className="text-white font-bold">Zoom: {zoom.toFixed(1)}x</span>
          <button className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>+</button>
        </div>
      </div>
    </div>
  );
} 