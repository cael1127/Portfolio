import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const BlockchainAdvanced = () => {
  const [blockchainData, setBlockchainData] = useState({
    blocks: [],
    transactions: [],
    smartContracts: [],
    nfts: [],
    defiProtocols: []
  });
  const [selectedTab, setSelectedTab] = useState('blocks');
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isMining, setIsMining] = useState(false);

  // Initialize blockchain data
  useEffect(() => {
    const generateBlocks = () => {
      const blocks = [];
      for (let i = 0; i < 10; i++) {
        blocks.push({
          id: i,
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          previousHash: i > 0 ? blocks[i-1]?.hash : '0x0000000000000000000000000000000000000000000000000000000000000000',
          timestamp: Date.now() - (10 - i) * 60000,
          transactions: Math.floor(Math.random() * 50) + 10,
          difficulty: Math.floor(Math.random() * 5) + 1,
          nonce: Math.floor(Math.random() * 1000000),
          miner: `0x${Math.random().toString(16).substr(2, 40)}`,
          gasUsed: Math.floor(Math.random() * 1000000) + 500000,
          gasLimit: 15000000
        });
      }
      return blocks;
    };

    const generateTransactions = () => {
      const transactions = [];
      const types = ['transfer', 'smart_contract', 'nft_mint', 'defi_swap', 'staking'];
      const statuses = ['confirmed', 'pending', 'failed'];
      
      for (let i = 0; i < 20; i++) {
        transactions.push({
          id: `0x${Math.random().toString(16).substr(2, 64)}`,
          from: `0x${Math.random().toString(16).substr(2, 40)}`,
          to: `0x${Math.random().toString(16).substr(2, 40)}`,
          value: (Math.random() * 10).toFixed(4),
          gas: Math.floor(Math.random() * 21000) + 21000,
          gasPrice: (Math.random() * 50 + 20).toFixed(2),
          type: types[Math.floor(Math.random() * types.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timestamp: Date.now() - Math.random() * 3600000,
          blockNumber: Math.floor(Math.random() * 1000000) + 1
        });
      }
      return transactions;
    };

    const generateSmartContracts = () => {
      return [
        {
          address: '0x1234567890123456789012345678901234567890',
          name: 'Uniswap V3',
          type: 'DEX',
          balance: '1,234.56 ETH',
          transactions: 15420,
          gasUsed: '2.3M',
          verified: true
        },
        {
          address: '0x2345678901234567890123456789012345678901',
          name: 'Compound Protocol',
          type: 'Lending',
          balance: '567.89 ETH',
          transactions: 8920,
          gasUsed: '1.8M',
          verified: true
        },
        {
          address: '0x3456789012345678901234567890123456789012',
          name: 'CryptoKitties',
          type: 'NFT',
          balance: '89.12 ETH',
          transactions: 4560,
          gasUsed: '950K',
          verified: true
        }
      ];
    };

    const generateNFTs = () => {
      const nfts = [];
      const collections = ['Bored Ape Yacht Club', 'CryptoPunks', 'Doodles', 'Azuki'];
      const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
      
      for (let i = 0; i < 15; i++) {
        nfts.push({
          id: i + 1,
          name: `NFT #${Math.floor(Math.random() * 10000)}`,
          collection: collections[Math.floor(Math.random() * collections.length)],
          owner: `0x${Math.random().toString(16).substr(2, 40)}`,
          price: (Math.random() * 10).toFixed(2),
          rarity: rarities[Math.floor(Math.random() * rarities.length)],
          attributes: Math.floor(Math.random() * 8) + 2,
          mintDate: Date.now() - Math.random() * 7776000000,
          lastSale: Math.random() > 0.5 ? (Math.random() * 5).toFixed(2) : null
        });
      }
      return nfts;
    };

    const generateDeFiProtocols = () => {
      return [
        {
          name: 'Uniswap V3',
          type: 'DEX',
          tvl: '$2.1B',
          volume24h: '$156.7M',
          apy: '12.5%',
          users: 125000
        },
        {
          name: 'Compound',
          type: 'Lending',
          tvl: '$1.8B',
          volume24h: '$89.3M',
          apy: '8.2%',
          users: 89000
        },
        {
          name: 'Aave',
          type: 'Lending',
          tvl: '$1.5B',
          volume24h: '$67.4M',
          apy: '9.1%',
          users: 76000
        },
        {
          name: 'Curve Finance',
          type: 'StableSwap',
          tvl: '$1.2B',
          volume24h: '$234.1M',
          apy: '15.3%',
          users: 45000
        }
      ];
    };

    setBlockchainData({
      blocks: generateBlocks(),
      transactions: generateTransactions(),
      smartContracts: generateSmartContracts(),
      nfts: generateNFTs(),
      defiProtocols: generateDeFiProtocols()
    });
  }, []);

  const demoCode = `import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

const BlockchainAdvanced = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState({});
  const [transactions, setTransactions] = useState([]);
  
  // Initialize Web3 connection
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      }
    };
    
    initWeb3();
  }, []);
  
  // Smart Contract Interaction
  const deployContract = async (contractName, constructorArgs) => {
    try {
      const contract = new web3.eth.Contract(contractABI);
      
      const deployTransaction = contract.deploy({
        data: contractBytecode,
        arguments: constructorArgs
      });
      
      const gasEstimate = await deployTransaction.estimateGas();
      
      const deployedContract = await deployTransaction.send({
        from: account,
        gas: gasEstimate
      });
      
      return deployedContract.options.address;
    } catch (error) {
      console.error('Contract deployment failed:', error);
    }
  };
  
  // NFT Minting Function
  const mintNFT = async (tokenURI, price) => {
    try {
      const nftContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
      
      const transaction = await nftContract.methods.mint(tokenURI).send({
        from: account,
        value: web3.utils.toWei(price, 'ether')
      });
      
      return transaction;
    } catch (error) {
      console.error('NFT minting failed:', error);
    }
  };
  
  // DeFi Swap Function
  const performSwap = async (tokenIn, tokenOut, amountIn, minAmountOut) => {
    try {
      const routerContract = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
      
      const path = [tokenIn, tokenOut];
      const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minutes
      
      const transaction = await routerContract.methods.swapExactTokensForTokens(
        amountIn,
        minAmountOut,
        path,
        account,
        deadline
      ).send({
        from: account
      });
      
      return transaction;
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };
  
  // Yield Farming
  const stakeTokens = async (poolId, amount) => {
    try {
      const stakingContract = new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS);
      
      const transaction = await stakingContract.methods.stake(poolId, amount).send({
        from: account
      });
      
      return transaction;
    } catch (error) {
      console.error('Staking failed:', error);
    }
  };
  
  // Blockchain Analytics
  const getBlockchainAnalytics = async () => {
    try {
      const latestBlock = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(latestBlock);
      
      const analytics = {
        totalBlocks: latestBlock,
        averageBlockTime: 12, // seconds
        totalTransactions: await web3.eth.getTransactionCount(account),
        gasPrice: await web3.eth.getGasPrice(),
        networkHashrate: '850 TH/s'
      };
      
      return analytics;
    } catch (error) {
      console.error('Analytics failed:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-8">
          ⛓️ Advanced Blockchain Platform
        </h1>
        
        {/* Blockchain Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 to-green-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Total Blocks</h3>
            <p className="text-3xl font-bold">1,234,567</p>
            <p className="text-green-300 text-sm">+12.5% from yesterday</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Transactions</h3>
            <p className="text-3xl font-bold">89,432</p>
            <p className="text-blue-300 text-sm">Last 24 hours</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
            <p className="text-3xl font-bold">2,847</p>
            <p className="text-purple-300 text-sm">Deployed</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Total Value Locked</h3>
            <p className="text-3xl font-bold">$12.5B</p>
            <p className="text-yellow-300 text-sm">Across all protocols</p>
          </div>
        </div>
        
        {/* Smart Contract Management */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">📜 Smart Contracts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contracts.map(contract => (
              <div key={contract.address} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{contract.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{contract.address}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-blue-400">{contract.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Balance:</span>
                    <span className="text-green-400">{contract.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transactions:</span>
                    <span>{contract.transactions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* DeFi Protocols */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">🏦 DeFi Protocols</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defiProtocols.map(protocol => (
              <div key={protocol.name} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{protocol.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{protocol.type}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>TVL:</span>
                    <span className="text-green-400">{protocol.tvl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume 24h:</span>
                    <span className="text-blue-400">{protocol.volume24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>APY:</span>
                    <span className="text-yellow-400">{protocol.apy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainAdvanced;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-green-400 mb-2">⛓️ Advanced Blockchain Platform</h1>
              <p className="text-gray-400">Smart contracts, DeFi protocols, NFT marketplace, and blockchain analytics</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* Blockchain Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Blocks</p>
                <p className="text-3xl font-bold text-white">1,234,567</p>
                <p className="text-green-400 text-sm">+12.5% from yesterday</p>
              </div>
              <div className="text-4xl">⛓️</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Transactions</p>
                <p className="text-3xl font-bold text-white">89,432</p>
                <p className="text-blue-400 text-sm">Last 24 hours</p>
              </div>
              <div className="text-4xl">💸</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Smart Contracts</p>
                <p className="text-3xl font-bold text-white">2,847</p>
                <p className="text-purple-400 text-sm">Deployed</p>
              </div>
              <div className="text-4xl">📜</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Value Locked</p>
                <p className="text-3xl font-bold text-white">$12.5B</p>
                <p className="text-yellow-400 text-sm">Across all protocols</p>
              </div>
              <div className="text-4xl">🏦</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 mb-8">
          <div className="flex space-x-4 mb-6">
            {['blocks', 'transactions', 'smart-contracts', 'nfts', 'defi'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {selectedTab === 'blocks' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">🔗 Latest Blocks</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {blockchainData.blocks.map((block) => (
                    <div key={block.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Block #{block.id}</h3>
                          <p className="text-gray-400 text-sm font-mono">{block.hash}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-semibold">{block.transactions} txs</p>
                          <p className="text-gray-400 text-sm">{new Date(block.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Difficulty</p>
                          <p className="text-white font-semibold">{block.difficulty}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Gas Used</p>
                          <p className="text-white font-semibold">{block.gasUsed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Miner</p>
                          <p className="text-blue-400 font-mono text-xs">{block.miner}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Nonce</p>
                          <p className="text-white font-semibold">{block.nonce}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'transactions' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">💸 Recent Transactions</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {blockchainData.transactions.map((tx) => (
                    <div key={tx.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{tx.type.replace('_', ' ').toUpperCase()}</h3>
                          <p className="text-gray-400 text-sm font-mono">{tx.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-semibold">{tx.value} ETH</p>
                          <span className={`px-2 py-1 rounded text-xs ${
                            tx.status === 'confirmed' ? 'bg-green-600' :
                            tx.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">From</p>
                          <p className="text-blue-400 font-mono text-xs">{tx.from}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">To</p>
                          <p className="text-blue-400 font-mono text-xs">{tx.to}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Gas</p>
                          <p className="text-white font-semibold">{tx.gas.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Gas Price</p>
                          <p className="text-white font-semibold">{tx.gasPrice} Gwei</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'smart-contracts' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">📜 Smart Contracts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blockchainData.smartContracts.map((contract) => (
                    <div key={contract.address} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white">{contract.name}</h3>
                        <span className="text-green-400 text-sm">✓ Verified</span>
                      </div>
                      <p className="text-gray-400 text-sm font-mono mb-3">{contract.address}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-blue-400">{contract.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Balance:</span>
                          <span className="text-green-400">{contract.balance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Transactions:</span>
                          <span className="text-white">{contract.transactions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gas Used:</span>
                          <span className="text-yellow-400">{contract.gasUsed}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'nfts' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">🎨 NFT Marketplace</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {blockchainData.nfts.map((nft) => (
                    <div key={nft.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="text-center mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-white font-semibold">{nft.name}</h3>
                        <p className="text-gray-400 text-sm">{nft.collection}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price:</span>
                          <span className="text-green-400">{nft.price} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rarity:</span>
                          <span className="text-purple-400">{nft.rarity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Attributes:</span>
                          <span className="text-white">{nft.attributes}</span>
                        </div>
                        {nft.lastSale && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Sale:</span>
                            <span className="text-yellow-400">{nft.lastSale} ETH</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'defi' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">🏦 DeFi Protocols</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {blockchainData.defiProtocols.map((protocol) => (
                    <div key={protocol.name} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white">{protocol.name}</h3>
                        <span className="text-blue-400 text-sm">{protocol.type}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">TVL:</span>
                          <span className="text-green-400 font-semibold">{protocol.tvl}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Volume 24h:</span>
                          <span className="text-blue-400 font-semibold">{protocol.volume24h}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">APY:</span>
                          <span className="text-yellow-400 font-semibold">{protocol.apy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Users:</span>
                          <span className="text-white font-semibold">{protocol.users.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Blockchain Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">⛓️ Smart Contracts</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Solidity development</li>
                <li>• Contract deployment</li>
                <li>• Gas optimization</li>
                <li>• Security auditing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">🏦 DeFi Protocols</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• DEX implementation</li>
                <li>• Yield farming</li>
                <li>• Liquidity pools</li>
                <li>• Flash loans</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">🎨 NFT Marketplace</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• ERC-721 tokens</li>
                <li>• Metadata standards</li>
                <li>• Royalty systems</li>
                <li>• Auction mechanisms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">📊 Blockchain Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Transaction monitoring</li>
                <li>• Gas price tracking</li>
                <li>• Network statistics</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Advanced Blockchain Code</h3>
                <button
                  onClick={() => setShowCodeViewer(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <CodeViewer code={demoCode} language="javascript" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainAdvanced; 