import React, { useState, useEffect, useRef } from 'react';

const AIAssistantDemo = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm ACF (AI Cael Findley), your AI assistant. I can help you with coding, data analysis, creative writing, and much more. What would you like to work on today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState('chat');
  const [codeResult, setCodeResult] = useState('');
  const [dataAnalysis, setDataAnalysis] = useState(null);
  const [creativeOutput, setCreativeOutput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = {
    coding: [
      "Here's a React component for that feature:",
      "I'll create a Node.js API endpoint:",
      "Here's the optimized code solution:",
      "Let me generate a TypeScript interface:",
      "Here's a clean implementation:"
    ],
    analysis: [
      "Based on the data analysis:",
      "The key insights are:",
      "Here's what the numbers tell us:",
      "The trend analysis shows:",
      "Statistical summary:"
    ],
    creative: [
      "Here's a creative solution:",
      "I've generated some ideas:",
      "Creative approach:",
      "Here's an innovative solution:",
      "Creative output:"
    ],
    general: [
      "I can help you with that!",
      "Let me assist you with this.",
      "Here's what I recommend:",
      "I'll help you solve this.",
      "Let me provide some guidance:"
    ]
  };

  const generateCode = (request) => {
    const codeExamples = {
      'react component': `import React, { useState, useEffect } from 'react';

const ExampleComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((item, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;`,
      'api endpoint': `const express = require('express');
const router = express.Router();

// GET endpoint
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST endpoint
router.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;`,
      'database query': `-- SQL Query for user analytics
SELECT 
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent,
  AVG(o.total) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id, u.name
HAVING order_count > 0
ORDER BY total_spent DESC
LIMIT 10;`,
      'algorithm': `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Usage
const numbers = [3, 7, 1, 9, 4, 6, 8, 2, 5];
const sorted = quickSort(numbers);
console.log(sorted); // [1, 2, 3, 4, 5, 6, 7, 8, 9]`
    };

    const requestLower = request.toLowerCase();
    for (const [key, code] of Object.entries(codeExamples)) {
      if (requestLower.includes(key)) {
        return code;
      }
    }
    return codeExamples['react component'];
  };

  const generateAnalysis = (request) => {
    const analyses = {
      'sales data': {
        summary: "Sales increased by 23% this quarter compared to last year.",
        insights: [
          "Top performing product: Premium Widget (45% of revenue)",
          "Peak sales period: December (32% of annual sales)",
          "Customer retention rate: 87%",
          "Average order value: $156"
        ],
        recommendations: [
          "Focus marketing on Premium Widget line",
          "Increase inventory for December rush",
          "Implement loyalty program to boost retention"
        ]
      },
      'user behavior': {
        summary: "User engagement shows strong mobile preference with 67% of sessions on mobile devices.",
        insights: [
          "Mobile conversion rate: 3.2%",
          "Desktop conversion rate: 5.8%",
          "Peak usage time: 7-9 PM",
          "Most popular feature: Search (45% of interactions)"
        ],
        recommendations: [
          "Optimize mobile checkout flow",
          "Add mobile-specific features",
          "Improve search functionality"
        ]
      },
      'performance metrics': {
        summary: "System performance is excellent with 99.9% uptime and sub-200ms response times.",
        insights: [
          "Average response time: 145ms",
          "Peak load handled: 10,000 concurrent users",
          "Database query optimization: 40% improvement",
          "CDN hit rate: 92%"
        ],
        recommendations: [
          "Implement caching for frequently accessed data",
          "Consider database sharding for scale",
          "Add performance monitoring alerts"
        ]
      }
    };

    const requestLower = request.toLowerCase();
    for (const [key, analysis] of Object.entries(analyses)) {
      if (requestLower.includes(key)) {
        return analysis;
      }
    }
    return analyses['sales data'];
  };

  const generateCreative = (request) => {
    const creativeOutputs = {
      'marketing copy': `🎯 Transform Your Business with AI-Powered Solutions

Ready to revolutionize your operations? Our cutting-edge AI technology delivers:

✨ 40% faster processing times
🚀 99.9% accuracy rates  
💡 Intelligent automation
📈 Real-time insights

Don't wait - the future is here. Contact us today!`,
      'story': `The Digital Revolution

In a world where technology and humanity dance in perfect harmony, Sarah discovered the power of AI. What started as a simple chatbot evolved into something extraordinary - a companion that understood not just her words, but her dreams.

Together, they built solutions that changed lives, one algorithm at a time. The future wasn't just coming; it was already here.`,
      'poem': `Lines of Code

In the quiet glow of midnight screens,
Where logic flows like gentle streams,
Each function calls, each variable dreams,
Of problems solved and futures gleamed.

Digital minds in silicon dance,
Creating worlds with every glance,
From simple loops to complex trance,
We build tomorrow's circumstance.`
    };

    const requestLower = request.toLowerCase();
    for (const [key, output] of Object.entries(creativeOutputs)) {
      if (requestLower.includes(key)) {
        return output;
      }
    }
    return creativeOutputs['marketing copy'];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const request = inputMessage.toLowerCase();
      let response = '';
      let responseType = 'general';

      if (request.includes('code') || request.includes('component') || request.includes('api') || request.includes('function')) {
        response = generateCode(inputMessage);
        responseType = 'coding';
        setCodeResult(response);
      } else if (request.includes('analyze') || request.includes('data') || request.includes('report')) {
        const analysis = generateAnalysis(inputMessage);
        response = `${analysis.summary}\n\nKey Insights:\n${analysis.insights.map(insight => `• ${insight}`).join('\n')}\n\nRecommendations:\n${analysis.recommendations.map(rec => `• ${rec}`).join('\n')}`;
        responseType = 'analysis';
        setDataAnalysis(analysis);
      } else if (request.includes('creative') || request.includes('write') || request.includes('story') || request.includes('copy')) {
        response = generateCreative(inputMessage);
        responseType = 'creative';
        setCreativeOutput(response);
      } else {
        response = "I can help you with coding, data analysis, creative writing, and more. Try asking me to 'write some code', 'analyze data', or 'create marketing copy'!";
        responseType = 'general';
      }

      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🤖 ACF - AI Assistant</h1>
          <p className="text-gray-400">Your intelligent companion for coding, analysis, and creative tasks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">💬 Chat with ACF</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveMode('chat')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      activeMode === 'chat' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveMode('code')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      activeMode === 'code' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setActiveMode('analysis')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      activeMode === 'analysis' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Analysis
                  </button>
                  <button
                    onClick={() => setActiveMode('creative')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      activeMode === 'creative' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Creative
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-200 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm">ACF is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask ACF anything... (Try: 'Write a React component', 'Analyze sales data', 'Create marketing copy')"
                  className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none resize-none"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-4 rounded-lg border border-green-800">
              <h3 className="text-lg font-semibold text-white mb-3">🧠 AI Capabilities</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Code Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Data Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Creative Writing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Problem Solving</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Natural Language</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-4 rounded-lg border border-green-800">
              <h3 className="text-lg font-semibold text-white mb-3">⚡ Quick Actions</h3>
              <div className="space-y-2">
                {[
                  "Write a React component",
                  "Analyze sales data",
                  "Create marketing copy",
                  "Generate API endpoint",
                  "Write a story"
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action)}
                    className="w-full text-left p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all text-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Stats */}
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-4 rounded-lg border border-green-800">
              <h3 className="text-lg font-semibold text-white mb-3">📊 AI Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-green-400">~1.5s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="text-green-400">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Languages</span>
                  <span className="text-green-400">15+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Knowledge Base</span>
                  <span className="text-green-400">10TB+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Display */}
        {activeMode === 'code' && codeResult && (
          <div className="mt-6 bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
            <h3 className="text-xl font-semibold text-white mb-4">💻 Generated Code</h3>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-200">
              <code>{codeResult}</code>
            </pre>
          </div>
        )}

        {activeMode === 'analysis' && dataAnalysis && (
          <div className="mt-6 bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
            <h3 className="text-xl font-semibold text-white mb-4">📊 Data Analysis</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Summary</h4>
                <p className="text-gray-300 text-sm">{dataAnalysis.summary}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Key Insights</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {dataAnalysis.insights.map((insight, index) => (
                    <li key={index}>• {insight}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Recommendations</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {dataAnalysis.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'creative' && creativeOutput && (
          <div className="mt-6 bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
            <h3 className="text-xl font-semibold text-white mb-4">🎨 Creative Output</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <pre className="text-gray-200 whitespace-pre-wrap text-sm">{creativeOutput}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantDemo; 