import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const FinancialDemo = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    dailyChange: 0,
    totalReturn: 0,
    holdings: []
  });

  useEffect(() => {
    // Simulate crypto data
    const cryptos = [
      { symbol: 'BTC', name: 'Bitcoin', price: 45000, change: 2.5, volume: 28000000000 },
      { symbol: 'ETH', name: 'Ethereum', price: 3200, change: -1.2, volume: 15000000000 },
      { symbol: 'ADA', name: 'Cardano', price: 0.45, change: 5.8, volume: 2000000000 },
      { symbol: 'SOL', name: 'Solana', price: 95, change: 3.2, volume: 8000000000 },
      { symbol: 'DOT', name: 'Polkadot', price: 6.8, change: -0.8, volume: 1200000000 }
    ];

    setCryptoData(cryptos);

    // Simulate portfolio
    const mockPortfolio = {
      totalValue: 125000,
      dailyChange: 2500,
      totalReturn: 12.5,
      holdings: [
        { symbol: 'BTC', amount: 1.5, value: 67500 },
        { symbol: 'ETH', amount: 10, value: 32000 },
        { symbol: 'ADA', amount: 5000, value: 2250 },
        { symbol: 'SOL', amount: 100, value: 9500 },
        { symbol: 'DOT', amount: 200, value: 1360 }
      ]
    };

    setPortfolio(mockPortfolio);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FinancialDemo = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    dailyChange: 0,
    totalReturn: 0,
    holdings: []
  });

  useEffect(() => {
    // Simulate real-time crypto data
    const cryptos = [
      { symbol: 'BTC', name: 'Bitcoin', price: 45000, change: 2.5 },
      { symbol: 'ETH', name: 'Ethereum', price: 3200, change: -1.2 },
      { symbol: 'ADA', name: 'Cardano', price: 0.45, change: 5.8 }
    ];
    
    setCryptoData(cryptos);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {cryptoData.map((crypto, index) => (
          <motion.div 
            key={crypto.symbol}
            className="bg-gray-800 p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-gray-400 text-sm">{crypto.name}</h3>
            <p className="text-2xl font-bold text-white">${crypto.price.toLocaleString()}</p>
            <p className={\`text-sm \${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}\`}>
              {crypto.change >= 0 ? '+' : ''}{crypto.change}%
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};`,
    explanation: `This financial dashboard demonstrates real-time cryptocurrency data visualization with smooth animations. The component uses Framer Motion for entrance animations and hover effects, creating an engaging user experience.

Key features:
- Real-time crypto price updates
- Animated portfolio statistics
- Responsive grid layout
- Smooth hover interactions
- Color-coded price changes`,
    technologies: [
      {
        name: 'React Hooks',
        description: 'useState and useEffect for state management and lifecycle',
        tags: ['State Management', 'Lifecycle']
      },
      {
        name: 'Framer Motion',
        description: 'Animation library for smooth transitions and interactions',
        tags: ['Animations', 'Transitions']
      },
      {
        name: 'Responsive Design',
        description: 'CSS Grid and Flexbox for adaptive layouts',
        tags: ['CSS Grid', 'Mobile-First']
      }
    ],
    concepts: [
      {
        name: 'State Management',
        description: 'Managing component state with React hooks',
        example: 'const [cryptoData, setCryptoData] = useState([])'
      },
      {
        name: 'Animation Orchestration',
        description: 'Coordinating multiple animations with delays',
        example: 'transition={{ delay: index * 0.1 }}'
      },
      {
        name: 'Conditional Rendering',
        description: 'Dynamic content based on data conditions',
        example: '{crypto.change >= 0 ? "text-green-400" : "text-red-400"}'
      }
    ],
    features: [
      'Real-time cryptocurrency price tracking',
      'Animated portfolio statistics',
      'Responsive grid layout',
      'Smooth hover interactions',
      'Color-coded price changes',
      'Professional financial UI design'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Financial Dashboard</h1>
          <p className="text-gray-400">Real-time cryptocurrency portfolio tracking</p>
        </div>
        <motion.button
          onClick={() => setShowCodeViewer(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Implementation
        </motion.button>
      </div>

      {/* Portfolio Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Total Value</h3>
          <p className="text-2xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Daily Change</h3>
          <p className={`text-2xl font-bold ${portfolio.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.dailyChange >= 0 ? '+' : ''}${portfolio.dailyChange.toLocaleString()}
          </p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Total Return</h3>
          <p className={`text-2xl font-bold ${portfolio.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.totalReturn >= 0 ? '+' : ''}{portfolio.totalReturn.toFixed(2)}%
          </p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Holdings</h3>
          <p className="text-2xl font-bold text-white">{portfolio.holdings.length}</p>
        </motion.div>
      </motion.div>

      {/* Crypto Market */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Cryptocurrency Market</h2>
        <div className="space-y-4">
          {cryptoData.map((crypto, index) => (
            <motion.div 
              key={crypto.symbol}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{crypto.symbol[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{crypto.name}</h3>
                  <p className="text-sm text-gray-400">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">${crypto.price.toLocaleString()}</p>
                <p className={`text-sm ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Portfolio Holdings */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Portfolio Holdings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.holdings.map((holding, index) => (
            <motion.div 
              key={holding.symbol}
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{holding.symbol}</h3>
                <span className="text-sm text-gray-400">{holding.amount} coins</span>
              </div>
              <p className="text-xl font-bold text-green-400">${holding.value.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default FinancialDemo;
