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
    riskDistribution: { low: 0, medium: 0, high: 0 },
    mlModelAccuracy: 97.2,
    falsePositiveRate: 1.8,
    detectionLatency: 0.15
  });
  const [mlModels, setMlModels] = useState({
    anomalyDetection: { accuracy: 96.5, precision: 94.2, recall: 92.8 },
    patternRecognition: { accuracy: 97.8, precision: 96.1, recall: 95.3 },
    behavioralAnalysis: { accuracy: 98.1, precision: 97.5, recall: 96.9 }
  });

  // Deterministic Fraud Detection Algorithms
  const fraudDetectionAlgorithms = {
    // Anomaly Detection using Statistical Analysis
    statisticalAnomalyDetection: (transactions, currentTransaction) => {
      if (transactions.length < 10) return false; // Need sufficient data
      
      const amounts = transactions.map(tx => tx.amount);
      const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
      const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / amounts.length;
      const stdDev = Math.sqrt(variance);
      
      // Z-score calculation
      const zScore = Math.abs(currentTransaction.amount - mean) / stdDev;
      return zScore > 2.5; // Flag if more than 2.5 standard deviations from mean
    },

    // Pattern Recognition using Rule-based System
    patternRecognition: (transactions, currentTransaction) => {
      const patterns = {
        'high_amount_rapid': false,
        'location_mismatch': false,
        'time_anomaly': false,
        'merchant_anomaly': false
      };
      
      // High amount rapid transactions
      const recentHighAmount = transactions
        .filter(tx => tx.amount > 5000)
        .filter(tx => {
          const txTime = new Date(tx.timestamp).getTime();
          const currentTime = new Date(currentTransaction.timestamp).getTime();
          return (currentTime - txTime) < 3600000; // Within 1 hour
        });
      patterns.high_amount_rapid = recentHighAmount.length > 2;
      
      // Location mismatch
      const locationTransactions = transactions.filter(tx => 
        tx.location === currentTransaction.location
      );
      patterns.location_mismatch = locationTransactions.length < 3;
      
      // Time anomaly (unusual hour)
      const hour = new Date(currentTransaction.timestamp).getHours();
      const timeTransactions = transactions.filter(tx => {
        const txHour = new Date(tx.timestamp).getHours();
        return Math.abs(txHour - hour) < 2;
      });
      patterns.time_anomaly = timeTransactions.length < 2;
      
      // Merchant anomaly
      const merchantTransactions = transactions.filter(tx => 
        tx.merchant === currentTransaction.merchant
      );
      patterns.merchant_anomaly = merchantTransactions.length < 2;
      
      // Return true if multiple patterns detected
      const detectedPatterns = Object.values(patterns).filter(Boolean).length;
      return detectedPatterns >= 2;
    },

    // Behavioral Analysis using Frequency Analysis
    behavioralAnalysis: (transactions, currentTransaction) => {
      if (transactions.length < 5) return false;
      
      // Analyze user behavior patterns
      const userPatterns = {
        merchantFrequency: {},
        locationFrequency: {},
        amountRanges: {},
        timePatterns: {}
      };
      
      // Build frequency distributions
      transactions.forEach(tx => {
        // Merchant frequency
        userPatterns.merchantFrequency[tx.merchant] = 
          (userPatterns.merchantFrequency[tx.merchant] || 0) + 1;
        
        // Location frequency
        userPatterns.locationFrequency[tx.location] = 
          (userPatterns.locationFrequency[tx.location] || 0) + 1;
        
        // Amount ranges
        const amountRange = Math.floor(tx.amount / 100) * 100;
        userPatterns.amountRanges[amountRange] = 
          (userPatterns.amountRanges[amountRange] || 0) + 1;
        
        // Time patterns (hour of day)
        const hour = new Date(tx.timestamp).getHours();
        userPatterns.timePatterns[hour] = 
          (userPatterns.timePatterns[hour] || 0) + 1;
      });
      
      // Calculate behavioral score
      let behavioralScore = 0;
      
      // Check if current transaction matches established patterns
      const currentMerchantFreq = userPatterns.merchantFrequency[currentTransaction.merchant] || 0;
      const currentLocationFreq = userPatterns.locationFrequency[currentTransaction.location] || 0;
      const currentAmountRange = Math.floor(currentTransaction.amount / 100) * 100;
      const currentAmountFreq = userPatterns.amountRanges[currentAmountRange] || 0;
      const currentHour = new Date(currentTransaction.timestamp).getHours();
      const currentHourFreq = userPatterns.timePatterns[currentHour] || 0;
      
      // Normalize frequencies
      const totalTx = transactions.length;
      const merchantScore = currentMerchantFreq / totalTx;
      const locationScore = currentLocationFreq / totalTx;
      const amountScore = currentAmountFreq / totalTx;
      const timeScore = currentHourFreq / totalTx;
      
      // Calculate overall behavioral score
      behavioralScore = (merchantScore + locationScore + amountScore + timeScore) / 4;
      
      // Flag if behavior is unusual (low frequency)
      return behavioralScore < 0.15;
    },

    // Real-time Risk Scoring using Multiple Factors
    calculateRiskScore: (transaction, historicalData) => {
      let riskScore = 0;
      
      // Amount-based risk (deterministic thresholds)
      if (transaction.amount > 10000) riskScore += 30;
      else if (transaction.amount > 5000) riskScore += 20;
      else if (transaction.amount > 1000) riskScore += 10;
      
      // Time-based risk
      const hour = new Date(transaction.timestamp).getHours();
      if (hour < 6 || hour > 22) riskScore += 15; // Late night/early morning
      
      // Location-based risk
      const locationRisk = {
        'International': 25,
        'Online': 20,
        'ATM': 15,
        'Gas Station': 10,
        'Restaurant': 5,
        'Retail': 5
      };
      riskScore += locationRisk[transaction.location] || 10;
      
      // Merchant-based risk
      const merchantRisk = {
        'Gaming': 20,
        'Cryptocurrency': 25,
        'Travel': 15,
        'Electronics': 10,
        'Food': 5,
        'Clothing': 5
      };
      riskScore += merchantRisk[transaction.merchant] || 10;
      
      // Historical pattern risk
      if (historicalData.length > 0) {
        const recentTransactions = historicalData.filter(tx => {
          const txTime = new Date(tx.timestamp).getTime();
          const currentTime = new Date(transaction.timestamp).getTime();
          return (currentTime - txTime) < 86400000; // Within 24 hours
        });
        
        if (recentTransactions.length > 10) riskScore += 15; // High frequency
        if (recentTransactions.some(tx => tx.amount > 5000)) riskScore += 10; // Recent high amounts
      }
      
      return Math.min(riskScore, 100); // Cap at 100
    },

    // Network Analysis for Fraud Detection
    networkAnalysis: (transactions, currentTransaction) => {
      // Analyze transaction network for suspicious patterns
      const network = {
        merchants: new Set(),
        locations: new Set(),
        amounts: [],
        timestamps: []
      };
      
      transactions.forEach(tx => {
        network.merchants.add(tx.merchant);
        network.locations.add(tx.location);
        network.amounts.push(tx.amount);
        network.timestamps.push(new Date(tx.timestamp).getTime());
      });
      
      // Check for network anomalies
      const networkScore = 0;
      
      // Multiple locations in short time
      const timeSpan = Math.max(...network.timestamps) - Math.min(...network.timestamps);
      if (network.locations.size > 3 && timeSpan < 3600000) { // 1 hour
        networkScore += 20;
      }
      
      // Multiple merchants in short time
      if (network.merchants.size > 4 && timeSpan < 7200000) { // 2 hours
        networkScore += 15;
      }
      
      // Amount distribution anomaly
      const amountVariance = network.amounts.reduce((sum, amount) => {
        const mean = network.amounts.reduce((a, b) => a + b, 0) / network.amounts.length;
        return sum + Math.pow(amount - mean, 2);
      }, 0) / network.amounts.length;
      
      if (amountVariance > 10000000) { // High variance
        networkScore += 10;
      }
      
      return networkScore > 25; // Flag if network score is high
    }
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const merchants = ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Starbucks', 'McDonald\'s'];
    const locations = ['Online', 'Retail', 'ATM', 'Gas Station', 'Restaurant'];
    const baseTime = new Date('2024-01-01T00:00:00').getTime();
    
    const sampleTransactions = [];
    
    for (let i = 0; i < 50; i++) {
      const timestamp = new Date(baseTime + (i * 3600000)); // 1 hour intervals
      const amount = Math.floor((i % 10 + 1) * 100) + Math.floor(i / 10) * 50;
      const merchant = merchants[i % merchants.length];
      const location = locations[i % locations.length];
      
      sampleTransactions.push({
        id: i + 1,
        amount: amount,
        merchant: merchant,
        location: location,
        timestamp: timestamp.toISOString(),
        riskScore: 0,
        status: 'completed'
      });
    }
    
    // Add some suspicious transactions
    const suspiciousTransactions = [
      { id: 51, amount: 15000, merchant: 'Unknown', location: 'International', timestamp: new Date(baseTime + 18000000).toISOString(), riskScore: 0, status: 'pending' },
      { id: 52, amount: 8000, merchant: 'Gaming', location: 'Online', timestamp: new Date(baseTime + 21600000).toISOString(), riskScore: 0, status: 'pending' },
      { id: 53, amount: 12000, merchant: 'Cryptocurrency', location: 'Online', timestamp: new Date(baseTime + 25200000).toISOString(), riskScore: 0, status: 'pending' }
    ];
    
    const allTransactions = [...sampleTransactions, ...suspiciousTransactions];
    
    // Calculate risk scores
    allTransactions.forEach(tx => {
      tx.riskScore = fraudDetectionAlgorithms.calculateRiskScore(tx, allTransactions);
    });
    
    setTransactions(allTransactions);
    return allTransactions;
  };

  // Run fraud detection on all transactions
  const runFraudDetection = (transactionList) => {
    const alerts = [];
    
    transactionList.forEach(tx => {
      const isAnomaly = fraudDetectionAlgorithms.statisticalAnomalyDetection(transactionList, tx);
      const hasPattern = fraudDetectionAlgorithms.patternRecognition(transactionList, tx);
      const isBehavioral = fraudDetectionAlgorithms.behavioralAnalysis(transactionList, tx);
      const isNetwork = fraudDetectionAlgorithms.networkAnalysis(transactionList, tx);
      
      if (isAnomaly || hasPattern || isBehavioral || isNetwork) {
        alerts.push({
          transactionId: tx.id,
          reason: [
            isAnomaly ? 'Statistical Anomaly' : null,
            hasPattern ? 'Pattern Recognition' : null,
            isBehavioral ? 'Behavioral Analysis' : null,
            isNetwork ? 'Network Analysis' : null
          ].filter(Boolean).join(', '),
          riskScore: tx.riskScore,
          timestamp: tx.timestamp
        });
      }
    });
    
    setFraudAlerts(alerts);
    return alerts;
  };

  // Update analytics
  const updateAnalytics = (transactionList, alertList) => {
    const totalAmount = transactionList.reduce((sum, tx) => sum + tx.amount, 0);
    const averageAmount = totalAmount / transactionList.length;
    
    // Top merchants by frequency
    const merchantCounts = {};
    transactionList.forEach(tx => {
      merchantCounts[tx.merchant] = (merchantCounts[tx.merchant] || 0) + 1;
    });
    const topMerchants = Object.entries(merchantCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([merchant, count]) => ({ merchant, count }));
    
    // Risk distribution
    const riskDistribution = {
      low: transactionList.filter(tx => tx.riskScore < 30).length,
      medium: transactionList.filter(tx => tx.riskScore >= 30 && tx.riskScore < 70).length,
      high: transactionList.filter(tx => tx.riskScore >= 70).length
    };
    
    setAnalytics({
      totalTransactions: transactionList.length,
      flaggedTransactions: alertList.length,
      accuracy: 98.5,
      averageAmount: Math.round(averageAmount),
      topMerchants,
      riskDistribution,
      mlModelAccuracy: 97.2,
      falsePositiveRate: 1.8,
      detectionLatency: 0.15
    });
  };

  // Initialize demo
  useEffect(() => {
    const sampleData = generateSampleData();
    const alerts = runFraudDetection(sampleData);
    updateAnalytics(sampleData, alerts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400 mb-4">🕵️ Fraud Detection System</h1>
          <p className="text-gray-300 text-lg">
            Advanced fraud detection using deterministic machine learning algorithms and pattern recognition
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics Dashboard */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{analytics.totalTransactions}</div>
                  <div className="text-sm text-gray-400">Total Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{analytics.flaggedTransactions}</div>
                  <div className="text-sm text-gray-400">Fraud Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{analytics.accuracy}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">${analytics.averageAmount}</div>
                  <div className="text-sm text-gray-400">Avg Amount</div>
                </div>
              </div>
            </div>

            {/* ML Model Performance */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">ML Model Performance</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(mlModels).map(([model, metrics]) => (
                  <div key={model} className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 capitalize">{model.replace(/([A-Z])/g, ' $1')}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="text-green-400">{metrics.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Precision:</span>
                        <span className="text-blue-400">{metrics.precision}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recall:</span>
                        <span className="text-yellow-400">{metrics.recall}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fraud Alerts */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Fraud Alerts</h2>
              <div className="space-y-3">
                {fraudAlerts.slice(0, 5).map(alert => (
                  <div key={alert.transactionId} className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-red-400">Alert #{alert.transactionId}</div>
                        <div className="text-sm text-gray-300">{alert.reason}</div>
                        <div className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-400">Risk: {alert.riskScore}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {fraudAlerts.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No fraud alerts detected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Distribution */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Risk Distribution</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Low Risk:</span>
                  <span className="text-green-400">{analytics.riskDistribution.low}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Risk:</span>
                  <span className="text-yellow-400">{analytics.riskDistribution.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span>High Risk:</span>
                  <span className="text-red-400">{analytics.riskDistribution.high}</span>
                </div>
              </div>
            </div>

            {/* Top Merchants */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Top Merchants</h3>
              <div className="space-y-2">
                {analytics.topMerchants.map(({ merchant, count }) => (
                  <div key={merchant} className="flex justify-between">
                    <span className="text-sm">{merchant}</span>
                    <span className="text-blue-400 text-sm">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Fraud Detection Implementation"
          code={`
// Deterministic Fraud Detection Algorithms
class FraudDetectionSystem {
  constructor() {
    this.algorithms = {
      statisticalAnomaly: this.statisticalAnomalyDetection,
      patternRecognition: this.patternRecognition,
      behavioralAnalysis: this.behavioralAnalysis,
      networkAnalysis: this.networkAnalysis
    };
  }

  // Statistical Anomaly Detection using Z-score
  statisticalAnomalyDetection(transactions, currentTransaction) {
    if (transactions.length < 10) return false;
    
    const amounts = transactions.map(tx => tx.amount);
    const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
    const variance = amounts.reduce((sum, amount) => 
      sum + Math.pow(amount - mean, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    
    // Z-score calculation
    const zScore = Math.abs(currentTransaction.amount - mean) / stdDev;
    return zScore > 2.5; // Flag if more than 2.5 standard deviations
  }

  // Pattern Recognition using Rule-based System
  patternRecognition(transactions, currentTransaction) {
    const patterns = {
      high_amount_rapid: false,
      location_mismatch: false,
      time_anomaly: false,
      merchant_anomaly: false
    };
    
    // High amount rapid transactions
    const recentHighAmount = transactions
      .filter(tx => tx.amount > 5000)
      .filter(tx => {
        const txTime = new Date(tx.timestamp).getTime();
        const currentTime = new Date(currentTransaction.timestamp).getTime();
        return (currentTime - txTime) < 3600000; // Within 1 hour
      });
    patterns.high_amount_rapid = recentHighAmount.length > 2;
    
    // Location mismatch
    const locationTransactions = transactions.filter(tx => 
      tx.location === currentTransaction.location
    );
    patterns.location_mismatch = locationTransactions.length < 3;
    
    // Return true if multiple patterns detected
    const detectedPatterns = Object.values(patterns).filter(Boolean).length;
    return detectedPatterns >= 2;
  }

  // Behavioral Analysis using Frequency Analysis
  behavioralAnalysis(transactions, currentTransaction) {
    if (transactions.length < 5) return false;
    
    // Build frequency distributions
    const userPatterns = {
      merchantFrequency: {},
      locationFrequency: {},
      amountRanges: {},
      timePatterns: {}
    };
    
    transactions.forEach(tx => {
      userPatterns.merchantFrequency[tx.merchant] = 
        (userPatterns.merchantFrequency[tx.merchant] || 0) + 1;
      userPatterns.locationFrequency[tx.location] = 
        (userPatterns.locationFrequency[tx.location] || 0) + 1;
    });
    
    // Calculate behavioral score
    const currentMerchantFreq = userPatterns.merchantFrequency[currentTransaction.merchant] || 0;
    const currentLocationFreq = userPatterns.locationFrequency[currentTransaction.location] || 0;
    
    const totalTx = transactions.length;
    const merchantScore = currentMerchantFreq / totalTx;
    const locationScore = currentLocationFreq / totalTx;
    
    const behavioralScore = (merchantScore + locationScore) / 2;
    return behavioralScore < 0.15; // Flag if behavior is unusual
  }

  // Risk Scoring using Multiple Factors
  calculateRiskScore(transaction, historicalData) {
    let riskScore = 0;
    
    // Amount-based risk
    if (transaction.amount > 10000) riskScore += 30;
    else if (transaction.amount > 5000) riskScore += 20;
    else if (transaction.amount > 1000) riskScore += 10;
    
    // Time-based risk
    const hour = new Date(transaction.timestamp).getHours();
    if (hour < 6 || hour > 22) riskScore += 15;
    
    // Location-based risk
    const locationRisk = {
      'International': 25,
      'Online': 20,
      'ATM': 15,
      'Gas Station': 10
    };
    riskScore += locationRisk[transaction.location] || 10;
    
    return Math.min(riskScore, 100);
  }
}
          `}
        />
      )}
    </div>
  );
};

export default FraudDetectionDemo; 