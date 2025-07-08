import React, { useState } from "react";
export default function BlockchainDemo() {
  const [block, setBlock] = useState('');
  const [result, setResult] = useState(null);
  function search() {
    setResult({
      block: block || Math.floor(Math.random() * 10000),
      txs: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, i) => ({
        hash: Math.random().toString(36).slice(2, 10),
        value: (Math.random() * 2).toFixed(3) + ' ETH',
      })),
    });
  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Blockchain Explorer</h3>
      <div className="flex gap-2 mb-4">
        <input className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Block #" value={block} onChange={e => setBlock(e.target.value)} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={search}>Search</button>
      </div>
      {result && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <div className="text-white mb-2">Block: <span className="font-bold text-teal-400">{result.block}</span></div>
          <div className="text-white mb-2">Transactions:</div>
          <ul>
            {result.txs.map((tx, i) => (
              <li key={i} className="text-gray-300 text-sm mb-1">Hash: <span className="text-teal-400">{tx.hash}</span> — Value: {tx.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 