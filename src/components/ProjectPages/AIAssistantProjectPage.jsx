import React, { useState } from 'react';

const AIAssistantProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    conversationManager: `// AI Conversation Manager
class ConversationManager {
  constructor() {
    this.conversationHistory = [];
    this.currentContext = null;
    this.userPreferences = {};
    this.aiModels = new Map();
    this.responseGenerators = new Map();
    this.contextWindow = 10; // Keep last 10 messages for context
  }

  initializeAI() {
    // Register different AI models
    this.aiModels.set('gpt-3.5', {
      name: 'GPT-3.5',
      maxTokens: 4096,
      temperature: 0.7,
      model: 'gpt-3.5-turbo'
    });

    this.aiModels.set('gpt-4', {
      name: 'GPT-4',
      maxTokens: 8192,
      temperature: 0.7,
      model: 'gpt-4'
    });

    this.aiModels.set('claude', {
      name: 'Claude',
      maxTokens: 100000,
      temperature: 0.7,
      model: 'claude-3-sonnet'
    });

    // Register response generators
    this.responseGenerators.set('text', this.generateTextResponse.bind(this));
    this.responseGenerators.set('code', this.generateCodeResponse.bind(this));
    this.responseGenerators.set('analysis', this.generateAnalysisResponse.bind(this));
  }

  async processMessage(message, options = {}) {
    const {
      model = 'gpt-3.5',
      responseType = 'text',
      includeContext = true,
      temperature = 0.7
    } = options;

    // Add message to history
    this.addToHistory({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // Prepare context
    const context = includeContext ? this.buildContext() : [];
    
    // Generate response
    const response = await this.generateResponse(message, context, {
      model,
      responseType,
      temperature
    });

    // Add AI response to history
    this.addToHistory({
      role: 'assistant',
      content: response.content,
      type: response.type,
      timestamp: Date.now()
    });

    return response;
  }

  buildContext() {
    const recentMessages = this.conversationHistory
      .slice(-this.contextWindow)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    return [
      {
        role: 'system',
        content: this.buildSystemPrompt()
      },
      ...recentMessages
    ];
  }

  buildSystemPrompt() {
    return \`You are an intelligent AI assistant with expertise in:
- Programming and software development
- Data analysis and visualization
- Problem-solving and critical thinking
- Technical writing and documentation

Provide helpful, accurate, and well-structured responses. When appropriate, include code examples and explanations.\`;
  }

  async generateResponse(message, context, options) {
    const { model, responseType, temperature } = options;
    const aiModel = this.aiModels.get(model);

    if (!aiModel) {
      throw new Error(\`Unknown AI model: \${model}\`);
    }

    const generator = this.responseGenerators.get(responseType);
    if (!generator) {
      throw new Error(\`Unknown response type: \${responseType}\`);
    }

    return await generator(message, context, aiModel, temperature);
  }

  async generateTextResponse(message, context, aiModel, temperature) {
    // Simulate AI API call
    const response = await this.callAIAPI(context, aiModel, temperature);
    
    return {
      content: response.content,
      type: 'text',
      confidence: response.confidence,
      tokens: response.tokens
    };
  }

  async generateCodeResponse(message, context, aiModel, temperature) {
    // Enhanced context for code generation
    const codeContext = [
      ...context,
      {
        role: 'system',
        content: 'You are a programming expert. Provide clean, well-documented code with explanations.'
      }
    ];

    const response = await this.callAIAPI(codeContext, aiModel, temperature);
    
    return {
      content: response.content,
      type: 'code',
      language: this.detectLanguage(response.content),
      confidence: response.confidence,
      tokens: response.tokens
    };
  }

  async generateAnalysisResponse(message, context, aiModel, temperature) {
    // Enhanced context for analysis
    const analysisContext = [
      ...context,
      {
        role: 'system',
        content: 'You are a data analyst. Provide detailed analysis with insights and recommendations.'
      }
    ];

    const response = await this.callAIAPI(analysisContext, aiModel, temperature);
    
    return {
      content: response.content,
      type: 'analysis',
      insights: this.extractInsights(response.content),
      confidence: response.confidence,
      tokens: response.tokens
    };
  }

  async callAIAPI(context, aiModel, temperature) {
    // Simulate API call with realistic response
    const response = {
      content: this.simulateAIResponse(context, aiModel),
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      tokens: Math.floor(Math.random() * 1000) + 100
    };

    return response;
  }

  simulateAIResponse(context, aiModel) {
    const lastMessage = context[context.length - 1]?.content || '';
    
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

  detectLanguage(content) {
    if (content.includes('```javascript')) return 'javascript';
    if (content.includes('```python')) return 'python';
    if (content.includes('```java')) return 'java';
    if (content.includes('```cpp')) return 'cpp';
    return 'text';
  }

  extractInsights(content) {
    // Simple insight extraction
    const insights = [];
    if (content.includes('trend')) insights.push('Trend Analysis');
    if (content.includes('pattern')) insights.push('Pattern Recognition');
    if (content.includes('recommendation')) insights.push('Recommendations');
    return insights;
  }

  addToHistory(message) {
    this.conversationHistory.push(message);
    
    // Maintain context window
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

    // Calculate overall confidence
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
      },
      'general_question': {
        keywords: ['question', 'help', 'assist', 'support'],
        patterns: [/can.*help/, /need.*assist/]
      }
    };
  }

  async classify(text) {
    const lowerText = text.toLowerCase();
    let bestIntent = 'general_question';
    let bestConfidence = 0;

    for (const [intent, config] of Object.entries(this.intents)) {
      const confidence = this.calculateIntentConfidence(lowerText, config);
      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        bestIntent = intent;
      }
    }

    return {
      intent: bestIntent,
      confidence: bestConfidence,
      alternatives: this.getAlternativeIntents(lowerText)
    };
  }

  calculateIntentConfidence(text, config) {
    let score = 0;
    
    // Keyword matching
    const keywordMatches = config.keywords.filter(keyword => 
      text.includes(keyword)
    ).length;
    score += keywordMatches * 0.3;
    
    // Pattern matching
    const patternMatches = config.patterns.filter(pattern => 
      pattern.test(text)
    ).length;
    score += patternMatches * 0.7;
    
    return Math.min(score, 1.0);
  }

  getAlternativeIntents(text) {
    const alternatives = [];
    for (const [intent, config] of Object.entries(this.intents)) {
      const confidence = this.calculateIntentConfidence(text, config);
      if (confidence > 0.3) {
        alternatives.push({ intent, confidence });
      }
    }
    return alternatives.sort((a, b) => b.confidence - a.confidence);
  }
}

