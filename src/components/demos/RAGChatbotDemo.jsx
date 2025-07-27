import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const RAGChatbotDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [context, setContext] = useState('');
  const [sources, setSources] = useState([]);
  const messagesEndRef = useRef(null);

  const knowledgeBase = {
    'portfolio': {
      content: 'This is a comprehensive portfolio showcasing AI/ML projects, 3D web experiences, and full-stack applications. The portfolio includes Snake AI with reinforcement learning, sentiment analysis with transformers, 3D portfolio with Three.js, and various other cutting-edge projects.',
      source: 'Portfolio Documentation'
    },
    'projects': {
      content: 'Key projects include: 1) Snake AI with neural networks and genetic algorithms, 2) Multi-agent AI system with behavior-based coordination, 3) Sentiment analysis using VADER, transformers, and NLTK, 4) 3D portfolio with Three.js and WebGL, 5) RAG chatbot with LangChain and Next.js.',
      source: 'Project Database'
    },
    'skills': {
      content: 'Technical skills include: React, Three.js, Python, TensorFlow, PyTorch, Node.js, Next.js, LangChain, WebGL, JavaScript, TypeScript, Machine Learning, AI/ML, Blockchain, Web3, and various other modern technologies.',
      source: 'Skills Database'
    },
    'experience': {
      content: 'Experience includes building enterprise-level applications, implementing real-time collaboration systems, developing AI-powered features, creating interactive 3D experiences, and deploying scalable web applications.',
      source: 'Experience Records'
    }
  };

  // Simulate RAG retrieval
  const retrieveRelevantContext = (query) => {
    const queryLower = query.toLowerCase();
    const relevantContexts = [];
    const relevantSources = [];

    Object.entries(knowledgeBase).forEach(([key, data]) => {
      if (data.content.toLowerCase().includes(queryLower) || 
          key.includes(queryLower) ||
          queryLower.includes(key)) {
        relevantContexts.push(data.content);
        relevantSources.push({
          title: data.source,
          content: data.content.substring(0, 100) + '...',
          relevance: Math.random() * 0.3 + 0.7
        });
      }
    });

    // Add some general context if no specific matches
    if (relevantContexts.length === 0) {
      relevantContexts.push('This portfolio showcases various AI/ML and web development projects.');
      relevantSources.push({
        title: 'General Portfolio Info',
        content: 'Portfolio contains multiple projects across different technologies...',
        relevance: 0.5
      });
    }

    return {
      context: relevantContexts.join(' '),
      sources: relevantSources
    };
  };

  // Simulate LLM response
  const generateResponse = async (query, context) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
      `Based on the available information, ${query.toLowerCase().includes('portfolio') ? 'this portfolio showcases' : 'I can tell you that'} ${context.toLowerCase().includes('ai') ? 'the projects focus on AI/ML technologies' : 'the projects demonstrate various technical skills'}.`,
      
      `From the context provided, ${query.toLowerCase().includes('project') ? 'the projects include' : 'the portfolio contains'} ${context.toLowerCase().includes('snake') ? 'Snake AI with reinforcement learning' : 'multiple interactive demos'} that showcase modern web development techniques.`,
      
      `According to the knowledge base, ${query.toLowerCase().includes('skill') ? 'the technical skills include' : 'the experience includes'} ${context.toLowerCase().includes('react') ? 'React, Three.js, and modern JavaScript' : 'AI/ML, web development, and 3D graphics'}.`,
      
      `Based on the retrieved information, ${query.toLowerCase().includes('experience') ? 'the experience demonstrates' : 'the portfolio shows'} ${context.toLowerCase().includes('enterprise') ? 'enterprise-level application development' : 'cutting-edge technology implementation'} across multiple domains.`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Step 1: Retrieve relevant context
      const { context: retrievedContext, sources: retrievedSources } = retrieveRelevantContext(inputText);
      setContext(retrievedContext);
      setSources(retrievedSources);

      // Step 2: Generate response using context
      const response = await generateResponse(inputText, retrievedContext);

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        context: retrievedContext,
        sources: retrievedSources
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const codeExample = `// RAG Chatbot with Next.js and LangChain
import React, { useState, useEffect } from 'react';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RetrievalQAChain } from 'langchain/chains';

const RAGChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vectorStore, setVectorStore] = useState(null);

  // Initialize vector store with knowledge base
  useEffect(() => {
    const initializeVectorStore = async () => {
      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });

      const documents = [
        'This portfolio showcases AI/ML projects including Snake AI with reinforcement learning.',
        'The 3D portfolio uses Three.js and WebGL for interactive experiences.',
        'Sentiment analysis project uses VADER, transformers, and NLTK.',
        'Skills include React, Python, TensorFlow, Node.js, and modern web technologies.',
        'Experience includes enterprise applications and real-time collaboration systems.'
      ];

      const store = await MemoryVectorStore.fromTexts(
        documents,
        documents.map((_, i) => ({ id: i })),
        embeddings
      );

      setVectorStore(store);
    };

    initializeVectorStore();
  }, []);

  // RAG Chain setup
  const createRAGChain = () => {
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      \`You are a helpful AI assistant with access to a knowledge base about a portfolio.
      
      Context: {context}
      
      Question: {question}
      
      Answer the question based on the context provided. If the context doesn't contain relevant information, say so politely.
      
      Answer:\`
    );

    return RetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever({ k: 3 }),
      { prompt: promptTemplate }
    );
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !vectorStore) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chain = createRAGChain();
      
      const response = await chain.call({
        query: input
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        sources: response.sourceDocuments
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold">RAG Chatbot</h1>
          <p className="text-blue-100 text-sm">Powered by LangChain and OpenAI</p>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={\`flex \${message.sender === 'user' ? 'justify-end' : 'justify-start'}\`}
            >
              <div
                className={\`max-w-xs lg:max-w-md px-4 py-2 rounded-lg \${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }\`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                
                {message.sources && (
                  <div className="mt-2 text-xs">
                    <p className="font-semibold">Sources:</p>
                    {message.sources.map((source, index) => (
                      <p key={index} className="opacity-70">
                        {source.pageContent.substring(0, 50)}...
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about the portfolio..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
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
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-600 text-white px-4 py-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                            <span className="text-sm">Retrieving and generating response...</span>
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
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about the portfolio..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
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
                  onClick={() => setSelectedModel('gpt-3.5')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    selectedModel === 'gpt-3.5'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold">GPT-3.5 Turbo</div>
                  <div className="text-xs opacity-70">Fast and efficient</div>
                </button>
                
                <button
                  onClick={() => setSelectedModel('gpt-4')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    selectedModel === 'gpt-4'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-semibold">GPT-4</div>
                  <div className="text-xs opacity-70">More advanced reasoning</div>
                </button>
              </div>
            </div>

            {/* Retrieved Context */}
            {context && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-400">📖 Retrieved Context</h3>
                <div className="bg-gray-700 p-3 rounded text-sm">
                  <p className="text-gray-300">{context}</p>
                </div>
              </div>
            )}

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
        code={codeExample}
        language="javascript"
        title="RAG Chatbot Implementation"
      />
    </div>
  );
};

export default RAGChatbotDemo; 