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
          rarity: rarities[Math.floor(Math.random() * rarities.length)],
          price: (Math.random() * 100).toFixed(2),
          lastSale: (Math.random() * 50).toFixed(2),
          owner: `0x${Math.random().toString(16).substr(2, 40)}`,
          image: `https://picsum.photos/200/200?random=${i}`
        });
      }
      return nfts;
    };

    const generateDeFiProtocols = () => {
      return [
        {
          name: 'Uniswap V3',
          tvl: '$2.1B',
          volume24h: '$156M',
          apy: '12.5%',
          type: 'DEX'
        },
        {
          name: 'Compound',
          tvl: '$890M',
          volume24h: '$23M',
          apy: '8.2%',
          type: 'Lending'
        },
        {
          name: 'Aave',
          tvl: '$1.2B',
          volume24h: '$45M',
          apy: '9.8%',
          type: 'Lending'
        },
        {
          name: 'Curve',
          tvl: '$3.4B',
          volume24h: '$89M',
          apy: '15.2%',
          type: 'Stable Swap'
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

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBlockchainData(prev => ({
        ...prev,
        transactions: prev.transactions.map(tx => ({
          ...tx,
          timestamp: Date.now() - Math.random() * 3600000
        }))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const demoCode = `import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

const BlockchainAdvanced = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState({});
  const [transactions, setTransactions] = useState([]);
  
  // Initialize Web3 Connection
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('User denied account access');
        }
      }
    };
    
    initWeb3();
  }, []);
  
  // Smart Contract Interaction
  const deployContract = async (contractCode) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const factory = new ethers.ContractFactory(
      contractCode.abi,
      contractCode.bytecode,
      signer
    );
    
    const contract = await factory.deploy();
    await contract.deployed();
    
    return contract.address;
  };
  
  // NFT Minting Function
  const mintNFT = async (tokenURI) => {
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      signer
    );
    
    const tx = await nftContract.mint(tokenURI);
    await tx.wait();
    
    return tx.hash;
  };
  
  // DeFi Protocol Integration
  const swapTokens = async (tokenIn, tokenOut, amount) => {
    const router = new ethers.Contract(
      UNISWAP_ROUTER_ADDRESS,
      ROUTER_ABI,
      signer
    );
    
    const path = [tokenIn, tokenOut];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    
    const tx = await router.swapExactTokensForTokens(
      amount,
      0,
      path,
      account,
      deadline
    );
    
    return tx.hash;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-8">
          Advanced Blockchain Platform
        </h1>
        
        {/* Blockchain Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Blockchain Explorer */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl">
                              <h2 className="text-2xl font-bold text-white mb-4">Blockchain Explorer</h2>
              <div className="space-y-4">
                {blocks.map(block => (
                  <div key={block.id} className="bg-green-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">Block #{block.id}</p>
                      <span className="text-green-200 text-sm">{block.transactions} txs</span>
                    </div>
                    <p className="text-green-300 text-xs break-all">{block.hash}</p>
                    <p className="text-green-200 text-xs">{new Date(block.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Smart Contracts */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl">
                              <h2 className="text-2xl font-bold text-white mb-4">Smart Contracts</h2>
              <div className="space-y-3">
                {smartContracts.map(contract => (
                  <div key={contract.address} className="bg-blue-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">{contract.name}</p>
                      <span className={\`text-xs px-2 py-1 rounded \${
                        contract.verified ? 'bg-green-600' : 'bg-red-600'
                      }\`}>
                        {contract.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm">{contract.type}</p>
                    <p className="text-blue-300 text-xs break-all">{contract.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* DeFi and NFTs */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">🏦 DeFi Protocols</h2>
              <div className="space-y-3">
                {defiProtocols.map(protocol => (
                  <div key={protocol.name} className="bg-purple-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">{protocol.name}</p>
                      <span className="text-purple-200 text-sm">{protocol.type}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-purple-200">TVL</p>
                        <p className="text-white font-semibold">{protocol.tvl}</p>
                      </div>
                      <div>
                        <p className="text-purple-200">Volume</p>
                        <p className="text-white font-semibold">{protocol.volume24h}</p>
                      </div>
                      <div>
                        <p className="text-purple-200">APY</p>
                        <p className="text-white font-semibold">{protocol.apy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl">
                              <h2 className="text-2xl font-bold text-white mb-4">NFT Marketplace</h2>
              <div className="grid grid-cols-2 gap-4">
                {nfts.slice(0, 6).map(nft => (
                  <div key={nft.id} className="bg-yellow-800/50 p-3 rounded-lg">
                    <img src={nft.image} alt={nft.name} className="w-full h-24 object-cover rounded mb-2" />
                    <p className="text-white font-semibold text-sm">{nft.name}</p>
                    <p className="text-yellow-200 text-xs">{nft.collection}</p>
                    <p className="text-yellow-300 text-xs">{nft.price} ETH</p>
                  </div>
                ))}
              </div>
            </div>
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
              <h1 className="text-4xl font-bold text-green-400 mb-2">Advanced Blockchain Platform</h1>
              <p className="text-gray-400">Smart contracts, DeFi protocols, and NFT marketplace integration</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'blocks', label: 'Blocks', icon: '' },
              { id: 'transactions', label: 'Transactions', icon: '' },
              { id: 'contracts', label: 'Smart Contracts', icon: '' },
              { id: 'nfts', label: 'NFTs', icon: '' },
              { id: 'defi', label: 'DeFi', icon: '' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="space-y-6">
          {selectedTab === 'blocks' && (
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Blockchain Explorer</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live chain</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {blockchainData.blocks.map(block => (
                  <div key={block.id} className="bg-green-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">Block #{block.id}</p>
                      <span className="text-green-200 text-sm">{block.transactions} txs</span>
                    </div>
                    <p className="text-green-300 text-xs break-all mb-2">{block.hash}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-green-200">Miner: {block.miner.slice(0, 10)}...</span>
                      <span className="text-green-200">{new Date(block.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'transactions' && (
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-sm">Real-time</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {blockchainData.transactions.slice(0, 10).map(tx => (
                  <div key={tx.id} className={`p-4 rounded-lg ${
                    tx.status === 'confirmed' ? 'bg-green-800/50' :
                    tx.status === 'pending' ? 'bg-yellow-800/50' :
                    'bg-red-800/50'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">{tx.type.replace('_', ' ').toUpperCase()}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        tx.status === 'confirmed' ? 'bg-green-600' :
                        tx.status === 'pending' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm mb-2">{tx.value} ETH</p>
                    <p className="text-blue-300 text-xs break-all">From: {tx.from.slice(0, 10)}...</p>
                    <p className="text-blue-300 text-xs break-all">To: {tx.to.slice(0, 10)}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'contracts' && (
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">📄 Smart Contracts</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 text-sm">Verified</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {blockchainData.smartContracts.map(contract => (
                  <div key={contract.address} className="bg-purple-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">{contract.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        contract.verified ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {contract.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                    <p className="text-purple-200 text-sm mb-2">{contract.type}</p>
                    <p className="text-purple-300 text-xs break-all mb-2">{contract.address}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-200">Balance: {contract.balance}</span>
                      <span className="text-purple-200">{contract.transactions} txs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'nfts' && (
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🎨 NFT Marketplace</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400 text-sm">Live trading</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {blockchainData.nfts.map(nft => (
                  <div key={nft.id} className="bg-yellow-800/50 p-3 rounded-lg">
                    <img src={nft.image} alt={nft.name} className="w-full h-24 object-cover rounded mb-2" />
                    <p className="text-white font-semibold text-sm mb-1">{nft.name}</p>
                    <p className="text-yellow-200 text-xs mb-1">{nft.collection}</p>
                    <p className="text-yellow-300 text-xs">{nft.price} ETH</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'defi' && (
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 p-6 rounded-xl border border-indigo-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">DeFi Protocols</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-indigo-400 text-sm">Live yields</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blockchainData.defiProtocols.map(protocol => (
                  <div key={protocol.name} className="bg-indigo-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-white font-semibold">{protocol.name}</p>
                      <span className="text-indigo-200 text-sm">{protocol.type}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-indigo-200">TVL</p>
                        <p className="text-white font-semibold">{protocol.tvl}</p>
                      </div>
                      <div>
                        <p className="text-indigo-200">Volume</p>
                        <p className="text-white font-semibold">{protocol.volume24h}</p>
                      </div>
                      <div>
                        <p className="text-indigo-200">APY</p>
                        <p className="text-white font-semibold">{protocol.apy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Smart Contracts</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Solidity contract development</li>
                <li>• Automated contract deployment</li>
                <li>• Gas optimization techniques</li>
                <li>• Security audit integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">DeFi Integration</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• DEX protocol integration</li>
                <li>• Yield farming strategies</li>
                <li>• Liquidity pool management</li>
                <li>• Flash loan implementations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">NFT Marketplace</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• ERC-721/ERC-1155 standards</li>
                <li>• Metadata storage solutions</li>
                <li>• Royalty distribution systems</li>
                <li>• Auction and bidding mechanisms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        <CodeViewer 
          code={demoCode} 
          language="javascript" 
          title="Blockchain Advanced Code"
          isOpen={showCodeViewer} 
          onClose={() => setShowCodeViewer(false)} 
        />
      </div>
    </div>
  );
};

export default BlockchainAdvanced; 