import React from "react";
export default function MicroservicesDemo() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Microservices Mesh Visualizer</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">Service A</div>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">Service B</div>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">Service C</div>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">API Gateway</div>
      </div>
      <div className="mt-6 text-center text-gray-400">(Arrows/lines would be drawn between services in a real mesh visualizer.)</div>
    </div>
  );
} 