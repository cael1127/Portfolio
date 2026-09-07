import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const RealtimeCollaborationDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'You', color: '#3b82f6', cursor: { x: 0, y: 0 } }
  ]);
  const [document, setDocument] = useState('Start collaborating...');
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    // Simulate other users joining
    const simulatedUsers = [
      { id: 2, name: 'Alice', color: '#10b981' },
      { id: 3, name: 'Bob', color: '#f59e0b' }
    ];

    const interval = setInterval(() => {
      if (users.length < 3 && Math.random() > 0.7) {
        const newUser = simulatedUsers[users.length - 1];
        setUsers(prev => [...prev, { ...newUser, cursor: { x: 0, y: 0 } }]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [users.length]);

  const handleDocumentChange = (e) => {
    const newContent = e.target.value;
    setDocument(newContent);
    
    // Simulate collaborative changes
    setChanges(prev => [{
      id: Date.now(),
      user: 'You',
      change: `Modified document (${newContent.length} chars)`,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev].slice(0, 10));
  };

  const codeData = {
    code: `// Real-time Collaboration Platform
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Redis = require('redis');

class RealtimeCollaborationPlatform {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocket.Server({ server: this.server });
    this.redis = Redis.createClient();
    this.clients = new Map();
    this.documents = new Map();
    this.presence = new Map();
  }

  // WebSocket Connection Handler
  setupWebSocket() {
    this.wss.on('connection', (ws, req) => {
      const userId = this.generateUserId();
      const sessionId = req.headers['x-session-id'] || userId;
      
      this.clients.set(sessionId, {
        ws,
        userId,
        joinedAt: new Date(),
        presence: 'active'
      });

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connected',
        userId,
        sessionId
      }));

      // Handle incoming messages
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleMessage(sessionId, data);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      // Handle disconnect
      ws.on('close', () => {
        this.handleDisconnect(sessionId);
      });

      // Send presence update
      this.broadcastPresence();
    });
  }

  // Handle incoming messages
  handleMessage(sessionId, data) {
    const client = this.clients.get(sessionId);
    if (!client) return;

    switch (data.type) {
      case 'join_document':
        this.handleJoinDocument(sessionId, data.documentId);
        break;
      
      case 'document_change':
        this.handleDocumentChange(sessionId, data);
        break;
      
      case 'cursor_move':
        this.handleCursorMove(sessionId, data);
        break;
      
      case 'presence_update':
        this.handlePresenceUpdate(sessionId, data);
        break;
      
      default:
        console.log('Unknown message type:', data.type);
    }
  }

  // Join Document
  handleJoinDocument(sessionId, documentId) {
    const client = this.clients.get(sessionId);
    if (!client) return;

    client.documentId = documentId;
    
    // Get document state from Redis
    this.redis.get(\`document:\${documentId}\`, (err, doc) => {
      if (doc) {
        client.ws.send(JSON.stringify({
          type: 'document_state',
          document: JSON.parse(doc)
        }));
      }
    });

    // Notify other users
    this.broadcastToDocument(documentId, {
      type: 'user_joined',
      userId: client.userId
    });
  }

  // Document Change Handler
  handleDocumentChange(sessionId, data) {
    const client = this.clients.get(sessionId);
    if (!client || !client.documentId) return;

    const { documentId, changes, version } = data;

    // Apply operational transform for conflict resolution
    const transformedChanges = this.operationalTransform(
      changes,
      this.getDocumentVersion(documentId)
    );

    // Update document in Redis
    this.redis.set(\`document:\${documentId}\`, JSON.stringify({
      content: transformedChanges.content,
      version: version + 1,
      lastModified: new Date().toISOString()
    }));

    // Broadcast to all clients in the document
    this.broadcastToDocument(documentId, {
      type: 'document_updated',
      changes: transformedChanges,
      userId: client.userId,
      version: version + 1
    });
  }

  // Operational Transform for Conflict Resolution
  operationalTransform(changes, currentVersion) {
    // Simplified OT implementation
    // In production, use libraries like ShareJS or Yjs
    return {
      content: changes.content,
      operations: changes.operations
    };
  }

  // Cursor Movement
  handleCursorMove(sessionId, data) {
    const client = this.clients.get(sessionId);
    if (!client || !client.documentId) return;

    // Broadcast cursor position to other users
    this.broadcastToDocument(client.documentId, {
      type: 'cursor_moved',
      userId: client.userId,
      position: data.position,
      selection: data.selection
    }, sessionId); // Exclude sender
  }

  // Presence Updates
  handlePresenceUpdate(sessionId, data) {
    const client = this.clients.get(sessionId);
    if (!client) return;

    this.presence.set(sessionId, {
      userId: client.userId,
      status: data.status || 'active',
      lastSeen: new Date()
    });

    this.broadcastPresence();
  }

  // Broadcast to all clients in a document
  broadcastToDocument(documentId, message, excludeSessionId = null) {
    this.clients.forEach((client, sessionId) => {
      if (client.documentId === documentId && 
          sessionId !== excludeSessionId &&
          client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message));
      }
    });
  }

  // Broadcast presence to all clients
  broadcastPresence() {
    const presenceList = Array.from(this.presence.values());
    
    this.clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify({
          type: 'presence_update',
          users: presenceList
        }));
      }
    });
  }

  // Handle Disconnect
  handleDisconnect(sessionId) {
    const client = this.clients.get(sessionId);
    if (client && client.documentId) {
      this.broadcastToDocument(client.documentId, {
        type: 'user_left',
        userId: client.userId
      });
    }

    this.clients.delete(sessionId);
    this.presence.delete(sessionId);
    this.broadcastPresence();
  }

  generateUserId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getDocumentVersion(documentId) {
    // Get current document version from Redis
    return 0; // Placeholder
  }
}

// Usage
const platform = new RealtimeCollaborationPlatform();
platform.setupWebSocket();

platform.server.listen(3000, () => {
  console.log('Real-time collaboration server running on port 3000');
});

module.exports = RealtimeCollaborationPlatform;`,
    language: 'javascript',
    title: 'Real-time Collaboration Platform'
  };

  return (
    <div className="space-y-6">
      {/* Active Users */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Active Collaborators</h3>
        <div className="flex gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text)] font-semibold"
                style={{ backgroundColor: user.color }}
              >
                {user.name[0]}
              </div>
              <span className="text-[var(--text)]">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Collaborative Editor */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Collaborative Document</h3>
        <textarea
          value={document}
          onChange={handleDocumentChange}
          className="w-full p-4 bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--text)] h-64 font-mono"
          placeholder="Start typing to collaborate in real-time..."
        />
        <div className="mt-2 text-sm text-[var(--muted)]">
          {document.length} characters • {users.length} collaborator{users.length !== 1 ? 's' : ''} online
        </div>
      </div>

      {/* Change History */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Changes</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {changes.map((change) => (
            <motion.div
              key={change.id}
              className="flex items-center gap-3 p-2 bg-[var(--bg)] rounded border border-[var(--border)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[var(--muted)] text-xs w-20">{change.timestamp}</span>
              <span className="text-[var(--accent)] text-sm">{change.user}</span>
              <span className="text-[var(--text)] text-sm">{change.change}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Real-time Sync</div>
            <div className="text-sm text-[var(--muted)]">Changes sync instantly across all users</div>
          </div>
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Conflict Resolution</div>
            <div className="text-sm text-[var(--muted)]">Operational transform for conflict-free editing</div>
          </div>
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Presence Indicators</div>
            <div className="text-sm text-[var(--muted)]">See who's online and where they're editing</div>
          </div>
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Version History</div>
            <div className="text-sm text-[var(--muted)]">Track all changes with full history</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-[var(--text)] rounded-lg transition-colors"
        >
          View Code
        </button>
      </div>

      {showCodeViewer && (
        <CodeViewer
          code={codeData.code}
          language={codeData.language}
          title={codeData.title}
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default RealtimeCollaborationDemo;
