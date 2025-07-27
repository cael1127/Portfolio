import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const SentimentAnalysisDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('vader');
  const [sampleTexts, setSampleTexts] = useState([
    "I absolutely love this product! It's amazing and works perfectly.",
    "This is the worst experience I've ever had. Terrible service.",
    "The movie was okay, nothing special but not bad either.",
    "Incredible performance! The team exceeded all expectations.",
    "Disappointed with the quality. Expected much better for the price."
  ]);

  // VADER-like sentiment analysis
  const vaderAnalysis = (text) => {
    const positiveWords = {
      'love': 3.0, 'amazing': 3.0, 'incredible': 3.0, 'excellent': 2.5, 'great': 2.0,
      'good': 1.5, 'wonderful': 2.5, 'fantastic': 2.5, 'perfect': 3.0, 'outstanding': 2.5,
      'brilliant': 2.5, 'superb': 2.5, 'terrific': 2.0, 'awesome': 2.5, 'fabulous': 2.0,
      'satisfied': 1.5, 'pleased': 1.5, 'happy': 2.0, 'excited': 2.0, 'thrilled': 3.0
    };

    const negativeWords = {
      'hate': -3.0, 'terrible': -3.0, 'awful': -3.0, 'horrible': -3.0, 'disgusting': -2.5,
      'bad': -1.5, 'worst': -3.0, 'disappointed': -2.0, 'frustrated': -2.0, 'angry': -2.5,
      'upset': -2.0, 'sad': -1.5, 'depressed': -2.5, 'miserable': -2.5, 'annoyed': -1.5,
      'disgusted': -2.5, 'furious': -3.0, 'livid': -3.0, 'outraged': -3.0, 'appalled': -2.5
    };

    const intensifiers = {
      'very': 2.0, 'really': 2.0, 'extremely': 2.5, 'incredibly': 2.5, 'absolutely': 2.0,
      'completely': 2.0, 'totally': 2.0, 'utterly': 2.5, 'entirely': 1.5, 'thoroughly': 1.5
    };

    const negators = {
      'not': -1.0, 'no': -1.0, 'never': -1.5, 'none': -1.0, 'neither': -1.0,
      'nor': -1.0, 'nobody': -1.0, 'nothing': -1.0, 'nowhere': -1.0, 'hardly': -1.0
    };

    const words = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    let compoundScore = 0;
    let intensifierCount = 0;
    let negatorCount = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/[^\w]/g, '');
      
      // Check for negators
      if (negators[word]) {
        negatorCount++;
        // Apply negation to next few words
        for (let j = i + 1; j < Math.min(i + 3, words.length); j++) {
          const nextWord = words[j].replace(/[^\w]/g, '');
          if (positiveWords[nextWord]) {
            negativeScore += positiveWords[nextWord] * 0.5;
            positiveScore -= positiveWords[nextWord] * 0.5;
          } else if (negativeWords[nextWord]) {
            positiveScore += negativeWords[nextWord] * 0.5;
            negativeScore -= negativeWords[nextWord] * 0.5;
          }
        }
        continue;
      }

      // Check for intensifiers
      if (intensifiers[word]) {
        intensifierCount++;
        continue;
      }

      // Check for positive/negative words
      if (positiveWords[word]) {
        let score = positiveWords[word];
        
        // Apply intensifier if previous word was intensifier
        if (i > 0 && intensifiers[words[i - 1]]) {
          score *= 1.5;
        }
        
        positiveScore += score;
      } else if (negativeWords[word]) {
        let score = negativeWords[word];
        
        // Apply intensifier if previous word was intensifier
        if (i > 0 && intensifiers[words[i - 1]]) {
          score *= 1.5;
        }
        
        negativeScore += Math.abs(score);
      }
    }

    // Calculate compound score
    const totalScore = positiveScore - negativeScore;
    compoundScore = Math.tanh(totalScore / 15); // Normalize to [-1, 1]

    // Determine sentiment
    let sentiment;
    if (compoundScore >= 0.05) {
      sentiment = 'positive';
    } else if (compoundScore <= -0.05) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }

    return {
      sentiment,
      compoundScore: compoundScore.toFixed(3),
      positiveScore: positiveScore.toFixed(2),
      negativeScore: negativeScore.toFixed(2),
      intensifierCount,
      negatorCount,
      wordCount: words.length,
      analysis: {
        positiveWords: Object.keys(positiveWords).filter(word => 
          text.toLowerCase().includes(word)
        ),
        negativeWords: Object.keys(negativeWords).filter(word => 
          text.toLowerCase().includes(word)
        ),
        intensifiers: Object.keys(intensifiers).filter(word => 
          text.toLowerCase().includes(word)
        ),
        negators: Object.keys(negators).filter(word => 
          text.toLowerCase().includes(word)
        )
      }
    };
  };

  // Transformers-based analysis (simulated)
  const transformersAnalysis = (text) => {
    // Simulate more sophisticated analysis
    const result = vaderAnalysis(text);
    
    // Add transformer-specific features
    result.confidence = (Math.random() * 0.3 + 0.7).toFixed(3);
    result.attentionWeights = text.split(' ').map((word, i) => ({
      word,
      weight: (Math.random() * 0.5 + 0.1).toFixed(3)
    }));
    
    return result;
  };

  // NLTK-based analysis (simulated)
  const nltkAnalysis = (text) => {
    const result = vaderAnalysis(text);
    
    // Add NLTK-specific features
    result.posTags = text.split(' ').map(word => ({
      word,
      tag: ['NN', 'VB', 'JJ', 'RB', 'IN'][Math.floor(Math.random() * 5)]
    }));
    
    return result;
  };

  const analyzeSentiment = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let result;
    switch (selectedModel) {
      case 'vader':
        result = vaderAnalysis(inputText);
        break;
      case 'transformers':
        result = transformersAnalysis(inputText);
        break;
      case 'nltk':
        result = nltkAnalysis(inputText);
        break;
      default:
        result = vaderAnalysis(inputText);
    }
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleSampleText = (text) => {
    setInputText(text);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      case 'neutral':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const codeExample = `# Sentiment Analysis with Transformers and NLTK
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from transformers import pipeline
import torch

class SentimentAnalyzer:
    def __init__(self):
        # Download required NLTK data
        nltk.download('vader_lexicon')
        nltk.download('punkt')
        nltk.download('averaged_perceptron_tagger')
        
        # Initialize models
        self.vader_analyzer = SentimentIntensityAnalyzer()
        self.transformer_analyzer = pipeline(
            "sentiment-analysis",
            model="cardiffnlp/twitter-roberta-base-sentiment-latest"
        )
    
    def vader_analysis(self, text):
        """VADER sentiment analysis"""
        scores = self.vader_analyzer.polarity_scores(text)
        return {
            'sentiment': self._get_sentiment_label(scores['compound']),
            'compound_score': scores['compound'],
            'positive_score': scores['pos'],
            'negative_score': scores['neg'],
            'neutral_score': scores['neu']
        }
    
    def transformer_analysis(self, text):
        """Transformer-based sentiment analysis"""
        result = self.transformer_analyzer(text)[0]
        return {
            'sentiment': result['label'].lower(),
            'confidence': result['score'],
            'model': 'RoBERTa',
            'text': text
        }
    
    def nltk_analysis(self, text):
        """NLTK-based analysis with POS tagging"""
        tokens = nltk.word_tokenize(text)
        pos_tags = nltk.pos_tag(tokens)
        
        # Extract adjectives and adverbs for sentiment
        sentiment_words = [
            word for word, tag in pos_tags 
            if tag.startswith('JJ') or tag.startswith('RB')
        ]
        
        return {
            'tokens': tokens,
            'pos_tags': pos_tags,
            'sentiment_words': sentiment_words,
            'word_count': len(tokens)
        }
    
    def _get_sentiment_label(self, compound_score):
        if compound_score >= 0.05:
            return 'positive'
        elif compound_score <= -0.05:
            return 'negative'
        else:
            return 'neutral'

# Usage example
analyzer = SentimentAnalyzer()

# Analyze text with different methods
text = "I absolutely love this product! It's amazing and works perfectly."

vader_result = analyzer.vader_analysis(text)
transformer_result = analyzer.transformer_analysis(text)
nltk_result = analyzer.nltk_analysis(text)

print(f"VADER: {vader_result['sentiment']} ({vader_result['compound_score']:.3f})")
print(f"Transformer: {transformer_result['sentiment']} ({transformer_result['confidence']:.3f})")
print(f"NLTK: {len(nltk_result['sentiment_words'])} sentiment words found")`;

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
                {sampleTexts.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleText(text)}
                    className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    {text.length > 60 ? text.substring(0, 60) + '...' : text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Main Result */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">📊 Analysis Results</h3>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${getSentimentColor(analysisResult.sentiment)}`}>
                        {analysisResult.sentiment.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-400">
                        Compound Score: {analysisResult.compoundScore}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-green-400 font-semibold">Positive</div>
                        <div className="text-2xl font-bold">{analysisResult.positiveScore}</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-red-400 font-semibold">Negative</div>
                        <div className="text-2xl font-bold">{analysisResult.negativeScore}</div>
                      </div>
                    </div>
                    
                    {analysisResult.confidence && (
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-blue-400 font-semibold">Confidence</div>
                        <div className="text-2xl font-bold">{analysisResult.confidence}</div>
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
                      <span className="text-white">{analysisResult.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Intensifiers:</span>
                      <span className="text-white">{analysisResult.intensifierCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Negators:</span>
                      <span className="text-white">{analysisResult.negatorCount}</span>
                    </div>
                    
                    {analysisResult.analysis.positiveWords.length > 0 && (
                      <div>
                        <div className="text-gray-400 mb-1">Positive Words:</div>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.analysis.positiveWords.map((word, index) => (
                            <span key={index} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysisResult.analysis.negativeWords.length > 0 && (
                      <div>
                        <div className="text-gray-400 mb-1">Negative Words:</div>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.analysis.negativeWords.map((word, index) => (
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
                {selectedModel === 'transformers' && analysisResult.attentionWeights && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">🧠 Attention Weights</h3>
                    <div className="space-y-2">
                      {analysisResult.attentionWeights.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">{item.word}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${parseFloat(item.weight) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">{item.weight}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedModel === 'nltk' && analysisResult.posTags && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-400">🔤 POS Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.posTags.map((item, index) => (
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
        code={codeExample}
        language="python"
        title="Sentiment Analysis Implementation"
      />
    </div>
  );
};

export default SentimentAnalysisDemo; 