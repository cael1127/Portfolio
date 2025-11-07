import React from 'react';
import ProjectLayout from '../ProjectLayout';
import BlockchainAdvanced from '../BlockchainAdvanced';

const BlockchainAdvancedProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Blockchain Operations Center"
      subtitle="Govern enterprise chains with deep observability"
      emoji="⛓️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Back to Projects', onClick: () => setCurrentPage('demo-organizer') }}
      demo={<BlockchainAdvanced isEmbedded />}
      overview="Full-stack control tower for enterprise blockchain networks covering blocks, transactions, smart contracts, NFTs, and DeFi flows."
      role="Network architecture, smart contract tooling, monitoring and UX"
      stack={[
        'React',
        'Ethers.js',
        'GraphQL',
        'Node Monitoring',
        'Tailwind CSS'
      ]}
      challenges={[
        'Normalising heterogeneous blockchain data for operators',
        'Surfacing audit signals for compliance and governance teams',
        'Building simulations for staking, swaps, and contract risk'
      ]}
      results={[
        'Holistic dashboards for blocks, mempool, smart contracts, NFTs, and DeFi',
        'Governance workflows with role-based insights and alerts',
        'Automated risk scoring for smart contracts and liquidity pools'
      ]}
      problem="Enterprises running private or consortium chains need operational tooling beyond block explorers."
      approach="Aggregate on-chain telemetry, contract metadata, and DeFi positions into a single governance-ready experience."
      highlights={[
        'Block explorer with gas analytics and miner statistics',
        'Transaction tracing with compliance tagging',
        'Smart contract registry with upgrade + audit status',
        'NFT & DeFi analytics with profitability projections'
      ]}
      tutorialSummary="Shows how to monitor complex blockchain ecosystems with React and node telemetry."
      difficulty="Advanced"
      timeEstimate="4 weeks"
      keyConcepts={[
        { name: 'Node Telemetry', description: 'Capture block, gas, and miner stats for network health' },
        { name: 'Contract Governance', description: 'Track deployments, audits, and upgrade readiness' },
        { name: 'DeFi Risk Scoring', description: 'Simulate liquidity events and protocol health' }
      ]}
      tutorialSteps={[
        'Ingest on-chain data via RPC + GraphQL gateways',
        'Model smart contract metadata and governance states',
        'Visualise DeFi + NFT analytics for stakeholders',
        'Build alerting pipelines for anomalies and compliance events'
      ]}
    />
  );
};

export default BlockchainAdvancedProjectPage;

