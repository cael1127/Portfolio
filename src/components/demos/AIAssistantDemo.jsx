import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const AIAssistantDemo = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    userPreferences: {},
    conversationHistory: [],
    currentTopic: '',
    sentiment: 'neutral',
    complexity: 'medium'
  });
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [aiCapabilities, setAiCapabilities] = useState({
    contextWindow: 8192,
    memoryTokens: 4096,
    responseTime: 1.2,
    accuracy: 96.8,
    modelVersion: 'GPT-4 Advanced',
    temperature: 0.7,
    maxTokens: 2048
  });
  const [systemStats, setSystemStats] = useState({
    totalTokens: 0,
    conversations: 0,
    averageResponseTime: 1.2,
    satisfactionRate: 4.8
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      role: 'assistant',
      content: `Hello! I'm an advanced AI assistant powered by GPT-4. I can help you with:

🤖 **Programming & Code Review**
📊 **Data Analysis & Visualization** 
📝 **Content Creation & Writing**
🔍 **Research & Problem Solving**
🎨 **Creative Projects & Brainstorming**

What would you like to work on today?`,
      timestamp: new Date().toLocaleTimeString(),
      tokens: 45,
      confidence: 0.98,
      contextUsed: ['greeting', 'capabilities']
    };
    setMessages([welcomeMessage]);
  }, []);

  // Simulate AI thinking and response generation
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Analyze user input for context
    const context = analyzeUserInput(userMessage);
    
    // Generate sophisticated response based on context
    const response = await generateContextualResponse(userMessage, context);
    
    const aiMessage = {
      id: Date.now(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date().toLocaleTimeString(),
      tokens: response.tokens,
      confidence: response.confidence,
      contextUsed: response.contextUsed,
      reasoning: response.reasoning
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
    
    // Update conversation context
    updateConversationContext(userMessage, response);
  };

  const analyzeUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    const context = {
      intent: 'general',
      topic: '',
      complexity: 'medium',
      sentiment: 'neutral',
      requiresCode: false,
      requiresAnalysis: false
    };

    // Intent detection
    if (lowerInput.includes('code') || lowerInput.includes('program') || lowerInput.includes('function')) {
      context.intent = 'programming';
      context.requiresCode = true;
    } else if (lowerInput.includes('analyze') || lowerInput.includes('data') || lowerInput.includes('chart')) {
      context.intent = 'analysis';
      context.requiresAnalysis = true;
    } else if (lowerInput.includes('write') || lowerInput.includes('content') || lowerInput.includes('article')) {
      context.intent = 'writing';
    } else if (lowerInput.includes('help') || lowerInput.includes('problem') || lowerInput.includes('issue')) {
      context.intent = 'support';
    }

    // Topic detection
    if (lowerInput.includes('react') || lowerInput.includes('javascript')) {
      context.topic = 'frontend';
    } else if (lowerInput.includes('python') || lowerInput.includes('django')) {
      context.topic = 'backend';
    } else if (lowerInput.includes('machine learning') || lowerInput.includes('ai')) {
      context.topic = 'ai-ml';
    } else if (lowerInput.includes('database') || lowerInput.includes('sql')) {
      context.topic = 'database';
    }

    // Sentiment analysis
    if (lowerInput.includes('error') || lowerInput.includes('problem') || lowerInput.includes('issue')) {
      context.sentiment = 'negative';
    } else if (lowerInput.includes('great') || lowerInput.includes('awesome') || lowerInput.includes('thanks')) {
      context.sentiment = 'positive';
    }

    return context;
  };

  const generateContextualResponse = async (userInput, context) => {
    const responses = {
      programming: {
        content: `I'd be happy to help you with your code! Based on your request, here's what I can do:

🔍 **Code Review**: I can analyze your code for best practices, performance issues, and potential bugs
📝 **Code Generation**: I can help write functions, components, or entire applications
🐛 **Debugging**: I can help identify and fix issues in your code
📚 **Documentation**: I can explain concepts, APIs, or frameworks

Please share your code or describe what you're working on, and I'll provide detailed assistance with examples and explanations.`,
        tokens: 67,
        confidence: 0.95,
        contextUsed: ['programming', 'code_assistance'],
        reasoning: 'User requested programming help, provided comprehensive assistance options'
      },
      analysis: {
        content: `Perfect! I can help you with data analysis and visualization. Here's what I can assist with:

📊 **Data Analysis**: Statistical analysis, trend identification, pattern recognition
📈 **Visualization**: Charts, graphs, dashboards using various libraries
🔍 **Data Cleaning**: Preprocessing, validation, transformation
📋 **Reporting**: Generate insights and recommendations from your data

What type of data are you working with? I can provide specific guidance and code examples for your analysis needs.`,
        tokens: 58,
        confidence: 0.93,
        contextUsed: ['analysis', 'data_visualization'],
        reasoning: 'User mentioned analysis, offered data-focused assistance'
      },
      writing: {
        content: `Great! I can help you with content creation and writing. I can assist with:

✍️ **Content Writing**: Articles, blog posts, documentation, marketing copy
📝 **Editing & Proofreading**: Grammar, style, clarity improvements
🎯 **SEO Optimization**: Keyword research, meta descriptions, content strategy
📚 **Academic Writing**: Research papers, essays, citations

What type of content are you working on? I can provide writing assistance, suggestions, and help structure your ideas.`,
        tokens: 52,
        confidence: 0.94,
        contextUsed: ['writing', 'content_creation'],
        reasoning: 'User requested writing help, provided content creation options'
      },
      support: {
        content: `I'm here to help! I can assist with:

🔧 **Technical Issues**: Debugging, troubleshooting, problem-solving
📚 **Learning**: Explain concepts, provide tutorials, answer questions
💡 **Best Practices**: Industry standards, design patterns, methodologies
🚀 **Optimization**: Performance improvements, efficiency suggestions

What specific issue or question do you have? I'll provide detailed guidance and solutions.`,
        tokens: 48,
        confidence: 0.96,
        contextUsed: ['support', 'problem_solving'],
        reasoning: 'User needs help, offered comprehensive support options'
      },
      general: {
        content: `I'm an advanced AI assistant with expertise in programming, data analysis, writing, and problem-solving. I can help you with:

💻 **Programming**: Code review, debugging, best practices, multiple languages
📊 **Data Analysis**: Statistical analysis, visualization, insights
✍️ **Content Creation**: Writing, editing, SEO optimization
🔍 **Research**: Information gathering, analysis, synthesis
🎨 **Creative Projects**: Brainstorming, ideation, planning

What would you like to work on? I'm here to provide detailed, helpful assistance!`,
        tokens: 62,
        confidence: 0.97,
        contextUsed: ['general', 'capabilities'],
        reasoning: 'General inquiry, provided overview of capabilities'
      }
    };

    return responses[context.intent] || responses.general;
  };

  const updateConversationContext = (userInput, aiResponse) => {
    setConversationContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, { user: userInput, assistant: aiResponse.content }],
      currentTopic: aiResponse.contextUsed[0] || prev.currentTopic,
      lastInteraction: new Date().toISOString()
    }));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
      tokens: Math.ceil(inputMessage.length / 4)
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Generate AI response
    await generateAIResponse(inputMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const demoCode = `import React, { useState, useEffect, useRef } from 'react';

const AdvancedLLM = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({
    userPreferences: {},
    conversationHistory: [],
    currentTopic: '',
    sentiment: 'neutral'
  });
  
  // Context-aware response generation
  const generateResponse = async (userInput) => {
    setIsTyping(true);
    
    // Analyze user input for intent and context
    const analysis = await analyzeInput(userInput);
    
    // Generate contextual response
    const response = await fetch('/api/llm/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userInput,
        context: context,
        analysis: analysis,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2048
      })
    });
    
    const aiResponse = await response.json();
    
    // Update conversation context
    setContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, {
        user: userInput,
        assistant: aiResponse.content,
        timestamp: new Date().toISOString()
      }],
      currentTopic: aiResponse.topic,
      sentiment: aiResponse.sentiment
    }));
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'assistant',
      content: aiResponse.content,
      timestamp: new Date().toLocaleTimeString(),
      confidence: aiResponse.confidence,
      reasoning: aiResponse.reasoning
    }]);
    
    setIsTyping(false);
  };
  
  // Advanced input analysis
  const analyzeInput = async (input) => {
    const analysis = {
      intent: 'general',
      topic: '',
      sentiment: 'neutral',
      complexity: 'medium',
      requiresCode: false,
      entities: [],
      keywords: []
    };
    
    // NLP processing for intent detection
    const nlpResponse = await fetch('/api/nlp/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    
    const nlpResult = await nlpResponse.json();
    
    return {
      ...analysis,
      ...nlpResult
    };
  };
  
  // Memory management for long conversations
  const manageMemory = (conversationHistory) => {
    const maxTokens = 4096;
    let currentTokens = 0;
    const relevantHistory = [];
    
    // Keep most relevant parts of conversation
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
      const message = conversationHistory[i];
      const messageTokens = message.content.length / 4;
      
      if (currentTokens + messageTokens <= maxTokens) {
        relevantHistory.unshift(message);
        currentTokens += messageTokens;
      } else {
        break;
      }
    }
    
    return relevantHistory;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-8">
          🤖 Advanced LLM Assistant
        </h1>
        
        {/* Chat Interface */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map(message => (
              <div key={message.id} className={\`p-4 rounded-lg \${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}\`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-sm text-gray-400">{message.timestamp}</span>
                </div>
                <p className="text-white">{message.content}</p>
                {message.confidence && (
                  <div className="mt-2 text-sm text-gray-400">
                    Confidence: {(message.confidence * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="p-4 rounded-lg bg-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-gray-400">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="mt-6 flex space-x-4">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-700 text-white p-3 rounded-lg resize-none"
              rows={3}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
        
        {/* Context Information */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">🧠 Context & Memory</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Current Topic</p>
              <p className="text-white font-semibold">{context.currentTopic || 'General'}</p>
            </div>
            <div>
              <p className="text-gray-400">Sentiment</p>
              <p className="text-white font-semibold">{context.sentiment}</p>
            </div>
            <div>
              <p className="text-gray-400">Conversation Length</p>
              <p className="text-white font-semibold">{context.conversationHistory.length} exchanges</p>
            </div>
            <div>
              <p className="text-gray-400">Memory Tokens</p>
              <p className="text-white font-semibold">{context.conversationHistory.length * 50}/4096</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLLM;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-green-400 mb-2">🤖 Advanced LLM Assistant</h1>
              <p className="text-gray-400">GPT-4 powered AI with context awareness, memory, and sophisticated responses</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">💬 Interactive Chat</h2>
              
              {/* Messages */}
              <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                {messages.map((message) => (
                  <div key={message.id} className={`p-4 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600/20 border border-blue-500/30' 
                      : 'bg-gray-800/50 border border-gray-600'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">
                          {message.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
                        </span>
                        {message.confidence && (
                          <span className="text-xs bg-green-600 px-2 py-1 rounded">
                            {(message.confidence * 100).toFixed(0)}% confidence
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">{message.timestamp}</span>
                    </div>
                    <div className="text-white whitespace-pre-wrap">{message.content}</div>
                    {message.tokens && (
                      <div className="mt-2 text-xs text-gray-400">
                        Tokens: {message.tokens} • Context: {message.contextUsed?.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex space-x-4">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything - programming, analysis, writing, or general questions..."
                  className="flex-1 bg-gray-800 text-white p-4 rounded-lg resize-none border border-gray-600 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* AI Capabilities & Context */}
          <div className="space-y-6">
            {/* AI Model Info */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h3 className="text-lg font-bold text-white mb-4">🧠 AI Model</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Model</span>
                  <span className="text-white font-semibold">{aiCapabilities.modelVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Context Window</span>
                  <span className="text-white font-semibold">{aiCapabilities.contextWindow.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Memory Tokens</span>
                  <span className="text-white font-semibold">{aiCapabilities.memoryTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Temperature</span>
                  <span className="text-white font-semibold">{aiCapabilities.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Max Tokens</span>
                  <span className="text-white font-semibold">{aiCapabilities.maxTokens.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Conversation Context */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h3 className="text-lg font-bold text-white mb-4">📝 Context</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Topic</span>
                  <span className="text-white font-semibold">{conversationContext.currentTopic || 'General'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sentiment</span>
                  <span className="text-white font-semibold">{conversationContext.sentiment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Complexity</span>
                  <span className="text-white font-semibold">{conversationContext.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">History Length</span>
                  <span className="text-white font-semibold">{conversationContext.conversationHistory.length}</span>
                </div>
              </div>
            </div>

            {/* System Stats */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h3 className="text-lg font-bold text-white mb-4">📊 Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Tokens</span>
                  <span className="text-white font-semibold">{systemStats.totalTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Conversations</span>
                  <span className="text-white font-semibold">{systemStats.conversations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg Response</span>
                  <span className="text-white font-semibold">{systemStats.averageResponseTime}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Satisfaction</span>
                  <span className="text-white font-semibold">{systemStats.satisfactionRate}/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced LLM Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">🧠 Context Awareness</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Conversation memory</li>
                <li>• Topic tracking</li>
                <li>• Sentiment analysis</li>
                <li>• Intent recognition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">💡 Intelligent Responses</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Contextual generation</li>
                <li>• Multi-domain expertise</li>
                <li>• Adaptive responses</li>
                <li>• Confidence scoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">🔍 Advanced Analysis</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• NLP processing</li>
                <li>• Entity recognition</li>
                <li>• Keyword extraction</li>
                <li>• Complexity assessment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">⚡ Real-time Processing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Streaming responses</li>
                <li>• Token management</li>
                <li>• Memory optimization</li>
                <li>• Performance monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Advanced LLM Code</h3>
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

export default AIAssistantDemo; 