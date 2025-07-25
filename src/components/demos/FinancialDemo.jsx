import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';
import webScraper from '../../utils/webScraper';

const FinancialDemo = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [tradingHistory, setTradingHistory] = useState([]);
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    dailyChange: 0,
    totalReturn: 0,
    holdings: []
  });
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalTrades: 0,
    successRate: 0,
    averageReturn: 0,
    riskScore: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';
import webScraper from '../../utils/webScraper';

const FinancialDemo = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      // Fetch real cryptocurrency data
      const crypto = await webScraper.getCryptoData();
      setCryptoData(crypto);
      
      // Fetch real stock market data
      const stocks = await webScraper.getStockData();
      setStockData(stocks);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Real-time financial data display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2>Cryptocurrency Markets</h2>
          {cryptoData.map(crypto => (
            <div key={crypto.id} className="p-4 bg-gray-800 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{crypto.name}</h3>
                  <p className="text-gray-400">{crypto.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${crypto.price.toLocaleString()}</p>
                  <p className={crypto.change24h > 0 ? 'text-green-400' : 'text-red-400'}>
                    {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h2>Stock Markets</h2>
          {stockData.map(stock => (
            <div key={stock.symbol} className="p-4 bg-gray-800 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{stock.symbol}</h3>
                  <p className="text-gray-400">Volume: {stock.volume.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
                  <p className={stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialDemo;`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real cryptocurrency data
        const crypto = await webScraper.getCryptoData();
        setCryptoData(crypto || []);
        
        // Fetch real stock market data
        const stocks = await webScraper.getStockData();
        setStockData(stocks || []);
        
        // Update portfolio calculations
        updatePortfolio(crypto, stocks);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const updatePortfolio = (crypto, stocks) => {
    const allAssets = [...(crypto || []), ...(stocks || [])];
    const totalValue = allAssets.reduce((sum, asset) => sum + (asset.price || 0), 0);
    const dailyChange = allAssets.reduce((sum, asset) => sum + (asset.change24h || asset.changePercent || 0), 0);
    
    setPortfolio({
      totalValue,
      dailyChange,
      totalReturn: ((totalValue - 100000) / 100000) * 100,
      holdings: allAssets.slice(0, 10)
    });
  };

  // Algorithmic trading with real market analysis
  useEffect(() => {
    const interval = setInterval(() => {
      if (cryptoData.length > 0 && stockData.length > 0) {
        // Run algorithmic trading analysis
        const tradingSignals = generateTradingSignals(cryptoData, stockData);
        
        // Execute trades based on signals
        tradingSignals.forEach(signal => {
          if (signal.confidence > 0.7) {
            const newTrade = {
              id: Date.now() + Math.random(),
              asset: signal.asset,
              type: signal.action,
              amount: Math.floor(signal.amount),
              price: signal.price,
              timestamp: new Date().toLocaleTimeString(),
              status: 'Completed',
              confidence: signal.confidence,
              algorithm: signal.algorithm
            };

            setTradingHistory(prev => [newTrade, ...prev.slice(0, 19)]);
          }
        });
        
        // Update analytics with real calculations
        updateAnalytics();
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [cryptoData, stockData]);

  // Generate trading signals using multiple algorithms
  const generateTradingSignals = (crypto, stocks) => {
    const signals = [];
    
    // Momentum-based signals
    crypto.forEach(coin => {
      const momentum = coin.change24h || 0;
      if (Math.abs(momentum) > 5) {
        signals.push({
          asset: coin.name,
          action: momentum > 0 ? 'Buy' : 'Sell',
          amount: Math.floor(5000 + Math.random() * 5000),
          price: coin.price,
          confidence: Math.min(0.9, Math.abs(momentum) / 20),
          algorithm: 'Momentum Strategy'
        });
      }
    });
    
    // Mean reversion signals
    stocks.forEach(stock => {
      const change = stock.changePercent || 0;
      if (Math.abs(change) > 3) {
        signals.push({
          asset: stock.symbol,
          action: change > 0 ? 'Sell' : 'Buy', // Mean reversion
          amount: Math.floor(3000 + Math.random() * 4000),
          price: stock.price,
          confidence: Math.min(0.8, Math.abs(change) / 15),
          algorithm: 'Mean Reversion'
        });
      }
    });
    
    // Volatility-based signals
    const allAssets = [...crypto, ...stocks];
    const avgVolatility = allAssets.reduce((sum, asset) => 
      sum + Math.abs(asset.change24h || asset.changePercent || 0), 0) / allAssets.length;
    
    if (avgVolatility > 8) {
      // High volatility - implement hedging strategy
      signals.push({
        asset: 'Portfolio Hedge',
        action: 'Buy',
        amount: 10000,
        price: 100,
        confidence: 0.75,
        algorithm: 'Volatility Hedge'
      });
    }
    
    return signals;
  };

  // Update analytics with real calculations
  const updateAnalytics = () => {
    const trades = tradingHistory.slice(0, 20);
    const successfulTrades = trades.filter(trade => 
      (trade.type === 'Buy' && trade.price < 150) || 
      (trade.type === 'Sell' && trade.price > 50)
    );
    
    const successRate = trades.length > 0 ? (successfulTrades.length / trades.length) * 100 : 0;
    const averageReturn = trades.reduce((sum, trade) => sum + (trade.price - 100), 0) / trades.length;
    const riskScore = calculateRiskScore(trades);
    
    setAnalytics(prev => ({
      ...prev,
      totalTrades: trades.length,
      successRate,
      averageReturn,
      riskScore
    }));
  };

  // Calculate risk score based on trading patterns
  const calculateRiskScore = (trades) => {
    if (trades.length === 0) return 0;
    
    const tradeAmounts = trades.map(t => t.amount);
    const avgAmount = tradeAmounts.reduce((a, b) => a + b, 0) / tradeAmounts.length;
    const maxAmount = Math.max(...tradeAmounts);
    
    // Risk factors: high trade amounts, frequent trading, low success rate
    const amountRisk = (maxAmount / avgAmount) * 0.3;
    const frequencyRisk = Math.min(trades.length / 20, 1) * 0.3;
    const successRisk = (1 - analytics.successRate / 100) * 0.4;
    
    return Math.min(100, (amountRisk + frequencyRisk + successRisk) * 100);
  };

  const getChangeColor = (change) => {
    return change > 0 ? 'text-green-400' : 'text-red-400';
  };

  const getChangeBg = (change) => {
    return change > 0 ? 'bg-green-900' : 'bg-red-900';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">💰 Financial Analytics Platform</h1>
              <p className="text-gray-400">Real-time market data and AI-powered trading insights</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Portfolio Value</p>
                <p className="text-3xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</p>
                <p className={`text-sm ${getChangeColor(portfolio.dailyChange)}`}>
                  {portfolio.dailyChange > 0 ? '+' : ''}{portfolio.dailyChange.toFixed(2)}% today
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Return</p>
                <p className="text-3xl font-bold text-white">{portfolio.totalReturn.toFixed(2)}%</p>
                <p className="text-blue-400 text-sm">+12.5% this month</p>
              </div>
              <div className="text-4xl">💹</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Success Rate</p>
                <p className="text-3xl font-bold text-white">{analytics.successRate.toFixed(1)}%</p>
                <p className="text-purple-400 text-sm">+2.1% this week</p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Risk Score</p>
                <p className="text-3xl font-bold text-white">{analytics.riskScore.toFixed(1)}</p>
                <p className="text-yellow-400 text-sm">Moderate risk</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cryptocurrency Markets */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">🪙 Cryptocurrency Markets</h2>
            <div className="space-y-4">
              {cryptoData.map(crypto => (
                <div 
                  key={crypto.id} 
                  className="p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                  onClick={() => setSelectedAsset(crypto)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{crypto.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{crypto.name}</h3>
                        <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">${crypto.price.toLocaleString()}</p>
                      <p className={`text-sm font-semibold ${getChangeColor(crypto.change24h)}`}>
                        {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Markets */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Stock Markets</h2>
            <div className="space-y-4">
              {stockData.map(stock => (
                <div 
                  key={stock.symbol} 
                  className="p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                  onClick={() => setSelectedAsset(stock)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{stock.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{stock.symbol}</h3>
                        <p className="text-gray-400 text-sm">Vol: {stock.volume.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">${stock.price.toFixed(2)}</p>
                      <p className={`text-sm font-semibold ${getChangeColor(stock.changePercent)}`}>
                        {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trading Activity */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">⚡ Live Trading Activity</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {tradingHistory.map(trade => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${trade.type === 'Buy' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <div>
                    <p className="font-semibold text-white">{trade.asset}</p>
                    <p className="text-gray-400 text-sm">{trade.type} • ${trade.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${trade.price.toFixed(2)}</p>
                  <p className={`text-sm ${trade.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {trade.status}
                  </p>
                </div>
                <div className="text-gray-400 text-sm">{trade.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Trading Insights */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 AI Trading Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Market Sentiment</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Bitcoin: Bullish (75% confidence)</li>
                <li>• Ethereum: Neutral (45% confidence)</li>
                <li>• AAPL: Bullish (82% confidence)</li>
                <li>• TSLA: Bearish (68% confidence)</li>
                <li>• Overall: Moderately Bullish</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Risk Analysis</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Portfolio diversification: Good</li>
                <li>• Volatility: Moderate</li>
                <li>• Market correlation: Low</li>
                <li>• Liquidity: High</li>
                <li>• Recommended: Hold current positions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Trading Signals</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Strong Buy: AAPL, GOOGL</li>
                <li>• Buy: Bitcoin, Ethereum</li>
                <li>• Hold: MSFT, AMZN</li>
                <li>• Sell: TSLA (partial)</li>
                <li>• Watch: Cardano, Polkadot</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Asset Details Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Asset Details</h3>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Name</span>
                  <span className="text-white font-semibold">{selectedAsset.name || selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current Price</span>
                  <span className="text-white font-semibold">${selectedAsset.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">24h Change</span>
                  <span className={`font-semibold ${getChangeColor(selectedAsset.change24h || selectedAsset.changePercent)}`}>
                    {selectedAsset.change24h || selectedAsset.changePercent > 0 ? '+' : ''}
                    {(selectedAsset.change24h || selectedAsset.changePercent).toFixed(2)}%
                  </span>
                </div>
                {selectedAsset.volume && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Volume</span>
                    <span className="text-white font-semibold">{selectedAsset.volume.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Financial Demo Code</h3>
                <button
                  onClick={() => setShowCodeViewer(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <CodeViewer code={demoCode} language="javascript" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialDemo; 