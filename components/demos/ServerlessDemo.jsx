import React, { useState } from "react";
export default function ServerlessDemo() {
  const [functions, setFunctions] = useState([
    { name: 'process-payment', invocations: 1250, duration: '150ms', memory: '256MB' },
    { name: 'send-notification', invocations: 890, duration: '45ms', memory: '128MB' },
    { name: 'data-transform', invocations: 2100, duration: '200ms', memory: '512MB' }
  ]);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const invokeFunction = (name) => {
    setFunctions(functions.map(f => 
      f.name === name 
        ? { ...f, invocations: f.invocations + 1 }
        : f
    ));
    setSelectedFunction(name);
    setTimeout(() => setSelectedFunction(null), 1000);
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Serverless Functions</h3>
      <div className="space-y-3">
        {functions.map(func => (
          <div key={func.name} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-bold">{func.name}</div>
              <button 
                className={`text-xs px-2 py-1 rounded ${
                  selectedFunction === func.name 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                onClick={() => invokeFunction(func.name)}
              >
                {selectedFunction === func.name ? 'Invoking...' : 'Invoke'}
              </button>
            </div>
            <div className="text-gray-400 text-sm space-y-1">
              <div>Invocations: {func.invocations}</div>
              <div>Avg Duration: {func.duration}</div>
              <div>Memory: {func.memory}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 