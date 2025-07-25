import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from './CodeViewer';

const RealTimeCollaboration = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [userTyping, setUserTyping] = useState(null);
  const [cursorPositions, setCursorPositions] = useState({});
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  // Simulate real-time users
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Sarah Chen', role: 'Frontend Developer', avatar: '👩‍💻', status: 'online', lastSeen: 'now' },
      { id: 2, name: 'Mike Rodriguez', role: 'Backend Engineer', avatar: '👨‍💻', status: 'online', lastSeen: 'now' },
      { id: 3, name: 'Emma Thompson', role: 'UX Designer', avatar: '👩‍🎨', status: 'away', lastSeen: '2 min ago' },
      { id: 4, name: 'Alex Kim', role: 'DevOps Engineer', avatar: '👨‍🔧', status: 'online', lastSeen: 'now' },
      { id: 5, name: 'Lisa Wang', role: 'Product Manager', avatar: '👩‍💼', status: 'offline', lastSeen: '1 hour ago' }
    ];
    setUsers(mockUsers);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => ({
        ...user,
        lastSeen: user.status === 'online' ? 'now' : user.lastSeen
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time messages
  useEffect(() => {
    const mockMessages = [
      { id: 1, user: 'Sarah Chen', message: 'Just pushed the new authentication flow to staging', timestamp: '2 min ago', type: 'info' },
      { id: 2, user: 'Mike Rodriguez', message: 'Great! I\'ll review the API endpoints', timestamp: '1 min ago', type: 'message' },
      { id: 3, user: 'Emma Thompson', message: 'The new design looks amazing! 🎨', timestamp: 'now', type: 'message' },
      { id: 4, user: 'Alex Kim', message: 'Deployment to production is complete ✅', timestamp: 'now', type: 'success' },
      { id: 5, user: 'Sarah Chen', message: 'Anyone available for a quick code review?', timestamp: 'now', type: 'message' }
    ];
    setMessages(mockMessages);

    // Simulate new messages
    const messageInterval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        user: users[Math.floor(Math.random() * users.length)]?.name || 'Team Member',
        message: [
          'Just updated the database schema',
          'The new feature is working perfectly!',
          'Can someone help with the deployment?',
          'Great work on the UI improvements!',
          'The performance optimization is complete'
        ][Math.floor(Math.random() * 5)],
        timestamp: 'now',
        type: 'message'
      };
      setMessages(prev => [newMessage, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(messageInterval);
  }, [users]);

  // Simulate collaborative documents
  useEffect(() => {
    const mockDocuments = [
      { id: 1, name: 'API Documentation', type: 'markdown', lastEdited: '2 min ago', collaborators: 3 },
      { id: 2, name: 'Frontend Components', type: 'javascript', lastEdited: '5 min ago', collaborators: 2 },
      { id: 3, name: 'Database Schema', type: 'sql', lastEdited: '1 hour ago', collaborators: 1 },
      { id: 4, name: 'Design System', type: 'figma', lastEdited: 'now', collaborators: 4 }
    ];
    setDocuments(mockDocuments);
  }, []);

  // Simulate cursor positions
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPositions({
        'Sarah Chen': { x: Math.random() * 100, y: Math.random() * 100 },
        'Mike Rodriguez': { x: Math.random() * 100, y: Math.random() * 100 },
        'Emma Thompson': { x: Math.random() * 100, y: Math.random() * 100 }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const demoCode = `import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const RealTimeCollaboration = () => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  
  useEffect(() => {
    // WebSocket connection for real-time collaboration
    const newSocket = io('wss://collaboration-server.com');
    setSocket(newSocket);
    
    // Listen for real-time updates
    newSocket.on('userJoined', (user) => {
      setUsers(prev => [...prev, user]);
    });
    
    newSocket.on('userLeft', (userId) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });
    
    newSocket.on('messageReceived', (message) => {
      setMessages(prev => [message, ...prev]);
    });
    
    newSocket.on('cursorMoved', (data) => {
      setCursorPositions(prev => ({
        ...prev,
        [data.userId]: data.position
      }));
    });
    
    newSocket.on('documentUpdated', (document) => {
      setDocuments(prev => prev.map(d => 
        d.id === document.id ? document : d
      ));
    });
    
    return () => newSocket.close();
  }, []);
  
  // WebRTC for peer-to-peer communication
  const setupPeerConnection = async () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    
    // Handle data channels for real-time editing
    const dataChannel = peerConnection.createDataChannel('collaboration');
    dataChannel.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      handleCollaborationUpdate(type, data);
    };
    
    return peerConnection;
  };
  
  // Operational Transform for conflict resolution
  const applyOperation = (document, operation) => {
    // Implement operational transform algorithm
    // for handling concurrent edits
    return transformDocument(document, operation);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          🌐 Real-Time Collaboration Platform
        </h1>
        
        {/* Live collaboration interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active users */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">👥 Active Users</h2>
            {users.map(user => (
              <div key={user.id} className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  {user.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.role}</p>
                </div>
                <div className={\`w-3 h-3 rounded-full \${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}\`}></div>
              </div>
            ))}
          </div>
          
          {/* Real-time chat */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">💬 Live Chat</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {messages.map(message => (
                <div key={message.id} className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="text-white font-semibold">{message.user}</p>
                    <span className="text-gray-400 text-xs">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Collaborative documents */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">📄 Documents</h2>
            {documents.map(doc => (
              <div key={doc.id} className="bg-gray-700 p-3 rounded-lg mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">{doc.name}</p>
                    <p className="text-gray-400 text-sm">{doc.type.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">{doc.lastEdited}</p>
                    <p className="text-blue-400 text-xs">{doc.collaborators} active</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-blue-400 mb-2">🌐 Real-Time Collaboration Platform</h1>
              <p className="text-gray-400">Advanced WebSocket, WebRTC, and operational transform for seamless teamwork</p>
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
          {/* Active Users */}
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">👥 Active Users</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">{users.filter(u => u.status === 'online').length} online</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-4 p-3 bg-green-800/50 rounded-lg">
                  <div className="text-2xl">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-green-200 text-sm">{user.role}</p>
                    <p className="text-green-300 text-xs">{user.lastSeen}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    user.status === 'online' ? 'bg-green-400' : 
                    user.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Chat */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">💬 Live Chat</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-sm">Real-time</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {messages.map(message => (
                <div key={message.id} className={`p-3 rounded-lg ${
                  message.type === 'success' ? 'bg-green-800/50' :
                  message.type === 'info' ? 'bg-blue-800/50' :
                  'bg-gray-800/50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-semibold">{message.user}</p>
                    <span className="text-gray-300 text-xs">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-200 text-sm">{message.message}</p>
                </div>
              ))}
            </div>
            
            {userTyping && (
              <div className="mt-3 p-2 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400 text-sm italic">
                  {userTyping} is typing...
                </p>
              </div>
            )}
          </div>

          {/* Collaborative Documents */}
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">📄 Documents</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-400 text-sm">Live editing</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {documents.map(doc => (
                <div key={doc.id} className="p-4 bg-purple-800/50 rounded-lg border border-purple-700 hover:border-purple-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">{doc.name}</p>
                      <p className="text-purple-200 text-sm">{doc.type.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-300 text-xs">{doc.lastEdited}</p>
                      <p className="text-purple-400 text-xs">{doc.collaborators} active</p>
                    </div>
                  </div>
                  
                  {/* Cursor positions */}
                  <div className="relative h-8 bg-purple-900/30 rounded mt-2">
                    {Object.entries(cursorPositions).map(([user, pos]) => (
                      <div
                        key={user}
                        className="absolute w-2 h-6 bg-red-500 rounded-sm animate-pulse"
                        style={{ left: `${pos.x}%`, top: '50%', transform: 'translateY(-50%)' }}
                        title={user}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Collaboration Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">🔌 WebSocket Integration</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time bidirectional communication</li>
                <li>• Automatic reconnection handling</li>
                <li>• Message queuing & delivery</li>
                <li>• Connection state management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">🌐 WebRTC P2P</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Direct peer-to-peer connections</li>
                <li>• Low-latency data channels</li>
                <li>• ICE candidate negotiation</li>
                <li>• NAT traversal support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">📝 Operational Transform</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Conflict-free concurrent editing</li>
                <li>• Character-level synchronization</li>
                <li>• Undo/redo support</li>
                <li>• Version control integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">🎯 Real-time Cursors</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Live cursor position tracking</li>
                <li>• User presence indicators</li>
                <li>• Selection highlighting</li>
                <li>• Collaborative annotations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Real-Time Collaboration Code</h3>
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

export default RealTimeCollaboration; 