class EntityExtractor {
  constructor() {
    this.entityTypes = {
      'programming_language': ['javascript', 'python', 'java', 'cpp', 'c#', 'php'],
      'technology': ['react', 'node.js', 'angular', 'vue', 'django', 'flask'],
      'concept': ['algorithm', 'data structure', 'design pattern', 'architecture'],
      'task': ['debug', 'optimize', 'refactor', 'test', 'deploy']
    };
  }

  async extract(text) {
    const lowerText = text.toLowerCase();
    const entities = [];

    for (const [type, values] of Object.entries(this.entityTypes)) {
      for (const value of values) {
        if (lowerText.includes(value)) {
          entities.push({
            type: type,
            value: value,
            confidence: 0.9
          });
        }
      }
    }

    return {
      entities: entities,
      confidence: entities.length > 0 ? 0.8 : 0.5
    };
  }
}

class SentimentAnalyzer {
  constructor() {
    this.positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'thanks'];
    this.negativeWords = ['bad', 'terrible', 'awful', 'wrong', 'error', 'problem'];
  }

  async analyze(text) {
    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    this.positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveScore++;
    });

    this.negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeScore++;
    });

    const totalScore = positiveScore + negativeScore;
    const sentiment = totalScore === 0 ? 'neutral' : 
                    positiveScore > negativeScore ? 'positive' : 'negative';
    const confidence = totalScore === 0 ? 0.5 : Math.min(totalScore / 3, 1.0);

    return {
      sentiment: sentiment,
      confidence: confidence,
      scores: { positive: positiveScore, negative: negativeScore }
    };
  }
}

class ContextAnalyzer {
  constructor() {
    this.contextKeywords = {
      'technical': ['code', 'program', 'algorithm', 'function'],
      'business': ['strategy', 'plan', 'goal', 'objective'],
      'personal': ['help', 'assist', 'support', 'guide']
    };
  }

  async analyze(text) {
    const lowerText = text.toLowerCase();
    const contexts = [];

    for (const [context, keywords] of Object.entries(this.contextKeywords)) {
      const matches = keywords.filter(keyword => lowerText.includes(keyword));
      if (matches.length > 0) {
        contexts.push({
          type: context,
          keywords: matches,
          confidence: matches.length / keywords.length
        });
      }
    }

    return {
      contexts: contexts,
      confidence: contexts.length > 0 ? 0.8 : 0.5
    };
  }
}`,
    
    responseGenerator: `// AI Response Generator
class ResponseGenerator {
  constructor() {
    this.templates = new Map();
    this.responseTypes = new Map();
    this.personality = {
      tone: 'helpful',
      style: 'professional',
      detail: 'comprehensive'
    };
  }

