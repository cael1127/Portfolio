import React, { useState } from 'react';

const AIAssistantProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'features', name: 'Features', icon: '⚡' },
    { id: 'code', name: 'Code', icon: '💻' },
    { id: 'architecture', name: 'Architecture', icon: '🏗️' },
    { id: 'demo', name: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    conversationManager: `// AI Conversation Manager
class ConversationManager {
  constructor() {
    this.conversationHistory = [];
    this.aiModels = new Map();
    this.contextWindow = 10;
    this.maxTokens = 4000;
  }

  initializeAI() {
    // Initialize different AI models
    this.aiModels.set('gpt-3.5', {
      name: 'GPT-3.5',
      capabilities: ['text-generation', 'code-generation', 'analysis'],
      maxTokens: 4000
    });
    
    this.aiModels.set('gpt-4', {
      name: 'GPT-4',
      capabilities: ['advanced-reasoning', 'complex-analysis', 'creative-writing'],
      maxTokens: 8000
    });
    
    this.aiModels.set('claude', {
      name: 'Claude',
      capabilities: ['conversation', 'analysis', 'creative-tasks'],
      maxTokens: 6000
    });
  }

  async processMessage(message, selectedModel = 'gpt-3.5') {
    const model = this.aiModels.get(selectedModel);
    if (!model) {
      throw new Error('Model not found');
    }

    // Add message to history
    this.addToHistory({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // Process with NLP
    const nlpProcessor = new NLPProcessor();
    const analysis = await nlpProcessor.processInput(message);

    // Generate response
    const responseGenerator = new ResponseGenerator();
    const response = await responseGenerator.generateResponse(analysis, this.conversationHistory);

    // Add response to history
    this.addToHistory({
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
      model: selectedModel
    });

    return {
      response,
      analysis,
      model: selectedModel
    };
  }

  detectLanguage(content) {
    if (content.includes('javascript')) return 'javascript';
    if (content.includes('python')) return 'python';
    if (content.includes('java')) return 'java';
    if (content.includes('cpp')) return 'cpp';
    return 'text';
  }

  extractInsights(content) {
    const insights = [];
    if (content.includes('trend')) insights.push('Trend Analysis');
    if (content.includes('pattern')) insights.push('Pattern Recognition');
    if (content.includes('recommendation')) insights.push('Recommendations');
    return insights;
  }

  addToHistory(message) {
    this.conversationHistory.push(message);
    
    if (this.conversationHistory.length > this.contextWindow * 2) {
      this.conversationHistory = this.conversationHistory.slice(-this.contextWindow);
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  exportConversation() {
    return {
      history: this.conversationHistory,
      metadata: {
        timestamp: Date.now(),
        messageCount: this.conversationHistory.length,
        models: Array.from(this.aiModels.keys())
      }
    };
  }
}`,
    
    naturalLanguageProcessor: `// Natural Language Processing Engine
class NLPProcessor {
  constructor() {
    this.intentClassifier = new IntentClassifier();
    this.entityExtractor = new EntityExtractor();
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.contextAnalyzer = new ContextAnalyzer();
  }

  async processInput(text) {
    const analysis = {
      text: text,
      intent: await this.intentClassifier.classify(text),
      entities: await this.entityExtractor.extract(text),
      sentiment: await this.sentimentAnalyzer.analyze(text),
      context: await this.contextAnalyzer.analyze(text),
      confidence: 0
    };

    analysis.confidence = this.calculateConfidence(analysis);
    return analysis;
  }

  calculateConfidence(analysis) {
    const weights = {
      intent: 0.4,
      entities: 0.3,
      sentiment: 0.2,
      context: 0.1
    };

    return (
      analysis.intent.confidence * weights.intent +
      analysis.entities.confidence * weights.entities +
      analysis.sentiment.confidence * weights.sentiment +
      analysis.context.confidence * weights.context
    );
  }
}

class IntentClassifier {
  constructor() {
    this.intents = {
      'code_request': {
        keywords: ['code', 'program', 'function', 'algorithm', 'implementation'],
        patterns: [/write.*code/, /create.*function/, /implement.*algorithm/]
      },
      'explanation_request': {
        keywords: ['explain', 'how', 'what', 'why', 'describe'],
        patterns: [/explain.*/, /how.*work/, /what.*mean/]
      },
      'analysis_request': {
        keywords: ['analyze', 'review', 'evaluate', 'assess', 'examine'],
        patterns: [/analyze.*/, /review.*/, /evaluate.*/]
      }
    };
  }

  async classify(text) {
    const scores = {};
    let maxScore = 0;
    let bestIntent = 'general';

    for (const [intent, config] of Object.entries(this.intents)) {
      const score = this.calculateIntentConfidence(text, config);
      scores[intent] = score;
      
      if (score > maxScore) {
        maxScore = score;
        bestIntent = intent;
      }
    }

    return {
      intent: bestIntent,
      confidence: maxScore,
      alternatives: this.getAlternativeIntents(text)
    };
  }

  calculateIntentConfidence(text, config) {
    const lowerText = text.toLowerCase();
    let score = 0;

    // Keyword matching
    for (const keyword of config.keywords) {
      if (lowerText.includes(keyword)) {
        score += 0.3;
      }
    }

    // Pattern matching
    for (const pattern of config.patterns) {
      if (pattern.test(lowerText)) {
        score += 0.5;
      }
    }

    return Math.min(score, 1.0);
  }

  getAlternativeIntents(text) {
    const alternatives = [];
    const lowerText = text.toLowerCase();
    
    for (const [intent, config] of Object.entries(this.intents)) {
      for (const keyword of config.keywords) {
        if (lowerText.includes(keyword)) {
          alternatives.push(intent);
          break;
        }
      }
    }
    
    return alternatives.slice(0, 3);
  }
}

class EntityExtractor {
  constructor() {
    this.entities = {
      'programming_language': ['javascript', 'python', 'java', 'cpp', 'c++', 'c#', 'php', 'ruby'],
      'framework': ['react', 'vue', 'angular', 'node', 'express', 'django', 'flask'],
      'concept': ['algorithm', 'data structure', 'api', 'database', 'frontend', 'backend']
    };
  }

  async extract(text) {
    const lowerText = text.toLowerCase();
    const extracted = [];

    for (const [type, values] of Object.entries(this.entities)) {
      for (const value of values) {
        if (lowerText.includes(value)) {
          extracted.push({
            type,
            value,
            confidence: 0.8
          });
        }
      }
    }

    return {
      entities: extracted,
      confidence: extracted.length > 0 ? 0.7 : 0.3
    };
  }
}

class SentimentAnalyzer {
  constructor() {
    this.positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'useful'];
    this.negativeWords = ['bad', 'terrible', 'awful', 'useless', 'confusing', 'difficult'];
  }

  async analyze(text) {
    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    for (const word of this.positiveWords) {
      if (lowerText.includes(word)) positiveScore += 0.2;
    }

    for (const word of this.negativeWords) {
      if (lowerText.includes(word)) negativeScore += 0.2;
    }

    const overall = positiveScore - negativeScore;
    
    return {
      score: Math.max(-1, Math.min(1, overall)),
      confidence: 0.6,
      positive: positiveScore,
      negative: negativeScore
    };
  }
}

class ContextAnalyzer {
  constructor() {
    this.contextKeywords = {
      'technical': ['code', 'programming', 'development', 'software'],
      'educational': ['learn', 'teach', 'explain', 'understand'],
      'professional': ['work', 'job', 'career', 'business']
    };
  }

  async analyze(text) {
    const lowerText = text.toLowerCase();
    const contexts = [];

    for (const [context, keywords] of Object.entries(this.contextKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          contexts.push(context);
          break;
        }
      }
    }

    return {
      contexts,
      confidence: contexts.length > 0 ? 0.8 : 0.4
    };
  }
}`,

    responseGenerator: `// AI Response Generator
class ResponseGenerator {
  constructor() {
    this.responseTypes = {
      'code_request': 'code',
      'explanation_request': 'explanation',
      'analysis_request': 'analysis',
      'general': 'conversational'
    };
  }

  async generateResponse(analysis, conversationHistory) {
    const responseType = this.determineResponseType(analysis);
    const template = this.getTemplate(responseType, analysis);
    
    return await this.fillTemplate(template, analysis, conversationHistory);
  }

  determineResponseType(analysis) {
    const intent = analysis.intent.intent;
    return this.responseTypes[intent] || 'conversational';
  }

  getTemplate(responseType, analysis) {
    switch (responseType) {
      case 'code':
        return this.generateCodeExample(analysis);
      case 'explanation':
        return this.generateExplanation(analysis);
      case 'analysis':
        return this.generateAnalysis(analysis);
      default:
        return this.generateConversationalResponse(analysis);
    }
  }

  async fillTemplate(template, analysis, conversationHistory) {
    const lastMessage = conversationHistory[conversationHistory.length - 1]?.content || '';
    
    if (lastMessage.toLowerCase().includes('code') || lastMessage.toLowerCase().includes('program')) {
      return \`Here's a solution in JavaScript:

\`\`\`javascript
// Example code implementation
function solveProblem(input) {
  // Process the input
  const result = input.map(item => item * 2);
  
  // Return the solution
  return result.filter(item => item > 10);
}

// Usage
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const solution = solveProblem(data);
console.log(solution); // [12, 14, 16, 18, 20]
\`\`\`

This code demonstrates efficient array processing with functional programming principles.\`;
    }
    
    return \`I understand your question about "\${lastMessage}". Here's a comprehensive response that addresses your needs and provides actionable insights.\`;
  }

  generateCodeExample(analysis) {
    const language = analysis.entities.entities.find(e => e.type === 'programming_language')?.value || 'javascript';
    
    return \`Here's a solution in \${language}:

\`\`\`\${language}
// Example implementation
function solveProblem(input) {
  // Process the input
  const result = input.map(item => item * 2);
  
  // Return the solution
  return result.filter(item => item > 10);
}

// Usage example
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const solution = solveProblem(data);
console.log(solution);
\`\`\`

This code demonstrates efficient array processing with functional programming principles.\`;
  }

  generateExplanation(analysis) {
    return \`## Explanation

This solution uses modern JavaScript features:

1. **Array.map()** - Transforms each element
2. **Array.filter()** - Selects elements meeting criteria
3. **Arrow functions** - Concise function syntax
4. **Functional programming** - Immutable data transformations

The approach is efficient with O(n) time complexity.\`;
  }

  generateAnalysis(analysis) {
    return \`## Analysis Summary

Based on your request, here are the key insights:

### Key Findings
- **Pattern Recognition**: Identified common patterns in the data
- **Performance Metrics**: Analyzed efficiency and scalability
- **Best Practices**: Evaluated code quality and maintainability

### Recommendations
1. **Optimize Performance**: Consider using more efficient algorithms
2. **Improve Readability**: Add better documentation and comments
3. **Enhance Testing**: Implement comprehensive test coverage\`;
  }

  generateConversationalResponse(analysis) {
    return \`I understand your question and I'm here to help! 

Based on what you've asked, I can provide you with a comprehensive solution that addresses your specific needs. Let me break this down into manageable parts and give you practical examples you can use right away.\`;
  }
}`,

    dashboardComponent: `// React AI Assistant Dashboard
import React, { useState, useEffect, useRef } from 'react';

const AIAssistantDashboard = () => {
  const [conversationManager, setConversationManager] = useState(null);
  const [nlpProcessor, setNlpProcessor] = useState(null);
  const [responseGenerator, setResponseGenerator] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [responseType, setResponseType] = useState('text');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const manager = new ConversationManager();
    const nlp = new NLPProcessor();
    const generator = new ResponseGenerator();

    manager.initializeAI();
    setConversationManager(manager);
    setNlpProcessor(nlp);
    setResponseGenerator(generator);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const analysis = await nlpProcessor.processInput(inputMessage);
      const response = await responseGenerator.generateResponse(analysis, messages);
      
      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        model: selectedModel
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    if (conversationManager) {
      conversationManager.clearHistory();
    }
  };

  const exportConversation = () => {
    if (conversationManager) {
      const exportData = conversationManager.exportConversation();
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'conversation-export.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
        <div className="flex gap-2">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm"
          >
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude">Claude</option>
          </select>
          <button
            onClick={clearConversation}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            Clear
          </button>
          <button
            onClick={exportConversation}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={'flex ' + (message.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={'max-w-xs lg:max-w-md px-4 py-2 rounded-lg ' + (message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white')}
            >
              <div className="text-sm opacity-75 mb-1">
                {message.role === 'assistant' && message.model && message.model}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded resize-none"
            rows={3}
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantDashboard;`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setCurrentPage('demo-organizer')}
            className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            ← Back to Demos
          </button>
          <h1 className="text-4xl font-bold mb-4">AI Assistant Project</h1>
          <p className="text-xl text-gray-300 max-w-4xl">
            Advanced conversational AI with natural language processing, multi-model support, and intelligent response generation.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={'py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ' + (
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                )}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-gray-300 mb-4">
                  The AI Assistant is a sophisticated conversational AI system that combines natural language processing, 
                  multi-model AI integration, and intelligent response generation to provide human-like interactions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Real-time conversation management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Multi-model AI support (GPT-3.5, GPT-4, Claude)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Advanced NLP with intent classification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Intelligent response generation</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Conversation History</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intent Classification</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entity Extraction</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sentiment Analysis</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Multi-Model Support</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Templates</span>
                    <span className="text-green-400">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">Multi-Model AI</h3>
                <p className="text-gray-300">
                  Support for multiple AI models including GPT-3.5, GPT-4, and Claude, with automatic model selection based on task complexity.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">NLP Processing</h3>
                <p className="text-gray-300">
                  Advanced natural language processing with intent classification, entity extraction, sentiment analysis, and context understanding.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Conversation Management</h3>
                <p className="text-gray-300">
                  Intelligent conversation history management with context window optimization and conversation export capabilities.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Intent Recognition</h3>
                <p className="text-gray-300">
                  Automatic detection of user intent including code requests, explanations, analysis, and general conversation.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Response Generation</h3>
                <p className="text-gray-300">
                  Dynamic response generation with code examples, explanations, analysis, and conversational responses based on user intent.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold mb-2">Real-time Processing</h3>
                <p className="text-gray-300">
                  Real-time message processing with loading states, error handling, and smooth user experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="grid gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Conversation Manager</h3>
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.conversationManager}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Natural Language Processor</h3>
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.naturalLanguageProcessor}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Response Generator</h3>
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.responseGenerator}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">React Dashboard Component</h3>
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.dashboardComponent}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Frontend Layer</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• React.js for UI components</li>
                      <li>• Real-time message handling</li>
                      <li>• Model selection interface</li>
                      <li>• Conversation export functionality</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Processing Layer</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• NLP Processor for text analysis</li>
                      <li>• Intent Classifier for understanding user goals</li>
                      <li>• Entity Extractor for identifying key information</li>
                      <li>• Sentiment Analyzer for emotional context</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">AI Layer</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Multi-model AI integration</li>
                      <li>• Response generation engine</li>
                      <li>• Template-based response system</li>
                      <li>• Context-aware processing</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Data Flow</h2>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">1. User Input</h3>
                    <p className="text-sm text-gray-300">User sends message through React interface</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">2. NLP Processing</h3>
                    <p className="text-sm text-gray-300">Text analyzed for intent, entities, sentiment, and context</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">3. AI Model Selection</h3>
                    <p className="text-sm text-gray-300">Appropriate AI model selected based on task complexity</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">4. Response Generation</h3>
                    <p className="text-sm text-gray-300">AI generates appropriate response using templates and context</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">5. History Update</h3>
                    <p className="text-sm text-gray-300">Conversation history updated and context maintained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demo' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Live AI Assistant Demo</h2>
            <div className="h-96 border border-gray-600 rounded-lg overflow-hidden">
              <div className="h-full bg-gray-900 p-4">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">AI Assistant</h3>
                    <div className="flex gap-2">
                      <select className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm">
                        <option>GPT-3.5</option>
                        <option>GPT-4</option>
                        <option>Claude</option>
                      </select>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                        Clear
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs">
                        <div className="text-sm opacity-75 mb-1">GPT-3.5</div>
                        <div>Hello! I'm your AI assistant. How can I help you today?</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        <div>Can you help me write a JavaScript function?</div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs">
                        <div className="text-sm opacity-75 mb-1">GPT-3.5</div>
                        <div>Of course! I'd be happy to help you write a JavaScript function. What kind of function do you need?</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded resize-none"
                      rows={3}
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantProjectPage; 