import React, { useState, useEffect } from 'react';

const FinancialDemo = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalAssets: 0,
    totalValue: 0,
    dailyReturn: 0,
    riskScore: 0
  });

  // Initialize portfolio data
  useEffect(() => {
    const initialPortfolios = [
      {
        id: 1,
        name: 'Growth Portfolio',
        type: 'Aggressive',
        status: 'active',
        totalValue: 125000,
        dailyChange: 2.3,
        totalReturn: 15.7,
        riskScore: 8.2,
        lastUpdate: '1 minute ago',
        alerts: [],
        assets: [
          { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, value: 8500, change: 1.2 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 30, value: 4200, change: -0.8 },
          { symbol: 'TSLA', name: 'Tesla Inc.', shares: 25, value: 3800, change: 3.5 },
          { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 40, value: 12000, change: 0.9 }
        ]
      },
      {
        id: 2,
        name: 'Conservative Portfolio',
        type: 'Defensive',
        status: 'active',
        totalValue: 89000,
        dailyChange: 0.8,
        totalReturn: 6.2,
        riskScore: 3.1,
        lastUpdate: '2 minutes ago',
        alerts: [],
        assets: [
          { symbol: 'JNJ', name: 'Johnson & Johnson', shares: 100, value: 15000, change: 0.5 },
          { symbol: 'PG', name: 'Procter & Gamble', shares: 80, value: 12000, change: 0.3 },
          { symbol: 'KO', name: 'Coca-Cola Co.', shares: 120, value: 6000, change: -0.2 },
          { symbol: 'VZ', name: 'Verizon Communications', shares: 150, value: 8000, change: 1.1 }
        ]
      },
      {
        id: 3,
        name: 'Tech Portfolio',
        type: 'High Risk',
        status: 'warning',
        totalValue: 156000,
        dailyChange: -1.5,
        totalReturn: 28.4,
        riskScore: 9.8,
        lastUpdate: 'Just now',
        alerts: ['High volatility detected', 'Risk threshold exceeded'],
        assets: [
          { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 60, value: 45000, change: -2.1 },
          { symbol: 'AMD', name: 'Advanced Micro Devices', shares: 200, value: 22000, change: -1.8 },
          { symbol: 'META', name: 'Meta Platforms', shares: 80, value: 28000, change: 0.7 },
          { symbol: 'NFLX', name: 'Netflix Inc.', shares: 100, value: 35000, change: -0.9 }
        ]
      }
    ];
    setPortfolios(initialPortfolios);
    setSystemStats({
      totalAssets: initialPortfolios.reduce((sum, p) => sum + p.assets.length, 0),
      totalValue: initialPortfolios.reduce((sum, p) => sum + p.totalValue, 0),
      dailyReturn: 1.2,
      riskScore: 7.0
    });
  }, []);

  // Simulate real-time market updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolios(prevPortfolios => prevPortfolios.map(portfolio => {
        const newPortfolio = {
          ...portfolio,
          totalValue: portfolio.totalValue + (Math.random() - 0.5) * 1000,
          dailyChange: portfolio.dailyChange + (Math.random() - 0.5) * 0.5,
          lastUpdate: 'Just now'
        };

        // Update individual assets
        newPortfolio.assets = portfolio.assets.map(asset => ({
          ...asset,
          value: asset.value + (Math.random() - 0.5) * 100,
          change: asset.change + (Math.random() - 0.5) * 0.3
        }));

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newPortfolio.dailyChange < -2) {
          newAlerts.push('Significant daily loss');
        }
        if (newPortfolio.riskScore > 9) {
          newAlerts.push('High risk threshold exceeded');
        }
        if (newPortfolio.totalValue < portfolio.totalValue * 0.95) {
          newAlerts.push('Portfolio value declining');
        }

        newPortfolio.alerts = newAlerts;
        newPortfolio.status = newAlerts.length > 2 ? 'critical' : 
                             newAlerts.length > 0 ? 'warning' : 'active';
        
        return newPortfolio;
      }));

      setSystemStats(prev => ({
        ...prev,
        totalValue: prevPortfolios.reduce((sum, p) => sum + p.totalValue, 0),
        dailyReturn: prev.dailyReturn + (Math.random() - 0.5) * 0.2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate market data
  useEffect(() => {
    const newMarketData = [
      {
        symbol: 'SPY',
        name: 'S&P 500 ETF',
        price: 415.67,
        change: 0.85,
        volume: '45.2M',
        marketCap: '385.2B'
      },
      {
        symbol: 'QQQ',
        name: 'NASDAQ-100 ETF',
        price: 378.92,
        change: -0.32,
        volume: '32.1M',
        marketCap: '175.8B'
      },
      {
        symbol: 'IWM',
        name: 'Russell 2000 ETF',
        price: 185.43,
        change: 1.23,
        volume: '28.7M',
        marketCap: '68.9B'
      },
      {
        symbol: 'GLD',
        name: 'Gold ETF',
        price: 198.76,
        change: 0.45,
        volume: '12.3M',
        marketCap: '38.5B'
      }
    ];
    setMarketData(newMarketData);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = portfolios.flatMap(portfolio => 
        portfolio.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          portfolio: portfolio.name,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [portfolios]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskColor = (risk) => {
    if (risk > 8) return 'text-red-400';
    if (risk > 5) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">💰 Financial Analytics Platform</h1>
          <p className="text-gray-300 text-lg">
            AI-powered portfolio management with real-time market data, risk assessment, and predictive analytics
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">💼</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Assets</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalAssets}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Portfolio Value</h3>
            <p className="text-3xl font-bold text-blue-400">{formatCurrency(systemStats.totalValue)}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Daily Return</h3>
            <p className={`text-3xl font-bold ${systemStats.dailyReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {systemStats.dailyReturn >= 0 ? '+' : ''}{systemStats.dailyReturn.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Risk Score</h3>
            <p className={`text-3xl font-bold ${getRiskColor(systemStats.riskScore)}`}>
              {systemStats.riskScore.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Portfolio Management</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPortfolio?.id === portfolio.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPortfolio(portfolio)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{portfolio.name}</h3>
                        <p className="text-gray-400 text-sm">{portfolio.type} • {portfolio.assets.length} assets</p>
                        <p className={`text-sm ${getStatusColor(portfolio.status)}`}>
                          {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs ${getStatusBg(portfolio.status)}`}>
                          {portfolio.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{portfolio.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Total Value</p>
                        <p className="text-white font-semibold">{formatCurrency(portfolio.totalValue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Daily Change</p>
                        <p className={`text-white font-semibold ${
                          portfolio.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {portfolio.dailyChange >= 0 ? '+' : ''}{portfolio.dailyChange.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Return</p>
                        <p className={`text-white font-semibold ${
                          portfolio.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {portfolio.totalReturn >= 0 ? '+' : ''}{portfolio.totalReturn.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Risk Score</p>
                        <p className={`text-white font-semibold ${getRiskColor(portfolio.riskScore)}`}>
                          {portfolio.riskScore.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Data & Alerts */}
          <div className="space-y-6">
            {/* Market Data */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Market Data</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {marketData.map((stock) => (
                  <div key={stock.symbol} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{stock.symbol}</p>
                        <p className="text-blue-200 text-sm">{stock.name}</p>
                        <p className="text-gray-300 text-xs">Vol: {stock.volume}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${stock.price.toFixed(2)}</p>
                        <p className={`text-sm ${
                          stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 Financial Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.portfolio}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Trading Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Rebalance Portfolio
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Risk Assessment
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Market Analysis
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Details */}
        {selectedPortfolio && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedPortfolio.name} Details</h2>
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Portfolio Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Type</span>
                    <span className="text-lg font-semibold text-white">{selectedPortfolio.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Value</span>
                    <span className="text-lg font-semibold text-white">{formatCurrency(selectedPortfolio.totalValue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Change</span>
                    <span className={`text-lg font-semibold ${
                      selectedPortfolio.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedPortfolio.dailyChange >= 0 ? '+' : ''}{selectedPortfolio.dailyChange.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Return</span>
                    <span className={`text-lg font-semibold ${
                      selectedPortfolio.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedPortfolio.totalReturn >= 0 ? '+' : ''}{selectedPortfolio.totalReturn.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Risk Score</span>
                    <span className={`text-lg font-semibold ${getRiskColor(selectedPortfolio.riskScore)}`}>
                      {selectedPortfolio.riskScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Asset Holdings</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedPortfolio.assets.map((asset) => (
                    <div key={asset.symbol} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{asset.symbol}</p>
                          <p className="text-gray-400 text-sm">{asset.name}</p>
                          <p className="text-gray-300 text-xs">{asset.shares} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{formatCurrency(asset.value)}</p>
                          <p className={`text-sm ${
                            asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 AI-Powered Financial Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Portfolio Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time performance tracking</li>
                <li>• Risk assessment models</li>
                <li>• Asset allocation optimization</li>
                <li>• Correlation analysis</li>
                <li>• Volatility forecasting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Market Intelligence</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Sentiment analysis</li>
                <li>• News impact assessment</li>
                <li>• Technical indicator analysis</li>
                <li>• Market trend prediction</li>
                <li>• Earnings forecast models</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Trading Automation</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Algorithmic trading strategies</li>
                <li>• Stop-loss optimization</li>
                <li>• Rebalancing automation</li>
                <li>• Tax-loss harvesting</li>
                <li>• Portfolio rebalancing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDemo; 