  async generateResponse(analysis, conversationHistory) {
    const responseType = this.determineResponseType(analysis);
    const template = this.getTemplate(responseType, analysis);
    const content = await this.fillTemplate(template, analysis, conversationHistory);
    
    return {
      content: content,
      type: responseType,
      confidence: analysis.confidence,
      metadata: {
        intent: analysis.intent.intent,
        entities: analysis.entities.entities,
        sentiment: analysis.sentiment.sentiment
      }
    };
  }

  determineResponseType(analysis) {
    const intent = analysis.intent.intent;
    
    switch (intent) {
      case 'code_request':
        return 'code';
      case 'explanation_request':
        return 'explanation';
      case 'analysis_request':
        return 'analysis';
      default:
        return 'general';
    }
  }

  getTemplate(responseType, analysis) {
    const templates = {
      code: {
        structure: 'code_example',
        style: 'detailed',
        includeExplanation: true
      },
      explanation: {
        structure: 'step_by_step',
        style: 'educational',
        includeExamples: true
      },
      analysis: {
        structure: 'insights_summary',
        style: 'analytical',
        includeRecommendations: true
      },
      general: {
        structure: 'conversational',
        style: 'helpful',
        includeSuggestions: true
      }
    };

    return templates[responseType] || templates.general;
  }

  async fillTemplate(template, analysis, conversationHistory) {
    const { structure, style, includeExplanation, includeExamples, includeRecommendations, includeSuggestions } = template;
    
    let content = '';

    switch (structure) {
      case 'code_example':
        content = this.generateCodeExample(analysis);
        if (includeExplanation) {
          content += '\\n\\n' + this.generateExplanation(analysis);
        }
        break;
      
      case 'step_by_step':
        content = this.generateStepByStep(analysis);
        if (includeExamples) {
          content += '\\n\\n' + this.generateExamples(analysis);
        }
        break;
      
      case 'insights_summary':
        content = this.generateInsightsSummary(analysis);
        if (includeRecommendations) {
          content += '\\n\\n' + this.generateRecommendations(analysis);
        }
        break;
      
      case 'conversational':
        content = this.generateConversationalResponse(analysis);
        if (includeSuggestions) {
          content += '\\n\\n' + this.generateSuggestions(analysis);
        }
        break;
    }

    return this.applyStyling(content, style);
  }

