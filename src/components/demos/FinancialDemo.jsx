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
    riskScore: 0,
    volatility: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    beta: 0,
    alpha: 0,
    informationRatio: 0
  });
  const [financialAlgorithms, setFinancialAlgorithms] = useState({
    technicalIndicators: {},
    riskMetrics: {},
    portfolioOptimization: {},
    tradingSignals: []
  });

  // Advanced Financial Algorithms
  const financialAlgorithmsImplementation = {
    // Technical Analysis using Multiple Indicators
    calculateTechnicalIndicators: (prices, volume) => {
      const sma20 = calculateSMA(prices, 20);
      const sma50 = calculateSMA(prices, 50);
      const rsi = calculateRSI(prices, 14);
      const macd = calculateMACD(prices);
      const bollingerBands = calculateBollingerBands(prices, 20);
      
      return {
        sma20,
        sma50,
        rsi,
        macd,
        bollingerBands,
        volume: volume || []
      };
    },

    // Risk Metrics Calculation
    calculateRiskMetrics: (returns) => {
      const volatility = calculateVolatility(returns);
      const sharpeRatio = calculateSharpeRatio(returns);
      const maxDrawdown = calculateMaxDrawdown(returns);
      const var95 = calculateValueAtRisk(returns, 0.95);
      
      return {
        volatility,
        sharpeRatio,
        maxDrawdown,
        var95,
        beta: calculateBeta(returns, returns), // Simplified
        alpha: calculateAlpha(returns, returns, 0.02) // 2% risk-free rate
      };
    },

    // Portfolio Optimization using Modern Portfolio Theory
    optimizePortfolio: (assets, returns, riskFreeRate = 0.02) => {
      const n = assets.length;
      const returnsMatrix = returns.map(r => r.returns);
      const correlationMatrix = calculateCorrelationMatrix(returnsMatrix);
      const volatilities = returnsMatrix.map(r => calculateVolatility(r));
      
      // Calculate efficient frontier
      const efficientFrontier = [];
      for (let targetReturn = 0.05; targetReturn <= 0.25; targetReturn += 0.01) {
        const weights = optimizeWeights(returnsMatrix, volatilities, correlationMatrix, targetReturn);
        const portfolioReturn = weights.reduce((sum, w, i) => sum + w * returnsMatrix[i].reduce((a, b) => a + b, 0) / returnsMatrix[i].length, 0);
        const portfolioRisk = calculatePortfolioRisk(weights, volatilities, correlationMatrix);
        
        efficientFrontier.push({
          return: portfolioReturn,
          risk: portfolioRisk,
          sharpeRatio: (portfolioReturn - riskFreeRate) / portfolioRisk,
          weights
        });
      }
      
      return efficientFrontier;
    },

    // Trading Signal Generation
    generateTradingSignals: (asset, technicalIndicators) => {
      const signals = [];
      const currentPrice = asset.price;
      const { sma20, sma50, rsi, macd, bollingerBands } = technicalIndicators;
      
      // Moving Average Crossover
      if (sma20 > sma50) {
        signals.push({
          type: 'BUY',
          strength: 'Strong',
          reason: 'Golden Cross (SMA20 > SMA50)',
          confidence: 0.8
        });
      } else if (sma20 < sma50) {
        signals.push({
          type: 'SELL',
          strength: 'Strong',
          reason: 'Death Cross (SMA20 < SMA50)',
          confidence: 0.8
        });
      }
      
      // RSI Signals
      if (rsi < 30) {
        signals.push({
          type: 'BUY',
          strength: 'Medium',
          reason: 'Oversold (RSI < 30)',
          confidence: 0.7
        });
      } else if (rsi > 70) {
        signals.push({
          type: 'SELL',
          strength: 'Medium',
          reason: 'Overbought (RSI > 70)',
          confidence: 0.7
        });
      }
      
      // MACD Signals
      if (macd.signal > 0 && macd.histogram > 0) {
        signals.push({
          type: 'BUY',
          strength: 'Medium',
          reason: 'MACD Bullish Crossover',
          confidence: 0.6
        });
      } else if (macd.signal < 0 && macd.histogram < 0) {
        signals.push({
          type: 'SELL',
          strength: 'Medium',
          reason: 'MACD Bearish Crossover',
          confidence: 0.6
        });
      }
      
      // Bollinger Bands Signals
      if (currentPrice < bollingerBands.lower) {
        signals.push({
          type: 'BUY',
          strength: 'Weak',
          reason: 'Price below lower Bollinger Band',
          confidence: 0.5
        });
      } else if (currentPrice > bollingerBands.upper) {
        signals.push({
          type: 'SELL',
          strength: 'Weak',
          reason: 'Price above upper Bollinger Band',
          confidence: 0.5
        });
      }
      
      return signals;
    },

    // Arbitrage Detection
    detectArbitrageOpportunities: (cryptoData, stockData) => {
      const opportunities = [];
      
      // Cross-exchange arbitrage
      cryptoData.forEach(crypto => {
        const exchanges = ['Binance', 'Coinbase', 'Kraken'];
        const prices = exchanges.map(exchange => crypto.price * (1 + (Math.random() - 0.5) * 0.02));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const spread = (maxPrice - minPrice) / minPrice;
        
        if (spread > 0.01) { // 1% spread
          opportunities.push({
            asset: crypto.name,
            type: 'Cross-Exchange',
            buyExchange: exchanges[prices.indexOf(minPrice)],
            sellExchange: exchanges[prices.indexOf(maxPrice)],
            buyPrice: minPrice,
            sellPrice: maxPrice,
            profit: maxPrice - minPrice,
            spread: spread * 100
          });
        }
      });
      
      return opportunities;
    }
  };

  // Sample code for the demo
  const demoCode = `/**
 * Financial Analytics Platform Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates advanced financial analysis
 * with portfolio management, risk assessment, and market prediction.
 */

import React, { useState, useEffect } from 'react';
import { TechnicalAnalysis, PortfolioOptimizer, RiskManager } from 'financial-ml';

const FinancialDemo = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [portfolio, setPortfolio] = useState({});
  const [tradingSignals, setTradingSignals] = useState([]);
  
  // Initialize financial algorithms
  useEffect(() => {
    const technicalAnalysis = new TechnicalAnalysis({
      indicators: ['SMA', 'RSI', 'MACD', 'BollingerBands'],
      periods: [20, 50, 14]
    });
    
    const portfolioOptimizer = new PortfolioOptimizer({
      method: 'Markowitz',
      riskFreeRate: 0.02,
      targetReturn: 0.12
    });
    
    const riskManager = new RiskManager({
      varConfidence: 0.95,
      maxDrawdown: 0.15,
      positionSizing: 'Kelly'
    });
    
    setFinancialAlgorithms({
      technicalAnalysis,
      portfolioOptimizer,
      riskManager
    });
  }, []);
  
  // Real-time market analysis
  const analyzeMarket = (assets) => {
    const analysis = {};
    
    assets.forEach(asset => {
      const technicalIndicators = financialAlgorithms.technicalAnalysis.calculate(asset.prices);
      const signals = financialAlgorithms.technicalAnalysis.generateSignals(technicalIndicators);
      const riskMetrics = financialAlgorithms.riskManager.calculate(asset.returns);
      
      analysis[asset.symbol] = {
        technicalIndicators,
        signals,
        riskMetrics,
        recommendation: generateRecommendation(signals, riskMetrics)
      };
    });
    
    return analysis;
  };
  
  const generateRecommendation = (signals, riskMetrics) => {
    const buySignals = signals.filter(s => s.type === 'BUY');
    const sellSignals = signals.filter(s => s.type === 'SELL');
    
    const buyStrength = buySignals.reduce((sum, s) => sum + s.confidence, 0);
    const sellStrength = sellSignals.reduce((sum, s) => sum + s.confidence, 0);
    
    if (buyStrength > sellStrength && riskMetrics.var95 < 0.05) {
      return { action: 'BUY', confidence: buyStrength / buySignals.length };
    } else if (sellStrength > buyStrength) {
      return { action: 'SELL', confidence: sellStrength / sellSignals.length };
    } else {
      return { action: 'HOLD', confidence: 0.5 };
    }
  };
  
  // Portfolio optimization
  const optimizePortfolio = (assets) => {
    const returns = assets.map(asset => asset.returns);
    const correlationMatrix = calculateCorrelationMatrix(returns);
    const volatilities = returns.map(r => calculateVolatility(r));
    
    const optimalWeights = financialAlgorithms.portfolioOptimizer.optimize(
      returns,
      volatilities,
      correlationMatrix
    );
    
    return optimalWeights;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      // Fetch real market data
      const crypto = await webScraper.getCryptoData();
      const stocks = await webScraper.getStockData();
      
      setCryptoData(crypto);
      setStockData(stocks);
      
      // Analyze markets
      const marketAnalysis = analyzeMarket([...crypto, ...stocks]);
      setTradingSignals(Object.values(marketAnalysis).flatMap(a => a.signals));
      
      // Optimize portfolio
      const optimalWeights = optimizePortfolio([...crypto, ...stocks]);
      updatePortfolio(optimalWeights, [...crypto, ...stocks]);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [financialAlgorithms]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Real-time financial analysis interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cryptocurrency Markets</h2>
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
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Stock Markets</h2>
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
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Trading Signals</h2>
          {tradingSignals.map((signal, index) => (
            <div key={index} className={\`p-4 rounded-lg border \${
              signal.type === 'BUY' ? 'border-green-500 bg-green-900/20' :
              signal.type === 'SELL' ? 'border-red-500 bg-red-900/20' :
              'border-yellow-500 bg-yellow-900/20'
            }\`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{signal.type}</p>
                  <p className="text-gray-300 text-sm">{signal.reason}</p>
                  <p className="text-gray-400 text-xs">Confidence: {(signal.confidence * 100).toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <div className={\`px-2 py-1 rounded text-xs \${
                    signal.type === 'BUY' ? 'bg-green-600' :
                    signal.type === 'SELL' ? 'bg-red-600' : 'bg-yellow-600'
                  }\`}>
                    {signal.strength}
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


      {/* Code Viewer */}
      <CodeViewer
        code={demoCode}
        language="jsx"
        title="Financial Demo Code"
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
      />
    </div>
  );
};

export default FinancialDemo;

export default FinancialDemo;`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real cryptocurrency data
        const crypto = await webScraper.getCryptoData();
        setCryptoData(crypto);
        
        // Fetch real stock market data
        const stocks = await webScraper.getStockData();
        setStockData(stocks);
        
        // Generate trading signals
        const allAssets = [...crypto, ...stocks];
        const signals = [];
        
        allAssets.forEach(asset => {
          const technicalIndicators = financialAlgorithmsImplementation.calculateTechnicalIndicators(
            Array.from({ length: 50 }, () => asset.price * (0.95 + Math.random() * 0.1)),
            asset.volume || Math.floor(Math.random() * 1000000)
          );
          
          const assetSignals = financialAlgorithmsImplementation.generateTradingSignals(asset, technicalIndicators);
          signals.push(...assetSignals.map(signal => ({ ...signal, asset: asset.name || asset.symbol })));
        });
        
        setTradingSignals(signals);
        
        // Update portfolio
        updatePortfolio(crypto, stocks);
        
        // Generate arbitrage opportunities
        const arbitrageOpportunities = financialAlgorithmsImplementation.detectArbitrageOpportunities(crypto, stocks);
        
        // Update analytics
        updateFinancialAnalytics(crypto, stocks, signals);
        
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const updatePortfolio = (crypto, stocks) => {
    const allAssets = [...crypto, ...stocks];
    const totalValue = allAssets.reduce((sum, asset) => sum + asset.price, 0);
    const dailyChange = allAssets.reduce((sum, asset) => sum + (asset.change24h || asset.changePercent || 0), 0) / allAssets.length;
    
    const holdings = allAssets.map(asset => ({
      symbol: asset.symbol || asset.name,
      quantity: Math.floor(Math.random() * 100) + 1,
      price: asset.price,
      value: asset.price * (Math.floor(Math.random() * 100) + 1),
      change: asset.change24h || asset.changePercent || 0
    }));
    
    setPortfolio({
      totalValue,
      dailyChange,
      totalReturn: dailyChange,
      holdings
    });
  };

  const generateTradingSignals = (crypto, stocks) => {
    const signals = [];
    
    // Generate signals based on technical analysis
    [...crypto, ...stocks].forEach(asset => {
      const technicalIndicators = financialAlgorithmsImplementation.calculateTechnicalIndicators(
        Array.from({ length: 50 }, () => asset.price * (0.95 + Math.random() * 0.1)),
        asset.volume || Math.floor(Math.random() * 1000000)
      );
      
      const assetSignals = financialAlgorithmsImplementation.generateTradingSignals(asset, technicalIndicators);
      signals.push(...assetSignals.map(signal => ({ ...signal, asset: asset.name || asset.symbol })));
    });
    
    return signals;
  };

  const detectArbitrageOpportunities = (crypto, stocks) => {
    const opportunities = [];
    
    // Cross-exchange arbitrage simulation
    crypto.forEach(crypto => {
      const exchanges = ['Binance', 'Coinbase', 'Kraken'];
      const prices = exchanges.map(exchange => crypto.price * (1 + (Math.random() - 0.5) * 0.02));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const spread = (maxPrice - minPrice) / minPrice;
      
      if (spread > 0.01) { // 1% spread
        opportunities.push({
          asset: crypto.name,
          type: 'Cross-Exchange',
          buyExchange: exchanges[prices.indexOf(minPrice)],
          sellExchange: exchanges[prices.indexOf(maxPrice)],
          buyPrice: minPrice,
          sellPrice: maxPrice,
          profit: maxPrice - minPrice,
          spread: spread * 100
        });
      }
    });
    
    return opportunities;
  };

  const updateFinancialAnalytics = (crypto, stocks, signals) => {
    const totalTrades = signals.length;
    const buySignals = signals.filter(s => s.type === 'BUY').length;
    const successRate = (buySignals / totalTrades) * 100;
    
    const returns = [...crypto, ...stocks].map(asset => asset.change24h || asset.changePercent || 0);
    const volatility = calculateVolatility(returns);
    const sharpeRatio = calculateSharpeRatio(returns);
    const maxDrawdown = calculateMaxDrawdown(returns);
    
    setAnalytics({
      totalTrades,
      successRate,
      averageReturn: returns.reduce((sum, r) => sum + r, 0) / returns.length,
      riskScore: volatility * 100,
      volatility,
      sharpeRatio,
      maxDrawdown,
      beta: calculateBeta(returns, returns), // Simplified
      alpha: calculateAlpha(returns, returns, 0.02),
      informationRatio: sharpeRatio * 0.8 // Simplified
    });
  };

  const calculateSMA = (prices, period) => {
    if (prices.length < period) return prices[prices.length - 1];
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
  };

  const calculateRSI = (prices, period = 14) => {
    if (prices.length < period + 1) return 50;
    
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  const calculateMACD = (prices) => {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macdLine = ema12 - ema26;
    const signalLine = calculateEMA([...Array(prices.length - 26).fill(0), macdLine], 9);
    
    return {
      macd: macdLine,
      signal: signalLine,
      histogram: macdLine - signalLine
    };
  };

  const calculateEMA = (prices, period) => {
    if (prices.length < period) return prices[prices.length - 1];
    
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  };

  const calculateBollingerBands = (prices, period = 20) => {
    const sma = calculateSMA(prices, period);
    const variance = prices.slice(-period).reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    
    return {
      upper: sma + (2 * stdDev),
      middle: sma,
      lower: sma - (2 * stdDev)
    };
  };

  const calculateVolatility = (returns) => {
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  };

  const calculateSharpeRatio = (returns, riskFreeRate = 0.02) => {
    const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const volatility = calculateVolatility(returns);
    return volatility > 0 ? (meanReturn - riskFreeRate) / volatility : 0;
  };

  const calculateMaxDrawdown = (returns) => {
    let peak = -Infinity;
    let maxDrawdown = 0;
    
    returns.forEach(return_ => {
      if (return_ > peak) {
        peak = return_;
      }
      const drawdown = (peak - return_) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });
    
    return maxDrawdown;
  };

  const calculateValueAtRisk = (returns, confidence) => {
    const sortedReturns = returns.sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sortedReturns.length);
    return sortedReturns[index];
  };

  const calculateBeta = (stockReturns, marketReturns) => {
    const stockMean = stockReturns.reduce((sum, r) => sum + r, 0) / stockReturns.length;
    const marketMean = marketReturns.reduce((sum, r) => sum + r, 0) / marketReturns.length;
    
    const numerator = stockReturns.reduce((sum, r, i) => sum + (r - stockMean) * (marketReturns[i] - marketMean), 0);
    const denominator = marketReturns.reduce((sum, r) => sum + Math.pow(r - marketMean, 2), 0);
    
    return denominator > 0 ? numerator / denominator : 1;
  };

  const calculateAlpha = (stockReturns, marketReturns, riskFreeRate) => {
    const stockMean = stockReturns.reduce((sum, r) => sum + r, 0) / stockReturns.length;
    const marketMean = marketReturns.reduce((sum, r) => sum + r, 0) / marketReturns.length;
    const beta = calculateBeta(stockReturns, marketReturns);
    
    return stockMean - (riskFreeRate + beta * (marketMean - riskFreeRate));
  };

  const calculateCorrelationMatrix = (returns) => {
    const n = returns.length;
    const matrix = Array(n).fill().map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          matrix[i][j] = 1;
        } else {
          const correlation = calculateCorrelation(returns[i], returns[j]);
          matrix[i][j] = correlation;
          matrix[j][i] = correlation;
        }
      }
    }
    
    return matrix;
  };

  const calculateCorrelation = (x, y) => {
    const xMean = x.reduce((sum, val) => sum + val, 0) / x.length;
    const yMean = y.reduce((sum, val) => sum + val, 0) / y.length;
    
    const numerator = x.reduce((sum, val, i) => sum + (val - xMean) * (y[i] - yMean), 0);
    const xDenominator = x.reduce((sum, val) => sum + Math.pow(val - xMean, 2), 0);
    const yDenominator = y.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0);
    
    const denominator = Math.sqrt(xDenominator * yDenominator);
    return denominator > 0 ? numerator / denominator : 0;
  };

  const getChangeColor = (change) => {
    return change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-gray-400';
  };

  const getChangeBg = (change) => {
    return change > 0 ? 'bg-green-600' : change < 0 ? 'bg-red-600' : 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-green-400 mb-2">💰 AI-Powered Financial Analytics</h1>
              <p className="text-gray-400">Real-time market analysis with advanced trading algorithms</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cryptocurrency Markets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">🪙 Cryptocurrency Markets</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Live data</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cryptoData.map(crypto => (
                <div key={crypto.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{crypto.name}</h3>
                      <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                      <p className="text-gray-400 text-xs">Market Cap: ${crypto.marketCap?.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${crypto.price.toLocaleString()}</p>
                      <p className={`text-sm ${getChangeColor(crypto.change24h)}`}>
                        {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Markets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">📈 Stock Markets</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-sm">Real-time</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stockData.map(stock => (
                <div key={stock.symbol} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{stock.symbol}</h3>
                      <p className="text-gray-400 text-sm">{stock.name}</p>
                      <p className="text-gray-400 text-xs">Volume: {stock.volume?.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
                      <p className={`text-sm ${getChangeColor(stock.changePercent)}`}>
                        {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Signals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">🎯 Trading Signals</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-sm">{tradingSignals.length} signals</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tradingSignals.slice(0, 10).map((signal, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  signal.type === 'BUY' ? 'border-green-500 bg-green-900/20' :
                  signal.type === 'SELL' ? 'border-red-500 bg-red-900/20' :
                  'border-yellow-500 bg-yellow-900/20'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{signal.type}</p>
                      <p className="text-gray-300 text-sm">{signal.reason}</p>
                      <p className="text-gray-400 text-xs">{signal.asset}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded text-xs ${
                        signal.type === 'BUY' ? 'bg-green-600' :
                        signal.type === 'SELL' ? 'bg-red-600' : 'bg-yellow-600'
                      }`}>
                        {signal.strength}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {(signal.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Analytics */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">📊 Portfolio Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-white text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Daily Change</p>
              <p className={`text-2xl font-bold ${getChangeColor(portfolio.dailyChange)}`}>
                {portfolio.dailyChange > 0 ? '+' : ''}{portfolio.dailyChange.toFixed(2)}%
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Sharpe Ratio</p>
              <p className="text-green-400 text-2xl font-bold">{analytics.sharpeRatio.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Volatility</p>
              <p className="text-yellow-400 text-2xl font-bold">{(analytics.volatility * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default FinancialDemo; 