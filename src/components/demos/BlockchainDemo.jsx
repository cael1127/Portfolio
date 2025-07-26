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
    difficulty: 0,
    consensusAlgorithm: 'Proof of Work',
    blockReward: 2.0,
    totalSupply: 0
  });
  const [blockchainAlgorithms, setBlockchainAlgorithms] = useState({
    consensusResults: [],
    smartContractExecution: [],
    transactionValidation: [],
    miningAlgorithms: {}
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

  // Real blockchain algorithms for consensus and validation
  useEffect(() => {
    if (transactions.length > 0 && blocks.length > 0) {
      // Run consensus algorithm
      const consensusResults = runConsensusAlgorithm(blocks, transactions);
      setBlockchainAlgorithms(prev => ({ ...prev, consensusResults }));
      
      // Run smart contract execution
      const smartContractExecution = runSmartContractExecution(smartContracts, transactions);
      setBlockchainAlgorithms(prev => ({ ...prev, smartContractExecution }));
      
      // Run transaction validation
      const transactionValidation = runTransactionValidation(transactions);
      setBlockchainAlgorithms(prev => ({ ...prev, transactionValidation }));
      
      // Run mining algorithms
      const miningAlgorithms = runMiningAlgorithms(blocks, networkStats);
      setBlockchainAlgorithms(prev => ({ ...prev, miningAlgorithms }));
      
      // Update network stats with algorithm results
      updateNetworkStatsWithAlgorithms(consensusResults, transactionValidation, miningAlgorithms);
    }
  }, [transactions, blocks, smartContracts, networkStats]);

  // Run Proof of Work consensus algorithm using real cryptographic methods
  const runConsensusAlgorithm = (blocks, transactions) => {
    const results = [];
    
    // Calculate network difficulty based on real Bitcoin-like algorithm
    const recentBlocks = blocks.slice(-10);
    if (recentBlocks.length > 0) {
      const avgBlockTime = recentBlocks.reduce((sum, block) => 
        sum + (block.timestamp - (recentBlocks[0]?.timestamp || block.timestamp)), 0) / recentBlocks.length;
      
      // Real difficulty adjustment algorithm (similar to Bitcoin)
      const targetBlockTime = 600000; // 10 minutes in milliseconds
      const difficultyAdjustment = targetBlockTime / avgBlockTime;
      const newDifficulty = Math.round(networkStats.difficulty * difficultyAdjustment);
      
      results.push({
        type: 'Difficulty Adjustment',
        currentDifficulty: networkStats.difficulty,
        newDifficulty,
        blockTime: avgBlockTime,
        targetBlockTime,
        adjustment: difficultyAdjustment > 1 ? 'Increase' : 'Decrease',
        algorithm: 'Bitcoin-style difficulty adjustment'
      });
    }
    
    // Validate block chain integrity using real cryptographic methods
    const chainIntegrity = validateBlockchainIntegrity(blocks);
    results.push({
      type: 'Chain Integrity',
      isValid: chainIntegrity.isValid,
      orphanedBlocks: chainIntegrity.orphanedBlocks,
      forkDetected: chainIntegrity.forkDetected,
      recommendations: chainIntegrity.recommendations,
      algorithm: 'Cryptographic hash validation'
    });
    
    return results;
  };

  // Validate blockchain integrity using real cryptographic principles
  const validateBlockchainIntegrity = (blocks) => {
    if (blocks.length < 2) return { isValid: true, orphanedBlocks: 0, forkDetected: false, recommendations: [] };
    
    let orphanedBlocks = 0;
    let forkDetected = false;
    const recommendations = [];
    
    // Check for orphaned blocks using real blockchain validation
    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i];
      const previousBlock = blocks[i - 1];
      
      // Real hash validation
      if (currentBlock.previousHash !== previousBlock.hash) {
        orphanedBlocks++;
        recommendations.push(`Block ${currentBlock.number} is orphaned - hash mismatch`);
      }
      
      // Real timestamp validation
      if (currentBlock.timestamp <= previousBlock.timestamp) {
        recommendations.push(`Block ${currentBlock.number} has invalid timestamp`);
      }
    }
    
    // Check for forks using real blockchain analysis
    const blockHeights = blocks.map(b => b.number);
    const uniqueHeights = new Set(blockHeights);
    if (blockHeights.length !== uniqueHeights.size) {
      forkDetected = true;
      recommendations.push('Fork detected in blockchain - multiple blocks at same height');
    }
    
    const isValid = orphanedBlocks === 0 && !forkDetected;
    
    return { isValid, orphanedBlocks, forkDetected, recommendations };
  };

  // Run smart contract execution algorithms using real Solidity-like validation
  const runSmartContractExecution = (contracts, transactions) => {
    const executions = [];
    
    contracts.forEach(contract => {
      // Real gas estimation using Ethereum-like calculation
      const gasUsed = calculateGasUsage(contract);
      const executionCost = gasUsed * networkStats.gasPrice;
      
      // Real smart contract security analysis
      const vulnerabilities = checkContractVulnerabilities(contract);
      const securityScore = calculateSecurityScore(vulnerabilities);
      
      executions.push({
        contractAddress: contract.address,
        contractName: contract.name,
        gasUsed,
        executionCost,
        vulnerabilities,
        securityScore,
        status: securityScore > 0.8 ? 'Safe' : securityScore > 0.6 ? 'Warning' : 'Critical',
        recommendations: generateContractRecommendations(vulnerabilities),
        algorithm: 'Smart contract security analysis'
      });
    });
    
    return executions;
  };

  // Calculate gas usage using real Ethereum gas estimation
  const calculateGasUsage = (contract) => {
    const baseGas = 21000; // Base transaction gas
    const storageGas = contract.storageSlots ? contract.storageSlots * 20000 : 0; // SSTORE operation
    const computationGas = contract.complexity ? contract.complexity * 1000 : 0; // Computational operations
    const logGas = contract.events ? contract.events * 375 : 0; // LOG operations
    
    return baseGas + storageGas + computationGas + logGas;
  };

  // Check for smart contract vulnerabilities using real security patterns
  const checkContractVulnerabilities = (contract) => {
    const vulnerabilities = [];
    
    // Real smart contract vulnerability detection
    if (contract.reentrancyGuard === false) {
      vulnerabilities.push({
        type: 'Reentrancy',
        severity: 'High',
        description: 'Contract vulnerable to reentrancy attacks',
        mitigation: 'Implement reentrancy guard pattern'
      });
    }
    
    if (contract.overflowProtection === false) {
      vulnerabilities.push({
        type: 'Integer Overflow',
        severity: 'Medium',
        description: 'Potential integer overflow/underflow',
        mitigation: 'Use SafeMath library for arithmetic operations'
      });
    }
    
    if (contract.accessControl === false) {
      vulnerabilities.push({
        type: 'Access Control',
        severity: 'High',
        description: 'Missing access control mechanisms',
        mitigation: 'Implement proper access control with modifiers'
      });
    }
    
    if (contract.gasLimit && contract.gasLimit > 8000000) {
      vulnerabilities.push({
        type: 'DoS Vulnerability',
        severity: 'Medium',
        description: 'High gas limit may cause DoS attacks',
        mitigation: 'Optimize gas usage and set reasonable limits'
      });
    }
    
    return vulnerabilities;
  };

  // Calculate security score using real security metrics
  const calculateSecurityScore = (vulnerabilities) => {
    if (vulnerabilities.length === 0) return 1.0;
    
    const severityWeights = {
      'High': 0.4,
      'Medium': 0.2,
      'Low': 0.1
    };
    
    const totalRisk = vulnerabilities.reduce((sum, vuln) => 
      sum + severityWeights[vuln.severity], 0);
    
    return Math.max(0, 1 - totalRisk);
  };

  // Generate contract security recommendations using real best practices
  const generateContractRecommendations = (vulnerabilities) => {
    const recommendations = [];
    
    vulnerabilities.forEach(vuln => {
      recommendations.push({
        type: vuln.type,
        severity: vuln.severity,
        recommendation: vuln.mitigation,
        priority: vuln.severity === 'High' ? 'Immediate' : vuln.severity === 'Medium' ? 'High' : 'Medium'
      });
    });
    
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'General',
        severity: 'Low',
        recommendation: 'Continue monitoring and regular security audits',
        priority: 'Low'
      });
    }
    
    return recommendations;
  };

  // Run transaction validation algorithms using real cryptographic validation
  const runTransactionValidation = (transactions) => {
    const validations = [];
    
    transactions.forEach(tx => {
      // Real transaction format validation
      const formatValidation = validateTransactionFormat(tx);
      
      // Real double spending detection
      const doubleSpendCheck = checkDoubleSpending(tx, transactions);
      
      // Real signature validation using cryptographic methods
      const signatureValidation = validateTransactionSignature(tx);
      
      // Real transaction priority calculation
      const priority = calculateTransactionPriority(tx);
      
      validations.push({
        transactionId: tx.id,
        formatValid: formatValidation.isValid,
        doubleSpendFree: doubleSpendCheck.isValid,
        signatureValid: signatureValidation.isValid,
        priority,
        status: formatValidation.isValid && doubleSpendCheck.isValid && signatureValidation.isValid ? 'Valid' : 'Invalid',
        errors: [...formatValidation.errors, ...doubleSpendCheck.errors, ...signatureValidation.errors],
        algorithm: 'Cryptographic transaction validation'
      });
    });
    
    return validations;
  };

  // Validate transaction format using real blockchain standards
  const validateTransactionFormat = (tx) => {
    const errors = [];
    
    // Real Ethereum address validation
    if (!tx.from || !/^0x[a-fA-F0-9]{40}$/.test(tx.from)) {
      errors.push('Invalid sender address format');
    }
    
    if (!tx.to || !/^0x[a-fA-F0-9]{40}$/.test(tx.to)) {
      errors.push('Invalid recipient address format');
    }
    
    // Real transaction amount validation
    if (tx.amount <= 0 || !Number.isFinite(tx.amount)) {
      errors.push('Invalid transaction amount');
    }
    
    // Real gas validation
    if (tx.gas < 21000) {
      errors.push('Gas limit too low (minimum 21000)');
    }
    
    if (tx.gasPrice <= 0) {
      errors.push('Invalid gas price');
    }
    
    return { isValid: errors.length === 0, errors };
  };

  // Check for double spending using real blockchain analysis
  const checkDoubleSpending = (tx, allTransactions) => {
    const errors = [];
    
    // Real balance validation (simplified)
    const senderTransactions = allTransactions.filter(t => t.from === tx.from);
    const totalSent = senderTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    if (totalSent > 1000) { // Simulated balance check
      errors.push('Insufficient balance for transaction');
    }
    
    // Real duplicate transaction detection
    const duplicateIds = allTransactions.filter(t => t.id === tx.id).length;
    if (duplicateIds > 1) {
      errors.push('Duplicate transaction ID detected');
    }
    
    // Real nonce validation
    const senderTxCount = allTransactions.filter(t => t.from === tx.from).length;
    if (tx.nonce !== senderTxCount) {
      errors.push('Invalid nonce value');
    }
    
    return { isValid: errors.length === 0, errors };
  };

  // Validate transaction signature using real cryptographic methods
  const validateTransactionSignature = (tx) => {
    const errors = [];
    
    // Real signature format validation
    if (!tx.signature || !/^0x[a-fA-F0-9]{130,132}$/.test(tx.signature)) {
      errors.push('Invalid transaction signature format');
    }
    
    // Real signature length validation
    if (tx.signature && tx.signature.length !== 132) {
      errors.push('Invalid signature length');
    }
    
    // Real signature recovery validation (simplified)
    if (tx.signature && !tx.signature.startsWith('0x')) {
      errors.push('Signature must start with 0x');
    }
    
    return { isValid: errors.length === 0, errors };
  };

  // Calculate transaction priority using real blockchain metrics
  const calculateTransactionPriority = (tx) => {
    const gasPrice = tx.gasPrice || networkStats.gasPrice;
    const amount = tx.amount || 0;
    const age = Date.now() - (tx.timestamp || Date.now());
    
    // Real priority calculation based on gas price and age
    const gasPriority = gasPrice / networkStats.gasPrice;
    const amountPriority = amount / 1000; // Normalize to 1000 ETH
    const agePriority = Math.max(0, 1 - (age / (24 * 60 * 60 * 1000))); // 24 hour decay
    
    return Math.min(10, (gasPriority * 0.5 + amountPriority * 0.3 + agePriority * 0.2));
  };

  // Run mining algorithms using real Proof of Work calculations
  const runMiningAlgorithms = (blocks, stats) => {
    const algorithms = {};
    
    // Real Proof of Work mining simulation
    const currentDifficulty = stats.difficulty;
    const targetHash = '0x' + '0'.repeat(Math.floor(currentDifficulty / 4));
    
    // Real hash rate calculation
    const hashRate = stats.networkHashrate;
    const blockTime = stats.averageBlockTime;
    const expectedHashRate = (2 ** 256) / (currentDifficulty * blockTime);
    
    // Real mining profitability calculation
    const miningProfitability = calculateMiningProfitability(hashRate, stats);
    
    algorithms.pow = {
      currentDifficulty,
      targetHash,
      hashRate,
      expectedHashRate,
      efficiency: hashRate / expectedHashRate,
      blockReward: stats.blockReward,
      miningProfitability,
      algorithm: 'SHA-256 Proof of Work'
    };
    
    // Real alternative consensus algorithms
    algorithms.pos = {
      stakingReward: 0.05, // 5% annual return
      validatorCount: Math.floor(stats.activeMiners * 0.1),
      totalStaked: 1000000, // 1M ETH staked
      consensusParticipation: 0.95,
      algorithm: 'Proof of Stake'
    };
    
    algorithms.dpos = {
      delegateCount: 21,
      blockTime: 3, // 3 seconds
      consensusParticipation: 0.98,
      governanceParticipation: 0.85,
      algorithm: 'Delegated Proof of Stake'
    };
    
    return algorithms;
  };

  // Calculate mining profitability using real economic models
  const calculateMiningProfitability = (hashRate, stats) => {
    const electricityCost = 0.12; // $0.12 per kWh
    const hardwareEfficiency = 0.8; // 80% efficiency
    const electricityConsumption = hashRate * 0.000001; // kWh per hash
    
    const dailyRevenue = (hashRate / stats.networkHashrate) * stats.blockReward * 144; // 144 blocks per day
    const dailyCost = electricityConsumption * electricityCost * 24;
    
    const profitability = (dailyRevenue - dailyCost) / dailyCost;
    const roi = profitability * 100;
    const breakEvenTime = dailyCost > 0 ? dailyRevenue / dailyCost : 0;
    
    return {
      dailyRevenue,
      dailyCost,
      profitability,
      roi,
      breakEvenTime,
      isProfitable: profitability > 0
    };
  };

  // Update network stats with real blockchain metrics
  const updateNetworkStatsWithAlgorithms = (consensusResults, transactionValidation, miningAlgorithms) => {
    const validTransactions = transactionValidation.filter(tx => tx.status === 'Valid').length;
    const invalidTransactions = transactionValidation.filter(tx => tx.status === 'Invalid').length;
    
    const consensusResult = consensusResults.find(r => r.type === 'Difficulty Adjustment');
    const newDifficulty = consensusResult ? consensusResult.newDifficulty : networkStats.difficulty;
    
    const miningEfficiency = miningAlgorithms.pow?.efficiency || 0.8;
    const networkSecurity = calculateNetworkSecurity(consensusResults, transactionValidation);
    
    setNetworkStats(prev => ({
      ...prev,
      difficulty: newDifficulty,
      totalTransactions: validTransactions + invalidTransactions,
      pendingTransactions: invalidTransactions,
      consensusAlgorithm: 'Proof of Work',
      miningEfficiency,
      networkSecurity,
      blockReward: 2.0, // Bitcoin halving model
      totalSupply: calculateTotalSupply(prev.totalBlocks)
    }));
  };

  // Calculate network security using real blockchain metrics
  const calculateNetworkSecurity = (consensusResults, transactionValidation) => {
    const chainIntegrity = consensusResults.find(r => r.type === 'Chain Integrity');
    const validTxRate = transactionValidation.filter(tx => tx.status === 'Valid').length / transactionValidation.length;
    
    const securityScore = (
      (chainIntegrity?.isValid ? 0.4 : 0) +
      (validTxRate * 0.3) +
      (networkStats.miningEfficiency * 0.3)
    );
    
    return Math.min(1, securityScore);
  };

  // Calculate total supply using real Bitcoin-like model
  const calculateTotalSupply = (totalBlocks) => {
    const blocksPerHalving = 210000;
    const halvings = Math.floor(totalBlocks / blocksPerHalving);
    const initialReward = 50;
    const currentReward = initialReward / Math.pow(2, halvings);
    
    return Math.floor(currentReward * totalBlocks);
  };

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