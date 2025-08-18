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
    gasPrice: 20,
    activeMiners: 0,
    difficulty: 1,
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

  // Deterministic Blockchain Implementation
  const blockchainSystem = {
    // Deterministic transaction generation
    generateTransaction: (index) => {
      const addresses = [
        '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        '0x8ba1f109551bD432803012645Hac136c22C177e9',
        '0x147B8eb97fD247D06C4006D269c90C1908Fb5D54',
        '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
        '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB'
      ];
      
      // Deterministic transaction based on index
      const fromIndex = index % addresses.length;
      const toIndex = (index + 1) % addresses.length;
      const amount = ((index * 7 + 13) % 1000) + 1;
      const gas = ((index * 11 + 17) % 80) + 21;
      
      return {
        id: `tx_${index}`,
        from: addresses[fromIndex],
        to: addresses[toIndex],
        amount: amount,
        gas: gas,
        gasPrice: 20,
        status: 'pending',
        blockNumber: null,
        timestamp: new Date(Date.now() + index * 1000).toISOString(),
        nonce: index,
        hash: `0x${index.toString(16).padStart(64, '0')}`
      };
    },

    // Deterministic block mining
    mineBlock: (transactions, previousBlock, minerAddress) => {
      const blockNumber = previousBlock ? previousBlock.number + 1 : 0;
      const timestamp = new Date(Date.now() + blockNumber * 10000).toISOString();
      
      // Deterministic difficulty adjustment
      const difficulty = Math.max(1, Math.floor(blockNumber / 10) + 1);
      
      // Deterministic block hash calculation
      const blockData = {
        number: blockNumber,
        timestamp: timestamp,
        transactions: transactions,
        previousHash: previousBlock ? previousBlock.hash : '0x0000000000000000000000000000000000000000000000000000000000000000',
        miner: minerAddress,
        difficulty: difficulty,
        nonce: 0
      };
      
      // Find valid nonce deterministically
      let nonce = 0;
      let hash = '';
      do {
        blockData.nonce = nonce;
        hash = blockchainSystem.calculateHash(JSON.stringify(blockData));
        nonce++;
      } while (!hash.startsWith('0'.repeat(difficulty)) && nonce < 1000);
      
      const block = {
        ...blockData,
        hash: hash,
        gasUsed: transactions.reduce((sum, tx) => sum + tx.gas, 0),
        gasLimit: 30000000,
        size: JSON.stringify(blockData).length,
        transactionsCount: transactions.length
      };
      
      return block;
    },

    // Deterministic hash calculation (simplified)
    calculateHash: (data) => {
      let hash = 0;
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash + char) & 0xffffffff;
      }
      return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
    },

    // Deterministic consensus mechanism
    runConsensus: (blocks, transactions) => {
      const consensusResults = [];
      
      // Validate each block
      blocks.forEach((block, index) => {
        const isValid = blockchainSystem.validateBlock(block, index === 0 ? null : blocks[index - 1]);
        consensusResults.push({
          blockNumber: block.number,
          isValid: isValid,
          consensus: isValid ? 'Agreed' : 'Disagreed',
          timestamp: block.timestamp
        });
      });
      
      // Calculate network statistics
      const totalTransactions = blocks.reduce((sum, block) => sum + block.transactionsCount, 0);
      const pendingTransactions = transactions.filter(tx => tx.status === 'pending').length;
      const networkHashrate = blocks.length * 1000; // Simplified calculation
      const averageBlockTime = blocks.length > 1 ? 
        (new Date(blocks[blocks.length - 1].timestamp) - new Date(blocks[0].timestamp)) / (blocks.length - 1) / 1000 : 0;
      
      setNetworkStats(prev => ({
        ...prev,
        totalTransactions,
        pendingTransactions,
        totalBlocks: blocks.length,
        networkHashrate,
        averageBlockTime: Math.round(averageBlockTime),
        activeMiners: miners.length
      }));
      
      return consensusResults;
    },

    // Block validation
    validateBlock: (block, previousBlock) => {
      if (!block) return false;
      
      // Check block structure
      if (!block.hash || !block.number || !block.timestamp) return false;
      
      // Check previous block link
      if (previousBlock && block.previousHash !== previousBlock.hash) return false;
      
      // Check block number sequence
      if (previousBlock && block.number !== previousBlock.number + 1) return false;
      
      // Check timestamp (must be after previous block)
      if (previousBlock && new Date(block.timestamp) <= new Date(previousBlock.timestamp)) return false;
      
      // Validate hash difficulty
      const expectedHash = blockchainSystem.calculateHash(JSON.stringify({
        ...block,
        hash: undefined
      }));
      return expectedHash.startsWith('0'.repeat(block.difficulty));
    },

    // Smart contract deployment
    deploySmartContract: (contractData, index) => {
      const contract = {
        address: `0x${index.toString(16).padStart(40, '0')}`,
        name: contractData.name,
        type: contractData.type,
        gasUsed: ((index * 13 + 17) % 50000) + 50000,
        status: 'deployed',
        timestamp: new Date(Date.now() + index * 5000).toISOString(),
        creator: contractData.creator,
        bytecode: `0x${index.toString(16).padStart(64, '0')}`,
        abi: contractData.abi || []
      };
      
      return contract;
    },

    // Transaction validation
    validateTransaction: (transaction) => {
      const validations = [];
      
      // Check transaction structure
      if (!transaction.from || !transaction.to || !transaction.amount) {
        validations.push({ type: 'Structure', isValid: false, message: 'Invalid transaction structure' });
      } else {
        validations.push({ type: 'Structure', isValid: true, message: 'Valid structure' });
      }
      
      // Check amount
      if (transaction.amount <= 0) {
        validations.push({ type: 'Amount', isValid: false, message: 'Amount must be positive' });
      } else {
        validations.push({ type: 'Amount', isValid: true, message: 'Valid amount' });
      }
      
      // Check gas
      if (transaction.gas < 21000) {
        validations.push({ type: 'Gas', isValid: false, message: 'Insufficient gas' });
      } else {
        validations.push({ type: 'Gas', isValid: true, message: 'Sufficient gas' });
      }
      
      // Check nonce (simplified)
      const nonceValid = transaction.nonce >= 0;
      validations.push({ 
        type: 'Nonce', 
        isValid: nonceValid, 
        message: nonceValid ? 'Valid nonce' : 'Invalid nonce' 
      });
      
      return validations;
    }
  };

  // Initialize demo
  useEffect(() => {
    // Generate initial miners
    const initialMiners = [
      { address: '0xMiner1', hashRate: 1000, status: 'active' },
      { address: '0xMiner2', hashRate: 800, status: 'active' },
      { address: '0xMiner3', hashRate: 1200, status: 'active' }
    ];
    setMiners(initialMiners);
    
    // Generate initial transactions
    const initialTransactions = Array.from({ length: 10 }, (_, i) => 
      blockchainSystem.generateTransaction(i)
    );
    setTransactions(initialTransactions);
    
    // Generate genesis block
    const genesisBlock = blockchainSystem.mineBlock([], null, initialMiners[0].address);
    setBlocks([genesisBlock]);
    
    // Start mining process
    const miningInterval = setInterval(() => {
      if (transactions.length > 0) {
        // Mine new block with pending transactions
        const pendingTx = transactions.filter(tx => tx.status === 'pending').slice(0, 5);
        const miner = initialMiners[Math.floor((blocks.length) % initialMiners.length)];
        
        const newBlock = blockchainSystem.mineBlock(pendingTx, blocks[blocks.length - 1], miner.address);
        
        // Update transactions status
        const updatedTransactions = transactions.map(tx => 
          pendingTx.some(pendingTx => pendingTx.id === tx.id) 
            ? { ...tx, status: 'confirmed', blockNumber: newBlock.number }
            : tx
        );
        
        // Add new transactions
        const newTransaction = blockchainSystem.generateTransaction(transactions.length);
        
        setBlocks(prev => [...prev, newBlock]);
        setTransactions(prev => [newTransaction, ...updatedTransactions]);
        
        // Run consensus
        const consensusResults = blockchainSystem.runConsensus([...blocks, newBlock], [newTransaction, ...updatedTransactions]);
        setBlockchainAlgorithms(prev => ({
          ...prev,
          consensusResults: consensusResults.slice(-5)
        }));
      }
    }, 5000);
    
    return () => clearInterval(miningInterval);
  }, []);

  // Update smart contracts
  useEffect(() => {
    const contractTypes = ['ERC20', 'ERC721', 'ERC1155', 'Custom'];
    const contractNames = ['Token', 'NFT', 'MultiToken', 'Governance', 'DeFi'];
    
    const newContracts = Array.from({ length: 5 }, (_, i) => 
      blockchainSystem.deploySmartContract({
        name: `${contractNames[i % contractNames.length]}${i + 1}`,
        type: contractTypes[i % contractTypes.length],
        creator: miners[i % miners.length]?.address || '0xUnknown'
      }, i)
    );
    
    setSmartContracts(newContracts);
  }, [miners]);

  // Update transaction validation
  useEffect(() => {
    if (transactions.length > 0) {
      const validations = blockchainSystem.validateTransaction(transactions[0]);
      setBlockchainAlgorithms(prev => ({
        ...prev,
        transactionValidation: validations
      }));
    }
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">⛓️ Blockchain System Demo</h1>
          <p className="text-gray-300 text-lg">
            Deterministic blockchain implementation with proof-of-work consensus, smart contracts, and transaction validation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Network Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Network Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{networkStats.totalBlocks}</div>
                  <div className="text-sm text-gray-400">Total Blocks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{networkStats.totalTransactions}</div>
                  <div className="text-sm text-gray-400">Total Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{networkStats.pendingTransactions}</div>
                  <div className="text-sm text-gray-400">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{networkStats.activeMiners}</div>
                  <div className="text-sm text-gray-400">Active Miners</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>Difficulty: {networkStats.difficulty}</div>
                <div>Block Reward: {networkStats.blockReward} ETH</div>
                <div>Gas Price: {networkStats.gasPrice} Gwei</div>
                <div>Consensus: {networkStats.consensusAlgorithm}</div>
              </div>
            </div>

            {/* Latest Blocks */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Latest Blocks</h2>
              <div className="space-y-3">
                {blocks.slice(-5).reverse().map(block => (
                  <div key={block.number} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-blue-400">Block #{block.number}</div>
                        <div className="text-sm text-gray-300">Hash: {block.hash.substring(0, 16)}...</div>
                        <div className="text-xs text-gray-400">
                          {block.transactionsCount} transactions | {block.gasUsed} gas used
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{block.miner}</div>
                        <div className="text-xs text-gray-400">{new Date(block.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Contracts */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Smart Contracts</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {smartContracts.map(contract => (
                  <div key={contract.address} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-green-400">{contract.name}</div>
                        <div className="text-sm text-gray-300">{contract.type}</div>
                        <div className="text-xs text-gray-400">Address: {contract.address.substring(0, 16)}...</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{contract.gasUsed} gas</div>
                        <div className="text-xs text-green-400">{contract.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Consensus Results */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Consensus Results</h3>
              <div className="space-y-2">
                {blockchainAlgorithms.consensusResults.slice(-3).map((result, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">Block #{result.blockNumber}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      result.isValid ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                    }`}>
                      {result.consensus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Validation */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Transaction Validation</h3>
              <div className="space-y-2">
                {blockchainAlgorithms.transactionValidation.map((validation, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{validation.type}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      validation.isValid ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                    }`}>
                      {validation.isValid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Miners */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Active Miners</h3>
              <div className="space-y-2">
                {miners.map(miner => (
                  <div key={miner.address} className="flex justify-between items-center">
                    <span className="text-sm">{miner.address}</span>
                    <span className="text-xs text-blue-400">{miner.hashRate} H/s</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Blockchain Implementation"
          code={`
// Deterministic Blockchain Implementation
class BlockchainSystem {
  constructor() {
    this.difficulty = 1;
    this.blockReward = 2.0;
  }

  // Deterministic block mining
  mineBlock(transactions, previousBlock, minerAddress) {
    const blockNumber = previousBlock ? previousBlock.number + 1 : 0;
    const timestamp = new Date(Date.now() + blockNumber * 10000).toISOString();
    
    // Deterministic difficulty adjustment
    const difficulty = Math.max(1, Math.floor(blockNumber / 10) + 1);
    
    const blockData = {
      number: blockNumber,
      timestamp: timestamp,
      transactions: transactions,
      previousHash: previousBlock ? previousBlock.hash : '0x0000...',
      miner: minerAddress,
      difficulty: difficulty,
      nonce: 0
    };
    
    // Find valid nonce deterministically
    let nonce = 0;
    let hash = '';
    do {
      blockData.nonce = nonce;
      hash = this.calculateHash(JSON.stringify(blockData));
      nonce++;
    } while (!hash.startsWith('0'.repeat(difficulty)) && nonce < 1000);
    
    return {
      ...blockData,
      hash: hash,
      gasUsed: transactions.reduce((sum, tx) => sum + tx.gas, 0),
      size: JSON.stringify(blockData).length
    };
  }

  // Deterministic hash calculation
  calculateHash(data) {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash + char) & 0xffffffff;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  }

  // Block validation
  validateBlock(block, previousBlock) {
    if (!block) return false;
    
    // Check block structure
    if (!block.hash || !block.number || !block.timestamp) return false;
    
    // Check previous block link
    if (previousBlock && block.previousHash !== previousBlock.hash) return false;
    
    // Check block number sequence
    if (previousBlock && block.number !== previousBlock.number + 1) return false;
    
    // Validate hash difficulty
    const expectedHash = this.calculateHash(JSON.stringify({
      ...block,
      hash: undefined
    }));
    return expectedHash.startsWith('0'.repeat(block.difficulty));
  }

  // Transaction validation
  validateTransaction(transaction) {
    const validations = [];
    
    // Check transaction structure
    if (!transaction.from || !transaction.to || !transaction.amount) {
      validations.push({ type: 'Structure', isValid: false });
    } else {
      validations.push({ type: 'Structure', isValid: true });
    }
    
    // Check amount
    if (transaction.amount <= 0) {
      validations.push({ type: 'Amount', isValid: false });
    } else {
      validations.push({ type: 'Amount', isValid: true });
    }
    
    // Check gas
    if (transaction.gas < 21000) {
      validations.push({ type: 'Gas', isValid: false });
    } else {
      validations.push({ type: 'Gas', isValid: true });
    }
    
    return validations;
  }
}
          `}
        />
      )}
    </div>
  );
};

export default BlockchainDemo; 