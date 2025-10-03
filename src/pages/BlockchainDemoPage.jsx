import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import BlockchainDemo from '../components/demos/BlockchainDemo';

const BlockchainDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Blockchain Platform"
      subtitle="Supply chain with real-time transactions"
      emoji="🔗"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Smart City', onClick: () => setCurrentPage('smart-city-demo') }}
      demo={<BlockchainDemo />}
      overview="Comprehensive blockchain platform featuring smart contracts, transaction processing, and supply chain tracking. Built with modern web technologies to provide transparent, secure, and efficient decentralized applications for enterprise use cases."
      role="Blockchain development, smart contract implementation, full-stack integration, and security architecture"
      stack={["Solidity", "Web3.js", "React", "Node.js", "Ethereum", "IPFS", "MetaMask"]}
      challenges={[
        "Implementing secure smart contracts",
        "Managing gas optimization",
        "Handling transaction confirmation delays",
        "Creating user-friendly Web3 interfaces"
      ]}
      results={[
        "Secure smart contract deployment",
        "Real-time transaction tracking",
        "Gas-optimized contract interactions",
        "User-friendly Web3 integration"
      ]}
      problem="Develop a blockchain platform that enables transparent supply chain tracking, secure transactions, and smart contract automation for enterprise applications requiring trustless verification and immutable record keeping."
      approach="Implemented a deterministic demo showcasing blockchain concepts including transaction processing, smart contract execution, and supply chain tracking. Used realistic data to demonstrate the platform's capabilities without requiring actual blockchain infrastructure."
      highlights={[
        "Real-time transaction processing",
        "Smart contract execution simulation",
        "Supply chain tracking visualization",
        "Gas fee optimization",
        "Web3 wallet integration",
        "Immutable record keeping"
      ]}
    />
  );
};

export default BlockchainDemoPage; 