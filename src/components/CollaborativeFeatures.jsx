import React, { useState, useEffect } from 'react';

const CollaborativeFeatures = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [collaborationStats, setCollaborationStats] = useState({
    totalCollaborators: 0,
    activeSessions: 0,
    documentsShared: 0,
    messagesSent: 0
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Initialize collaborative data
    setActiveUsers([
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Developer',
        status: 'online',
        avatar: '👩‍💻',
        lastActive: '2 minutes ago',
        currentActivity: 'Editing Blockchain Demo'
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Designer',
        status: 'online',
        avatar: '👨‍🎨',
        lastActive: '1 minute ago',
        currentActivity: 'Reviewing UI Components'
      },
      {
        id: 3,
        name: 'Emily Davis',
        role: 'Product Manager',
        status: 'away',
        avatar: '👩‍💼',
        lastActive: '5 minutes ago',
        currentActivity: 'Planning Sprint'
      },
      {
        id: 4,
        name: 'Alex Rodriguez',
        role: 'QA Engineer',
        status: 'online',
        avatar: '👨‍🔬',
        lastActive: 'Just now',
        currentActivity: 'Testing Features'
      }
    ]);

    setChatMessages([
      {
        id: 1,
        user: 'Sarah Johnson',
        message: 'Just updated the blockchain demo with new smart contract features!',
        timestamp: '2 minutes ago',
        type: 'update'
      },
      {
        id: 2,
        user: 'Mike Chen',
        message: 'Great work! The UI looks much cleaner now.',
        timestamp: '1 minute ago',
        type: 'comment'
      },
      {
        id: 3,
        user: 'Emily Davis',
        message: 'Can we add more interactive elements to the healthcare demo?',
        timestamp: '5 minutes ago',
        type: 'request'
      },
      {
        id: 4,
        user: 'Alex Rodriguez',
        message: 'Testing the new collaboration features - everything looks good!',
        timestamp: 'Just now',
        type: 'test'
      }
    ]);

    setSharedDocuments([
      {
        id: 1,
        name: 'Blockchain Demo Documentation',
        type: 'document',
        owner: 'Sarah Johnson',
        lastModified: '2 minutes ago',
        collaborators: 3,
        status: 'active'
      },
      {
        id: 2,
        name: 'Healthcare Demo Wireframes',
        type: 'design',
        owner: 'Mike Chen',
        lastModified: '1 hour ago',
        collaborators: 2,
        status: 'review'
      },
      {
        id: 3,
        name: 'Financial Analytics API Specs',
        type: 'code',
        owner: 'Alex Rodriguez',
        lastModified: '3 hours ago',
        collaborators: 4,
        status: 'active'
      }
    ]);

    setCollaborationStats({
      totalCollaborators: 12,
      activeSessions: 4,
      documentsShared: 8,
      messagesSent: 156
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveUsers(prev => prev.map(user => ({
        ...user,
        lastActive: Math.random() > 0.7 ? 'Just now' : user.lastActive
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      timestamp: 'Just now',
      type: 'message'
    };

    setChatMessages(prev => [message, ...prev]);
    setNewMessage('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'update': return 'text-blue-400';
      case 'comment': return 'text-green-400';
      case 'request': return 'text-yellow-400';
      case 'test': return 'text-purple-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🤝 Collaborative Features</h1>
          <p className="text-gray-400">Real-time collaboration tools and team management</p>
        </div>

        {/* Collaboration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Collaborators</p>
                <p className="text-3xl font-bold text-white">{collaborationStats.totalCollaborators}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Sessions</p>
                <p className="text-3xl font-bold text-white">{collaborationStats.activeSessions}</p>
              </div>
              <div className="text-4xl">💻</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Shared Documents</p>
                <p className="text-3xl font-bold text-white">{collaborationStats.documentsShared}</p>
              </div>
              <div className="text-4xl">📄</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Messages Sent</p>
                <p className="text-3xl font-bold text-white">{collaborationStats.messagesSent}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Users */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Active Users</h2>
              <div className="space-y-4">
                {activeUsers.map(user => (
                  <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="relative">
                      <span className="text-2xl">{user.avatar}</span>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusBg(user.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <span className={`text-xs ${getStatusColor(user.status)}`}>{user.status}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{user.role}</p>
                      <p className="text-gray-500 text-xs">{user.currentActivity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">{user.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowUserModal(true)}
                className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Invite User
              </button>
            </div>
          </div>

          {/* Real-time Chat */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 h-full">
              <h2 className="text-2xl font-bold text-white mb-4">💬 Team Chat</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {chatMessages.map(message => (
                  <div key={message.id} className="p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getMessageTypeColor(message.type)} bg-current`}></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-white">{message.user}</span>
                          <span className="text-gray-400 text-xs">{message.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Shared Documents */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">📄 Shared Documents</h2>
              <div className="space-y-4">
                {sharedDocuments.map(doc => (
                  <div key={doc.id} className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {doc.type === 'document' ? '📄' : doc.type === 'design' ? '🎨' : '💻'}
                        </span>
                        <h3 className="font-semibold text-white">{doc.name}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'active' ? 'bg-green-600 text-white' :
                        doc.status === 'review' ? 'bg-yellow-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Owner: {doc.owner}</span>
                      <span>{doc.collaborators} collaborators</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Modified: {doc.lastModified}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                + Share Document
              </button>
            </div>
          </div>
        </div>

        {/* Collaboration Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🔧 Advanced Collaboration Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Real-time Editing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Live document collaboration</li>
                <li>• Cursor tracking</li>
                <li>• Change highlighting</li>
                <li>• Version control</li>
                <li>• Conflict resolution</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Communication Tools</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time chat</li>
                <li>• Voice/video calls</li>
                <li>• Screen sharing</li>
                <li>• File sharing</li>
                <li>• Notifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Project Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Task assignment</li>
                <li>• Progress tracking</li>
                <li>• Time tracking</li>
                <li>• Team analytics</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Invite User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Invite User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Product Manager</option>
                    <option>QA Engineer</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send Invite
                  </button>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborativeFeatures; 