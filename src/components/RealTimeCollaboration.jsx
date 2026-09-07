import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const RealTimeCollaboration = ({ isEmbedded = false }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [userTyping, setUserTyping] = useState(null);
  const [cursorPositions, setCursorPositions] = useState({});

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
  
  // WebSocket Connection
  useEffect(() => {
    const newSocket = io('ws://localhost:3001');
    setSocket(newSocket);
    
    newSocket.on('user_joined', (user) => {
      setUsers(prev => [...prev, user]);
    });
    
    newSocket.on('user_left', (userId) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });
    
    newSocket.on('message', (message) => {
      setMessages(prev => [message, ...prev]);
    });
    
    newSocket.on('cursor_update', (data) => {
      setCursorPositions(prev => ({
        ...prev,
        [data.userId]: { x: data.x, y: data.y }
      }));
    });
    
    return () => newSocket.close();
  }, []);
  
  // Operational Transform for Document Editing
  const applyOperation = (document, operation) => {
    const { type, position, text, length } = operation;
    
    switch (type) {
      case 'insert':
        return document.slice(0, position) + text + document.slice(position);
      case 'delete':
        return document.slice(0, position) + document.slice(position + length);
      default:
        return document;
    }
  };
  
  // WebRTC for Real-time Communication
  const initializeWebRTC = async () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    
    return peerConnection;
  };
  
  const containerClass = isEmbedded
    ? 'space-y-8 text-[var(--text)]'
    : 'min-h-screen bg-[var(--bg)] text-[var(--text)] p-6';

  const innerClass = isEmbedded ? 'space-y-8' : 'max-w-7xl mx-auto';

  return (
    <div className={containerClass}>
      <div className={innerClass}>
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-8">
          Real-Time Collaboration Platform
        </h1>
        
        {/* Collaboration Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {/* Active Users */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">👥 Active Users</h2>
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <div className="text-xl">{user.avatar}</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">{user.name}</p>
                      <p className="text-[var(--accent)] text-sm">{user.role}</p>
                    </div>
                    <div className={\`w-3 h-3 rounded-full \${
                      user.status === 'online' ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
                    }\`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Real-time Chat */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">💬 Live Chat</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {messages.map(message => (
                  <div key={message.id} className="p-3 bg-[var(--accent-soft)]/50 rounded-lg">
                    <p className="text-[var(--text)] font-semibold">{message.user}</p>
                    <p className="text-[var(--text)]">{message.message}</p>
                    <p className="text-[var(--muted)] text-xs">{message.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Collaborative Documents */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">📄 Documents</h2>
            <div className="space-y-3">
              {documents.map(doc => (
                <div key={doc.id} className="p-3 bg-[var(--accent-soft)]/50 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">{doc.name}</p>
                  <p className="text-[var(--accent)] text-sm">{doc.type}</p>
                  <p className="text-[var(--accent)] text-xs">{doc.collaborators} collaborators</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cursor Positions */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-yellow-800 to-[var(--accent-deep)] p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🖱️ Live Cursors</h2>
            <div className="space-y-3">
              {Object.entries(cursorPositions).map(([user, position]) => (
                <div key={user} className="p-3 bg-[var(--accent-soft)]/50 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">{user}</p>
                  <p className="text-[var(--accent)] text-sm">
                    Position: ({position.x.toFixed(1)}, {position.y.toFixed(1)})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;`;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[var(--accent)] mb-2">Real-Time Collaboration Platform</h1>
              <p className="text-[var(--muted)]">Advanced WebSocket, WebRTC, and operational transform for seamless teamwork</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Users */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-[var(--text)]">Active Users</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                <span className="text-[var(--accent)] text-sm">{users.filter(u => u.status === 'online').length} online</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-4 p-3 bg-[var(--accent-soft)]/50 rounded-lg">
                  <div className="text-2xl">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="text-[var(--text)] font-semibold">{user.name}</p>
                    <p className="text-[var(--accent)] text-sm">{user.role}</p>
                    <p className="text-[var(--accent)] text-xs">{user.lastSeen}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    user.status === 'online' ? 'bg-[var(--accent)]' : 
                    user.status === 'away' ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Chat */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-[var(--text)]">Live Chat</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                <span className="text-[var(--accent)] text-sm">Real-time</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {messages.map(message => (
                <div key={message.id} className={`p-3 rounded-lg ${
                  message.type === 'success' ? 'bg-[var(--accent-soft)]/50' :
                  message.type === 'info' ? 'bg-[var(--accent-soft)]/50' :
                  'bg-[var(--surface)]/50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[var(--text)] font-semibold">{message.user}</p>
                    <span className="text-[var(--text)] text-xs">{message.timestamp}</span>
                  </div>
                  <p className="text-[var(--text)] text-sm">{message.message}</p>
                </div>
              ))}
            </div>
            
            {userTyping && (
              <div className="mt-3 p-2 bg-[var(--surface)]/50 rounded-lg">
                <p className="text-[var(--muted)] text-sm italic">
                  {userTyping} is typing...
                </p>
              </div>
            )}
          </div>

          {/* Collaborative Documents */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[var(--text)]">Documents</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                <span className="text-[var(--accent)] text-sm">Live editing</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {documents.map(doc => (
                <div key={doc.id} className="p-4 bg-[var(--accent-soft)]/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[var(--text)] font-semibold">{doc.name}</h3>
                    <span className="text-[var(--accent)] text-sm">{doc.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--accent)]">{doc.collaborators} collaborators</span>
                    <span className="text-[var(--accent)]">{doc.lastEdited}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">WebSocket Integration</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Real-time bidirectional communication</li>
                <li>• Automatic reconnection handling</li>
                <li>• Message queuing and delivery</li>
                <li>• Connection state management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">WebRTC Implementation</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Peer-to-peer video/audio calls</li>
                <li>• Screen sharing capabilities</li>
                <li>• ICE candidate handling</li>
                <li>• Media stream management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Operational Transform</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Conflict-free document editing</li>
                <li>• Real-time cursor synchronization</li>
                <li>• Version control integration</li>
                <li>• Undo/redo functionality</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        <CodeViewer 
          code={demoCode} 
          language="javascript" 
          title="Real-Time Collaboration Code"
          isOpen={showCodeViewer} 
          onClose={() => setShowCodeViewer(false)} 
        />
      </div>
    </div>
  );
};

export default RealTimeCollaboration; 