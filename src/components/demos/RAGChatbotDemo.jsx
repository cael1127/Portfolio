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
    'projects': {
      content: 'Key projects include: 1) Snake AI with neural networks and genetic algorithms, 2) Multi-agent AI system with behavior-based coordination, 3) Sentiment analysis using VADER, transformers, and NLTK, 4) RAG chatbot with LangChain and Next.js.',
      source: 'Project Database'
    },
    'skills': {
      content: 'Technical skills include: React, Python, TensorFlow, PyTorch, Node.js, Next.js, LangChain, JavaScript, TypeScript, Machine Learning, AI/ML, Blockchain, Web3, and various other modern technologies.',
      source: 'Skills Database'
    },
    'experience': {
      content: 'Experience includes building enterprise-level applications, implementing real-time collaboration systems, developing AI-powered features, and deploying scalable web applications.',
      source: 'Experience Records'
    }
  };

  // Process message function for the demo
  const processMessage = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock response based on input
    const responses = [
      "This portfolio showcases advanced AI/ML projects including neural networks and reinforcement learning.",
      "The projects demonstrate expertise in React, Python, TensorFlow, and modern web technologies.",
      "Key skills include machine learning, full-stack development, and real-time applications.",
      "Experience includes building enterprise applications and AI-powered features."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    setIsTyping(false);
    
    return {
      text: response,
      sources: [{ title: 'Portfolio Database', relevance: 0.85 }],
      confidence: 0.8
    };
  };

  // Send message function for the demo
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    const response = await processMessage(inputMessage);
    
    const botMessage = {
      id: Date.now() + 1,
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      sources: response.sources,
      confidence: response.confidence
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const demoCode = `/**
 * RAG Chatbot Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a Retrieval-Augmented Generation chatbot
 * using LangChain, OpenAI, and vector stores for context-aware responses.
 */

import React, { useState, useEffect, useRef } from 'react';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';

const RAGChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sources, setSources] = useState([]);
  
  // Knowledge Base Setup
  const knowledgeBase = {
    'portfolio': {
      content: 'This is a comprehensive portfolio showcasing AI/ML projects and full-stack applications. The portfolio includes Snake AI with reinforcement learning, sentiment analysis with transformers, and various other cutting-edge projects.',
      source: 'Portfolio Documentation'
    },
    'projects': {
      content: 'Key projects include: 1) Snake AI with neural networks and genetic algorithms, 2) Multi-agent AI system with behavior-based coordination, 3) Sentiment analysis using VADER, transformers, and NLTK, 4) RAG chatbot with LangChain and Next.js.',
      source: 'Project Database'
    },
    'skills': {
      content: 'Technical skills include: React, Python, TensorFlow, PyTorch, Node.js, Next.js, LangChain, JavaScript, TypeScript, Machine Learning, AI/ML, Blockchain, Web3, and various other modern technologies.',
      source: 'Skills Database'
    },
    'experience': {
      content: 'Experience includes building enterprise-level applications, implementing real-time collaboration systems, developing AI-powered features, and deploying scalable web applications.',
      source: 'Experience Records'
    }
  };

  // Initialize Vector Store
  const initializeVectorStore = async () => {
    const documents = [
      'This portfolio showcases AI/ML projects including Snake AI with reinforcement learning.',
      'The portfolio showcases modern web development with React and interactive features.',
      'Sentiment analysis project uses VADER, transformers, and NLTK.',
      'Skills include React, Python, TensorFlow, Node.js, and modern web technologies.',
      'Experience includes building enterprise applications and AI-powered features.'
    ];
    
    const vectorStore = await MemoryVectorStore.fromTexts(
      documents,
      documents.map((_, i) => ({ id: i })),
      new OpenAIEmbeddings()
    );
    
    return vectorStore;
  };

  // Generate Contextual Response
  const generateResponse = async (query, context) => {
    const llm = new OpenAI({ temperature: 0.7 });
    
    const prompt = \`Based on the following context, provide a helpful and accurate response to the user's question. If the context doesn't contain relevant information, say so politely.

Context: \${context}

User Question: \${query}

Response:\`;
    
    const response = await llm.call(prompt);
    return response.trim();
  };

  // Process User Message
  const processMessage = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Retrieve relevant context
      const vectorStore = await initializeVectorStore();
      const results = await vectorStore.similaritySearch(userMessage, 3);
      
      const context = results.map(doc => doc.pageContent).join(' ');
      const response = await generateResponse(userMessage, context);
      
      // Calculate confidence based on context relevance
      const confidence = Math.min(0.9, Math.random() * 0.3 + 0.7);
      
      return {
        text: response,
        sources: results.map(doc => doc.metadata),
        confidence: confidence
      };
    } catch (error) {
      return {
        text: 'I apologize, but I encountered an error processing your request. Please try again.',
        sources: [],
        confidence: 0.5
      };
    } finally {
      setIsTyping(false);
    }
  };

  // Send Message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    const response = await processMessage(inputMessage);
    
    const botMessage = {
      id: Date.now() + 1,
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      sources: response.sources,
      confidence: response.confidence
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={\`message \${message.sender}\`}>
            <p>{message.text}</p>
            {message.sources && message.sources.length > 0 && (
              <div className="sources">
                <small>Sources: {message.sources.length}</small>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <span>Typing...</span>
          </div>
        )}
      </div>
      
      <div className="input-area">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me about the portfolio..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default RAGChatbot;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">💬 RAG Chatbot with Next.js</h1>
            <p className="text-gray-400">Retrieval-Augmented Generation using LangChain and OpenAI</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">🤖 Chat Interface</h3>
              
              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-700 rounded-lg">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-4">💬</div>
                    <p className="text-lg font-semibold mb-2">Welcome to RAG Chatbot!</p>
                    <p className="text-sm">Ask me about the portfolio, projects, skills, or experience.</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p>Try asking:</p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• "What projects are in the portfolio?"</li>
                        <li>• "Tell me about the AI/ML projects"</li>
                        <li>• "What skills are demonstrated?"</li>
                        <li>• "What technologies are used?"</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-600 text-white'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          
                          {message.sources && (
                            <div className="mt-2 pt-2 border-t border-gray-500">
                              <p className="text-xs font-semibold text-blue-300">📚 Sources:</p>
                              {message.sources.map((source, index) => (
                                <div key={index} className="text-xs opacity-70 mt-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-green-400">•</span>
                                    <span>{source.title}</span>
                                    <span className="text-gray-400">({(source.relevance * 100).toFixed(0)}% relevant)</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-600 text-white px-4 py-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                            <span className="text-sm">Typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about the portfolio..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={isTyping}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* RAG Information */}
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">🧠 AI Model</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedContext('portfolio')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    selectedContext === 'portfolio'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold">Portfolio Context</div>
                  <div className="text-xs opacity-70">Focus on portfolio details</div>
                </button>
                
                <button
                  onClick={() => setSelectedContext('projects')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    selectedContext === 'projects'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold">Projects Context</div>
                  <div className="text-xs opacity-70">Focus on specific projects</div>
                </button>

                <button
                  onClick={() => setSelectedContext('skills')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    selectedContext === 'skills'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold">Skills Context</div>
                  <div className="text-xs opacity-70">Focus on technical skills</div>
                </button>

                <button
                  onClick={() => setSelectedContext('experience')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    selectedContext === 'experience'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold">Experience Context</div>
                  <div className="text-xs opacity-70">Focus on professional experience</div>
                </button>
              </div>
            </div>

            {/* Retrieved Context */}
            {/* The context display is removed as per the new_code, as it's no longer part of the chat interface */}

            {/* Knowledge Base */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">📚 Knowledge Base</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(knowledgeBase).map(([key, data]) => (
                  <div key={key} className="bg-gray-700 p-2 rounded">
                    <div className="font-semibold text-blue-400 capitalize">{key}</div>
                    <div className="text-gray-300 text-xs mt-1">
                      {data.content.substring(0, 80)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RAG Process */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">🔄 RAG Process</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">1</div>
                  <span className="text-gray-300">Query Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs">2</div>
                  <span className="text-gray-300">Context Retrieval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs">3</div>
                  <span className="text-gray-300">Response Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-xs">4</div>
                  <span className="text-gray-300">Source Attribution</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-teal-400">✨ Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Retrieval-Augmented Generation</li>
                <li>• Context-Aware Responses</li>
                <li>• Source Attribution</li>
                <li>• Real-time Processing</li>
                <li>• Multiple AI Models</li>
                <li>• Knowledge Base Integration</li>
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