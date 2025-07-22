import React, { useState, useEffect } from 'react';

const BlockchainDemo = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1000);
  const [networkStats, setNetworkStats] = useState({
    totalBlocks: 0,
    totalTransactions: 0,
    networkHashRate: 0,
    difficulty: 1
  });

  // Initialize blockchain with genesis block
  useEffect(() => {
    const genesisBlock = {
      index: 0,
      timestamp: new Date().toISOString(),
      transactions: [{
        from: 'Genesis',
        to: 'Alice',
        amount: 1000,
        type: 'Mining Reward'
      }],
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '0000000000000000000000000000000000000000000000000000000000000001',
      nonce: 0,
      difficulty: 1
    };
    setBlockchain([genesisBlock]);
    setNetworkStats(prev => ({ ...prev, totalBlocks: 1, totalTransactions: 1 }));
  }, []);

  // Simulate new transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        from: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'][Math.floor(Math.random() * 5)],
        to: ['Bob', 'Charlie', 'David', 'Eve', 'Alice'][Math.floor(Math.random() * 5)],
        amount: Math.floor(Math.random() * 100) + 10,
        type: 'Transfer',
        timestamp: new Date().toLocaleTimeString(),
        status: 'Pending'
      };
      setPendingTransactions(prev => [...prev, newTransaction]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate mining new blocks
  useEffect(() => {
    const interval = setInterval(() => {
      if (pendingTransactions.length >= 3) {
        const transactionsToMine = pendingTransactions.slice(0, 3);
        const newBlock = {
          index: blockchain.length,
          timestamp: new Date().toISOString(),
          transactions: transactionsToMine,
          previousHash: blockchain[blockchain.length - 1].hash,
          hash: `000000000000000000000000000000000000000000000000000000000000000${blockchain.length + 1}`,
          nonce: Math.floor(Math.random() * 1000),
          difficulty: networkStats.difficulty
        };
        setBlockchain(prev => [...prev, newBlock]);
        setPendingTransactions(prev => prev.slice(3));
        setNetworkStats(prev => ({
          ...prev,
          totalBlocks: prev.totalBlocks + 1,
          totalTransactions: prev.totalTransactions + transactionsToMine.length,
          networkHashRate: Math.floor(Math.random() * 1000) + 500,
          difficulty: prev.difficulty + (Math.random() > 0.7 ? 1 : 0)
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [blockchain, pendingTransactions, networkStats.difficulty]);

  const createTransaction = () => {
    const amount = Math.floor(Math.random() * 50) + 10;
    const newTransaction = {
      id: Date.now(),
      from: 'Your Wallet',
      to: ['Alice', 'Bob', 'Charlie'][Math.floor(Math.random() * 3)],
      amount: amount,
      type: 'Transfer',
      timestamp: new Date().toLocaleTimeString(),
      status: 'Pending'
    };
    setPendingTransactions(prev => [...prev, newTransaction]);
    setWalletBalance(prev => prev - amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🔗 Blockchain Supply Chain Demo</h1>
          <p className="text-gray-300 text-lg">
            Real-time blockchain visualization with smart contracts, transaction tracking, and supply chain transparency
          </p>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Blocks</h3>
            <p className="text-3xl font-bold text-green-400">{networkStats.totalBlocks}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">💸</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-blue-400">{networkStats.totalTransactions}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Hash Rate</h3>
            <p className="text-3xl font-bold text-purple-400">{networkStats.networkHashRate} H/s</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Difficulty</h3>
            <p className="text-3xl font-bold text-yellow-400">{networkStats.difficulty}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blockchain Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Blockchain Visualization</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {blockchain.map((block, index) => (
                  <div
                    key={block.index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedBlock?.index === block.index
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Block #{block.index}</h3>
                        <p className="text-gray-400 text-sm">{new Date(block.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                          {block.transactions.length} TX
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Nonce: {block.nonce}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono break-all">
                      Hash: {block.hash.substring(0, 20)}...
                    </div>
                    <div className="text-xs text-gray-400 font-mono break-all">
                      Prev: {block.previousHash.substring(0, 20)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wallet & Actions */}
          <div className="space-y-6">
            {/* Wallet */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">💰 Your Wallet</h2>
              <div className="mb-4">
                <p className="text-gray-300">Balance</p>
                <p className="text-3xl font-bold text-blue-400">{walletBalance} ETH</p>
              </div>
              <button
                onClick={createTransaction}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Transaction
              </button>
            </div>

            {/* Pending Transactions */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">⏳ Pending Transactions</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {pendingTransactions.map((tx) => (
                  <div key={tx.id} className="bg-yellow-800/50 p-3 rounded-lg border border-yellow-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{tx.from} → {tx.to}</p>
                        <p className="text-yellow-200 text-sm">{tx.amount} ETH</p>
                        <p className="text-gray-300 text-xs">{tx.timestamp}</p>
                      </div>
                      <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                        Pending
                      </div>
                    </div>
                  </div>
                ))}
                {pendingTransactions.length === 0 && (
                  <p className="text-gray-300 text-center py-4">No pending transactions</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Block Details */}
        {selectedBlock && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Block #{selectedBlock.index} Details</h2>
              <button
                onClick={() => setSelectedBlock(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Block Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Index:</span>
                    <span className="text-white">{selectedBlock.index}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-white">{new Date(selectedBlock.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nonce:</span>
                    <span className="text-white">{selectedBlock.nonce}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="text-white">{selectedBlock.difficulty}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-green-400 font-semibold mb-2">Hash:</h4>
                  <p className="text-xs text-gray-300 font-mono break-all">{selectedBlock.hash}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-green-400 font-semibold mb-2">Previous Hash:</h4>
                  <p className="text-xs text-gray-300 font-mono break-all">{selectedBlock.previousHash}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Transactions ({selectedBlock.transactions.length})</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedBlock.transactions.map((tx, index) => (
                    <div key={index} className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-semibold">{tx.from} → {tx.to}</p>
                          <p className="text-blue-200 text-sm">{tx.amount} ETH</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          tx.type === 'Mining Reward' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          {tx.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Smart Contract Info */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">📋 Smart Contract Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Supply Chain Tracking</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Product origin verification</li>
                <li>• Quality assurance checks</li>
                <li>• Temperature monitoring</li>
                <li>• Shipping route tracking</li>
                <li>• Authenticity verification</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Smart Contracts</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Automated payments</li>
                <li>• Quality-based pricing</li>
                <li>• Insurance claims</li>
                <li>• Compliance verification</li>
                <li>• Dispute resolution</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Technologies</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Solidity smart contracts</li>
                <li>• Web3.js integration</li>
                <li>• IPFS for data storage</li>
                <li>• Oracles for real-world data</li>
                <li>• Zero-knowledge proofs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainDemo; 