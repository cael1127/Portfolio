import React, { useState, useEffect } from 'react';

export default function BlockchainDemo() {
  const [transactions, setTransactions] = useState([
    { id: 1, from: 'Farm A', to: 'Processor B', product: 'Organic Tomatoes', status: 'confirmed', timestamp: '2 min ago', hash: '0x7a8b9c...' },
    { id: 2, from: 'Processor B', to: 'Distributor C', product: 'Tomato Sauce', status: 'pending', timestamp: '5 min ago', hash: '0x3d4e5f...' },
    { id: 3, from: 'Distributor C', to: 'Retailer D', product: 'Organic Products', status: 'confirmed', timestamp: '8 min ago', hash: '0x1a2b3c...' },
    { id: 4, from: 'Farm E', to: 'Processor F', product: 'Fresh Lettuce', status: 'processing', timestamp: '12 min ago', hash: '0x9g0h1i...' },
  ]);

  const [supplyChain, setSupplyChain] = useState([
    { id: 1, name: 'Farm A', type: 'Producer', location: 'California', products: ['Tomatoes', 'Lettuce'], trustScore: 95 },
    { id: 2, name: 'Processor B', type: 'Processor', location: 'Texas', products: ['Sauce', 'Juice'], trustScore: 92 },
    { id: 3, name: 'Distributor C', type: 'Distributor', location: 'Florida', products: ['Mixed Goods'], trustScore: 88 },
    { id: 4, name: 'Retailer D', type: 'Retailer', location: 'New York', products: ['Final Products'], trustScore: 90 },
  ]);

  const [blockchainStats, setBlockchainStats] = useState({
    totalBlocks: 1247,
    totalTransactions: 8923,
    avgBlockTime: '2.3 sec',
    networkHashRate: '45.2 TH/s'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => prev.map(tx => ({
        ...tx,
        timestamp: tx.status === 'pending' ? 'Just now' : tx.timestamp
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'processing': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'processing': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">⛓️ Blockchain Supply Chain</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Live Blockchain Transactions</h4>
            <div className="space-y-4">
              {transactions.map(tx => (
                <div key={tx.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-white">{tx.product}</h5>
                      <p className="text-gray-400 text-sm">{tx.from} → {tx.to}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(tx.status)} text-white`}>
                        {tx.status.toUpperCase()}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">{tx.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs">Transaction Hash</p>
                      <p className="text-green-400 font-mono text-sm">{tx.hash}</p>
                    </div>
                    <div className="text-right">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain Stats */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Blockchain Statistics</h4>
            <div className="space-y-4">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Total Blocks</p>
                <p className="text-2xl font-bold text-green-400">{blockchainStats.totalBlocks}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-green-400">{blockchainStats.totalTransactions}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Avg Block Time</p>
                <p className="text-2xl font-bold text-green-400">{blockchainStats.avgBlockTime}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Network Hash Rate</p>
                <p className="text-2xl font-bold text-green-400">{blockchainStats.networkHashRate}</p>
              </div>
            </div>
          </div>

          {/* Supply Chain Partners */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Supply Chain Partners</h4>
            <div className="space-y-3">
              {supplyChain.map(partner => (
                <div key={partner.id} className="bg-gray-700 p-3 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="text-white font-semibold">{partner.name}</h5>
                      <p className="text-gray-400 text-xs">{partner.type} • {partner.location}</p>
                    </div>
                    <span className="text-green-400 font-bold">{partner.trustScore}%</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {partner.products.map(product => (
                      <span key={product} className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-300">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Traceability */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">🔍 Product Traceability</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🌱</div>
            <p className="text-white font-bold">Farm A</p>
            <p className="text-gray-400 text-sm">Harvested: 2024-01-15</p>
            <p className="text-green-400 text-xs">Organic Certified</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🏭</div>
            <p className="text-white font-bold">Processor B</p>
            <p className="text-gray-400 text-sm">Processed: 2024-01-16</p>
            <p className="text-green-400 text-xs">Quality Verified</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🚚</div>
            <p className="text-white font-bold">Distributor C</p>
            <p className="text-gray-400 text-sm">Shipped: 2024-01-17</p>
            <p className="text-green-400 text-xs">Temperature Controlled</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🏪</div>
            <p className="text-white font-bold">Retailer D</p>
            <p className="text-gray-400 text-sm">Available: 2024-01-18</p>
            <p className="text-green-400 text-xs">Fresh & Ready</p>
          </div>
        </div>
      </div>

      {/* Smart Contracts */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">📜 Smart Contracts</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">Quality Assurance Contract</h5>
            <p className="text-gray-400 text-sm">Automatically verifies product quality at each stage</p>
            <p className="text-green-400 text-xs mt-2">Status: Active • 99.2% Success Rate</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">Payment Escrow Contract</h5>
            <p className="text-gray-400 text-sm">Secures payments until delivery confirmation</p>
            <p className="text-green-400 text-xs mt-2">Status: Active • $2.3M in Escrow</p>
          </div>
        </div>
      </div>
    </div>
  );
} 