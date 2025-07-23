import React, { useState, useEffect } from 'react';

const AIAssistantDemo = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalConversations: 0,
    activeUsers: 0,
    averageResponseTime: 0,
    satisfactionRate: 0
  });

  // Initialize AI assistant data
  useEffect(() => {
    const initialConversations = [
      {
        id: 1,
        user: 'John Smith',
        topic: 'Code Review',
        status: 'active',
        messages: 8,
        lastUpdate: '2 minutes ago',
        alerts: [],
        context: {
          language: 'JavaScript',
          framework: 'React',
          complexity: 'medium',
          priority: 'high'
        },
        analytics: {
          responseTime: 1.2,
          accuracy: 94.5,
          helpfulness: 4.8,
          resolution: 'resolved'
        }
      },
      {
        id: 2,
        user: 'Sarah Johnson',
        topic: 'Bug Fixing',
        status: 'active',
        messages: 12,
        lastUpdate: '1 minute ago',
        alerts: [],
        context: {
          language: 'Python',
          framework: 'Django',
          complexity: 'high',
          priority: 'critical'
        },
        analytics: {
          responseTime: 2.1,
          accuracy: 91.2,
          helpfulness: 4.6,
          resolution: 'in-progress'
        }
      },
      {
        id: 3,
        user: 'Mike Chen',
        topic: 'Architecture Design',
        status: 'warning',
        messages: 15,
        lastUpdate: 'Just now',
        alerts: ['Complex query detected', 'Multiple context switches'],
        context: {
          language: 'Multiple',
          framework: 'Microservices',
          complexity: 'very-high',
          priority: 'medium'
        },
        analytics: {
          responseTime: 3.8,
          accuracy: 87.3,
          helpfulness: 4.2,
          resolution: 'pending'
        }
      }
    ];
    setConversations(initialConversations);
    setSystemStats({
      totalConversations: 156,
      activeUsers: 23,
      averageResponseTime: 2.1,
      satisfactionRate: 4.6
    });
  }, []);

  // Simulate real-time conversation updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConversations(prevConversations => prevConversations.map(conversation => {
        const newConversation = {
          ...conversation,
          messages: conversation.messages + Math.floor(Math.random() * 2),
          lastUpdate: 'Just now'
        };

        // Update analytics
        newConversation.analytics = {
          ...conversation.analytics,
          responseTime: Math.max(0.5, Math.min(5.0, conversation.analytics.responseTime + (Math.random() - 0.5) * 0.5)),
          accuracy: Math.max(80, Math.min(98, conversation.analytics.accuracy + (Math.random() - 0.5) * 2))
        };

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newConversation.analytics.responseTime > 3) {
          newAlerts.push('Slow response time');
        }
        if (newConversation.analytics.accuracy < 90) {
          newAlerts.push('Low accuracy detected');
        }
        if (newConversation.messages > 20) {
          newAlerts.push('Long conversation');
        }

        newConversation.alerts = newAlerts;
        newConversation.status = newAlerts.length > 2 ? 'critical' : 
                                newAlerts.length > 0 ? 'warning' : 'active';
        
        return newConversation;
      }));

      setSystemStats(prev => ({
        ...prev,
        totalConversations: prev.totalConversations + Math.floor(Math.random() * 2),
        activeUsers: Math.floor(Math.random() * 5) + 20,
        averageResponseTime: Math.max(1.0, Math.min(4.0, prev.averageResponseTime + (Math.random() - 0.5) * 0.3))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate current conversation data
  useEffect(() => {
    const newConversation = {
      id: 1,
      user: 'John Smith',
      topic: 'Code Review',
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'user',
          content: 'Can you review this React component for best practices?',
          timestamp: '2:30 PM',
          sentiment: 'neutral'
        },
        {
          id: 2,
          sender: 'assistant',
          content: 'I\'d be happy to review your React component! Please share the code you\'d like me to examine.',
          timestamp: '2:31 PM',
          sentiment: 'positive'
        },
        {
          id: 3,
          sender: 'user',
          content: 'Here\'s my component: [code snippet]',
          timestamp: '2:32 PM',
          sentiment: 'neutral'
        },
        {
          id: 4,
          sender: 'assistant',
          content: 'Great! I can see several areas for improvement. Let me provide detailed feedback...',
          timestamp: '2:33 PM',
          sentiment: 'positive'
        }
      ],
      context: {
        language: 'JavaScript',
        framework: 'React',
        complexity: 'medium',
        priority: 'high'
      },
      analytics: {
        responseTime: 1.2,
        accuracy: 94.5,
        helpfulness: 4.8,
        resolution: 'resolved'
      }
    };
    setCurrentConversation(newConversation);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = conversations.flatMap(conversation => 
        conversation.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          conversation: conversation.user,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 6000);

    return () => clearInterval(interval);
  }, [conversations]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🤖 AI Assistant Platform</h1>
          <p className="text-gray-300 text-lg">
            Advanced AI assistant with conversation management, sentiment analysis, and intelligent responses
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Conversations</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalConversations}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeUsers}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Response Time</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.averageResponseTime.toFixed(1)}s</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Satisfaction Rate</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.satisfactionRate.toFixed(1)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversation Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Conversation Management</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all ' + (
                      selectedConversation?.id === conversation.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{conversation.user}</h3>
                        <p className="text-gray-400 text-sm">{conversation.topic} • {conversation.lastUpdate}</p>
                        <p className={'text-sm ' + getStatusColor(conversation.status)}>
                          {conversation.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(conversation.status)}>
                          {conversation.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{conversation.messages} messages</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Response Time</p>
                        <p className="text-white font-semibold">{conversation.analytics.responseTime.toFixed(1)}s</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Accuracy</p>
                        <p className="text-white">{conversation.analytics.accuracy.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Helpfulness Score</span>
                        <span>{conversation.analytics.helpfulness}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + (
                            conversation.analytics.helpfulness > 4.5 ? 'bg-green-500' : 
                            conversation.analytics.helpfulness > 4.0 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: ((conversation.analytics.helpfulness / 5) * 100) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Chat & Alerts */}
          <div className="space-y-6">
            {/* Current Chat */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">💬 Current Chat</h2>
              {currentConversation ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold">{currentConversation.user}</h3>
                    <p className="text-blue-200 text-sm">{currentConversation.topic}</p>
                    <p className="text-gray-300 text-xs">{currentConversation.messages.length} messages</p>
                  </div>
                  
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {currentConversation.messages.slice(-3).map((message) => (
                      <div key={message.id} className={'p-2 rounded-lg ' + (
                        message.sender === 'user' ? 'bg-blue-800/50' : 'bg-gray-800/50'
                      )}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white text-sm">{message.content}</p>
                            <p className={'text-xs ' + getSentimentColor(message.sentiment)}>
                              {message.sentiment}
                            </p>
                          </div>
                          <p className="text-gray-400 text-xs">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-gray-300">No active chat</p>
                </div>
              )}
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 System Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.conversation}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ AI Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  New Conversation
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Analyze Sentiment
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation Details */}
        {selectedConversation && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Conversation with {selectedConversation.user}</h2>
              <button
                onClick={() => setSelectedConversation(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Conversation Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Topic</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.topic}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={'px-2 py-1 rounded text-sm ' + getStatusBg(selectedConversation.status)}>
                      {selectedConversation.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Messages</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.messages}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Last Update</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.lastUpdate}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Context & Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Language</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.context.language}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Framework</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.context.framework}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Complexity</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.context.complexity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Priority</span>
                    <span className="text-lg font-semibold text-white">{selectedConversation.context.priority}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analytics */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">📊 Performance Analytics</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">{selectedConversation.analytics.responseTime.toFixed(1)}s</p>
                    <p className="text-gray-400 text-sm">Response Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">{selectedConversation.analytics.accuracy.toFixed(1)}%</p>
                    <p className="text-gray-400 text-sm">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{selectedConversation.analytics.helpfulness.toFixed(1)}</p>
                    <p className="text-gray-400 text-sm">Helpfulness</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">{selectedConversation.analytics.resolution}</p>
                    <p className="text-gray-400 text-sm">Resolution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced AI Assistant Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Natural Language Processing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Context understanding</li>
                <li>• Sentiment analysis</li>
                <li>• Intent recognition</li>
                <li>• Multi-language support</li>
                <li>• Conversation flow</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Intelligent Responses</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time generation</li>
                <li>• Code analysis</li>
                <li>• Problem solving</li>
                <li>• Learning adaptation</li>
                <li>• Personalization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Analytics & Insights</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Performance metrics</li>
                <li>• User satisfaction</li>
                <li>• Response quality</li>
                <li>• Usage patterns</li>
                <li>• Improvement suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantDemo; 