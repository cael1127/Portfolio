import React, { useState, useEffect } from 'react';

const FinancialDemo = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [riskMetrics, setRiskMetrics] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'market', label: 'Market Data', icon: '📈' },
    { id: 'risk', label: 'Risk Analysis', icon: '⚠️' },
    { id: 'ai', label: 'AI Insights', icon: '🤖' }
  ];

  const timeframes = [
    { id: '1D', label: '1 Day' },
    { id: '1W', label: '1 Week' },
    { id: '1M', label: '1 Month' },
    { id: '3M', label: '3 Months' },
    { id: '1Y', label: '1 Year' },
    { id: '5Y', label: '5 Years' }
  ];

  useEffect(() => {
    initializeData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const initializeData = () => {
    // Initialize portfolio data
    const initialPortfolio = [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, avgPrice: 150, currentPrice: 175, allocation: 0.25 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 50, avgPrice: 2800, currentPrice: 2950, allocation: 0.20 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 75, avgPrice: 300, currentPrice: 320, allocation: 0.20 },
      { symbol: 'TSLA', name: 'Tesla Inc.', shares: 200, avgPrice: 200, currentPrice: 250, allocation: 0.15 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 60, avgPrice: 400, currentPrice: 450, allocation: 0.20 }
    ];

    setPortfolioData(initialPortfolio);

    // Initialize market data
    const initialMarketData = generateMarketData();
    setMarketData(initialMarketData);

    // Initialize risk metrics
    setRiskMetrics({
      sharpeRatio: 1.85,
      beta: 1.12,
      volatility: 0.18,
      maxDrawdown: -0.08,
      var95: -0.025
    });
  };

  const generateMarketData = () => {
    const data = [];
    const basePrice = 100;
    let currentPrice = basePrice;

    for (let i = 0; i < 252; i++) {
      const change = (Math.random() - 0.5) * 0.02;
      currentPrice *= (1 + change);
      
      data.push({
        date: new Date(Date.now() - (252 - i) * 24 * 60 * 60 * 1000),
        price: currentPrice,
        volume: Math.floor(Math.random() * 1000000) + 500000,
        change: change * 100
      });
    }

    return data;
  };

  const updateData = () => {
    setPortfolioData(prev => prev.map(stock => ({
      ...stock,
      currentPrice: stock.currentPrice * (1 + (Math.random() - 0.5) * 0.01)
    })));

    setMarketData(prev => {
      const newData = [...prev];
      const lastPrice = newData[newData.length - 1].price;
      const change = (Math.random() - 0.5) * 0.02;
      newData.push({
        date: new Date(),
        price: lastPrice * (1 + change),
        volume: Math.floor(Math.random() * 1000000) + 500000,
        change: change * 100
      });
      return newData.slice(-252); // Keep last 252 days
    });
  };

  const calculatePortfolioMetrics = () => {
    const totalValue = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
    const totalCost = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
    const totalGain = totalValue - totalCost;
    const totalGainPercent = (totalGain / totalCost) * 100;

    return {
      totalValue,
      totalCost,
      totalGain,
      totalGainPercent,
      dailyChange: (Math.random() - 0.5) * 0.03
    };
  };

  const renderPortfolioChart = () => {
    const metrics = calculatePortfolioMetrics();
    
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Portfolio Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Total Value</p>
            <p className="text-2xl font-bold text-green-400">
              ${metrics.totalValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Total Gain</p>
            <p className={'text-2xl font-bold ' + (metrics.totalGain >= 0 ? 'text-green-400' : 'text-red-400')}>
              ${metrics.totalGain.toFixed(2)} ({metrics.totalGainPercent.toFixed(2)}%)
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Daily Change</p>
            <p className={'text-2xl font-bold ' + (metrics.dailyChange >= 0 ? 'text-green-400' : 'text-red-400')}>
              {metrics.dailyChange >= 0 ? '+' : ''}{metrics.dailyChange.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Portfolio Allocation Chart */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-white mb-3">Asset Allocation</h4>
          <div className="flex flex-wrap gap-2">
            {portfolioData.map((stock, index) => (
              <div key={stock.symbol} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: 'hsl(' + (index * 60) + ', 70%, 50%)' }}
                />
                <span className="text-sm text-gray-300">{stock.symbol}</span>
                <span className="text-sm text-gray-400">({(stock.allocation * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Performance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Shares</th>
                <th className="text-left py-2">Avg Price</th>
                <th className="text-left py-2">Current Price</th>
                <th className="text-left py-2">Gain/Loss</th>
                <th className="text-left py-2">% Change</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map(stock => {
                const gainLoss = (stock.currentPrice - stock.avgPrice) * stock.shares;
                const percentChange = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
                
                return (
                  <tr key={stock.symbol} className="border-b border-gray-700">
                    <td className="py-2 font-semibold">{stock.symbol}</td>
                    <td className="py-2">{stock.shares}</td>
                    <td className="py-2">${stock.avgPrice.toFixed(2)}</td>
                    <td className="py-2">${stock.currentPrice.toFixed(2)}</td>
                    <td className={'py-2 ' + (gainLoss >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                    </td>
                    <td className={'py-2 ' + (percentChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMarketChart = () => {
    const recentData = marketData.slice(-30);
    
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">Market Performance</h3>
        
        <div className="mb-4">
          <div className="flex space-x-2">
            {timeframes.map(timeframe => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={'px-3 py-1 rounded text-sm ' + (
                  selectedTimeframe === timeframe.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                )}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Chart */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-white mb-3">Price Movement</h4>
          <div className="h-64 bg-gray-700 rounded p-4">
            <div className="flex items-end justify-between h-full">
              {recentData.map((point, index) => {
                const maxPrice = Math.max(...recentData.map(p => p.price));
                const minPrice = Math.min(...recentData.map(p => p.price));
                const height = ((point.price - minPrice) / (maxPrice - minPrice)) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-2 bg-blue-400 rounded-t"
                      style={{ height: height + '%' }}
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      ${point.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-xs text-gray-400">Current Price</p>
            <p className="text-lg font-bold text-green-400">
              ${recentData[recentData.length - 1]?.price.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-xs text-gray-400">Volume</p>
            <p className="text-lg font-bold text-blue-400">
              {(recentData[recentData.length - 1]?.volume / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-xs text-gray-400">Change</p>
            <p className={'text-lg font-bold ' + (recentData[recentData.length - 1]?.change >= 0 ? 'text-green-400' : 'text-red-400')}>
              {recentData[recentData.length - 1]?.change >= 0 ? '+' : ''}{recentData[recentData.length - 1]?.change.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-xs text-gray-400">Volatility</p>
            <p className="text-lg font-bold text-yellow-400">
              {riskMetrics.volatility.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderRiskAnalysis = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Risk Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Metrics */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Risk Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sharpe Ratio</span>
                <span className="text-green-400 font-semibold">{riskMetrics.sharpeRatio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Beta</span>
                <span className="text-blue-400 font-semibold">{riskMetrics.beta.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Volatility</span>
                <span className="text-yellow-400 font-semibold">{(riskMetrics.volatility * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Max Drawdown</span>
                <span className="text-red-400 font-semibold">{(riskMetrics.maxDrawdown * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">VaR (95%)</span>
                <span className="text-orange-400 font-semibold">{(riskMetrics.var95 * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Risk Visualization */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Risk Distribution</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Low Risk</span>
                  <span className="text-green-400">25%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Medium Risk</span>
                  <span className="text-yellow-400">45%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">High Risk</span>
                  <span className="text-red-400">30%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-white mb-3">Risk Alerts</h4>
          <div className="space-y-2">
            <div className="bg-red-900/20 border border-red-500/50 p-3 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-red-400">⚠️</span>
                <span className="text-red-300">High volatility detected in TSLA position</span>
              </div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/50 p-3 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⚠️</span>
                <span className="text-yellow-300">Portfolio concentration risk: 25% in AAPL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAIInsights = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-green-400 mb-4">AI-Powered Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Market Predictions */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Market Predictions</h4>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">AAPL</span>
                  <span className="text-green-400">+2.3%</span>
                </div>
                <p className="text-xs text-gray-400">AI predicts upward movement based on technical indicators</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">TSLA</span>
                  <span className="text-red-400">-1.8%</span>
                </div>
                <p className="text-xs text-gray-400">Potential downside due to market sentiment analysis</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">NVDA</span>
                  <span className="text-green-400">+3.1%</span>
                </div>
                <p className="text-xs text-gray-400">Strong buy signal from AI analysis</p>
              </div>
            </div>
          </div>

          {/* Portfolio Recommendations */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Portfolio Recommendations</h4>
            <div className="space-y-3">
              <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-400">💡</span>
                  <span className="text-blue-300 font-semibold">Rebalance Portfolio</span>
                </div>
                <p className="text-xs text-gray-300">Consider reducing AAPL allocation to 20% for better diversification</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/50 p-3 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-400">📈</span>
                  <span className="text-green-300 font-semibold">Buy Opportunity</span>
                </div>
                <p className="text-xs text-gray-300">MSFT showing strong fundamentals, consider adding 25 shares</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/50 p-3 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-400">⚡</span>
                  <span className="text-yellow-300 font-semibold">Risk Management</span>
                </div>
                <p className="text-xs text-gray-300">Set stop-loss at $240 for TSLA to limit downside risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Confidence Score */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-white mb-3">AI Confidence Score</h4>
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Prediction Accuracy</span>
              <span className="text-green-400 font-semibold">87.3%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '87.3%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">💰 Financial Analytics Platform</h1>
          <p className="text-gray-300 text-lg">
            Advanced financial analysis with real-time data, AI-powered insights, and comprehensive risk management
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={'px-4 py-2 rounded-lg transition-colors ' + (
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'portfolio' && renderPortfolioChart()}
          {activeTab === 'market' && renderMarketChart()}
          {activeTab === 'risk' && renderRiskAnalysis()}
          {activeTab === 'ai' && renderAIInsights()}
        </div>
      </div>
    </div>
  );
};

export default FinancialDemo; 