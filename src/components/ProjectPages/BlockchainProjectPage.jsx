import React, { useState } from 'react';

const BlockchainProjectPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const codeExamples = {
    smartContract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainTracker {
    struct Product {
        string productId;
        string name;
        address manufacturer;
        uint256 timestamp;
        string location;
        bool isVerified;
    }
    
    mapping(string => Product) public products;
    mapping(address => bool) public authorizedManufacturers;
    
    event ProductRegistered(string productId, string name, address manufacturer);
    event ProductVerified(string productId, address verifier);
    
    modifier onlyAuthorized() {
        require(authorizedManufacturers[msg.sender], "Not authorized");
        _;
    }
    
    function registerProduct(
        string memory _productId,
        string memory _name,
        string memory _location
    ) public onlyAuthorized {
        products[_productId] = Product({
            productId: _productId,
            name: _name,
            manufacturer: msg.sender,
            timestamp: block.timestamp,
            location: _location,
            isVerified: false
        });
        
        emit ProductRegistered(_productId, _name, msg.sender);
    }
    
    function verifyProduct(string memory _productId) public {
        require(bytes(products[_productId].productId).length > 0, "Product not found");
        products[_productId].isVerified = true;
        emit ProductVerified(_productId, msg.sender);
    }
}`,
    
    backend: `// Node.js Backend with Express and Web3
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Ethereum network
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');

// Smart contract ABI and address
const contractABI = require('./SupplyChainTracker.json');
const contractAddress = '0x...'; // Deployed contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

// API Routes
app.post('/api/register-product', async (req, res) => {
    try {
        const { productId, name, location, manufacturerAddress } = req.body;
        
        const result = await contract.methods
            .registerProduct(productId, name, location)
            .send({ from: manufacturerAddress, gas: 300000 });
            
        res.json({ success: true, txHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/product/:productId', async (req, res) => {
    try {
        const product = await contract.methods.products(req.params.productId).call();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Blockchain API running on port 3001');
});`,

    frontend: `// React Frontend Component
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const BlockchainTracker = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initializeWeb3();
    }, []);

    const initializeWeb3 = async () => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWeb3(web3Instance);
            
            // Initialize contract
            const contractInstance = new web3Instance.eth.Contract(
                CONTRACT_ABI,
                CONTRACT_ADDRESS
            );
            setContract(contractInstance);
        }
    };

    const registerProduct = async (productData) => {
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            const result = await contract.methods
                .registerProduct(
                    productData.id,
                    productData.name,
                    productData.location
                )
                .send({ from: accounts[0], gas: 300000 });
                
            console.log('Product registered:', result.transactionHash);
        } catch (error) {
            console.error('Error registering product:', error);
        }
        setLoading(false);
    };

    return (
        <div className="blockchain-tracker">
            <h2>Supply Chain Tracker</h2>
            {/* UI Components */}
        </div>
    );
};

export default BlockchainTracker;`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🔗 Blockchain Supply Chain System</h1>
          <p className="text-gray-300 text-lg">
            A comprehensive blockchain-based supply chain tracking system with smart contracts, 
            real-time monitoring, and transparent product traceability.
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">Products Tracked</h3>
            <p className="text-3xl font-bold text-green-400">1,247</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🏭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Manufacturers</h3>
            <p className="text-3xl font-bold text-blue-400">89</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-xl font-semibold text-white mb-2">Verified Products</h3>
            <p className="text-3xl font-bold text-purple-400">1,156</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Cost Savings</h3>
            <p className="text-3xl font-bold text-yellow-400">$2.3M</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {['overview', 'architecture', 'code', 'features', 'deployment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Problem Statement</h3>
                  <p className="text-gray-300 mb-4">
                    Traditional supply chains lack transparency, making it difficult to track product origins, 
                    verify authenticity, and ensure quality standards. This leads to:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Counterfeit products in the market</li>
                    <li>• Difficulty in product recalls</li>
                    <li>• Lack of trust between stakeholders</li>
                    <li>• Inefficient quality control processes</li>
                    <li>• Poor traceability of products</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Solution</h3>
                  <p className="text-gray-300 mb-4">
                    A blockchain-based supply chain tracking system that provides:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Immutable product records</li>
                    <li>• Real-time tracking and monitoring</li>
                    <li>• Smart contract automation</li>
                    <li>• Transparent verification process</li>
                    <li>• Decentralized trust mechanism</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">System Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Frontend Layer</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• React.js UI components</li>
                    <li>• Web3.js integration</li>
                    <li>• Real-time data visualization</li>
                    <li>• Responsive design</li>
                    <li>• User authentication</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Backend Layer</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Node.js API server</li>
                    <li>• Express.js framework</li>
                    <li>• Database integration</li>
                    <li>• WebSocket connections</li>
                    <li>• File upload handling</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Blockchain Layer</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Ethereum smart contracts</li>
                    <li>• Solidity programming</li>
                    <li>• IPFS for data storage</li>
                    <li>• Oracle integration</li>
                    <li>• Gas optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Smart Contract (Solidity)</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{codeExamples.smartContract}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Backend API (Node.js)</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{codeExamples.backend}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Frontend Component (React)</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{codeExamples.frontend}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Product Tracking</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Unique product identification</li>
                    <li>• Real-time location tracking</li>
                    <li>• Quality verification at each stage</li>
                    <li>• Temperature and condition monitoring</li>
                    <li>• Automated alerts and notifications</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Smart Contracts</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Automated payment processing</li>
                    <li>• Quality-based pricing</li>
                    <li>• Insurance claim automation</li>
                    <li>• Compliance verification</li>
                    <li>• Dispute resolution system</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Security & Trust</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Immutable data records</li>
                    <li>• Cryptographic verification</li>
                    <li>• Decentralized consensus</li>
                    <li>• Zero-knowledge proofs</li>
                    <li>• Multi-signature wallets</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">Analytics & Reporting</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time dashboards</li>
                    <li>• Performance metrics</li>
                    <li>• Cost analysis</li>
                    <li>• Quality reports</li>
                    <li>• Predictive analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Deployment & Infrastructure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Development Environment</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Hardhat development framework</li>
                    <li>• Ganache local blockchain</li>
                    <li>• Truffle testing suite</li>
                    <li>• OpenZeppelin contracts</li>
                    <li>• Web3.js integration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Production Deployment</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• AWS cloud infrastructure</li>
                    <li>• Docker containerization</li>
                    <li>• Kubernetes orchestration</li>
                    <li>• CI/CD pipeline</li>
                    <li>• Monitoring and logging</li>
                  </ul>
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