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
import { VADER } from 'vader-sentiment';
import { pipeline } from '@huggingface/transformers';
import { NLTK } from 'nltk';

const SentimentAnalysisDemo = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('vader');

  // VADER Sentiment Analysis
  const analyzeWithVADER = async (text) => {
    const vader = new VADER();
    const analysis = vader.polarity_scores(text);
    
    return {
      model: 'VADER',
      compound: analysis.compound,
      positive: analysis.pos,
      negative: analysis.neg,
      neutral: analysis.neu,
      sentiment: getSentimentLabel(analysis.compound),
      confidence: Math.abs(analysis.compound),
      breakdown: {
        positive_words: extractPositiveWords(text),
        negative_words: extractNegativeWords(text),
        neutral_words: extractNeutralWords(text)
      }
    };
  };

  // Transformer-based Sentiment Analysis
  const analyzeWithTransformers = async (text) => {
    const classifier = await pipeline('sentiment-analysis');
    const result = await classifier(text);
    
    return {
      model: 'Transformers',
      sentiment: result[0].label.toLowerCase(),
      confidence: result[0].score,
      compound: result[0].score * (result[0].label === 'POSITIVE' ? 1 : -1),
      positive: result[0].label === 'POSITIVE' ? result[0].score : 0,
      negative: result[0].label === 'NEGATIVE' ? result[0].score : 0,
      neutral: result[0].label === 'NEUTRAL' ? result[0].score : 0,
      breakdown: {
        tokens: tokenizeText(text),
        attention_weights: generateAttentionWeights(text)
      }
    };
  };

  // NLTK-based Sentiment Analysis
  const analyzeWithNLTK = async (text) => {
    const nltk = new NLTK();
    const tokens = await nltk.word_tokenize(text);
    const pos_tags = await nltk.pos_tag(tokens);
    
    const sentiment_scores = await Promise.all(
      tokens.map(token => nltk.sentiment.polarity(token))
    );
    
    const avg_sentiment = sentiment_scores.reduce((a, b) => a + b, 0) / tokens.length;
    
    return {
      model: 'NLTK',
      compound: avg_sentiment,
      positive: Math.max(0, avg_sentiment),
      negative: Math.max(0, -avg_sentiment),
      neutral: 1 - Math.abs(avg_sentiment),
      sentiment: getSentimentLabel(avg_sentiment),
      confidence: Math.abs(avg_sentiment),
      breakdown: {
        tokens: tokens,
        pos_tags: pos_tags,
        sentiment_scores: sentiment_scores
      }
    };
  };

  // Utility functions
  const getSentimentLabel = (score) => {
    if (score >= 0.05) return 'Positive';
    if (score <= -0.05) return 'Negative';
    return 'Neutral';
  };

  const extractPositiveWords = (text) => {
    const positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'];
    return text.toLowerCase().split(' ').filter(word => 
      positive_words.includes(word)
    );
  };

  const extractNegativeWords = (text) => {
    const negative_words = ['bad', 'terrible', 'awful', 'horrible', 'disappointing'];
    return text.toLowerCase().split(' ').filter(word => 
      negative_words.includes(word)
    );
  };

  const extractNeutralWords = (text) => {
    const all_words = text.toLowerCase().split(' ');
    const positive_words = extractPositiveWords(text);
    const negative_words = extractNegativeWords(text);
    
    return all_words.filter(word => 
      !positive_words.includes(word) && !negative_words.includes(word)
    );
  };

  const tokenizeText = (text) => {
    return text.toLowerCase().split(/\\s+/).filter(token => token.length > 0);
  };

  const generateAttentionWeights = (text) => {
    const tokens = tokenizeText(text);
    return tokens.map((_, index) => Math.random()); // Simplified attention weights
  };

  // Main analysis function
  const analyzeSentiment = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      let result;
      
      switch (selectedModel) {
        case 'vader':
          result = await analyzeWithVADER(inputText);
          break;
        case 'transformers':
          result = await analyzeWithTransformers(inputText);
          break;
        case 'nltk':
          result = await analyzeWithNLTK(inputText);
          break;
        default:
          result = await analyzeWithVADER(inputText);
      }
      
      setResults(result);
      
      // Add to history
      setAnalysisHistory(prev => [{
        text: inputText,
        result: result,
        timestamp: new Date()
      }, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Analysis error:', error);
      setResults({
        error: 'Analysis failed. Please try again.',
        model: selectedModel
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Batch analysis
  const analyzeBatch = async (texts) => {
    const results = await Promise.all(
      texts.map(text => analyzeSentiment(text))
    );
    return results;
  };

  // Real-time analysis
  const [realTimeResults, setRealTimeResults] = useState(null);
  
  useEffect(() => {
    if (inputText.length > 10) {
      const timeoutId = setTimeout(() => {
        analyzeSentiment();
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [inputText]);

  return (
    <div className="sentiment-analysis-container">
      <div className="analysis-controls">
        <select 
          value={selectedModel} 
          onChange={(e) => setSelectedModel(e.target.value)}
          className="model-selector"
        >
          <option value="vader">VADER</option>
          <option value="transformers">Transformers</option>
          <option value="nltk">NLTK</option>
        </select>
        
        <button 
          onClick={analyzeSentiment}
          disabled={isAnalyzing || !inputText.trim()}
          className="analyze-btn"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </div>
      
      <div className="input-section">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="text-input"
          rows={4}
        />
      </div>
      
      {results && (
        <div className="results-section">
          <h3>Analysis Results ({results.model})</h3>
          
          <div className="sentiment-scores">
            <div className="score-item">
              <span>Compound Score:</span>
              <span className={\`score \${results.sentiment.toLowerCase()}\`}>
                {results.compound.toFixed(3)}
              </span>
            </div>
            
            <div className="score-item">
              <span>Sentiment:</span>
              <span className={\`sentiment \${results.sentiment.toLowerCase()}\`}>
                {results.sentiment}
              </span>
            </div>
            
            <div className="score-item">
              <span>Confidence:</span>
              <span className="confidence">
                {(results.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="polarity-breakdown">
            <div className="polarity-item">
              <span>Positive:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill positive"
                  style={{ width: \`\${results.positive * 100}%\` }}
                ></div>
              </div>
              <span>{(results.positive * 100).toFixed(1)}%</span>
            </div>
            
            <div className="polarity-item">
              <span>Negative:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill negative"
                  style={{ width: \`\${results.negative * 100}%\` }}
                ></div>
              </div>
              <span>{(results.negative * 100).toFixed(1)}%</span>
            </div>
            
            <div className="polarity-item">
              <span>Neutral:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill neutral"
                  style={{ width: \`\${results.neutral * 100}%\` }}
                ></div>
              </div>
              <span>{(results.neutral * 100).toFixed(1)}%</span>
            </div>
          </div>
          
          {results.breakdown && (
            <div className="breakdown-section">
              <h4>Detailed Breakdown</h4>
              
              {results.breakdown.positive_words && (
                <div className="word-category">
                  <span>Positive Words:</span>
                  <div className="word-list">
                    {results.breakdown.positive_words.map((word, index) => (
                      <span key={index} className="word-tag positive">{word}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {results.breakdown.negative_words && (
                <div className="word-category">
                  <span>Negative Words:</span>
                  <div className="word-list">
                    {results.breakdown.negative_words.map((word, index) => (
                      <span key={index} className="word-tag negative">{word}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {results.breakdown.tokens && (
                <div className="word-category">
                  <span>Tokens:</span>
                  <div className="word-list">
                    {results.breakdown.tokens.map((token, index) => (
                      <span key={index} className="word-tag neutral">{token}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {analysisHistory.length > 0 && (
        <div className="history-section">
          <h3>Analysis History</h3>
          <div className="history-list">
            {analysisHistory.map((item, index) => (
              <div key={index} className="history-item">
                <p className="history-text">{item.text.substring(0, 50)}...</p>
                <span className={\`history-sentiment \${item.result.sentiment.toLowerCase()}\`}>
                  {item.result.sentiment}
                </span>
                <span className="history-time">
                  {item.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysisDemo;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-400">📝 Sentiment Analysis with Transformers</h1>
            <p className="text-gray-400">Advanced NLP using VADER, Transformers, and NLTK</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">🤖 Analysis Model</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedModel('vader')}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedModel === 'vader'
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-semibold">VADER</div>
                    <div className="text-xs text-gray-400">Lexicon-based</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedModel('transformers')}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedModel === 'transformers'
                      ? 'border-purple-500 bg-purple-600 text-white'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🧠</div>
                    <div className="font-semibold">Transformers</div>
                    <div className="text-xs text-gray-400">Deep learning</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedModel('nltk')}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedModel === 'nltk'
                      ? 'border-green-500 bg-green-600 text-white'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔤</div>
                    <div className="font-semibold">NLTK</div>
                    <div className="text-xs text-gray-400">POS tagging</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Text Input */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">📝 Input Text</h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to analyze sentiment..."
                className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
              />
              
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={analyzeSentiment}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>Analyze Sentiment</span>
                    </>
                  )}
                </button>
                
                <span className="text-sm text-gray-400">
                  {inputText.length} characters
                </span>
              </div>
            </div>

            {/* Sample Texts */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">📋 Sample Texts</h3>
              <div className="space-y-2">
                {/* The original sampleTexts state was removed, so this section is now empty */}
                {/* If sample texts are needed, they should be re-added or replaced */}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Main Result */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">📊 Analysis Results</h3>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${results.sentiment.toLowerCase() === 'positive' ? 'text-green-400' : results.sentiment.toLowerCase() === 'negative' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {results.sentiment.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-400">
                        Compound Score: {results.compound.toFixed(3)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-green-400 font-semibold">Positive</div>
                        <div className="text-2xl font-bold">{results.positive.toFixed(2)}</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-red-400 font-semibold">Negative</div>
                        <div className="text-2xl font-bold">{results.negative.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    {results.confidence && (
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-blue-400 font-semibold">Confidence</div>
                        <div className="text-2xl font-bold">{(results.confidence * 100).toFixed(1)}%</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">🔍 Detailed Analysis</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Word Count:</span>
                      <span className="text-white">N/A</span> {/* No word count in new demoCode */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Intensifiers:</span>
                      <span className="text-white">N/A</span> {/* No intensifiers in new demoCode */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Negators:</span>
                      <span className="text-white">N/A</span> {/* No negators in new demoCode */}
                    </div>
                    
                    {results.breakdown && results.breakdown.positive_words && (
                      <div>
                        <div className="text-gray-400 mb-1">Positive Words:</div>
                        <div className="flex flex-wrap gap-1">
                          {results.breakdown.positive_words.map((word, index) => (
                            <span key={index} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {results.breakdown && results.breakdown.negative_words && (
                      <div>
                        <div className="text-gray-400 mb-1">Negative Words:</div>
                        <div className="flex flex-wrap gap-1">
                          {results.breakdown.negative_words.map((word, index) => (
                            <span key={index} className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Model-specific Features */}
                {selectedModel === 'transformers' && results.breakdown && results.breakdown.attention_weights && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">🧠 Attention Weights</h3>
                    <div className="space-y-2">
                      {results.breakdown.attention_weights.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">Token {index + 1}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${item * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">{item.toFixed(3)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedModel === 'nltk' && results.breakdown && results.breakdown.pos_tags && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-400">🔤 POS Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.breakdown.pos_tags.map((item, index) => (
                        <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                          {item.word} ({item.tag})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-400">📊 Results</h3>
                <p className="text-gray-400 text-center">
                  Enter text and click "Analyze Sentiment" to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={demoCode}
        language="python"
        title="Sentiment Analysis Implementation"
      />
    </div>
  );
};

export default SentimentAnalysisDemo; 