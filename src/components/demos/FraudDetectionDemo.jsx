import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const FraudDetectionDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalTransactions: 0,
    flaggedTransactions: 0,
    accuracy: 98.5,
    averageAmount: 0,
    topMerchants: [],
    riskDistribution: { low: 0, medium: 0, high: 0 }
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';

const FraudDetectionDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        amount: Math.floor(Math.random() * 10000) + 100,
        merchant: ['Amazon', 'Walmart', 'Target'][Math.floor(Math.random() * 3)],
        location: ['New York', 'Los Angeles', 'Chicago'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toLocaleTimeString(),
        riskScore: Math.random() * 100,
        isFraudulent: Math.random() > 0.95
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      
      if (newTransaction.isFraudulent || newTransaction.riskScore > 80) {
        setFraudAlerts(prev => [{
          id: Date.now(),
          transactionId: newTransaction.id,
          reason: newTransaction.isFraudulent ? 'Suspicious pattern' : 'High risk score',
          severity: newTransaction.isFraudulent ? 'High' : 'Medium',
          timestamp: new Date().toLocaleTimeString()
        }, ...prev.slice(0, 4)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Real-time transaction monitoring UI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 rounded-lg border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">₹{tx.amount.toLocaleString()}</p>
                  <p className="text-gray-300 text-sm">{tx.merchant}</p>
                  <p className="text-gray-400 text-xs">{tx.location} • {tx.timestamp}</p>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 rounded text-xs">
                    Risk: {tx.riskScore.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FraudDetectionDemo;`;

  useEffect(() => {
    // Simulate real-time transaction monitoring
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        amount: Math.floor(Math.random() * 10000) + 100,
        merchant: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Costco', 'Target', 'Starbucks', 'McDonald\'s', 'Shell'][Math.floor(Math.random() * 10)],
        location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][Math.floor(Math.random() * 10)],
        timestamp: new Date().toLocaleTimeString(),
        riskScore: Math.random() * 100,
        isFraudulent: Math.random() > 0.95, // 5% chance of fraud
        cardType: ['Visa', 'Mastercard', 'American Express', 'Discover'][Math.floor(Math.random() * 4)],
        deviceType: ['Mobile', 'Desktop', 'Tablet'][Math.floor(Math.random() * 3)],
        ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]);
      
      // Update analytics
      setAnalytics(prev => {
        const allTransactions = [newTransaction, ...transactions];
        const merchantCounts = {};
        allTransactions.forEach(tx => {
          merchantCounts[tx.merchant] = (merchantCounts[tx.merchant] || 0) + 1;
        });
        
        const riskDistribution = { low: 0, medium: 0, high: 0 };
        allTransactions.forEach(tx => {
          if (tx.riskScore < 30) riskDistribution.low++;
          else if (tx.riskScore < 70) riskDistribution.medium++;
          else riskDistribution.high++;
        });

        return {
          totalTransactions: prev.totalTransactions + 1,
          flaggedTransactions: prev.flaggedTransactions + (newTransaction.isFraudulent ? 1 : 0),
          accuracy: Math.max(95, prev.accuracy - (Math.random() * 0.1)),
          averageAmount: allTransactions.reduce((sum, tx) => sum + tx.amount, 0) / allTransactions.length,
          topMerchants: Object.entries(merchantCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([merchant, count]) => ({ merchant, count })),
          riskDistribution
        };
      });

      if (newTransaction.isFraudulent || newTransaction.riskScore > 80) {
        setFraudAlerts(prev => [{
          id: Date.now(),
          transactionId: newTransaction.id,
          reason: newTransaction.isFraudulent ? 'Suspicious transaction pattern' : 'High risk score',
          severity: newTransaction.isFraudulent ? 'High' : 'Medium',
          timestamp: new Date().toLocaleTimeString(),
          amount: newTransaction.amount,
          merchant: newTransaction.merchant,
          location: newTransaction.location
        }, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [transactions]);

  const getRiskColor = (riskScore) => {
    if (riskScore < 30) return 'text-green-400';
    if (riskScore < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskBg = (riskScore) => {
    if (riskScore < 30) return 'bg-green-600';
    if (riskScore < 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🔍 AI-Powered Fraud Detection System</h1>
            <p className="text-gray-300 text-lg">
              Real-time machine learning-based fraud detection monitoring UPI transactions with advanced analytics
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-green-400">{analytics.totalTransactions.toLocaleString()}</p>
            <p className="text-green-300 text-sm">+{Math.floor(Math.random() * 5) + 1} last minute</p>
          </div>
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Flagged Transactions</h3>
            <p className="text-3xl font-bold text-red-400">{analytics.flaggedTransactions}</p>
            <p className="text-red-300 text-sm">{((analytics.flaggedTransactions / analytics.totalTransactions) * 100).toFixed(2)}% rate</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Detection Accuracy</h3>
            <p className="text-3xl font-bold text-blue-400">{analytics.accuracy.toFixed(1)}%</p>
            <p className="text-blue-300 text-sm">ML Model Performance</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Transaction</h3>
            <p className="text-3xl font-bold text-purple-400">₹{analytics.averageAmount.toFixed(0)}</p>
            <p className="text-purple-300 text-sm">Real-time average</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Live Transaction Monitor</h2>
                <div className="text-sm text-green-300">Real-time updates every 2s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      tx.isFraudulent 
                        ? 'bg-red-900/50 border-red-600' 
                        : tx.riskScore > 70 
                          ? 'bg-yellow-900/50 border-yellow-600'
                          : 'bg-gray-800/50 border-gray-600'
                    )}
                    onClick={() => setSelectedTransaction(tx)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-white">₹{tx.amount.toLocaleString()}</p>
                        <p className="text-gray-300 text-sm">{tx.merchant}</p>
                        <p className="text-gray-400 text-xs">{tx.location} • {tx.timestamp}</p>
                        <p className="text-gray-400 text-xs">{tx.cardType} • {tx.deviceType}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getRiskBg(tx.riskScore)}>
                          Risk: {tx.riskScore.toFixed(1)}%
                        </div>
                        {tx.isFraudulent && (
                          <div className="mt-1 px-2 py-1 bg-red-600 text-white rounded text-xs">
                            FRAUD DETECTED
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Risk Level</span>
                        <span>{tx.riskScore.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + getRiskBg(tx.riskScore)}
                          style={{ width: tx.riskScore + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 Fraud Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {fraudAlerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  fraudAlerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">₹{alert.amount?.toLocaleString()}</p>
                          <p className="text-red-200 text-sm">{alert.merchant}</p>
                          <p className="text-red-200 text-xs">{alert.reason}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          alert.severity === 'High' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">📈 Risk Distribution</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-200">Low Risk</span>
                  <span className="text-white font-semibold">{analytics.riskDistribution.low}</span>
                </div>
                <div className="w-full bg-yellow-800 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(analytics.riskDistribution.low / analytics.totalTransactions) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-yellow-200">Medium Risk</span>
                  <span className="text-white font-semibold">{analytics.riskDistribution.medium}</span>
                </div>
                <div className="w-full bg-yellow-800 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(analytics.riskDistribution.medium / analytics.totalTransactions) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-yellow-200">High Risk</span>
                  <span className="text-white font-semibold">{analytics.riskDistribution.high}</span>
                </div>
                <div className="w-full bg-yellow-800 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(analytics.riskDistribution.high / analytics.totalTransactions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Top Merchants */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🏪 Top Merchants</h2>
              <div className="space-y-2">
                {analytics.topMerchants.map((merchant, index) => (
                  <div key={merchant.merchant} className="flex justify-between items-center">
                    <span className="text-blue-200">{merchant.merchant}</span>
                    <span className="text-white font-semibold">{merchant.count} transactions</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Amount</p>
                  <p className="text-white font-semibold">₹{selectedTransaction.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Merchant</p>
                  <p className="text-white font-semibold">{selectedTransaction.merchant}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white font-semibold">{selectedTransaction.location}</p>
                </div>
                <div>
                  <p className="text-gray-400">Card Type</p>
                  <p className="text-white font-semibold">{selectedTransaction.cardType}</p>
                </div>
                <div>
                  <p className="text-gray-400">Device</p>
                  <p className="text-white font-semibold">{selectedTransaction.deviceType}</p>
                </div>
                <div>
                  <p className="text-gray-400">IP Address</p>
                  <p className="text-white font-semibold">{selectedTransaction.ipAddress}</p>
                </div>
                <div>
                  <p className="text-gray-400">Risk Score</p>
                  <p className={'font-semibold ' + getRiskColor(selectedTransaction.riskScore)}>
                    {selectedTransaction.riskScore.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className={'font-semibold ' + (selectedTransaction.isFraudulent ? 'text-red-400' : 'text-green-400')}>
                    {selectedTransaction.isFraudulent ? 'FRAUD DETECTED' : 'CLEAR'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Features Section */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 AI-Powered Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Machine Learning</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time pattern recognition</li>
                <li>• Behavioral analysis</li>
                <li>• Anomaly detection</li>
                <li>• Risk scoring algorithms</li>
                <li>• Adaptive learning models</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Security Features</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Multi-factor authentication</li>
                <li>• Device fingerprinting</li>
                <li>• Location-based analysis</li>
                <li>• Transaction velocity checks</li>
                <li>• Real-time fraud alerts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Analytics & Reporting</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time dashboards</li>
                <li>• Risk distribution analysis</li>
                <li>• Merchant profiling</li>
                <li>• Performance metrics</li>
                <li>• Compliance reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Fraud Detection Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default FraudDetectionDemo; 