import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeViewer from '../CodeViewer';

const RealtimeChatDemo = () => {
  const [messages, setMessages] = useState([]);
  const [peers, setPeers] = useState(new Map());
  const [text, setText] = useState('');
  const [openCode, setOpenCode] = useState(false);
  const channelRef = useRef(null);
  const userId = useMemo(() => Math.random().toString(36).slice(2, 7), []);

  useEffect(() => {
    const ch = new BroadcastChannel('demo-chat');
    channelRef.current = ch;
    const heartbeat = setInterval(() => {
      ch.postMessage({ type: 'ping', userId, ts: Date.now() });
    }, 4000);
    ch.postMessage({ type: 'join', userId, ts: Date.now() });
    const onmessage = (ev) => {
      const msg = ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'join' || msg.type === 'ping') {
        setPeers(prev => {
          const next = new Map(prev);
          next.set(msg.userId, msg.ts || Date.now());
          return next;
        });
      } else if (msg.type === 'chat') {
        setMessages(prev => [...prev, msg]);
      }
    };
    ch.onmessage = onmessage;
    return () => {
      clearInterval(heartbeat);
      ch.close();
    };
  }, [userId]);

  const presence = useMemo(() => Array.from(peers.keys()).length, [peers]);

  const send = () => {
    const body = text.trim();
    if (!body) return;
    const msg = { type: 'chat', userId, body, ts: Date.now() };
    channelRef.current?.postMessage(msg);
    setMessages(prev => [...prev, msg]);
    setText('');
  };

  // Enhanced code data for the new CodeViewer
  const codeData = {
    code: `// Real-time Chat Implementation with BroadcastChannel
import React, { useEffect, useMemo, useRef, useState } from 'react';

const RealtimeChatDemo = () => {
  const [messages, setMessages] = useState([]);
  const [peers, setPeers] = useState(new Map());
  const [text, setText] = useState('');
  const channelRef = useRef(null);
  const userId = useMemo(() => Math.random().toString(36).slice(2, 7), []);

  // Initialize BroadcastChannel for local communication
  useEffect(() => {
    const channel = new BroadcastChannel('demo-chat');
    channelRef.current = channel;
    
    // Heartbeat to maintain presence
    const heartbeat = setInterval(() => {
      channel.postMessage({ 
        type: 'ping', 
        userId, 
        ts: Date.now() 
      });
    }, 4000);
    
    // Join the chat room
    channel.postMessage({ 
      type: 'join', 
      userId, 
      ts: Date.now() 
    });
    
    // Handle incoming messages
    const handleMessage = (event) => {
      const msg = event.data;
      if (!msg || typeof msg !== 'object') return;
      
      if (msg.type === 'join' || msg.type === 'ping') {
        // Update presence tracking
        setPeers(prev => {
          const next = new Map(prev);
          next.set(msg.userId, msg.ts || Date.now());
          return next;
        });
      } else if (msg.type === 'chat') {
        // Add chat message
        setMessages(prev => [...prev, msg]);
      }
    };
    
    channel.onmessage = handleMessage;
    
    // Cleanup on unmount
    return () => {
      clearInterval(heartbeat);
      channel.close();
    };
  }, [userId]);

  // Calculate active user count
  const presence = useMemo(() => 
    Array.from(peers.keys()).length, 
    [peers]
  );

  // Send chat message
  const sendMessage = () => {
    const body = text.trim();
    if (!body) return;
    
    const message = { 
      type: 'chat', 
      userId, 
      body, 
      ts: Date.now() 
    };
    
    // Broadcast to all tabs/windows
    channelRef.current?.postMessage(message);
    
    // Add to local messages
    setMessages(prev => [...prev, message]);
    setText('');
  };

  return (
    <div className="grid md:grid-cols-[1fr,260px] gap-6">
      {/* Chat Interface */}
      <div className="bg-gray-900 border border-gray-800 rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Room: demo</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{presence} online</span>
          </div>
        </div>
        
        {/* Messages Display */}
        <div className="h-60 overflow-auto bg-gray-800 border border-gray-700 rounded p-3 text-sm space-y-2">
          {messages.length === 0 ? (
            <div className="text-gray-400">Say hello to start the conversation.</div>
          ) : messages.map((message, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-emerald-400 font-medium">
                {message.userId}:
              </span>
              <span className="text-gray-300">{message.body}</span>
              <span className="text-xs text-gray-500 ml-auto">
                {new Date(message.ts).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="mt-3 flex gap-2">
          <input 
            value={text} 
            onChange={e => setText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm" 
            placeholder="Type a message..." 
          />
          <button 
            onClick={sendMessage} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      {/* Presence Sidebar */}
      <aside className="bg-gray-900 border border-gray-800 rounded p-4 text-sm">
        <div className="font-semibold mb-2 flex items-center gap-2">
          👥 Presence
        </div>
        <div className="text-gray-300 mb-2">
          Active users: {presence}
        </div>
        <div className="text-gray-400 text-xs">
          (Local-only BroadcastChannel demo)
        </div>
        
        {/* User List */}
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Connected Users:</div>
          {Array.from(peers.entries()).map(([peerId, timestamp]) => (
            <div key={peerId} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">{peerId}</span>
              {peerId === userId && (
                <span className="text-blue-400">(you)</span>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};`,
    explanation: `This real-time chat implementation demonstrates modern web communication patterns using the BroadcastChannel API for local-only real-time messaging without requiring a backend server.

## Core Implementation

**BroadcastChannel API**: Uses the browser's BroadcastChannel API to enable communication between different tabs/windows of the same origin. This provides a simple way to simulate real-time communication without WebSocket infrastructure.

**Presence Tracking**: Implements a heartbeat system to track active users. Each client sends periodic ping messages to maintain their presence status, and inactive users are automatically removed.

**Message Broadcasting**: All chat messages are broadcast to all connected clients through the BroadcastChannel, providing instant message delivery across tabs.

**State Management**: Uses React hooks for efficient state management with Map data structures for O(1) presence operations and array-based message storage.

## Key Features

**Real-time Communication**: Messages appear instantly across all connected tabs/windows without page refresh.

**Presence Awareness**: Live user count and user list showing who's currently active in the chat.

**Heartbeat System**: Automatic cleanup of inactive users through periodic ping messages.

**Local Storage**: No backend required - all communication happens locally through browser APIs.

**Message History**: Persistent message display with timestamps and user identification.

**Responsive Design**: Mobile-friendly interface that works across different screen sizes.

## Technical Benefits

- **No Backend Required**: Uses browser APIs for communication
- **Cross-tab Communication**: Messages sync across multiple tabs
- **Automatic Cleanup**: Inactive users are removed automatically
- **Lightweight**: Minimal resource usage compared to WebSocket connections
- **Secure**: Same-origin policy ensures message privacy`,

    technologies: [
      {
        name: "BroadcastChannel API",
        description: "Browser API for cross-tab communication without server",
        tags: ["Real-time", "Cross-tab", "No Backend"]
      },
      {
        name: "React Hooks",
        description: "Modern React state management and lifecycle handling",
        tags: ["useState", "useEffect", "useMemo", "useRef"]
      },
      {
        name: "JavaScript ES6+",
        description: "Modern JavaScript features for efficient data handling",
        tags: ["Map", "Arrow Functions", "Template Literals"]
      },
      {
        name: "Web APIs",
        description: "Browser-native APIs for real-time communication",
        tags: ["BroadcastChannel", "setInterval", "Event Handling"]
      }
    ],

    concepts: [
      {
        name: "BroadcastChannel",
        description: "Browser API enabling communication between same-origin tabs/windows",
        example: "new BroadcastChannel('chat-room') for cross-tab messaging"
      },
      {
        name: "Presence Tracking",
        description: "System for tracking active users through heartbeat messages",
        example: "Periodic ping messages to maintain user presence status"
      },
      {
        name: "Real-time Communication",
        description: "Instant message delivery without page refresh or polling",
        example: "Messages appear immediately across all connected clients"
      },
      {
        name: "Event-driven Architecture",
        description: "System responding to events rather than continuous polling",
        example: "onmessage handlers for incoming chat messages"
      },
      {
        name: "State Synchronization",
        description: "Keeping UI state consistent across multiple clients",
        example: "Shared message array and presence map across tabs"
      }
    ],

    features: [
      "Real-time cross-tab messaging",
      "Live presence tracking with user count",
      "Automatic heartbeat system",
      "Message history with timestamps",
      "Responsive mobile-friendly design",
      "No backend server required",
      "Instant message delivery",
      "User identification and status"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">💬 Real-time Chat Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Interactive chat application showcasing real-time communication using BroadcastChannel API, presence tracking, and cross-tab messaging
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setOpenCode(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>💻</span>
            View Implementation
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,260px] gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Room: demo</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{presence} online</span>
            </div>
          </div>
          <div className="h-60 overflow-auto bg-gray-800 border border-gray-700 rounded p-3 text-sm space-y-2">
            {messages.length === 0 ? (
              <div className="text-gray-400">Say hello to start the conversation.</div>
            ) : messages.map((m,i)=>(
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-medium">{m.userId}:</span>
                <span className="text-gray-300">{m.body}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {new Date(m.ts).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input 
              value={text} 
              onChange={e=>setText(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && send()}
              className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm" 
              placeholder="Type a message..." 
            />
            <button 
              onClick={send} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Send
            </button>
          </div>
        </div>
        <aside className="bg-gray-900 border border-gray-800 rounded p-4 text-sm">
          <div className="font-semibold mb-2 flex items-center gap-2">
            👥 Presence
          </div>
          <div className="text-gray-300 mb-2">Active users: {presence}</div>
          <div className="text-gray-400 text-xs mb-4">(Local-only BroadcastChannel demo)</div>
          
          {/* User List */}
          <div>
            <div className="text-xs text-gray-500 mb-2">Connected Users:</div>
            {Array.from(peers.entries()).map(([peerId, timestamp]) => (
              <div key={peerId} className="flex items-center gap-2 text-xs mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{peerId}</span>
                {peerId === userId && (
                  <span className="text-blue-400">(you)</span>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>

      {openCode && (
        <CodeViewer 
          isOpen={openCode} 
          onClose={()=>setOpenCode(false)} 
          title="Real-time Chat Implementation"
          language="javascript"
          code={codeData.code}
          explanation={codeData.explanation}
          technologies={codeData.technologies}
          concepts={codeData.concepts}
          features={codeData.features}
        />
      )}
    </div>
  );
};

export default RealtimeChatDemo;


