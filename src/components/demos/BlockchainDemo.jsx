import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const BlockchainDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [smartContracts, setSmartContracts] = useState([]);
  const [miners, setMiners] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [networkStats, setNetworkStats] = useState({
    totalTransactions: 0,
    pendingTransactions: 0,
    totalBlocks: 0,
    networkHashrate: 0,
    averageBlockTime: 0,
    gasPrice: 0,
    activeMiners: 0,
    difficulty: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BlockchainDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [smartContracts, setSmartContracts] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        from: '0x' + Math.random().toString(16).substr(2, 8),
        to: '0x' + Math.random().toString(16).substr(2, 8),
        amount: Math.floor(Math.random() * 1000) + 1,
        gas: Math.floor(Math.random() * 100) + 21,
        gasPrice: Math.floor(Math.random() * 50) + 20,
        status: Math.random() > 0.1 ? 'confirmed' : 'pending',
        blockNumber: Math.floor(Math.random() * 1000000) + 1,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const deploySmartContract = async (contractData) => {
    const contract = {
      address: '0x' + Math.random().toString(16).substr(2, 10),
      name: contractData.name,
      type: contractData.type,
      gasUsed: Math.floor(Math.random() * 100000) + 50000,
      status: 'deployed',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setSmartContracts(prev => [contract, ...prev.slice(0, 9)]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction Monitor */}
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{tx.amount} ETH</p>
                  <p className="text-gray-300 text-sm">{tx.from}</p>
                  <p className="text-gray-400 text-xs">{tx.to}</p>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 rounded text-xs">
                    {tx.status}
                  </div>
                  <p className="text-gray-400 text-xs">{tx.gas} gas</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Smart Contracts */}
        <div className="space-y-4">
          {smartContracts.map((contract) => (
            <div key={contract.address} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{contract.name}</h3>
              <p className="text-gray-300 text-sm">{contract.address}</p>
              <p className="text-gray-400 text-xs">{contract.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainDemo;`;

  useEffect(() => {
    // Initialize blockchain data
    const initialBlocks = Array.from({ length: 10 }, (_, i) => ({
      id: 1000000 - i,
      hash: '0x' + Math.random().toString(16).substr(2, 64),
      transactions: Math.floor(Math.random() * 100) + 50,
      gasUsed: Math.floor(Math.random() * 8000000) + 2000000,
      gasLimit: 15000000,
      miner: '0x' + Math.random().toString(16).substr(2, 8),
      timestamp: new Date(Date.now() - i * 12000).toLocaleTimeString(),
      difficulty: Math.floor(Math.random() * 1000000) + 5000000
    }));

    const initialSmartContracts = [
      {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        name: 'DeFi Yield Farming',
        type: 'ERC-20',
        gasUsed: 125000,
        status: 'active',
        balance: 1500.5,
        transactions: 45,
        timestamp: '2 minutes ago'
      },
      {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        name: 'NFT Marketplace',
        type: 'ERC-721',
        gasUsed: 89000,
        status: 'active',
        balance: 2300.75,
        transactions: 78,
        timestamp: '5 minutes ago'
      },
      {
        address: '0x7890abcdef1234567890abcdef1234567890abcd',
        name: 'DAO Governance',
        type: 'ERC-1155',
        gasUsed: 156000,
        status: 'active',
        balance: 890.25,
        transactions: 23,
        timestamp: '8 minutes ago'
      }
    ];

    const initialMiners = [
      {
        id: 1,
        address: '0x' + Math.random().toString(16).substr(2, 8),
        hashrate: Math.floor(Math.random() * 100) + 50,
        blocksMined: Math.floor(Math.random() * 100) + 10,
        status: 'active',
        lastSeen: 'Just now'
      },
      {
        id: 2,
        address: '0x' + Math.random().toString(16).substr(2, 8),
        hashrate: Math.floor(Math.random() * 100) + 50,
        blocksMined: Math.floor(Math.random() * 100) + 10,
        status: 'active',
        lastSeen: '1 minute ago'
      }
    ];

    setBlocks(initialBlocks);
    setSmartContracts(initialSmartContracts);
    setMiners(initialMiners);
  }, []);

  useEffect(() => {
    // Simulate real-time blockchain activity
    const interval = setInterval(() => {
      // Generate new transaction
      const newTransaction = {
        id: Date.now(),
        from: '0x' + Math.random().toString(16).substr(2, 8),
        to: '0x' + Math.random().toString(16).substr(2, 8),
        amount: Math.floor(Math.random() * 1000) + 1,
        gas: Math.floor(Math.random() * 100) + 21,
        gasPrice: Math.floor(Math.random() * 50) + 20,
        status: Math.random() > 0.1 ? 'confirmed' : 'pending',
        blockNumber: Math.floor(Math.random() * 1000000) + 1,
        timestamp: new Date().toLocaleTimeString(),
        method: ['transfer', 'approve', 'mint', 'burn'][Math.floor(Math.random() * 4)],
        contractAddress: Math.random() > 0.7 ? '0x' + Math.random().toString(16).substr(2, 8) : null
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]);

      // Update network stats
      setNetworkStats(prev => ({
        totalTransactions: prev.totalTransactions + 1,
        pendingTransactions: prev.pendingTransactions + (newTransaction.status === 'pending' ? 1 : 0),
        totalBlocks: prev.totalBlocks + (Math.random() > 0.8 ? 1 : 0),
        networkHashrate: prev.networkHashrate + (Math.random() - 0.5) * 10,
        averageBlockTime: Math.max(10, prev.averageBlockTime + (Math.random() - 0.5) * 2),
        gasPrice: Math.max(20, prev.gasPrice + (Math.random() - 0.5) * 5),
        activeMiners: prev.activeMiners + (Math.random() > 0.9 ? 1 : 0),
        difficulty: prev.difficulty + (Math.random() - 0.5) * 100000
      }));

      // Update miners
      setMiners(prev => prev.map(miner => ({
        ...miner,
        hashrate: Math.max(10, miner.hashrate + (Math.random() - 0.5) * 5),
        lastSeen: 'Just now'
      })));

      // Occasionally add new block
      if (Math.random() > 0.8) {
        const newBlock = {
          id: Math.floor(Math.random() * 1000000) + 1,
          hash: '0x' + Math.random().toString(16).substr(2, 64),
          transactions: Math.floor(Math.random() * 100) + 50,
          gasUsed: Math.floor(Math.random() * 8000000) + 2000000,
          gasLimit: 15000000,
          miner: '0x' + Math.random().toString(16).substr(2, 8),
          timestamp: new Date().toLocaleTimeString(),
          difficulty: Math.floor(Math.random() * 1000000) + 5000000
        };
        setBlocks(prev => [newBlock, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'failed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const formatHash = (hash) => {
    return hash.substring(0, 8) + '...' + hash.substring(hash.length - 8);
  };

  const formatAddress = (address) => {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🔗 Blockchain Supply Chain Platform</h1>
            <p className="text-gray-300 text-lg">
              Complete blockchain implementation with smart contracts, real-time transactions, and mining simulation
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* Network Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-green-400">{networkStats.totalTransactions.toLocaleString()}</p>
            <p className="text-green-300 text-sm">+{Math.floor(Math.random() * 5) + 1} last minute</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">⛏️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Network Hashrate</h3>
            <p className="text-3xl font-bold text-blue-400">{(networkStats.networkHashrate / 1000).toFixed(1)} TH/s</p>
            <p className="text-blue-300 text-sm">{networkStats.activeMiners} active miners</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Block Time</h3>
            <p className="text-3xl font-bold text-purple-400">{networkStats.averageBlockTime.toFixed(1)}s</p>
            <p className="text-purple-300 text-sm">Difficulty: {(networkStats.difficulty / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⛽</div>
            <h3 className="text-xl font-semibold text-white mb-2">Gas Price</h3>
            <p className="text-3xl font-bold text-yellow-400">{networkStats.gasPrice} Gwei</p>
            <p className="text-yellow-300 text-sm">{networkStats.pendingTransactions} pending</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Monitor */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">💸 Live Transaction Monitor</h2>
                <div className="text-sm text-green-300">Real-time updates every 2s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      tx.status === 'confirmed' 
                        ? 'bg-green-900/50 border-green-600' 
                        : tx.status === 'pending'
                          ? 'bg-yellow-900/50 border-yellow-600'
                          : 'bg-red-900/50 border-red-600'
                    )}
                    onClick={() => setSelectedTransaction(tx)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-white">{tx.amount} ETH</p>
                        <p className="text-gray-300 text-sm">From: {formatAddress(tx.from)}</p>
                        <p className="text-gray-300 text-sm">To: {formatAddress(tx.to)}</p>
                        {tx.contractAddress && (
                          <p className="text-blue-300 text-xs">Contract: {formatAddress(tx.contractAddress)}</p>
                        )}
                        <p className="text-gray-400 text-xs">{tx.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(tx.status)}>
                          {tx.status.toUpperCase()}
                        </div>
                        <p className="text-gray-300 text-xs mt-1">{tx.gas} gas</p>
                        <p className="text-gray-400 text-xs">{tx.gasPrice} Gwei</p>
                        {tx.method && (
                          <p className="text-purple-300 text-xs">{tx.method}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Gas Usage</span>
                        <span>{tx.gas} / 21,000</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            tx.gas > 50000 ? 'bg-red-500' : 
                            tx.gas > 21000 ? 'bg-yellow-500' : 'bg-green-500'
                          )}
                          style={{ width: Math.min((tx.gas / 21000) * 100, 100) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blockchain Analytics */}
          <div className="space-y-6">
            {/* Smart Contracts */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">📜 Smart Contracts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {smartContracts.map((contract) => (
                  <div key={contract.address} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{contract.name}</p>
                        <p className="text-blue-200 text-sm">{formatAddress(contract.address)}</p>
                        <p className="text-blue-200 text-xs">{contract.type}</p>
                        <p className="text-gray-300 text-xs">{contract.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <div className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                          {contract.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{contract.balance} ETH</p>
                        <p className="text-gray-300 text-xs">{contract.transactions} txs</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mining Network */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⛏️ Mining Network</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {miners.map((miner) => (
                  <div key={miner.id} className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">Miner {miner.id}</p>
                        <p className="text-purple-200 text-sm">{formatAddress(miner.address)}</p>
                        <p className="text-purple-200 text-xs">{miner.blocksMined} blocks</p>
                        <p className="text-gray-300 text-xs">{miner.lastSeen}</p>
                      </div>
                      <div className="text-right">
                        <div className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                          {miner.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{miner.hashrate} MH/s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Controls */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Network Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Deploy Contract
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Mine Block
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Blockchain
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Blocks */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">📦 Recent Blocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.slice(0, 6).map((block) => (
              <div key={block.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Block #{block.id}</h3>
                    <p className="text-gray-300 text-sm">{formatHash(block.hash)}</p>
                    <p className="text-gray-400 text-xs">{block.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <div className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                      CONFIRMED
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Transactions</p>
                    <p className="text-white font-semibold">{block.transactions}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Gas Used</p>
                    <p className="text-white font-semibold">{(block.gasUsed / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Miner</p>
                    <p className="text-white font-semibold">{formatAddress(block.miner)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Difficulty</p>
                    <p className="text-white font-semibold">{(block.difficulty / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Transaction ID</p>
                  <p className="text-white font-semibold">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Amount</p>
                  <p className="text-white font-semibold">{selectedTransaction.amount} ETH</p>
                </div>
                <div>
                  <p className="text-gray-400">From Address</p>
                  <p className="text-white font-semibold">{selectedTransaction.from}</p>
                </div>
                <div>
                  <p className="text-gray-400">To Address</p>
                  <p className="text-white font-semibold">{selectedTransaction.to}</p>
                </div>
                <div>
                  <p className="text-gray-400">Gas Used</p>
                  <p className="text-white font-semibold">{selectedTransaction.gas}</p>
                </div>
                <div>
                  <p className="text-gray-400">Gas Price</p>
                  <p className="text-white font-semibold">{selectedTransaction.gasPrice} Gwei</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className={'font-semibold ' + getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Block Number</p>
                  <p className="text-white font-semibold">{selectedTransaction.blockNumber}</p>
                </div>
                {selectedTransaction.contractAddress && (
                  <>
                    <div>
                      <p className="text-gray-400">Contract Address</p>
                      <p className="text-white font-semibold">{selectedTransaction.contractAddress}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Method</p>
                      <p className="text-white font-semibold">{selectedTransaction.method}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Blockchain Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🔗 Advanced Blockchain Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Smart Contracts</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• ERC-20 Token contracts</li>
                <li>• ERC-721 NFT contracts</li>
                <li>• ERC-1155 Multi-token</li>
                <li>• DeFi protocols</li>
                <li>• DAO governance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Mining & Consensus</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Proof of Work (PoW)</li>
                <li>• Hashrate monitoring</li>
                <li>• Difficulty adjustment</li>
                <li>• Block validation</li>
                <li>• Network security</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Transaction Processing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Gas optimization</li>
                <li>• Mempool management</li>
                <li>• Transaction prioritization</li>
                <li>• Fee estimation</li>
                <li>• Confirmation tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Blockchain Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default BlockchainDemo; 