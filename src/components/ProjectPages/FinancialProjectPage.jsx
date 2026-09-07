import React, { useState } from 'react';

const FinancialProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    portfolioManager: `// Portfolio Management System
class PortfolioManager {
  constructor() {
    this.portfolios = new Map();
    this.assets = new Map();
    this.marketData = new MarketDataProvider();
    this.riskAnalyzer = new RiskAnalyzer();
  }

  createPortfolio(portfolioId, initialBalance) {
    this.portfolios.set(portfolioId, {
      id: portfolioId,
      balance: initialBalance,
      assets: [],
      performance: {
        totalReturn: 0,
        dailyReturn: 0,
        volatility: 0,
        sharpeRatio: 0
      },
      riskMetrics: {
        var: 0,
        maxDrawdown: 0,
        beta: 0
      }
    });
  }

  addAsset(portfolioId, assetData) {
    const portfolio = this.portfolios.get(portfolioId);
    if (!portfolio) return;

    const asset = {
      symbol: assetData.symbol,
      quantity: assetData.quantity,
      purchasePrice: assetData.price,
      currentPrice: assetData.price,
      allocation: 0
    };

    portfolio.assets.push(asset);
    this.updatePortfolioMetrics(portfolioId);
  }

  async updatePortfolioMetrics(portfolioId) {
    const portfolio = this.portfolios.get(portfolioId);
    if (!portfolio) return;

    // Update asset prices
    for (const asset of portfolio.assets) {
      asset.currentPrice = await this.marketData.getPrice(asset.symbol);
    }

    // Calculate metrics
    portfolio.performance = this.calculatePerformance(portfolio);
    portfolio.riskMetrics = await this.riskAnalyzer.calculateRisk(portfolio);
  }

  calculatePerformance(portfolio) {
    const totalValue = portfolio.assets.reduce((sum, asset) => 
      sum + (asset.quantity * asset.currentPrice), 0
    );

    const totalCost = portfolio.assets.reduce((sum, asset) => 
      sum + (asset.quantity * asset.purchasePrice), 0
    );

    const totalReturn = ((totalValue - totalCost) / totalCost) * 100;

    return {
      totalReturn,
      totalValue,
      dailyReturn: this.calculateDailyReturn(portfolio),
      volatility: this.calculateVolatility(portfolio)
    };
  }
}`,
    
    marketDataProvider: `// Market Data Provider
class MarketDataProvider {
  constructor() {
    this.cache = new Map();
    this.subscribers = new Map();
  }

  async getPrice(symbol) {
    // Check cache first
    if (this.cache.has(symbol)) {
      const cached = this.cache.get(symbol);
      if (Date.now() - cached.timestamp < 60000) { // 1 minute cache
        return cached.price;
      }
    }

    // Fetch from API
    const price = await this.fetchPrice(symbol);
    
    // Cache the result
    this.cache.set(symbol, {
      price: price,
      timestamp: Date.now()
    });

    return price;
  }

  async fetchPrice(symbol) {
    // Simulate API call
    const basePrice = this.getBasePrice(symbol);
    const volatility = 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * volatility;
    
    return basePrice * (1 + change);
  }

  getBasePrice(symbol) {
    const prices = {
      'AAPL': 150,
      'GOOGL': 2800,
      'MSFT': 300,
      'TSLA': 800,
      'AMZN': 3500
    };
    return prices[symbol] || 100;
  }

  subscribeToPrice(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, []);
    }
    this.subscribers.get(symbol).push(callback);
  }

  startRealTimeUpdates() {
    setInterval(() => {
      this.subscribers.forEach((callbacks, symbol) => {
        this.getPrice(symbol).then(price => {
          callbacks.forEach(callback => callback(price));
        });
      });
    }, 5000); // Update every 5 seconds
  }
}`,
    
    riskAnalyzer: `// Risk Analysis Engine
class RiskAnalyzer {
  constructor() {
    this.historicalData = new Map();
  }

  async calculateRisk(portfolio) {
    const returns = await this.calculateReturns(portfolio);
    const volatility = this.calculateVolatility(returns);
    const var95 = this.calculateVaR(returns, 0.95);
    const maxDrawdown = this.calculateMaxDrawdown(returns);
    const beta = await this.calculateBeta(portfolio);

    return {
      volatility: volatility,
      var: var95,
      maxDrawdown: maxDrawdown,
      beta: beta,
      sharpeRatio: this.calculateSharpeRatio(returns)
    };
  }

  calculateVolatility(returns) {
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  }

  calculateVaR(returns, confidence) {
    const sortedReturns = returns.sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sortedReturns.length);
    return sortedReturns[index];
  }

  calculateMaxDrawdown(returns) {
    let peak = -Infinity;
    let maxDrawdown = 0;

    for (const return_ of returns) {
      if (return_ > peak) {
        peak = return_;
      }
      const drawdown = (peak - return_) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return maxDrawdown;
  }

  calculateSharpeRatio(returns) {
    const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const volatility = this.calculateVolatility(returns);
    const riskFreeRate = 0.02; // 2% risk-free rate

    return (meanReturn - riskFreeRate) / volatility;
  }
}`,
    
    dashboardComponent: `// React Financial Dashboard
import React, { useState, useEffect } from 'react';

const FinancialDashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [marketData, setMarketData] = useState({});
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const portfolioManager = new PortfolioManager();
    const marketProvider = new MarketDataProvider();

    // Initialize portfolio
    portfolioManager.createPortfolio('main', 100000);
    portfolioManager.addAsset('main', { symbol: 'AAPL', quantity: 100, price: 150 });
    portfolioManager.addAsset('main', { symbol: 'GOOGL', quantity: 50, price: 2800 });

    // Start real-time updates
    marketProvider.startRealTimeUpdates();

    // Update portfolio metrics
    const interval = setInterval(async () => {
      await portfolioManager.updatePortfolioMetrics('main');
      const updatedPortfolio = portfolioManager.portfolios.get('main');
      setPortfolio(updatedPortfolio);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-8">
          Financial Analytics Platform
        </h1>
        
        {portfolio && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
              <h3 className="text-lg font-semibold text-[var(--text)]">Portfolio Value</h3>
              <p className="text-2xl font-bold text-[var(--accent)]">
                ${portfolio.performance.totalValue?.toFixed(2) || '0.00'}
              </p>
              <p className="text-sm text-[var(--muted)]">
                Total Return: {portfolio.performance.totalReturn?.toFixed(2)}%
              </p>
            </div>
            
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
              <h3 className="text-lg font-semibold text-[var(--text)]">Risk Metrics</h3>
              <p className="text-sm text-[var(--muted)]">Volatility: {portfolio.riskMetrics.volatility?.toFixed(2)}%</p>
              <p className="text-sm text-[var(--muted)]">VaR (95%): {portfolio.riskMetrics.var?.toFixed(2)}%</p>
              <p className="text-sm text-[var(--muted)]">Beta: {portfolio.riskMetrics.beta?.toFixed(2)}</p>
            </div>
            
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
              <h3 className="text-lg font-semibold text-[var(--text)]">Assets</h3>
              {portfolio.assets.map(asset => (
                <div key={asset.symbol} className="flex justify-between text-sm">
                  <span>{asset.symbol}</span>
                  <span>${asset.currentPrice?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-[var(--accent)] hover:text-[var(--accent)] mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">💰 Financial Analytics Platform</h1>
          <p className="text-[var(--text)] text-lg">
            Advanced financial analysis and portfolio management with real-time market data and risk assessment
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Project Overview</h2>
                <p className="text-[var(--text)] leading-relaxed">
                  The Financial Analytics Platform is a comprehensive investment management system that combines 
                  real-time market data, portfolio analysis, and risk assessment tools to help investors make 
                  informed decisions and optimize their investment strategies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Portfolio performance tracking</li>
                    <li>• Risk assessment and analysis</li>
                    <li>• Real-time market data</li>
                    <li>• Investment recommendations</li>
                    <li>• Performance analytics</li>
                    <li>• Asset allocation optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• React.js for dashboard</li>
                    <li>• Node.js backend API</li>
                    <li>• Financial data APIs</li>
                    <li>• Risk analysis algorithms</li>
                    <li>• Real-time data streaming</li>
                    <li>• Chart visualization</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">📊 Portfolio Management</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Real-time portfolio tracking</li>
                    <li>• Asset allocation analysis</li>
                    <li>• Performance metrics</li>
                    <li>• Dividend tracking</li>
                    <li>• Transaction history</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">📈 Market Analytics</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Real-time market data</li>
                    <li>• Technical analysis tools</li>
                    <li>• Price trend analysis</li>
                    <li>• Volume analysis</li>
                    <li>• Market sentiment</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">⚠️ Risk Analysis</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Value at Risk (VaR)</li>
                    <li>• Volatility analysis</li>
                    <li>• Beta calculation</li>
                    <li>• Sharpe ratio</li>
                    <li>• Maximum drawdown</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🤖 AI Insights</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Investment recommendations</li>
                    <li>• Portfolio optimization</li>
                    <li>• Risk prediction</li>
                    <li>• Market forecasting</li>
                    <li>• Automated alerts</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Portfolio Management System</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.portfolioManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Market Data Provider</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.marketDataProvider}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Risk Analysis Engine</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.riskAnalyzer}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Dashboard Component</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Frontend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• React.js dashboard</li>
                      <li>• Real-time charts</li>
                      <li>• Portfolio visualization</li>
                      <li>• Interactive analytics</li>
                      <li>• Mobile responsive</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Backend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• Node.js API server</li>
                      <li>• Market data processing</li>
                      <li>• Risk calculation engine</li>
                      <li>• Portfolio management</li>
                      <li>• Real-time updates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">1</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Market Data Collection</p>
                      <p className="text-[var(--text)] text-sm">Real-time financial data from APIs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">2</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Portfolio Analysis</p>
                      <p className="text-[var(--text)] text-sm">Calculate performance and risk metrics</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">3</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Dashboard Updates</p>
                      <p className="text-[var(--text)] text-sm">Real-time updates to the dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Live Demo</h2>
              <p className="text-[var(--text)] mb-6">
                Experience the financial analytics platform in action. The demo showcases real-time portfolio tracking, 
                market data analysis, and comprehensive risk assessment tools.
              </p>
              
              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">Interactive Financial Demo</h3>
                  <button
                    onClick={() => setCurrentPage('financial')}
                    className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-[var(--text)] text-sm">
                  Click "Launch Demo" to experience the full financial analytics platform with real-time portfolio tracking, 
                  market data analysis, and comprehensive risk assessment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialProjectPage; 