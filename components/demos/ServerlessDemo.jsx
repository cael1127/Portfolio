import React, { useState } from "react";
export default function ServerlessDemo() {
  const [result, setResult] = useState(null);
  function trigger() {
    setResult('Function executed at ' + new Date().toLocaleTimeString());
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Serverless Function Trigger</h3>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full mb-4" onClick={trigger}>Trigger Function</button>
      {result && <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-white">{result}</div>}
    </div>
  );
} 