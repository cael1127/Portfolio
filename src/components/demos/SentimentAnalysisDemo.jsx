/**
 * Sentiment Analysis Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates advanced sentiment analysis using multiple
 * approaches: VADER, Transformers, and NLTK for comprehensive text analysis.
 */

import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const SentimentAnalysisDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('vader');
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const demoCode = `/**
 * Sentiment Analysis Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates advanced sentiment analysis using multiple
 * approaches: VADER, Transformers, and NLTK for comprehensive text analysis.
 */

import React, { useState, useEffect } from 'react';
import { SentimentAnalyzer } from './SentimentAnalyzer';

const SentimentAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('vader');
  const [analysisHistory, setAnalysisHistory] = useState([]);

  // VADER Sentiment Analysis
  const analyzeWithVADER = (text) => {
    const vader = require('vader-sentiment');
    const intensity = vader.SentimentIntensityAnalyzer();
    const scores = intensity.polarity_scores(text);
    
    return {
      model: 'VADER',
      compound: scores.compound,
      positive: scores.pos,
      negative: scores.neg,
      neutral: scores.neu,
      sentiment: scores.compound >= 0.05 ? 'Positive' : 
                 scores.compound <= -0.05 ? 'Negative' : 'Neutral',
      confidence: Math.abs(scores.compound) * 100
    };
  };

  // NLTK Sentiment Analysis
  const analyzeWithNLTK = (text) => {
    const nltk = require('nltk');
    const sentiment = require('sentiment');
    
    const analyzer = new sentiment();
    const result = analyzer.analyze(text);
    
    return {
      model: 'NLTK',
      score: result.score,
      comparative: result.comparative,
      sentiment: result.score > 0 ? 'Positive' : 
                 result.score < 0 ? 'Negative' : 'Neutral',
      confidence: Math.abs(result.comparative) * 100,
      tokens: result.tokens,
      words: result.words
    };
  };

  // Transformer-based Analysis
  const analyzeWithTransformers = async (text) => {
    // Simulate transformer model analysis
    const response = await fetch('/api/sentiment-transformers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    const result = await response.json();
    return {
      model: 'Transformers',
      ...result
    };
  };

  const performAnalysis = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      let result;
      
      switch (selectedModel) {
        case 'vader':
          result = analyzeWithVADER(inputText);
          break;
        case 'nltk':
          result = analyzeWithNLTK(inputText);
          break;
        case 'transformers':
          result = await analyzeWithTransformers(inputText);
          break;
        default:
          result = analyzeWithVADER(inputText);
      }

      setResults(result);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        text: inputText,
        result: result,
        timestamp: new Date().toISOString()
      };
      
      setAnalysisHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setInputText('');
  };

  const loadSampleText = (type) => {
    const samples = {
      positive: "I absolutely love this new product! It's amazing and exceeded all my expectations. Highly recommended!",
      negative: "This is terrible. I'm very disappointed with the quality and service. Would not recommend to anyone.",
      neutral: "The weather today is okay. Nothing special, just average conditions with moderate temperatures.",
      mixed: "The product has some great features, but the customer service is really poor and needs improvement."
    };
    
    setInputText(samples[type]);
  };

  return (
    <div className="sentiment-analysis">
      <h1>Sentiment Analysis Demo</h1>
      
      {/* Model Selection */}
      <div className="model-selector">
        <label>Select Model:</label>
        <select 
          value={selectedModel} 
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="vader">VADER</option>
          <option value="nltk">NLTK</option>
          <option value="transformers">Transformers</option>
        </select>
      </div>

      {/* Input Area */}
      <div className="input-section">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          rows="4"
        />
        
        <div className="sample-buttons">
          <button onClick={() => loadSampleText('positive')}>Positive Sample</button>
          <button onClick={() => loadSampleText('negative')}>Negative Sample</button>
          <button onClick={() => loadSampleText('neutral')}>Neutral Sample</button>
          <button onClick={() => loadSampleText('mixed')}>Mixed Sample</button>
        </div>
        
        <div className="action-buttons">
          <button 
            onClick={performAnalysis} 
            disabled={!inputText.trim() || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
          <button onClick={clearResults}>Clear</button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="results-section">
          <h2>Analysis Results</h2>
          <div className="result-card">
            <h3>Model: {results.model}</h3>
            <div className="sentiment-score">
              <span className="sentiment-label">Sentiment:</span>
              <span className={\`sentiment-value \${results.sentiment.toLowerCase()}\`}>
                {results.sentiment}
              </span>
            </div>
            <div className="confidence-score">
              <span>Confidence: {results.confidence?.toFixed(1)}%</span>
            </div>
            
            {/* Model-specific results */}
            {results.model === 'VADER' && (
              <div className="vader-scores">
                <div>Compound: {results.compound?.toFixed(3)}</div>
                <div>Positive: {results.positive?.toFixed(3)}</div>
                <div>Negative: {results.negative?.toFixed(3)}</div>
                <div>Neutral: {results.neutral?.toFixed(3)}</div>
              </div>
            )}
            
            {results.model === 'NLTK' && (
              <div className="nltk-scores">
                <div>Score: {results.score}</div>
                <div>Comparative: {results.comparative?.toFixed(3)}</div>
                <div>Tokens: {results.tokens?.length || 0}</div>
              </div>
            )}
            
            {results.model === 'Transformers' && (
              <div className="transformer-scores">
                <div>Label: {results.label}</div>
                <div>Score: {results.score?.toFixed(3)}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History */}
      {analysisHistory.length > 0 && (
        <div className="history-section">
          <h2>Recent Analyses</h2>
          <div className="history-list">
            {analysisHistory.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-text">{item.text}</div>
                <div className="history-result">
                  {item.result.sentiment} ({item.result.model})
                </div>
                <div className="history-time">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;`;

  // Simulate VADER sentiment analysis
  const analyzeWithVADER = (text) => {
    // Simplified VADER simulation
    const words = text.toLowerCase().split(' ');
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'awesome', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'poor', 'worst', 'disappointed', 'angry'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore += 1;
      if (negativeWords.includes(word)) negativeScore += 1;
    });
    
    const compound = (positiveScore - negativeScore) / words.length;
    
    return {
      model: 'VADER',
      compound: compound,
      positive: Math.max(0, positiveScore / words.length),
      negative: Math.max(0, negativeScore / words.length),
      neutral: Math.max(0, 1 - (positiveScore + negativeScore) / words.length),
      sentiment: compound >= 0.05 ? 'Positive' : compound <= -0.05 ? 'Negative' : 'Neutral',
      confidence: Math.abs(compound) * 100
    };
  };

  // Simulate NLTK sentiment analysis
  const analyzeWithNLTK = (text) => {
    const words = text.toLowerCase().split(' ');
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'awesome', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'poor', 'worst', 'disappointed', 'angry'];
    
    let score = 0;
    const tokens = words;
    const wordsWithSentiment = [];
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        score += 1;
        wordsWithSentiment.push(word);
      }
      if (negativeWords.includes(word)) {
        score -= 1;
        wordsWithSentiment.push(word);
      }
    });
    
    return {
      model: 'NLTK',
      score: score,
      comparative: score / words.length,
      sentiment: score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral',
      confidence: Math.abs(score / words.length) * 100,
      tokens: tokens,
      words: wordsWithSentiment
    };
  };

  // Simulate Transformers analysis
  const analyzeWithTransformers = async (text) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const words = text.toLowerCase().split(' ');
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'awesome', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'poor', 'worst', 'disappointed', 'angry'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount += 1;
      if (negativeWords.includes(word)) negativeCount += 1;
    });
    
    const score = (positiveCount - negativeCount) / words.length;
    
    return {
      model: 'Transformers',
      label: score > 0.1 ? 'POSITIVE' : score < -0.1 ? 'NEGATIVE' : 'NEUTRAL',
      score: Math.abs(score),
      sentiment: score > 0.1 ? 'Positive' : score < -0.1 ? 'Negative' : 'Neutral',
      confidence: Math.abs(score) * 100
    };
  };

  const performAnalysis = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      let result;
      
      switch (selectedModel) {
        case 'vader':
          result = analyzeWithVADER(inputText);
          break;
        case 'nltk':
          result = analyzeWithNLTK(inputText);
          break;
        case 'transformers':
          result = await analyzeWithTransformers(inputText);
          break;
        default:
          result = analyzeWithVADER(inputText);
      }

      setResults(result);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        text: inputText,
        result: result,
        timestamp: new Date().toISOString()
      };
      
      setAnalysisHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setInputText('');
  };

  const loadSampleText = (type) => {
    const samples = {
      positive: "I absolutely love this new product! It's amazing and exceeded all my expectations. Highly recommended!",
      negative: "This is terrible. I'm very disappointed with the quality and service. Would not recommend to anyone.",
      neutral: "The weather today is okay. Nothing special, just average conditions with moderate temperatures.",
      mixed: "The product has some great features, but the customer service is really poor and needs improvement."
    };
    
    setInputText(samples[type]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">😊 Sentiment Analysis</h1>
            <p className="text-gray-400">Advanced sentiment analysis with VADER, Transformers, and NLTK</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        {/* Model Selection */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">🤖 Analysis Model</h3>
              <p className="text-gray-400 text-sm">Choose the sentiment analysis model to use</p>
            </div>
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="vader">VADER Sentiment</option>
              <option value="nltk">NLTK Sentiment</option>
              <option value="transformers">Transformers</option>
            </select>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">📝 Text Input</h3>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to analyze sentiment..."
            rows="4"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 mb-4"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={() => loadSampleText('positive')}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              😊 Positive Sample
            </button>
            <button 
              onClick={() => loadSampleText('negative')}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              😞 Negative Sample
            </button>
            <button 
              onClick={() => loadSampleText('neutral')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              😐 Neutral Sample
            </button>
            <button 
              onClick={() => loadSampleText('mixed')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              🤔 Mixed Sample
            </button>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={performAnalysis} 
              disabled={!inputText.trim() || isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isAnalyzing ? '⏳ Analyzing...' : '🔍 Analyze Sentiment'}
            </button>
            <button 
              onClick={clearResults}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-gray-800 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">📊 Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sentiment Overview */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Sentiment Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Model:</span>
                    <span className="text-white font-semibold">{results.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sentiment:</span>
                    <span className={`font-semibold ${
                      results.sentiment === 'Positive' ? 'text-green-400' :
                      results.sentiment === 'Negative' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {results.sentiment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Confidence:</span>
                    <span className="text-white font-semibold">{results.confidence?.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Model-specific Scores */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Detailed Scores</h4>
                
                {results.model === 'VADER' && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Compound:</span>
                      <span className="text-white">{results.compound?.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Positive:</span>
                      <span className="text-green-400">{results.positive?.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Negative:</span>
                      <span className="text-red-400">{results.negative?.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Neutral:</span>
                      <span className="text-yellow-400">{results.neutral?.toFixed(3)}</span>
                    </div>
                  </div>
                )}
                
                {results.model === 'NLTK' && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Score:</span>
                      <span className="text-white">{results.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Comparative:</span>
                      <span className="text-white">{results.comparative?.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tokens:</span>
                      <span className="text-white">{results.tokens?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sentiment Words:</span>
                      <span className="text-white">{results.words?.length || 0}</span>
                    </div>
                  </div>
                )}
                
                {results.model === 'Transformers' && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Label:</span>
                      <span className="text-white">{results.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Score:</span>
                      <span className="text-white">{results.score?.toFixed(3)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {analysisHistory.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">📚 Recent Analyses</h3>
            <div className="space-y-3">
              {analysisHistory.map(item => (
                <div key={item.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm mb-1">{item.text}</p>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.result.sentiment === 'Positive' ? 'bg-green-600 text-white' :
                          item.result.sentiment === 'Negative' ? 'bg-red-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {item.result.sentiment}
                        </span>
                        <span className="text-gray-400 text-xs">{item.result.model}</span>
                        <span className="text-gray-500 text-xs">{new Date(item.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">🚀 Analysis Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-blue-400 mb-3">Analysis Models</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• VADER - Rule-based sentiment analysis</li>
                <li>• NLTK - Natural Language Toolkit</li>
                <li>• Transformers - Deep learning models</li>
                <li>• Multi-model comparison</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-green-400 mb-3">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time sentiment analysis</li>
                <li>• Confidence scoring</li>
                <li>• Analysis history tracking</li>
                <li>• Sample text library</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={demoCode}
        language="javascript"
        title="Sentiment Analysis Implementation"
      />
    </div>
  );
};

export default SentimentAnalysisDemo;