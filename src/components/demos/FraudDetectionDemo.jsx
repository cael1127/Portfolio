import React, { useState, useEffect } from 'react';

const FraudDetectionDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    flaggedTransactions: 0,
    accuracy: 98.5
  });

  useEffect(() => {
    // Simulate real-time transaction monitoring
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        amount: Math.floor(Math.random() * 10000) + 100,
        merchant: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot'][Math.floor(Math.random() * 5)],
        location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 6)],
        timestamp: new Date().toLocaleTimeString(),
        riskScore: Math.random() * 100,
        isFraudulent: Math.random() > 0.95 // 5% chance of fraud
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      setStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + 1,
        flaggedTransactions: prev.flaggedTransactions + (newTransaction.isFraudulent ? 1 : 0)
      }));

      if (newTransaction.isFraudulent || newTransaction.riskScore > 80) {
        setFraudAlerts(prev => [{
          id: Date.now(),
          transactionId: newTransaction.id,
          reason: newTransaction.isFraudulent ? 'Suspicious transaction pattern' : 'High risk score',
          severity: newTransaction.isFraudulent ? 'High' : 'Medium',
          timestamp: new Date().toLocaleTimeString()
        }, ...prev.slice(0, 4)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🔍 UPI Fraud Detection System</h1>
          <p className="text-gray-300 text-lg">
            Real-time machine learning-based fraud detection system monitoring UPI transactions
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-green-400">{stats.totalTransactions.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Flagged Transactions</h3>
            <p className="text-3xl font-bold text-red-400">{stats.flaggedTransactions}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Detection Accuracy</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.accuracy}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Transactions */}
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <h2 className="text-2xl font-bold text-white mb-6">Live Transaction Monitor</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className={'p-4 rounded-lg border ' + (
                    tx.isFraudulent 
                      ? 'bg-red-900/50 border-red-600' 
                      : tx.riskScore > 70 
                        ? 'bg-yellow-900/50 border-yellow-600'
                        : 'bg-gray-800/50 border-gray-600'
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-white">₹{tx.amount.toLocaleString()}</p>
                      <p className="text-gray-300 text-sm">{tx.merchant}</p>
                      <p className="text-gray-400 text-xs">{tx.location} • {tx.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <div className={'px-2 py-1 rounded text-xs font-medium ' + (
                        tx.isFraudulent 
                          ? 'bg-red-600 text-white' 
                          : tx.riskScore > 70 
                            ? 'bg-yellow-600 text-white'
                            : 'bg-green-600 text-white'
                      )}>
                        {tx.isFraudulent ? 'FRAUD' : tx.riskScore > 70 ? 'HIGH RISK' : 'SAFE'}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Risk: {tx.riskScore.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <h2 className="text-2xl font-bold text-white mb-6">🚨 Fraud Alerts</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {fraudAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="text-gray-300">No active fraud alerts</p>
                  <p className="text-gray-400 text-sm">System is monitoring transactions...</p>
                </div>
              ) : (
                fraudAlerts.map((alert) => (
                  <div key={alert.id} className="bg-red-800/50 p-4 rounded-lg border border-red-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-white">Alert #{alert.transactionId}</p>
                        <p className="text-red-200 text-sm">{alert.reason}</p>
                        <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                      </div>
                      <div className={'px-2 py-1 rounded text-xs font-medium ' + (
                        alert.severity === 'High' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                      )}>
                        {alert.severity} RISK
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ML Model Info */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Machine Learning Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Features Analyzed</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Transaction amount patterns</li>
                <li>• Geographic location analysis</li>
                <li>• Time-based behavior</li>
                <li>• Merchant category risk</li>
                <li>• User spending patterns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Detection Methods</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Anomaly detection algorithms</li>
                <li>• Pattern recognition</li>
                <li>• Real-time scoring</li>
                <li>• Behavioral analysis</li>
                <li>• Risk assessment models</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Technologies</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Python & TensorFlow</li>
                <li>• Scikit-learn</li>
                <li>• PostgreSQL</li>
                <li>• Redis for caching</li>
                <li>• Real-time processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetectionDemo; 