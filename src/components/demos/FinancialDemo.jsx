import React, { useState, useEffect } from 'react';

export default function FinancialDemo() {
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: 'Growth Portfolio', value: 125000, change: 2.4, risk: 'Medium', allocation: { stocks: 70, bonds: 20, crypto: 10 } },
    { id: 2, name: 'Conservative Portfolio', value: 89000, change: 1.2, risk: 'Low', allocation: { stocks: 30, bonds: 60, crypto: 10 } },
    { id: 3, name: 'Aggressive Portfolio', value: 210000, change: 4.8, risk: 'High', allocation: { stocks: 80, bonds: 10, crypto: 10 } },
  ]);

  const [marketData, setMarketData] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 185.42, change: 1.2, volume: '45.2M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.18, change: -0.8, volume: '32.1M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 2.1, volume: '28.7M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: 3.5, volume: '52.3M' },
  ]);

  const [aiPredictions, setAiPredictions] = useState([
    { symbol: 'AAPL', prediction: 'Buy', confidence: 87, target: 195.00, timeframe: '1 month' },
    { symbol: 'GOOGL', prediction: 'Hold', confidence: 72, target: 145.00, timeframe: '1 month' },
    { symbol: 'MSFT', prediction: 'Buy', confidence: 91, target: 390.00, timeframe: '1 month' },
    { symbol: 'TSLA', prediction: 'Sell', confidence: 65, target: 230.00, timeframe: '1 month' },
  ]);

  const [analytics, setAnalytics] = useState({
    totalAssets: 424000,
    dailyReturn: 2.1,
    volatility: 12.4,
    sharpeRatio: 1.8
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5) * 0.5
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getPredictionColor = (prediction) => {
    switch (prediction) {
      case 'Buy': return 'text-green-400';
      case 'Sell': return 'text-red-400';
      case 'Hold': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPredictionBg = (prediction) => {
    switch (prediction) {
      case 'Buy': return 'bg-green-600';
      case 'Sell': return 'bg-red-600';
      case 'Hold': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">📊 AI-Powered Financial Analytics</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Portfolio Performance</h4>
            <div className="space-y-4">
              {portfolios.map(portfolio => (
                <div key={portfolio.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-white">{portfolio.name}</h5>
                      <p className="text-gray-400 text-sm">Risk: {portfolio.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${portfolio.value.toLocaleString()}</p>
                      <p className={`font-medium ${getChangeColor(portfolio.change)}`}>
                        {portfolio.change >= 0 ? '+' : ''}{portfolio.change}%
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-600 rounded h-2">
                      <div className="bg-blue-500 h-2 rounded" style={{ width: `${portfolio.allocation.stocks}%` }}></div>
                    </div>
                    <div className="flex-1 bg-gray-600 rounded h-2">
                      <div className="bg-green-500 h-2 rounded" style={{ width: `${portfolio.allocation.bonds}%` }}></div>
                    </div>
                    <div className="flex-1 bg-gray-600 rounded h-2">
                      <div className="bg-orange-500 h-2 rounded" style={{ width: `${portfolio.allocation.crypto}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Stocks: {portfolio.allocation.stocks}%</span>
                    <span>Bonds: {portfolio.allocation.bonds}%</span>
                    <span>Crypto: {portfolio.allocation.crypto}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Analytics */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Market Analytics</h4>
            <div className="space-y-4">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Total Assets</p>
                <p className="text-2xl font-bold text-green-400">${analytics.totalAssets.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Daily Return</p>
                <p className="text-2xl font-bold text-green-400">{analytics.dailyReturn}%</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Volatility</p>
                <p className="text-2xl font-bold text-yellow-400">{analytics.volatility}%</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-green-400">{analytics.sharpeRatio}</p>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">🤖 AI Insights</h4>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-white text-sm font-medium">Market Sentiment</p>
                <p className="text-green-400 text-sm">Bullish (78% confidence)</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-white text-sm font-medium">Risk Assessment</p>
                <p className="text-yellow-400 text-sm">Moderate (Current volatility within normal range)</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-white text-sm font-medium">Recommended Action</p>
                <p className="text-green-400 text-sm">Rebalance portfolios toward tech sector</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Data */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">📈 Live Market Data</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-white font-semibold mb-4">Stock Prices</h5>
            <div className="space-y-3">
              {marketData.map(stock => (
                <div key={stock.symbol} className="bg-gray-700 p-3 rounded border border-gray-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">{stock.symbol}</p>
                      <p className="text-gray-400 text-xs">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${stock.price.toFixed(2)}</p>
                      <p className={`text-sm ${getChangeColor(stock.change)}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4">AI Predictions</h5>
            <div className="space-y-3">
              {aiPredictions.map(prediction => (
                <div key={prediction.symbol} className="bg-gray-700 p-3 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">{prediction.symbol}</p>
                      <p className="text-gray-400 text-xs">Target: ${prediction.target}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPredictionBg(prediction.prediction)} text-white`}>
                      {prediction.prediction}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Confidence: {prediction.confidence}%</span>
                    <span className="text-gray-400">{prediction.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">⚠️ Risk Analysis</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">Portfolio Risk</h5>
            <p className="text-gray-400 text-sm">Current risk level: Moderate</p>
            <p className="text-green-400 text-xs mt-2">Within acceptable range</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">Market Risk</h5>
            <p className="text-gray-400 text-sm">S&P 500 volatility: 15.2%</p>
            <p className="text-yellow-400 text-xs mt-2">Above average</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">AI Recommendations</h5>
            <p className="text-gray-400 text-sm">Consider hedging strategies</p>
            <p className="text-green-400 text-xs mt-2">Automated alerts active</p>
          </div>
        </div>
      </div>
    </div>
  );
} 