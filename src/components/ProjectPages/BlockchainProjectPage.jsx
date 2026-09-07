import React, { useState } from 'react';

const BlockchainProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    blockStructure: `// Block Structure
class Block {
  constructor(index, timestamp, transactions, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return CryptoJS.SHA256(
      this.index + this.previousHash + 
      this.timestamp + JSON.stringify(this.transactions) + 
      this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== 
           Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}`,
    
    blockchainClass: `// Blockchain Class
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), 
                    "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const block = new Block(
      this.chain.length,
      new Date().toISOString(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);
    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address');
    }
    this.pendingTransactions.push(transaction);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}`,
    
    transactionClass: `// Transaction Class
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = new Date().toISOString();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoJS.SHA256(
      this.fromAddress + this.toAddress + 
      this.amount + this.timestamp
    ).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() {
    if (this.fromAddress === null) return true;
    
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }
    
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}`,
    
    walletClass: `// Wallet Class
class Wallet {
  constructor() {
    const keyPair = ec.genKeyPair();
    this.privateKey = keyPair.getPrivate('hex');
    this.publicKey = keyPair.getPublic('hex');
  }

  getBalance(blockchain) {
    let balance = 0;
    for (const block of blockchain.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === this.publicKey) {
          balance -= trans.amount;
        }
        if (trans.toAddress === this.publicKey) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  sendMoney(amount, payeePublicKey, blockchain) {
    const transaction = new Transaction(
      this.publicKey, 
      payeePublicKey, 
      amount
    );
    
    transaction.signTransaction(ec.keyFromPrivate(this.privateKey, 'hex'));
    blockchain.addTransaction(transaction);
  }
}`,
    
    smartContract: `// Smart Contract Example (Solidity)
pragma solidity ^0.8.0;

contract SupplyChainContract {
    struct Product {
        string name;
        string origin;
        uint256 timestamp;
        address manufacturer;
        bool isVerified;
        string[] certifications;
    }
    
    mapping(bytes32 => Product) public products;
    mapping(address => bool) public authorizedManufacturers;
    
    event ProductRegistered(bytes32 indexed productId, string name, address manufacturer);
    event ProductVerified(bytes32 indexed productId, address verifier);
    
    modifier onlyAuthorized() {
        require(authorizedManufacturers[msg.sender], "Not authorized");
        _;
    }
    
    function registerProduct(
        bytes32 productId,
        string memory name,
        string memory origin
    ) public onlyAuthorized {
        require(products[productId].timestamp == 0, "Product already exists");
        
        products[productId] = Product({
            name: name,
            origin: origin,
            timestamp: block.timestamp,
            manufacturer: msg.sender,
            isVerified: false,
            certifications: new string[](0)
        });
        
        emit ProductRegistered(productId, name, msg.sender);
    }
    
    function verifyProduct(bytes32 productId) public {
        require(products[productId].timestamp != 0, "Product does not exist");
        require(!products[productId].isVerified, "Product already verified");
        
        products[productId].isVerified = true;
        emit ProductVerified(productId, msg.sender);
    }
    
    function addCertification(bytes32 productId, string memory certification) public {
        require(products[productId].timestamp != 0, "Product does not exist");
        products[productId].certifications.push(certification);
    }
    
    function getProduct(bytes32 productId) public view returns (
        string memory name,
        string memory origin,
        uint256 timestamp,
        address manufacturer,
        bool isVerified
    ) {
        Product memory product = products[productId];
        return (
            product.name,
            product.origin,
            product.timestamp,
            product.manufacturer,
            product.isVerified
        );
    }
}`
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-[var(--accent)] hover:text-[var(--accent)] mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">🔗 Blockchain Supply Chain Platform</h1>
          <p className="text-[var(--text)] text-lg">
            A comprehensive blockchain implementation for supply chain transparency, smart contracts, and decentralized trust
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Project Overview</h2>
                <p className="text-[var(--text)] leading-relaxed">
                  This blockchain supply chain platform demonstrates a complete implementation of blockchain technology 
                  for tracking products through the entire supply chain. The system provides transparency, immutability, 
                  and trust through cryptographic verification and smart contracts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Product traceability from origin to consumer</li>
                    <li>• Immutable record of all transactions</li>
                    <li>• Smart contract automation</li>
                    <li>• Quality assurance verification</li>
                    <li>• Compliance and audit trails</li>
                    <li>• Decentralized trust mechanism</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• JavaScript/Node.js for backend</li>
                    <li>• React for frontend interface</li>
                    <li>• CryptoJS for cryptographic functions</li>
                    <li>• Solidity for smart contracts</li>
                    <li>• Web3.js for blockchain interaction</li>
                    <li>• IPFS for decentralized storage</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Real-World Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <h4 className="font-semibold text-[var(--text)] mb-2">Food Safety</h4>
                    <p className="text-[var(--text)] text-sm">Track food products from farm to table, ensuring safety and quality standards</p>
                  </div>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <h4 className="font-semibold text-[var(--text)] mb-2">Pharmaceuticals</h4>
                    <p className="text-[var(--text)] text-sm">Verify authenticity and prevent counterfeit drugs in the supply chain</p>
                  </div>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <h4 className="font-semibold text-[var(--text)] mb-2">Luxury Goods</h4>
                    <p className="text-[var(--text)] text-sm">Authenticate luxury items and prevent counterfeiting</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🔗 Blockchain Core</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Immutable block structure</li>
                    <li>• Cryptographic hash linking</li>
                    <li>• Proof of Work consensus</li>
                    <li>• Chain validation</li>
                    <li>• Mining simulation</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">💳 Transaction System</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Digital wallet creation</li>
                    <li>• Transaction signing</li>
                    <li>• Balance tracking</li>
                    <li>• Fee calculation</li>
                    <li>• Transaction validation</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">📊 Supply Chain</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Product registration</li>
                    <li>• Origin tracking</li>
                    <li>• Quality verification</li>
                    <li>• Certification management</li>
                    <li>• Audit trails</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🤖 Smart Contracts</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Automated execution</li>
                    <li>• Conditional logic</li>
                    <li>• Multi-party agreements</li>
                    <li>• Event emission</li>
                    <li>• Gas optimization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🔒 Security Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Cryptographic Security</h4>
                    <ul className="text-[var(--text)] text-sm space-y-1">
                      <li>• SHA-256 hashing</li>
                      <li>• Digital signatures</li>
                      <li>• Public/private key pairs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Consensus Mechanism</h4>
                    <ul className="text-[var(--text)] text-sm space-y-1">
                      <li>• Proof of Work</li>
                      <li>• Difficulty adjustment</li>
                      <li>• Block validation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Data Integrity</h4>
                    <ul className="text-[var(--text)] text-sm space-y-1">
                      <li>• Immutable records</li>
                      <li>• Chain verification</li>
                      <li>• Tamper detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Block Structure</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.blockStructure}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Blockchain Class</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.blockchainClass}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Transaction Class</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.transactionClass}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Wallet Class</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.walletClass}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Smart Contract (Solidity)</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.smartContract}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Frontend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• React.js UI components</li>
                      <li>• Real-time data visualization</li>
                      <li>• Interactive blockchain explorer</li>
                      <li>• Wallet management interface</li>
                      <li>• Transaction creation forms</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Backend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• Node.js server</li>
                      <li>• Blockchain core logic</li>
                      <li>• RESTful API endpoints</li>
                      <li>• WebSocket connections</li>
                      <li>• Data persistence</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Blockchain Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Core Modules</h4>
                    <ul className="text-[var(--text)] text-sm space-y-1">
                      <li>• Block creation & mining</li>
                      <li>• Transaction processing</li>
                      <li>• Chain validation</li>
                      <li>• Consensus mechanism</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Security Layer</h4>
                    <ul className="text-[var(--text)] text-sm space-y-1">
                      <li>• Cryptographic functions</li>
                      <li>• Digital signatures</li>
                      <li>• Key management</li>
                      <li>• Access control</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Smart Contracts</h4>
                    <ul className="text-[var(--text)] text-sm space-y-1">
                      <li>• Solidity contracts</li>
                      <li>• Web3 integration</li>
                      <li>• Event handling</li>
                      <li>• Gas optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">1</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Transaction Creation</p>
                      <p className="text-[var(--text)] text-sm">User creates transaction with recipient and amount</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">2</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Transaction Signing</p>
                      <p className="text-[var(--text)] text-sm">Transaction is signed with private key</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">3</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Block Mining</p>
                      <p className="text-[var(--text)] text-sm">Transactions are grouped into blocks and mined</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">4</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Chain Validation</p>
                      <p className="text-[var(--text)] text-sm">Block is added to chain after validation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Live Demo</h2>
              <p className="text-[var(--text)] mb-6">
                Experience the blockchain platform in action. The demo showcases real-time transaction processing, 
                block mining, and supply chain tracking capabilities.
              </p>
              
              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">Interactive Blockchain Demo</h3>
                  <button
                    onClick={() => setCurrentPage('blockchain')}
                    className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-[var(--text)] text-sm">
                  Click "Launch Demo" to experience the full blockchain simulation with real-time mining, 
                  transaction processing, and comprehensive analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                  <h4 className="font-semibold text-[var(--accent)] mb-2">Real-time Mining</h4>
                  <p className="text-[var(--text)] text-sm">Watch blocks being mined in real-time with adjustable difficulty</p>
                </div>
                <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                  <h4 className="font-semibold text-[var(--accent)] mb-2">Transaction Creation</h4>
                  <p className="text-[var(--text)] text-sm">Create and send transactions with custom amounts and fees</p>
                </div>
                <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                  <h4 className="font-semibold text-[var(--accent)] mb-2">Analytics Dashboard</h4>
                  <p className="text-[var(--text)] text-sm">Monitor network statistics and performance metrics</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainProjectPage; 