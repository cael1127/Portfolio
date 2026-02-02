import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import FinancialDemo from '../components/demos/FinancialDemo';

const FinancialDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Financial Trading Platform"
      subtitle="Real-time market data, trading, and portfolio management"
      emoji="💰"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Healthcare System', onClick: () => setCurrentPage('healthcare-demo') }}
      demo={<FinancialDemo />}
      overview="A comprehensive financial trading platform featuring real-time market data, trading capabilities, portfolio management, and financial analytics. Built to provide traders and investors with powerful tools for market analysis and decision-making."
      role="Full-stack development, real-time data integration, trading system design, portfolio management, and financial analytics implementation"
      stack={["React", "Real-time Data", "Trading APIs", "Financial Analytics", "WebSocket", "Charts", "Portfolio Management"]}
      challenges={[
        "Integrating real-time market data feeds",
        "Handling high-frequency data updates efficiently",
        "Implementing secure trading functionality",
        "Creating accurate financial visualizations and charts"
      ]}
      results={[
        "Real-time market data with low latency",
        "Comprehensive trading interface",
        "Portfolio tracking and management",
        "Financial analytics and insights",
        "Interactive charts and visualizations"
      ]}
      problem="Traders and investors need platforms that provide real-time market data, trading capabilities, and portfolio management. Existing solutions may lack real-time updates or have complex interfaces."
      approach="Built a financial trading platform with real-time market data integration, trading functionality, and comprehensive portfolio management. Implemented financial analytics and interactive charts for market analysis."
      highlights={[
        "Real-time market data and updates",
        "Trading interface with order management",
        "Portfolio tracking and analytics",
        "Interactive financial charts",
        "Market analysis tools",
        "Comprehensive financial dashboard"
      ]}
    />
  );
};

export default FinancialDemoPage; 