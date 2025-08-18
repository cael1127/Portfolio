import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

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

  // Advanced Financial Algorithms Implementation
  const financialAlgorithmsImplementation = {
    // Technical Analysis using Multiple Indicators
    calculateTechnicalIndicators: (prices, volume) => {
      if (!prices || prices.length < 20) return null;
      
      const sma20 = calculateSMA(prices, 20);
      const sma50 = calculateSMA(prices, 50);
      const rsi = calculateRSI(prices, 14);
      const macd = calculateMACD(prices);
      const bollingerBands = calculateBollingerBands(prices, 20);
      const stochastic = calculateStochastic(prices, 14);
      
      return {
        sma20,
        sma50,
        rsi,
        macd,
        bollingerBands,
        stochastic,
        volume: volume || []
      };
    },

    // Risk Metrics Calculation
    calculateRiskMetrics: (returns) => {
      if (!returns || returns.length < 2) return null;
      
      const volatility = calculateVolatility(returns);
      const sharpeRatio = calculateSharpeRatio(returns, 0.02); // 2% risk-free rate
      const maxDrawdown = calculateMaxDrawdown(returns);
      const var95 = calculateValueAtRisk(returns, 0.95);
      const beta = calculateBeta(returns, returns); // Simplified market correlation
      const alpha = calculateAlpha(returns, returns, 0.02);
      
      return {
        volatility,
        sharpeRatio,
        maxDrawdown,
        var95,
        beta,
        alpha,
        informationRatio: calculateInformationRatio(returns, returns) // Simplified
      };
    },

    // Portfolio Optimization using Modern Portfolio Theory
    optimizePortfolio: (assets, returns, riskFreeRate = 0.02) => {
      if (!assets || assets.length < 2) return null;
      
      const n = assets.length;
      const returnsMatrix = returns.map(r => r.returns);
      const correlationMatrix = calculateCorrelationMatrix(returnsMatrix);
      const volatilities = returnsMatrix.map(r => calculateVolatility(r));
      
      // Calculate efficient frontier
      const efficientFrontier = [];
      for (let targetReturn = 0.05; targetReturn <= 0.25; targetReturn += 0.01) {
        const weights = optimizeWeights(returnsMatrix, volatilities, correlationMatrix, targetReturn);
        if (weights) {
          const portfolioReturn = weights.reduce((sum, w, i) => sum + w * returnsMatrix[i].reduce((a, b) => a + b, 0) / returnsMatrix[i].length, 0);
          const portfolioRisk = calculatePortfolioRisk(weights, volatilities, correlationMatrix);
          
          efficientFrontier.push({
            return: portfolioReturn,
            risk: portfolioRisk,
            sharpeRatio: portfolioRisk > 0 ? (portfolioReturn - riskFreeRate) / portfolioRisk : 0,
            weights
          });
        }
      }
      
      return efficientFrontier;
    },

    // Trading Signal Generation
    generateTradingSignals: (asset, technicalIndicators) => {
      if (!technicalIndicators) return [];
      
      const signals = [];
      const { sma20, sma50, rsi, macd, bollingerBands, stochastic } = technicalIndicators;
      
      // Moving Average Crossover
      if (sma20 && sma50 && sma20.length > 0 && sma50.length > 0) {
        const currentSMA20 = sma20[sma20.length - 1];
        const currentSMA50 = sma50[sma50.length - 1];
        const previousSMA20 = sma20[sma20.length - 2];
        const previousSMA50 = sma50[sma50.length - 2];
        
        if (currentSMA20 > currentSMA50 && previousSMA20 <= previousSMA50) {
          signals.push({
            type: 'BUY',
            strength: 'Strong',
            reason: 'Golden Cross (SMA20 > SMA50)',
            confidence: 0.8
          });
        } else if (currentSMA20 < currentSMA50 && previousSMA20 >= previousSMA50) {
          signals.push({
            type: 'SELL',
            strength: 'Strong',
            reason: 'Death Cross (SMA20 < SMA50)',
            confidence: 0.8
          });
        }
      }
      
      // RSI Signals
      if (rsi && rsi.length > 0) {
        const currentRSI = rsi[rsi.length - 1];
        if (currentRSI < 30) {
          signals.push({
            type: 'BUY',
            strength: 'Medium',
            reason: 'RSI Oversold (< 30)',
            confidence: 0.7
          });
        } else if (currentRSI > 70) {
          signals.push({
            type: 'SELL',
            strength: 'Medium',
            reason: 'RSI Overbought (> 70)',
            confidence: 0.7
          });
        }
      }
      
      // MACD Signals
      if (macd && macd.signal && macd.signal.length > 0) {
        const currentMACD = macd.macd[macd.macd.length - 1];
        const currentSignal = macd.signal[macd.signal.length - 1];
        const previousMACD = macd.macd[macd.macd.length - 2];
        const previousSignal = macd.signal[macd.signal.length - 2];
        
        if (currentMACD > currentSignal && previousMACD <= previousSignal) {
          signals.push({
            type: 'BUY',
            strength: 'Medium',
            reason: 'MACD Bullish Crossover',
            confidence: 0.6
          });
        } else if (currentMACD < currentSignal && previousMACD >= previousSignal) {
          signals.push({
            type: 'SELL',
            strength: 'Medium',
            reason: 'MACD Bearish Crossover',
            confidence: 0.6
          });
        }
      }
      
      // Bollinger Bands Signals
      if (bollingerBands && bollingerBands.upper && bollingerBands.lower) {
        const currentPrice = asset.currentPrice;
        const upperBand = bollingerBands.upper[bollingerBands.upper.length - 1];
        const lowerBand = bollingerBands.lower[bollingerBands.lower.length - 1];
        
        if (currentPrice <= lowerBand) {
          signals.push({
            type: 'BUY',
            strength: 'Weak',
            reason: 'Price at Lower Bollinger Band',
            confidence: 0.5
          });
        } else if (currentPrice >= upperBand) {
          signals.push({
            type: 'SELL',
            strength: 'Weak',
            reason: 'Price at Upper Bollinger Band',
            confidence: 0.5
          });
        }
      }
      
      return signals;
    },

    // Market Sentiment Analysis
    analyzeMarketSentiment: (assets, newsData) => {
      let sentimentScore = 0;
      const factors = [];
      
      // Price momentum
      assets.forEach(asset => {
        if (asset.dailyChange > 0) {
          sentimentScore += 1;
          factors.push(`${asset.symbol}: Positive momentum`);
        } else if (asset.dailyChange < 0) {
          sentimentScore -= 1;
          factors.push(`${asset.symbol}: Negative momentum`);
        }
      });
      
      // Volume analysis
      const highVolumeAssets = assets.filter(asset => asset.volume > asset.averageVolume * 1.5);
      if (highVolumeAssets.length > 0) {
        sentimentScore += 0.5;
        factors.push('High volume activity detected');
      }
      
      // News sentiment (simplified)
      if (newsData && newsData.length > 0) {
        const positiveNews = newsData.filter(news => news.sentiment === 'positive').length;
        const negativeNews = newsData.filter(news => news.sentiment === 'negative').length;
        
        if (positiveNews > negativeNews) {
          sentimentScore += 1;
          factors.push('Positive news sentiment');
        } else if (negativeNews > positiveNews) {
          sentimentScore -= 1;
          factors.push('Negative news sentiment');
        }
      }
      
      const sentiment = sentimentScore > 1 ? 'Bullish' : sentimentScore < -1 ? 'Bearish' : 'Neutral';
      
      return {
        score: sentimentScore,
        sentiment: sentiment,
        factors: factors,
        confidence: Math.abs(sentimentScore) / 3
      };
    }
  };

  // Helper Functions for Technical Analysis
  const calculateSMA = (prices, period) => {
    if (prices.length < period) return null;
    
    const sma = [];
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
    return sma;
  };

  const calculateRSI = (prices, period) => {
    if (prices.length < period + 1) return null;
    
    const rsi = [];
    for (let i = 1; i < prices.length; i++) {
      const gains = [];
      const losses = [];
      
      for (let j = Math.max(0, i - period + 1); j <= i; j++) {
        const change = prices[j] - prices[j - 1];
        if (change > 0) gains.push(change);
        else losses.push(Math.abs(change));
      }
      
      const avgGain = gains.reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.reduce((a, b) => a + b, 0) / period;
      
      if (avgLoss === 0) {
        rsi.push(100);
      } else {
        const rs = avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
      }
    }
    
    return rsi;
  };

  const calculateMACD = (prices) => {
    if (prices.length < 26) return null;
    
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    
    if (!ema12 || !ema26) return null;
    
    const macd = [];
    const signal = [];
    
    // Calculate MACD line
    for (let i = 0; i < Math.min(ema12.length, ema26.length); i++) {
      macd.push(ema12[i] - ema26[i]);
    }
    
    // Calculate signal line (EMA of MACD)
    const signalEMA = calculateEMA(macd, 9);
    if (signalEMA) {
      signal.push(...signalEMA);
    }
    
    return { macd, signal };
  };

  const calculateEMA = (prices, period) => {
    if (prices.length < period) return null;
    
    const ema = [];
    const multiplier = 2 / (period + 1);
    
    // First EMA is SMA
    let sum = 0;
    for (let i = 0; i < period; i++) {
      sum += prices[i];
    }
    ema.push(sum / period);
    
    // Calculate EMA
    for (let i = period; i < prices.length; i++) {
      const newEMA = (prices[i] * multiplier) + (ema[ema.length - 1] * (1 - multiplier));
      ema.push(newEMA);
    }
    
    return ema;
  };

  const calculateBollingerBands = (prices, period) => {
    if (prices.length < period) return null;
    
    const sma = calculateSMA(prices, period);
    if (!sma) return null;
    
    const upper = [];
    const lower = [];
    const middle = sma;
    
    for (let i = 0; i < sma.length; i++) {
      const startIndex = Math.max(0, i);
      const endIndex = Math.min(prices.length, startIndex + period);
      const slice = prices.slice(startIndex, endIndex);
      
      const variance = slice.reduce((sum, price) => sum + Math.pow(price - sma[i], 2), 0) / slice.length;
      const stdDev = Math.sqrt(variance);
      
      upper.push(sma[i] + (stdDev * 2));
      lower.push(sma[i] - (stdDev * 2));
    }
    
    return { upper, lower, middle };
  };

  const calculateStochastic = (prices, period) => {
    if (prices.length < period) return null;
    
    const k = [];
    const d = [];
    
    for (let i = period - 1; i < prices.length; i++) {
      const slice = prices.slice(i - period + 1, i + 1);
      const high = Math.max(...slice);
      const low = Math.min(...slice);
      const current = prices[i];
      
      const kValue = ((current - low) / (high - low)) * 100;
      k.push(kValue);
    }
    
    // Calculate %D (SMA of %K)
    const dValues = calculateSMA(k, 3);
    if (dValues) {
      d.push(...dValues);
    }
    
    return { k, d };
  };

  // Risk Calculation Functions
  const calculateVolatility = (returns) => {
    if (returns.length < 2) return 0;
    
    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  };

  const calculateSharpeRatio = (returns, riskFreeRate) => {
    if (returns.length < 2) return 0;
    
    const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const volatility = calculateVolatility(returns);
    
    return volatility > 0 ? (meanReturn - riskFreeRate) / volatility : 0;
  };

  const calculateMaxDrawdown = (returns) => {
    if (returns.length < 2) return 0;
    
    let peak = 1;
    let maxDrawdown = 0;
    let cumulative = 1;
    
    returns.forEach(ret => {
      cumulative *= (1 + ret);
      if (cumulative > peak) {
        peak = cumulative;
      }
      
      const drawdown = (peak - cumulative) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });
    
    return maxDrawdown;
  };

  const calculateValueAtRisk = (returns, confidence) => {
    if (returns.length < 2) return 0;
    
    const sortedReturns = [...returns].sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sortedReturns.length);
    return sortedReturns[index];
  };

  const calculateBeta = (assetReturns, marketReturns) => {
    if (assetReturns.length < 2 || marketReturns.length < 2) return 1;
    
    const assetMean = assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length;
    const marketMean = marketReturns.reduce((sum, ret) => sum + ret, 0) / marketReturns.length;
    
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < Math.min(assetReturns.length, marketReturns.length); i++) {
      const assetDiff = assetReturns[i] - assetMean;
      const marketDiff = marketReturns[i] - marketMean;
      numerator += assetDiff * marketDiff;
      denominator += marketDiff * marketDiff;
    }
    
    return denominator > 0 ? numerator / denominator : 1;
  };

  const calculateAlpha = (assetReturns, marketReturns, riskFreeRate) => {
    if (assetReturns.length < 2 || marketReturns.length < 2) return 0;
    
    const assetMean = assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length;
    const marketMean = marketReturns.reduce((sum, ret) => sum + ret, 0) / marketReturns.length;
    const beta = calculateBeta(assetReturns, marketReturns);
    
    return assetMean - (riskFreeRate + beta * (marketMean - riskFreeRate));
  };

  const calculateInformationRatio = (assetReturns, benchmarkReturns) => {
    if (assetReturns.length < 2 || benchmarkReturns.length < 2) return 0;
    
    const assetMean = assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length;
    const benchmarkMean = benchmarkReturns.reduce((sum, ret) => sum + ret, 0) / benchmarkReturns.length;
    const trackingError = calculateVolatility(assetReturns.map((ret, i) => ret - (benchmarkReturns[i] || 0)));
    
    return trackingError > 0 ? (assetMean - benchmarkMean) / trackingError : 0;
  };

  // Portfolio Optimization Functions
  const calculateCorrelationMatrix = (returnsMatrix) => {
    const n = returnsMatrix.length;
    const correlationMatrix = Array(n).fill().map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          correlationMatrix[i][j] = 1;
        } else {
          correlationMatrix[i][j] = calculateCorrelation(returnsMatrix[i], returnsMatrix[j]);
        }
      }
    }
    
    return correlationMatrix;
  };

  const calculateCorrelation = (returns1, returns2) => {
    if (returns1.length < 2 || returns2.length < 2) return 0;
    
    const minLength = Math.min(returns1.length, returns2.length);
    const slice1 = returns1.slice(0, minLength);
    const slice2 = returns2.slice(0, minLength);
    
    const mean1 = slice1.reduce((sum, ret) => sum + ret, 0) / slice1.length;
    const mean2 = slice2.reduce((sum, ret) => sum + ret, 0) / slice2.length;
    
    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
    
    for (let i = 0; i < minLength; i++) {
      const diff1 = slice1[i] - mean1;
      const diff2 = slice2[i] - mean2;
      numerator += diff1 * diff2;
      denominator1 += diff1 * diff1;
      denominator2 += diff2 * diff2;
    }
    
    const denominator = Math.sqrt(denominator1 * denominator2);
    return denominator > 0 ? numerator / denominator : 0;
  };

  const optimizeWeights = (returnsMatrix, volatilities, correlationMatrix, targetReturn) => {
    // Simplified optimization - equal weights for demonstration
    const n = returnsMatrix.length;
    const weights = Array(n).fill(1 / n);
    
    // Calculate portfolio return and risk
    let portfolioReturn = 0;
    for (let i = 0; i < n; i++) {
      const assetReturn = returnsMatrix[i].reduce((sum, ret) => sum + ret, 0) / returnsMatrix[i].length;
      portfolioReturn += weights[i] * assetReturn;
    }
    
    // Adjust weights to meet target return (simplified)
    if (Math.abs(portfolioReturn - targetReturn) > 0.01) {
      // Simple adjustment
      const adjustment = (targetReturn - portfolioReturn) / n;
      for (let i = 0; i < n; i++) {
        weights[i] += adjustment;
      }
    }
    
    // Normalize weights
    const sum = weights.reduce((sum, w) => sum + w, 0);
    if (sum > 0) {
      for (let i = 0; i < n; i++) {
        weights[i] /= sum;
      }
    }
    
    return weights;
  };

  const calculatePortfolioRisk = (weights, volatilities, correlationMatrix) => {
    let portfolioVariance = 0;
    
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        portfolioVariance += weights[i] * weights[j] * volatilities[i] * volatilities[j] * correlationMatrix[i][j];
      }
    }
    
    return Math.sqrt(portfolioVariance);
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const basePrice = 100;
    const baseTime = Date.now();
    
    // Generate crypto data
    const cryptoAssets = ['BTC', 'ETH', 'ADA', 'DOT', 'LINK'];
    const cryptoData = cryptoAssets.map((symbol, index) => {
      const price = basePrice + (index * 10) + Math.sin(index * 0.5) * 5;
      const dailyChange = ((index % 3) - 1) * 0.05; // -5%, 0%, +5%
      const volume = 1000000 + (index * 100000);
      
      return {
        symbol,
        currentPrice: price,
        dailyChange: dailyChange,
        volume: volume,
        averageVolume: volume * 0.8,
        marketCap: price * volume,
        priceHistory: Array.from({ length: 30 }, (_, i) => price * (1 + Math.sin(i * 0.2) * 0.1))
      };
    });
    
    // Generate stock data
    const stockAssets = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
    const stockData = stockAssets.map((symbol, index) => {
      const price = basePrice + (index * 15) + Math.cos(index * 0.3) * 8;
      const dailyChange = ((index % 4) - 2) * 0.03; // -6%, -3%, 0%, +3%
      const volume = 5000000 + (index * 500000);
      
      return {
        symbol,
        currentPrice: price,
        dailyChange: dailyChange,
        volume: volume,
        averageVolume: volume * 0.9,
        marketCap: price * volume,
        priceHistory: Array.from({ length: 30 }, (_, i) => price * (1 + Math.cos(i * 0.15) * 0.08))
      };
    });
    
    // Generate trading history
    const tradingHistory = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      symbol: cryptoAssets[i % cryptoAssets.length],
      type: i % 2 === 0 ? 'BUY' : 'SELL',
      amount: 100 + (i * 50),
      price: basePrice + (i * 2),
      timestamp: new Date(baseTime - (i * 3600000)).toISOString(),
      status: 'completed'
    }));
    
    // Calculate portfolio
    const totalValue = cryptoData.reduce((sum, asset) => sum + asset.currentPrice * 100, 0) +
                      stockData.reduce((sum, asset) => sum + asset.currentPrice * 50, 0);
    
    const portfolio = {
      totalValue,
      dailyChange: 0.025, // 2.5%
      totalReturn: 0.15, // 15%
      holdings: [...cryptoData, ...stockData].map(asset => ({
        symbol: asset.symbol,
        quantity: asset.symbol.length > 3 ? 100 : 50, // Crypto: 100, Stock: 50
        currentPrice: asset.currentPrice,
        value: asset.symbol.length > 3 ? asset.currentPrice * 100 : asset.currentPrice * 50
      }))
    };
    
    setCryptoData(cryptoData);
    setStockData(stockData);
    setTradingHistory(tradingHistory);
    setPortfolio(portfolio);
    
    return { cryptoData, stockData, tradingHistory, portfolio };
  };

  // Run financial algorithms
  const runFinancialAlgorithms = (assets) => {
    const allAssets = [...assets.cryptoData, ...assets.stockData];
    
    // Calculate technical indicators for each asset
    const technicalIndicators = {};
    allAssets.forEach(asset => {
      technicalIndicators[asset.symbol] = financialAlgorithmsImplementation.calculateTechnicalIndicators(
        asset.priceHistory,
        [asset.volume]
      );
    });
    
    // Calculate risk metrics
    const riskMetrics = {};
    allAssets.forEach(asset => {
      const returns = asset.priceHistory.slice(1).map((price, i) => 
        (price - asset.priceHistory[i]) / asset.priceHistory[i]
      );
      riskMetrics[asset.symbol] = financialAlgorithmsImplementation.calculateRiskMetrics(returns);
    });
    
    // Generate trading signals
    const tradingSignals = [];
    allAssets.forEach(asset => {
      const signals = financialAlgorithmsImplementation.generateTradingSignals(
        asset,
        technicalIndicators[asset.symbol]
      );
      signals.forEach(signal => {
        tradingSignals.push({
          ...signal,
          symbol: asset.symbol,
          timestamp: new Date().toISOString()
        });
      });
    });
    
    // Portfolio optimization
    const returns = allAssets.map(asset => ({
      symbol: asset.symbol,
      returns: asset.priceHistory.slice(1).map((price, i) => 
        (price - asset.priceHistory[i]) / asset.priceHistory[i]
      )
    }));
    
    const portfolioOptimization = financialAlgorithmsImplementation.optimizePortfolio(
      allAssets.map(asset => asset.symbol),
      returns
    );
    
    // Market sentiment analysis
    const marketSentiment = financialAlgorithmsImplementation.analyzeMarketSentiment(
      allAssets,
      [] // No news data for demo
    );
    
    setFinancialAlgorithms({
      technicalIndicators,
      riskMetrics,
      portfolioOptimization: portfolioOptimization || [],
      tradingSignals: tradingSignals.slice(0, 10) // Show top 10 signals
    });
    
    // Update analytics
    const totalTrades = tradingHistory.length;
    const successRate = 65; // Simplified
    const averageReturn = portfolio.totalReturn;
    const riskScore = Object.values(riskMetrics).reduce((sum, metrics) => 
      sum + (metrics?.volatility || 0), 0) / Object.keys(riskMetrics).length;
    
    setAnalytics({
      totalTrades,
      successRate,
      averageReturn,
      riskScore: Math.round(riskScore * 100) / 100,
      volatility: Math.round(riskScore * 100) / 100,
      sharpeRatio: Object.values(riskMetrics).reduce((sum, metrics) => 
        sum + (metrics?.sharpeRatio || 0), 0) / Object.keys(riskMetrics).length,
      maxDrawdown: Object.values(riskMetrics).reduce((sum, metrics) => 
        sum + (metrics?.maxDrawdown || 0), 0) / Object.keys(riskMetrics).length,
      beta: Object.values(riskMetrics).reduce((sum, metrics) => 
        sum + (metrics?.beta || 1), 0) / Object.keys(riskMetrics).length,
      alpha: Object.values(riskMetrics).reduce((sum, metrics) => 
        sum + (metrics?.alpha || 0), 0) / Object.keys(riskMetrics).length,
      informationRatio: Object.values(riskMetrics).reduce((sum, metrics) => 
        sum + (metrics?.informationRatio || 0), 0) / Object.keys(riskMetrics).length
    });
    
    return { technicalIndicators, riskMetrics, tradingSignals, portfolioOptimization, marketSentiment };
  };

  // Initialize demo
  useEffect(() => {
    const sampleData = generateSampleData();
    const results = runFinancialAlgorithms(sampleData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">💰 Financial Analytics System</h1>
          <p className="text-gray-300 text-lg">
            Advanced financial algorithms for technical analysis, risk assessment, and portfolio optimization
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Overview */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Portfolio Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">${portfolio.totalValue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Value</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${portfolio.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {portfolio.dailyChange >= 0 ? '+' : ''}{(portfolio.dailyChange * 100).toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-400">Daily Change</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{(portfolio.totalReturn * 100).toFixed(2)}%</div>
                  <div className="text-sm text-gray-400">Total Return</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{portfolio.holdings.length}</div>
                  <div className="text-sm text-gray-400">Holdings</div>
                </div>
              </div>
            </div>

            {/* Asset Performance */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Asset Performance</h2>
              <div className="space-y-4">
                {[...cryptoData, ...stockData].slice(0, 5).map(asset => (
                  <div key={asset.symbol} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{asset.symbol}</div>
                        <div className="text-sm text-gray-300">${asset.currentPrice.toFixed(2)}</div>
                        <div className="text-xs text-gray-400">Volume: {asset.volume.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${asset.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.dailyChange >= 0 ? '+' : ''}{(asset.dailyChange * 100).toFixed(2)}%
                        </div>
                        <div className="text-sm text-gray-400">Market Cap: ${asset.marketCap.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Signals */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Trading Signals</h2>
              <div className="space-y-3">
                {financialAlgorithms.tradingSignals.slice(0, 5).map((signal, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    signal.type === 'BUY' ? 'border-green-600 bg-green-900/20' : 'border-red-600 bg-red-900/20'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{signal.symbol}</div>
                        <div className="text-sm text-gray-300">{signal.reason}</div>
                        <div className="text-xs text-gray-400">Strength: {signal.strength}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${signal.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                          {signal.type}
                        </div>
                        <div className="text-sm text-gray-400">Confidence: {(signal.confidence * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
                {financialAlgorithms.tradingSignals.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No trading signals generated
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Metrics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Risk Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Volatility:</span>
                  <span className="text-blue-400">{(analytics.volatility * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sharpe Ratio:</span>
                  <span className="text-green-400">{analytics.sharpeRatio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Drawdown:</span>
                  <span className="text-red-400">{(analytics.maxDrawdown * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Beta:</span>
                  <span className="text-yellow-400">{analytics.beta.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alpha:</span>
                  <span className="text-purple-400">{(analytics.alpha * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Trading Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Trading Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Trades:</span>
                  <span className="text-blue-400">{analytics.totalTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="text-green-400">{analytics.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Return:</span>
                  <span className="text-yellow-400">{(analytics.averageReturn * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Score:</span>
                  <span className="text-red-400">{analytics.riskScore}</span>
                </div>
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
          title="Financial Algorithms Implementation"
          code={`
// Advanced Financial Algorithms Implementation
class FinancialAlgorithms {
  // Technical Analysis using Multiple Indicators
  calculateTechnicalIndicators(prices, volume) {
    if (!prices || prices.length < 20) return null;
    
    const sma20 = this.calculateSMA(prices, 20);
    const sma50 = this.calculateSMA(prices, 50);
    const rsi = this.calculateRSI(prices, 14);
    const macd = this.calculateMACD(prices);
    const bollingerBands = this.calculateBollingerBands(prices, 20);
    
    return { sma20, sma50, rsi, macd, bollingerBands, volume };
  }

  // RSI Calculation
  calculateRSI(prices, period) {
    if (prices.length < period + 1) return null;
    
    const rsi = [];
    for (let i = 1; i < prices.length; i++) {
      const gains = [];
      const losses = [];
      
      for (let j = Math.max(0, i - period + 1); j <= i; j++) {
        const change = prices[j] - prices[j - 1];
        if (change > 0) gains.push(change);
        else losses.push(Math.abs(change));
      }
      
      const avgGain = gains.reduce((sum, gain) => sum + gain, 0) / period;
      const avgLoss = losses.reduce((sum, loss) => sum + loss, 0) / period;
      
      if (avgLoss === 0) {
        rsi.push(100);
      } else {
        const rs = avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
      }
    }
    
    return rsi;
  }

  // MACD Calculation
  calculateMACD(prices) {
    if (prices.length < 26) return null;
    
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    
    if (!ema12 || !ema26) return null;
    
    const macd = [];
    const signal = [];
    
    // Calculate MACD line
    for (let i = 0; i < Math.min(ema12.length, ema26.length); i++) {
      macd.push(ema12[i] - ema26[i]);
    }
    
    // Calculate signal line (EMA of MACD)
    const signalEMA = this.calculateEMA(macd, 9);
    if (signalEMA) {
      signal.push(...signalEMA);
    }
    
    return { macd, signal };
  }

  // Risk Metrics Calculation
  calculateRiskMetrics(returns) {
    if (!returns || returns.length < 2) return null;
    
    const volatility = this.calculateVolatility(returns);
    const sharpeRatio = this.calculateSharpeRatio(returns, 0.02);
    const maxDrawdown = this.calculateMaxDrawdown(returns);
    const var95 = this.calculateValueAtRisk(returns, 0.95);
    
    return { volatility, sharpeRatio, maxDrawdown, var95 };
  }

  // Portfolio Optimization
  optimizePortfolio(assets, returns, riskFreeRate = 0.02) {
    if (!assets || assets.length < 2) return null;
    
    const n = assets.length;
    const returnsMatrix = returns.map(r => r.returns);
    const correlationMatrix = this.calculateCorrelationMatrix(returnsMatrix);
    const volatilities = returnsMatrix.map(r => this.calculateVolatility(r));
    
    // Calculate efficient frontier
    const efficientFrontier = [];
    for (let targetReturn = 0.05; targetReturn <= 0.25; targetReturn += 0.01) {
      const weights = this.optimizeWeights(returnsMatrix, volatilities, correlationMatrix, targetReturn);
      if (weights) {
        const portfolioReturn = this.calculatePortfolioReturn(weights, returnsMatrix);
        const portfolioRisk = this.calculatePortfolioRisk(weights, volatilities, correlationMatrix);
        
        efficientFrontier.push({
          return: portfolioReturn,
          risk: portfolioRisk,
          sharpeRatio: portfolioRisk > 0 ? (portfolioReturn - riskFreeRate) / portfolioRisk : 0,
          weights
        });
      }
    }
    
    return efficientFrontier;
  }
}
          `}
        />
      )}
    </div>
  );
};

export default FinancialDemo; 