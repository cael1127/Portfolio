import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const RAGChatbotDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContext, setSelectedContext] = useState('portfolio');
  const [chatHistory, setChatHistory] = useState([]);
  const [sources, setSources] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const messagesEndRef = useRef(null);

  // Knowledge Base for the demo
  const knowledgeBase = {
    'portfolio': {
      content: 'This is a comprehensive portfolio showcasing AI/ML projects and full-stack applications. The portfolio includes Snake AI with reinforcement learning, sentiment analysis with transformers, and various other cutting-edge projects.',
      source: 'Portfolio Documentation'
    },
    'ai-projects': {
      content: 'AI projects include fraud detection systems, deepfake detection, resume analysis with NLP, AI assistants, and reinforcement learning applications like Snake AI.',
      source: 'AI Projects Database'
    },
    'technologies': {
      content: 'Technologies used include React, Node.js, Python, TensorFlow, OpenAI GPT, WebSocket, MongoDB, and various cloud platforms.',
      source: 'Technology Stack'
    }
  };

  const demoCode = `/**
 * RAG Chatbot Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a Retrieval-Augmented Generation chatbot
 * with context awareness, source attribution, and intelligent responses.
 */

import React, { useState, useEffect, useRef } from 'react';

const RAGChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContext, setSelectedContext] = useState('portfolio');
  const [sources, setSources] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const messagesEndRef = useRef(null);

  // Knowledge Base
  const knowledgeBase = {
    'portfolio': {
      content: 'Portfolio content...',
      source: 'Portfolio Documentation'
    },
    'ai-projects': {
      content: 'AI projects content...',
      source: 'AI Projects Database'
    },
    'technologies': {
      content: 'Technology stack content...',
      source: 'Technology Stack'
    }
  };

  // RAG Implementation
  const retrieveRelevantContext = (query) => {
    const context = knowledgeBase[selectedContext];
    const relevanceScore = calculateRelevance(query, context.content);
    
    return {
      content: context.content,
      source: context.source,
      relevanceScore
    };
  };

  const calculateRelevance = (query, content) => {
    const queryWords = query.toLowerCase().split(' ');
    const contentWords = content.toLowerCase().split(' ');
    
    let matches = 0;
    queryWords.forEach(word => {
      if (contentWords.includes(word)) {
        matches++;
      }
    });
    
    return (matches / queryWords.length) * 100;
  };

  const generateResponse = async (userMessage, context) => {
    setIsTyping(true);
    
    // Simulate API call to LLM with context
    const response = await new Promise(resolve => {
      setTimeout(() => {
        const responses = [
          \`Based on the context about \${context.source.toLowerCase()}, I can help you with that. \${context.content}\`,
          \`According to the information in \${context.source}, here's what I found: \${context.content}\`,
          \`I found relevant information in \${context.source}: \${context.content}\`
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1500);
    });
    
    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Retrieve relevant context
    const context = retrieveRelevantContext(inputMessage);
    setSources([context]);
    setConfidence(context.relevanceScore);

    // Generate response
    const response = await generateResponse(inputMessage, context);
    
    const botMessage = {
      id: Date.now() + 1,
      text: response,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      sources: [context]
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="rag-chatbot">
      {/* Context Selector */}
      <div className="context-selector">
        <h3>Select Knowledge Base:</h3>
        <select 
          value={selectedContext} 
          onChange={(e) => setSelectedContext(e.target.value)}
        >
          <option value="portfolio">Portfolio</option>
          <option value="ai-projects">AI Projects</option>
          <option value="technologies">Technologies</option>
        </select>
      </div>

      {/* Chat Interface */}
      <div className="chat-interface">
        <div className="messages-container">
          {messages.map(message => (
            <div key={message.id} className={\`message \${message.sender}\`}>
              <div className="message-content">
                {message.text}
              </div>
              {message.sources && (
                <div className="message-sources">
                  <small>Sources: {message.sources.map(s => s.source).join(', ')}</small>
                </div>
              )}
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about the selected context..."
            rows="3"
          />
          <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            Send
          </button>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="confidence-score">
        <span>Relevance: {confidence.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default RAGChatbot;`;

  // RAG Implementation
  const retrieveRelevantContext = (query) => {
    const context = knowledgeBase[selectedContext];
    const relevanceScore = calculateRelevance(query, context.content);
    
    return {
      content: context.content,
      source: context.source,
      relevanceScore
    };
  };

  const calculateRelevance = (query, content) => {
    const queryWords = query.toLowerCase().split(' ');
    const contentWords = content.toLowerCase().split(' ');
    
    let matches = 0;
    queryWords.forEach(word => {
      if (contentWords.includes(word)) {
        matches++;
      }
    });
    
    return Math.min((matches / queryWords.length) * 100, 95); // Cap at 95%
  };

  const generateResponse = async (userMessage, context) => {
    setIsTyping(true);
    
    // Simulate API call to LLM with context
    const response = await new Promise(resolve => {
      setTimeout(() => {
        const responses = [
          `Based on the context about ${context.source.toLowerCase()}, I can help you with that. ${context.content}`,
          `According to the information in ${context.source}, here's what I found: ${context.content}`,
          `I found relevant information in ${context.source}: ${context.content}`,
          `Let me share what I know from ${context.source}: ${context.content}`,
          `Here's the relevant information from ${context.source}: ${context.content}`
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1500);
    });
    
    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Retrieve relevant context
    const context = retrieveRelevantContext(inputMessage);
    setSources([context]);
    setConfidence(context.relevanceScore);

    // Generate response
    const response = await generateResponse(inputMessage, context);
    
    const botMessage = {
      id: Date.now() + 1,
      text: response,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      sources: [context]
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">🤖 RAG Chatbot</h1>
            <p className="text-gray-400">Retrieval-Augmented Generation with context awareness</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        {/* Context Selector */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">📚 Knowledge Base</h3>
              <p className="text-gray-400 text-sm">Select the context for the chatbot to reference</p>
            </div>
            <select 
              value={selectedContext} 
              onChange={(e) => setSelectedContext(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="portfolio">📁 Portfolio</option>
              <option value="ai-projects">🤖 AI Projects</option>
              <option value="technologies">💻 Technologies</option>
            </select>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Relevance Score:</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <span className="text-green-400 font-semibold">{confidence.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-gray-800 rounded-xl overflow-hidden mb-6">
          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-4">🤖</div>
                <p>Ask me anything about the selected knowledge base!</p>
                <p className="text-sm mt-2">Try: "What AI projects do you have?" or "What technologies are used?"</p>
              </div>
            )}
            
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <div className="text-sm">{message.text}</div>
                  {message.sources && (
                    <div className="mt-2 pt-2 border-t border-gray-600">
                      <div className="text-xs text-gray-400">
                        📚 Sources: {message.sources.map(s => s.source).join(', ')}
                      </div>
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about the selected context..."
                rows="2"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
              />
              <button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Sources */}
        {sources.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">📚 Current Sources</h3>
            <div className="space-y-3">
              {sources.map((source, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-400">{source.source}</h4>
                    <span className="text-green-400 text-sm">Relevance: {source.relevanceScore.toFixed(1)}%</span>
                  </div>
                  <p className="text-gray-300 text-sm">{source.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RAG Features */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">🚀 RAG Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-blue-400 mb-3">Core Functionality</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Context-aware responses</li>
                <li>• Source attribution</li>
                <li>• Relevance scoring</li>
                <li>• Real-time chat interface</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-green-400 mb-3">Technical Implementation</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Retrieval-Augmented Generation</li>
                <li>• Knowledge base integration</li>
                <li>• Context relevance calculation</li>
                <li>• LLM response generation</li>
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
        title="RAG Chatbot Implementation"
      />
    </div>
  );
};

export default RAGChatbotDemo;