  generateCodeExample(analysis) {
    const entities = analysis.entities.entities;
    const language = entities.find(e => e.type === 'programming_language')?.value || 'javascript';
    
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

  generateStepByStep(analysis) {
    return \`## Step-by-Step Guide

1. **Understand the Problem**
   - Identify the core requirements
   - Break down into smaller tasks

2. **Plan the Solution**
   - Choose appropriate data structures
   - Design the algorithm

3. **Implement the Code**
   - Write clean, readable code
   - Add proper error handling

4. **Test and Validate**
   - Verify the solution works
   - Check edge cases

5. **Optimize if Needed**
   - Improve performance
   - Enhance readability\`;
  }

  generateInsightsSummary(analysis) {
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

  generateExamples(analysis) {
    return \`## Examples

Here are some practical examples:

**Example 1: Basic Implementation**
\`\`\`javascript
// Simple example
const result = [1, 2, 3].map(x => x * 2);
\`\`\`

**Example 2: Advanced Usage**
\`\`\`javascript
// More complex example
const data = [{id: 1, value: 10}, {id: 2, value: 20}];
const processed = data.map(item => ({...item, doubled: item.value * 2}));
\`\`\``;
  }

  generateRecommendations(analysis) {
    return \`## Recommendations

1. **Performance**: Consider using more efficient algorithms
2. **Maintainability**: Add comprehensive documentation
3. **Scalability**: Design for future growth
4. **Testing**: Implement thorough test coverage\`;
  }

  generateSuggestions(analysis) {
    return \`## Suggestions

- Try breaking down complex problems into smaller parts
- Consider using modern development tools and frameworks
- Don't hesitate to ask for clarification when needed
- Practice with real-world projects to improve skills\`;
  }

  applyStyling(content, style) {
    switch (style) {
      case 'detailed':
        return content.replace(/##/g, '###').replace(/###/g, '####');
      case 'educational':
        return content.replace(/##/g, '###').replace(/###/g, '####');
      case 'analytical':
        return content.replace(/##/g, '###').replace(/###/g, '####');
      case 'helpful':
        return content.replace(/##/g, '###').replace(/###/g, '####');
      default:
        return content;
    }
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
      // Process with NLP
      const analysis = await nlpProcessor.processInput(inputMessage);
      
      // Generate AI response
      const response = await conversationManager.processMessage(inputMessage, {
        model: selectedModel,
        responseType: responseType
      });

      const aiMessage = {
        role: 'assistant',
        content: response.content,
        type: response.type,
        confidence: response.confidence,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        type: 'error',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
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
      const data = conversationManager.exportConversation();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'conversation.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const models = [
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient' },
    { id: 'gpt-4', name: 'GPT-4', description: 'Most advanced' },
    { id: 'claude', name: 'Claude', description: 'Creative and detailed' }
  ];

  const responseTypes = [
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'code', name: 'Code', icon: '💻' },
    { id: 'analysis', name: 'Analysis', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          🤖 AI Assistant
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Settings</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">AI Model</h4>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Response Type</h4>
                <div className="space-y-2">
                  {responseTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setResponseType(type.id)}
                      className={`w-full p-2 rounded border text-left ${
                        responseType === type.id
                          ? 'bg-green-600 border-green-400'
                          : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-600">
                <button
                  onClick={clearConversation}
                  className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 mb-2"
                >
                  Clear Conversation
                </button>
                <button
                  onClick={exportConversation}
                  className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Export Chat
                </button>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 bg-gray-800 rounded-lg border border-gray-600 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto max-h-96">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <div className="text-4xl mb-4">🤖</div>
                  <p>Start a conversation with the AI assistant!</p>
                  <p className="text-sm mt-2">Ask questions, request code, or get analysis.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.confidence && (
                          <div className="text-xs text-gray-400 mt-1">
                            Confidence: {Math.round(message.confidence * 100)}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-white p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-600">
              <div className="flex space-x-4">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded text-white resize-none"
                  rows="3"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !inputMessage.trim()}
                  className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-green-400 hover:text-green-300 mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-4">🤖 AI Assistant</h1>
          <p className="text-gray-300 text-lg">
            Advanced conversational AI with natural language processing and intelligent response generation
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
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  The AI Assistant is a sophisticated conversational AI system that combines natural language 
                  processing, intelligent response generation, and multi-model AI integration. It provides 
                  context-aware responses with support for code generation, analysis, and educational content.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Natural language understanding</li>
                    <li>• Multi-model AI integration</li>
                    <li>• Context-aware conversations</li>
                    <li>• Code generation and analysis</li>
                    <li>• Educational content delivery</li>
                    <li>• Conversation history management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for user interface</li>
                    <li>• Natural Language Processing</li>
                    <li>• Multiple AI model integration</li>
                    <li>• Conversation management</li>
                    <li>• Response generation engine</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">🧠 Natural Language Processing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Intent classification</li>
                    <li>• Entity extraction</li>
                    <li>• Sentiment analysis</li>
                    <li>• Context understanding</li>
                    <li>• Confidence scoring</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">🤖 AI Model Integration</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Multiple AI models (GPT-3.5, GPT-4, Claude)</li>
                    <li>• Model selection and switching</li>
                    <li>• Response type customization</li>
                    <li>• Temperature and parameter control</li>
                    <li>• Confidence-based responses</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">💬 Conversation Management</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Context window management</li>
                    <li>• Conversation history</li>
                    <li>• Multi-turn dialogues</li>
                    <li>• Export and import conversations</li>
                    <li>• Conversation analytics</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">📝 Response Generation</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Code generation with explanations</li>
                    <li>• Step-by-step tutorials</li>
                    <li>• Analysis and insights</li>
                    <li>• Educational content</li>
                    <li>• Multiple response formats</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Conversation Manager</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.conversationManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Natural Language Processor</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.naturalLanguageProcessor}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Response Generator</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.responseGenerator}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Dashboard Component</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• React.js chat interface</li>
                      <li>• Real-time message display</li>
                      <li>• Model selection controls</li>
                      <li>• Response type configuration</li>
                      <li>• Conversation export</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">AI Processing Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Natural language processing</li>
                      <li>• Intent classification</li>
                      <li>• Entity extraction</li>
                      <li>• Multi-model AI integration</li>
                      <li>• Response generation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                    <div>
                      <p className="text-white font-semibold">User Input</p>
                      <p className="text-gray-300 text-sm">Natural language message processing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">NLP Analysis</p>
                      <p className="text-gray-300 text-sm">Intent classification and entity extraction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">AI Response</p>
                      <p className="text-gray-300 text-sm">Multi-model response generation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Live Demo</h2>
              <p className="text-gray-300 mb-6">
                Experience the AI assistant in action. The demo showcases natural language processing, 
                intelligent response generation, and multi-model AI integration with real-time conversation.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive AI Assistant Demo</h3>
                  <button
                    onClick={() => setCurrentPage('ai-assistant')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full AI assistant with natural language processing, 
                  intelligent response generation, and multi-model AI integration.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantProjectPage; 