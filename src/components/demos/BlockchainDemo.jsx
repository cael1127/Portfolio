import React, { useState, useEffect } from 'react';

const BlockchainDemo = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1000);
  const [networkStats, setNetworkStats] = useState({
    totalBlocks: 0,
    totalTransactions: 0,
    hashRate: 0,
    difficulty: 1,
    networkHash: '0000000000000000000000000000000000000000000000000000000000000000'
  });
  const [miningStatus, setMiningStatus] = useState('idle');
  const [transactionForm, setTransactionForm] = useState({
    recipient: '',
    amount: '',
    fee: '0.001'
  });
  const [analytics, setAnalytics] = useState({
    transactionsPerMinute: [],
    blockTimeHistory: [],
    networkDifficulty: [],
    activeMiners: 0
  });

  // Initialize blockchain with genesis block
  useEffect(() => {
    const genesisBlock = {
      index: 0,
      timestamp: new Date().toISOString(),
      transactions: [
        {
          from: 'Genesis',
          to: 'Network',
          amount: 1000000,
          fee: 0,
          hash: 'genesis_transaction_hash'
        }
      ],
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '0000000000000000000000000000000000000000000000000000000000000000',
      nonce: 0,
      difficulty: 1
    };
    setBlockchain([genesisBlock]);
    setNetworkStats(prev => ({
      ...prev,
      totalBlocks: 1,
      totalTransactions: 1,
      hashRate: 1500000,
      difficulty: 1
    }));
  }, []);

  // Simulate new transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now() + Math.random(),
        from: `User${Math.floor(Math.random() * 100)}`,
        to: `User${Math.floor(Math.random() * 100)}`,
        amount: Math.floor(Math.random() * 100) + 1,
        fee: (Math.random() * 0.01).toFixed(4),
        timestamp: new Date().toISOString(),
        hash: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      setPendingTransactions(prev => [...prev, newTransaction]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate mining new blocks
  useEffect(() => {
    const interval = setInterval(() => {
      if (pendingTransactions.length > 0) {
        setMiningStatus('mining');
        setTimeout(() => {
          const newBlock = {
            index: blockchain.length,
            timestamp: new Date().toISOString(),
            transactions: pendingTransactions.slice(0, 5),
            previousHash: blockchain[blockchain.length - 1].hash,
            hash: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            nonce: Math.floor(Math.random() * 1000000),
            difficulty: networkStats.difficulty
          };
          setBlockchain(prev => [...prev, newBlock]);
          setPendingTransactions(prev => prev.slice(5));
          setMiningStatus('idle');
          
          // Update network stats
          setNetworkStats(prev => ({
            ...prev,
            totalBlocks: prev.totalBlocks + 1,
            totalTransactions: prev.totalTransactions + newBlock.transactions.length,
            hashRate: Math.max(1000000, Math.min(5000000, prev.hashRate + (Math.random() - 0.5) * 100000)),
            difficulty: Math.max(1, Math.min(10, prev.difficulty + (Math.random() - 0.5) * 0.5))
          }));
        }, 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [blockchain, pendingTransactions, networkStats.difficulty]);

  // Update analytics data
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        transactionsPerMinute: [...prev.transactionsPerMinute.slice(-9), Math.floor(Math.random() * 20) + 10],
        blockTimeHistory: [...prev.blockTimeHistory.slice(-9), Math.floor(Math.random() * 60) + 30],
        networkDifficulty: [...prev.networkDifficulty.slice(-9), networkStats.difficulty],
        activeMiners: Math.floor(Math.random() * 50) + 20
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [networkStats.difficulty]);

  const createTransaction = () => {
    if (!transactionForm.recipient || !transactionForm.amount) return;
    
    const newTransaction = {
      id: Date.now() + Math.random(),
      from: 'Your Wallet',
      to: transactionForm.recipient,
      amount: parseFloat(transactionForm.amount),
      fee: parseFloat(transactionForm.fee),
      timestamp: new Date().toISOString(),
      hash: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    setPendingTransactions(prev => [...prev, newTransaction]);
    setWalletBalance(prev => prev - parseFloat(transactionForm.amount) - parseFloat(transactionForm.fee));
    setTransactionForm({ recipient: '', amount: '', fee: '0.001' });
  };

  const mineBlock = () => {
    if (pendingTransactions.length === 0) return;
    
    setMiningStatus('mining');
    setTimeout(() => {
      const newBlock = {
        index: blockchain.length,
        timestamp: new Date().toISOString(),
        transactions: pendingTransactions.slice(0, 5),
        previousHash: blockchain[blockchain.length - 1].hash,
        hash: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        nonce: Math.floor(Math.random() * 1000000),
        difficulty: networkStats.difficulty
      };
      setBlockchain(prev => [...prev, newBlock]);
      setPendingTransactions(prev => prev.slice(5));
      setMiningStatus('idle');
      setWalletBalance(prev => prev + 6.25); // Mining reward
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'idle': return 'text-green-400';
      case 'mining': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'idle': return 'bg-green-600';
      case 'mining': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🔗 Blockchain Supply Chain Platform</h1>
          <p className="text-gray-300 text-lg">
            Real-time blockchain simulation with transaction processing, mining operations, and supply chain tracking
          </p>
        </div>

        {/* Network Statistics */}
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
            <p className="text-3xl font-bold text-purple-400">{(networkStats.hashRate / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Difficulty</h3>
            <p className="text-3xl font-bold text-yellow-400">{networkStats.difficulty.toFixed(1)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blockchain Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Blockchain</h2>
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
                        <p className="text-green-400 text-sm">Hash: {block.hash.substring(0, 16)}...</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-300">Nonce: {block.nonce}</div>
                        <p className="text-gray-400 text-xs mt-1">{block.transactions.length} transactions</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Previous Hash</p>
                        <p className="text-white font-mono text-xs">{block.previousHash.substring(0, 16)}...</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Difficulty</p>
                        <p className="text-white">{block.difficulty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wallet & Mining */}
          <div className="space-y-6">
            {/* Your Wallet */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">💰 Your Wallet</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-blue-200 text-sm">Balance</p>
                  <p className="text-2xl font-bold text-white">{walletBalance.toFixed(4)} BTC</p>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Recipient Address"
                    value={transactionForm.recipient}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, recipient: e.target.value }))}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Amount (BTC)"
                    value={transactionForm.amount}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Fee (BTC)"
                    value={transactionForm.fee}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, fee: e.target.value }))}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                  />
                  <button
                    onClick={createTransaction}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Transaction
                  </button>
                </div>
              </div>
            </div>

            {/* Mining Controls */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⛏️ Mining</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-purple-200 text-sm">Status</p>
                  <p className={`text-lg font-semibold ${getStatusColor(miningStatus)}`}>
                    {miningStatus.charAt(0).toUpperCase() + miningStatus.slice(1)}
                  </p>
                </div>
                
                <div>
                  <p className="text-purple-200 text-sm">Pending Transactions</p>
                  <p className="text-2xl font-bold text-white">{pendingTransactions.length}</p>
                </div>
                
                <button
                  onClick={mineBlock}
                  disabled={miningStatus === 'mining' || pendingTransactions.length === 0}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    miningStatus === 'mining' || pendingTransactions.length === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {miningStatus === 'mining' ? 'Mining...' : 'Mine Block'}
                </button>
              </div>
            </div>

            {/* Network Analytics */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Analytics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-yellow-200 text-sm">Active Miners</p>
                  <p className="text-2xl font-bold text-white">{analytics.activeMiners}</p>
                </div>
                
                <div>
                  <p className="text-yellow-200 text-sm">Avg Block Time</p>
                  <p className="text-lg font-semibold text-white">
                    {analytics.blockTimeHistory.length > 0 
                      ? Math.round(analytics.blockTimeHistory.reduce((a, b) => a + b, 0) / analytics.blockTimeHistory.length)
                      : 0}s
                  </p>
                </div>
                
                <div>
                  <p className="text-yellow-200 text-sm">Tx/Min</p>
                  <p className="text-lg font-semibold text-white">
                    {analytics.transactionsPerMinute.length > 0 
                      ? Math.round(analytics.transactionsPerMinute.reduce((a, b) => a + b, 0) / analytics.transactionsPerMinute.length)
                      : 0}
                  </p>
                </div>
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Index</span>
                    <span className="text-lg font-semibold text-white">{selectedBlock.index}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Timestamp</span>
                    <span className="text-lg font-semibold text-white">{new Date(selectedBlock.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Nonce</span>
                    <span className="text-lg font-semibold text-white">{selectedBlock.nonce}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Difficulty</span>
                    <span className="text-lg font-semibold text-white">{selectedBlock.difficulty}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Hash Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm">Block Hash</p>
                    <p className="text-white font-mono text-xs break-all">{selectedBlock.hash}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Previous Hash</p>
                    <p className="text-white font-mono text-xs break-all">{selectedBlock.previousHash}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transactions */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">📋 Transactions ({selectedBlock.transactions.length})</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedBlock.transactions.map((tx, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{tx.from} → {tx.to}</p>
                          <p className="text-gray-300 text-sm">{tx.amount} BTC</p>
                          <p className="text-gray-400 text-xs">Fee: {tx.fee} BTC</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                          <p className="text-gray-400 text-xs">{tx.hash.substring(0, 12)}...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Charts */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">📈 Network Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Transactions per Minute</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-end justify-between h-32">
                  {analytics.transactionsPerMinute.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-purple-500 rounded-t w-4"
                        style={{ height: `${(value / 30) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Block Time (seconds)</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-end justify-between h-32">
                  {analytics.blockTimeHistory.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-4"
                        style={{ height: `${(value / 120) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{value}s</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Network Difficulty</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-end justify-between h-32">
                  {analytics.networkDifficulty.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-yellow-500 rounded-t w-4"
                        style={{ height: `${(value / 10) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{value.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Contract Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced Blockchain Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Supply Chain Tracking</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Product traceability</li>
                <li>• Quality assurance</li>
                <li>• Compliance verification</li>
                <li>• Real-time monitoring</li>
                <li>• Audit trails</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Smart Contracts</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Automated execution</li>
                <li>• Conditional logic</li>
                <li>• Multi-party agreements</li>
                <li>• Immutable records</li>
                <li>• Cost optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Security & Compliance</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Cryptographic security</li>
                <li>• Consensus mechanisms</li>
                <li>• Regulatory compliance</li>
                <li>• Data privacy</li>
                <li>• Fraud prevention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainDemo; 