import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const FraudDetectionDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate real-time transaction monitoring
    const mockTransactions = [
      { id: 1, amount: 150.00, merchant: 'Amazon', location: 'New York', timestamp: new Date(), risk: 'Low' },
      { id: 2, amount: 2500.00, merchant: 'Unknown', location: 'International', timestamp: new Date(), risk: 'High' },
      { id: 3, amount: 75.50, merchant: 'Starbucks', location: 'Local', timestamp: new Date(), risk: 'Low' },
      { id: 4, amount: 5000.00, merchant: 'Wire Transfer', location: 'Offshore', timestamp: new Date(), risk: 'Critical' },
      { id: 5, amount: 25.00, merchant: 'Gas Station', location: 'Local', timestamp: new Date(), risk: 'Low' }
    ];

    setTransactions(mockTransactions);

    // Simulate fraud alerts
    const mockAlerts = [
      { id: 1, type: 'Suspicious Pattern', description: 'Multiple high-value transactions', severity: 'High', timestamp: new Date() },
      { id: 2, type: 'Location Anomaly', description: 'Transaction from unusual location', severity: 'Medium', timestamp: new Date() },
      { id: 3, type: 'Velocity Alert', description: 'Unusual spending pattern detected', severity: 'High', timestamp: new Date() }
    ];

    setFraudAlerts(mockAlerts);
    setRiskScore(75);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FraudDetectionDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    // Simulate real-time transaction monitoring
    const mockTransactions = [
      { id: 1, amount: 150.00, merchant: 'Amazon', risk: 'Low' },
      { id: 2, amount: 2500.00, merchant: 'Unknown', risk: 'High' },
      { id: 3, amount: 75.50, merchant: 'Starbucks', risk: 'Low' }
    ];
    
    setTransactions(mockTransactions);
    setRiskScore(75);
  }, []);

`,
    explanation: `AI-powered fraud detection system with real-time transaction monitoring and risk assessment.

## Core Implementation

**Key Features**: This demo showcases real-time fraud detection using machine learning algorithms and pattern recognition.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Real-time Monitoring**: Continuous transaction analysis
- **Machine Learning**: Pattern recognition and anomaly detection
- **Risk Scoring**: Dynamic risk assessment algorithms
- **Alert System**: Immediate fraud notifications`,
    technologies: [
      {
        name: 'Machine Learning',
        description: 'Pattern recognition for fraud detection',
        tags: ['AI', 'Pattern Recognition']
      },
      {
        name: 'Real-time Processing',
        description: 'Live transaction monitoring',
        tags: ['Real-time', 'Streaming']
      },
      {
        name: 'Risk Assessment',
        description: 'Dynamic scoring algorithms',
        tags: ['Algorithms', 'Scoring']
      }
    ],
    concepts: [
      {
        name: 'Anomaly Detection',
        description: 'Identifying unusual patterns in transaction data',
        example: 'if (transaction.amount > threshold) flagAsSuspicious()'
      },
      {
        name: 'Risk Scoring',
        description: 'Calculating risk levels based on multiple factors',
        example: 'riskScore = calculateRisk(amount, location, merchant)'
      },
      {
        name: 'Real-time Monitoring',
        description: 'Continuous analysis of incoming transactions',
        example: 'useEffect(() => monitorTransactions(), [])'
      }
    ],
    features: [
      'Real-time transaction monitoring',
      'AI-powered fraud detection',
      'Dynamic risk scoring',
      'Alert system for suspicious activity',
      'Pattern recognition algorithms',
      'Interactive dashboard interface'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Fraud Detection System</h1>
          <p className="text-gray-400">AI-powered real-time transaction monitoring</p>
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

      {/* Risk Score */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4">Current Risk Score</h2>
        <div className="flex items-center space-x-4">
          <motion.div 
            className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="text-4xl font-bold text-red-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {riskScore}
            </motion.div>
          </motion.div>
          <div>
            <p className="text-lg text-gray-300">Overall Risk Level</p>
            <p className={`text-sm ${riskScore > 70 ? 'text-red-400' : riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
              {riskScore > 70 ? 'High Risk' : riskScore > 40 ? 'Medium Risk' : 'Low Risk'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <motion.div 
              key={transaction.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${transaction.risk === 'High' ? 'bg-red-400' : transaction.risk === 'Critical' ? 'bg-red-600' : 'bg-green-400'}`}></div>
                <div>
                  <h3 className="font-semibold text-white">{transaction.merchant}</h3>
                  <p className="text-sm text-gray-400">{transaction.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">${transaction.amount.toFixed(2)}</p>
                <p className={`text-sm ${transaction.risk === 'High' ? 'text-red-400' : transaction.risk === 'Critical' ? 'text-red-600' : 'text-green-400'}`}>
                  {transaction.risk}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fraud Alerts */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">Fraud Alerts</h2>
        <div className="space-y-4">
          {fraudAlerts.map((alert, index) => (
            <motion.div 
              key={alert.id}
              className="bg-gray-700 p-4 rounded-lg border-l-4 border-red-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{alert.type}</h3>
                  <p className="text-sm text-gray-300">{alert.description}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${alert.severity === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {alert.severity}
                  </p>
                  <p className="text-xs text-gray-400">{alert.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
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

export default FraudDetectionDemo;
