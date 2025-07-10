import React, { useState } from 'react';

export default function BlockchainDemo() {
  const [block, setBlock] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchBlock = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        block: block || Math.floor(Math.random() * 10000),
        txs: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, i) => ({
          hash: Math.random().toString(36).slice(2, 10),
          value: (Math.random() * 2).toFixed(3) + ' ETH',
          from: '0x' + Math.random().toString(36).slice(2, 10),
          to: '0x' + Math.random().toString(36).slice(2, 10),
        })),
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">Blockchain Explorer</h3>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex gap-4 mb-4">
          <input 
            className="flex-1 px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400" 
            placeholder="Enter block number (optional)" 
            value={block} 
            onChange={e => setBlock(e.target.value)} 
          />
          <button 
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
            onClick={searchBlock}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search Block'}
          </button>
        </div>
        
        <p className="text-gray-400 text-sm">
          Search for a specific block number or leave empty to get a random block
        </p>
      </div>

      {result && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Block Information</h4>
              <div className="space-y-2 text-gray-300">
                <div>Block Number: <span className="text-teal-400 font-bold">{result.block}</span></div>
                <div>Timestamp: <span className="text-teal-400">{new Date().toLocaleString()}</span></div>
                <div>Transactions: <span className="text-teal-400">{result.txs.length}</span></div>
                <div>Gas Used: <span className="text-teal-400">{Math.floor(Math.random() * 1000000)}</span></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Recent Transactions</h4>
              <div className="space-y-3">
                {result.txs.map((tx, i) => (
                  <div key={i} className="bg-gray-700 p-3 rounded border border-gray-600">
                    <div className="text-sm text-gray-400 mb-1">Hash: <span className="text-teal-400 font-mono">{tx.hash}</span></div>
                    <div className="text-sm text-gray-400 mb-1">From: <span className="text-teal-400 font-mono">{tx.from}</span></div>
                    <div className="text-sm text-gray-400 mb-1">To: <span className="text-teal-400 font-mono">{tx.to}</span></div>
                    <div className="text-sm text-gray-400">Value: <span className="text-teal-400 font-bold">{tx.value}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 