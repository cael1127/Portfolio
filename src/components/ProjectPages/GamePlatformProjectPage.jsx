import React, { useState } from 'react';

const GamePlatformProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    gameEngine: `// Multiplayer Game Engine
class GameEngine {
  constructor() {
    this.rooms = new Map();
    this.players = new Map();
    this.gameStates = new Map();
    this.physics = new PhysicsEngine();
    this.network = new NetworkManager();
  }

  createRoom(roomId, gameType) {
    const room = {
      id: roomId,
      gameType: gameType,
      players: [],
      state: 'waiting',
      maxPlayers: 4,
      gameState: null,
      createdAt: new Date()
    };

    this.rooms.set(roomId, room);
    return room;
  }

  joinRoom(playerId, roomId) {
    const room = this.rooms.get(roomId);
    const player = this.players.get(playerId);

    if (!room || !player) return false;

    if (room.players.length >= room.maxPlayers) {
      return false;
    }

    room.players.push(playerId);
    player.currentRoom = roomId;

    // Check if room is full
    if (room.players.length === room.maxPlayers) {
      this.startGame(roomId);
    }

    return true;
  }

  startGame(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.state = 'playing';
    room.gameState = this.initializeGameState(room.gameType);

    // Notify all players
    room.players.forEach(playerId => {
      this.network.sendToPlayer(playerId, {
        type: 'game_start',
        gameState: room.gameState
      });
    });

    // Start game loop
    this.startGameLoop(roomId);
  }

  initializeGameState(gameType) {
    switch (gameType) {
      case 'racing':
        return {
          players: [],
          checkpoints: [],
          leaderboard: [],
          time: 0
        };
      case 'shooter':
        return {
          players: [],
          map: 'default',
          scores: {},
          round: 1
        };
      default:
        return {};
    }
  }

  startGameLoop(roomId) {
    const gameLoop = setInterval(() => {
      const room = this.rooms.get(roomId);
      if (!room || room.state !== 'playing') {
        clearInterval(gameLoop);
        return;
      }

      this.updateGameState(roomId);
    }, 1000 / 60); // 60 FPS
  }
}`,
    
    networkManager: `// Real-time Network Manager
class NetworkManager {
  constructor() {
    this.connections = new Map();
    this.rooms = new Map();
    this.messageQueue = [];
  }

  connectPlayer(playerId, socket) {
    this.connections.set(playerId, {
      socket: socket,
      connected: true,
      lastPing: Date.now(),
      latency: 0
    });

    // Send welcome message
    this.sendToPlayer(playerId, {
      type: 'welcome',
      playerId: playerId,
      timestamp: Date.now()
    });
  }

  sendToPlayer(playerId, message) {
    const connection = this.connections.get(playerId);
    if (!connection || !connection.connected) return;

    try {
      connection.socket.send(JSON.stringify(message));
    } catch (error) {
      console.error('Failed to send message to player:', error);
      this.disconnectPlayer(playerId);
    }
  }

  broadcastToRoom(roomId, message, excludePlayer = null) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.players.forEach(playerId => {
      if (playerId !== excludePlayer) {
        this.sendToPlayer(playerId, message);
      }
    });
  }

  handlePlayerInput(playerId, input) {
    const connection = this.connections.get(playerId);
    if (!connection) return;

    // Process input and update game state
    const processedInput = this.processInput(input);
    
    // Broadcast to other players in the same room
    const player = this.getPlayer(playerId);
    if (player && player.currentRoom) {
      this.broadcastToRoom(player.currentRoom, {
        type: 'player_input',
        playerId: playerId,
        input: processedInput,
        timestamp: Date.now()
      }, playerId);
    }
  }

  processInput(input) {
    // Validate and process player input
    const validInputs = ['move', 'jump', 'attack', 'use_item'];
    
    if (!validInputs.includes(input.type)) {
      return null;
    }

    return {
      type: input.type,
      data: input.data,
      timestamp: Date.now()
    };
  }

  disconnectPlayer(playerId) {
    const connection = this.connections.get(playerId);
    if (connection) {
      connection.connected = false;
      connection.socket.close();
    }

    // Remove from rooms
    this.removePlayerFromRooms(playerId);
  }
}`,
    
    physicsEngine: `// Game Physics Engine
class PhysicsEngine {
  constructor() {
    this.gravity = 9.8;
    this.collisionGroups = new Map();
    this.objects = new Map();
  }

  addObject(objectId, objectData) {
    this.objects.set(objectId, {
      id: objectId,
      position: objectData.position || { x: 0, y: 0, z: 0 },
      velocity: objectData.velocity || { x: 0, y: 0, z: 0 },
      acceleration: objectData.acceleration || { x: 0, y: 0, z: 0 },
      mass: objectData.mass || 1,
      collisionGroup: objectData.collisionGroup || 'default',
      bounds: objectData.bounds || { width: 1, height: 1, depth: 1 }
    });
  }

  updatePhysics(deltaTime) {
    this.objects.forEach((object, objectId) => {
      // Apply gravity
      object.acceleration.y = -this.gravity;

      // Update velocity
      object.velocity.x += object.acceleration.x * deltaTime;
      object.velocity.y += object.acceleration.y * deltaTime;
      object.velocity.z += object.acceleration.z * deltaTime;

      // Update position
      object.position.x += object.velocity.x * deltaTime;
      object.position.y += object.velocity.y * deltaTime;
      object.position.z += object.velocity.z * deltaTime;

      // Check collisions
      this.checkCollisions(objectId);
    });
  }

  checkCollisions(objectId) {
    const object = this.objects.get(objectId);
    if (!object) return;

    this.objects.forEach((otherObject, otherId) => {
      if (objectId === otherId) return;

      if (this.isColliding(object, otherObject)) {
        this.handleCollision(object, otherObject);
      }
    });
  }

  isColliding(obj1, obj2) {
    const bounds1 = obj1.bounds;
    const bounds2 = obj2.bounds;
    const pos1 = obj1.position;
    const pos2 = obj2.position;

    return (
      pos1.x < pos2.x + bounds2.width &&
      pos1.x + bounds1.width > pos2.x &&
      pos1.y < pos2.y + bounds2.height &&
      pos1.y + bounds1.height > pos2.y &&
      pos1.z < pos2.z + bounds2.depth &&
      pos1.z + bounds1.depth > pos2.z
    );
  }

  handleCollision(obj1, obj2) {
    // Elastic collision response
    const relativeVelocity = {
      x: obj1.velocity.x - obj2.velocity.x,
      y: obj1.velocity.y - obj2.velocity.y,
      z: obj1.velocity.z - obj2.velocity.z
    };

    const restitution = 0.8; // Bounciness factor

    // Calculate collision response
    const impulse = this.calculateImpulse(obj1, obj2, relativeVelocity);
    
    // Apply impulse
    obj1.velocity.x += impulse.x / obj1.mass;
    obj1.velocity.y += impulse.y / obj1.mass;
    obj1.velocity.z += impulse.z / obj1.mass;

    obj2.velocity.x -= impulse.x / obj2.mass;
    obj2.velocity.y -= impulse.y / obj2.mass;
    obj2.velocity.z -= impulse.z / obj2.mass;
  }

  calculateImpulse(obj1, obj2, relativeVelocity) {
    const normal = this.getCollisionNormal(obj1, obj2);
    const relativeSpeed = 
      relativeVelocity.x * normal.x +
      relativeVelocity.y * normal.y +
      relativeVelocity.z * normal.z;

    if (relativeSpeed > 0) return { x: 0, y: 0, z: 0 };

    const restitution = 0.8;
    const impulse = -(1 + restitution) * relativeSpeed;
    
    return {
      x: impulse * normal.x,
      y: impulse * normal.y,
      z: impulse * normal.z
    };
  }
}`,
    
    dashboardComponent: `// React Game Platform Dashboard
import React, { useState, useEffect } from 'react';

const GamePlatformDashboard = () => {
  const [gameData, setGameData] = useState({
    activeRooms: 0,
    onlinePlayers: 0,
    gameTypes: [],
    leaderboard: []
  });

  useEffect(() => {
    const gameEngine = new GameEngine();
    const networkManager = new NetworkManager();

    // Initialize game platform
    const mockRooms = [
      { id: 'room-1', gameType: 'racing', players: 3, maxPlayers: 4 },
      { id: 'room-2', gameType: 'shooter', players: 2, maxPlayers: 8 },
      { id: 'room-3', gameType: 'puzzle', players: 1, maxPlayers: 2 }
    ];

    const mockLeaderboard = [
      { player: 'Player1', score: 1500, gameType: 'racing' },
      { player: 'Player2', score: 1200, gameType: 'shooter' },
      { player: 'Player3', score: 900, gameType: 'puzzle' }
    ];

    setGameData({
      activeRooms: mockRooms.length,
      onlinePlayers: mockRooms.reduce((sum, room) => sum + room.players, 0),
      gameTypes: ['racing', 'shooter', 'puzzle', 'strategy'],
      leaderboard: mockLeaderboard
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setGameData(prev => ({
        ...prev,
        onlinePlayers: prev.onlinePlayers + Math.floor(Math.random() * 3) - 1,
        activeRooms: Math.max(1, prev.activeRooms + Math.floor(Math.random() * 2) - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-8">
          Multiplayer Game Platform
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Active Rooms</h3>
            <p className="text-2xl font-bold text-[var(--text)]">{gameData.activeRooms}</p>
            <p className="text-sm text-[var(--muted)]">Currently running</p>
          </div>
          
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Online Players</h3>
            <p className="text-2xl font-bold text-[var(--text)]">{gameData.onlinePlayers}</p>
            <p className="text-sm text-[var(--muted)]">Currently playing</p>
          </div>
          
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Game Types</h3>
            <p className="text-2xl font-bold text-[var(--text)]">{gameData.gameTypes.length}</p>
            <p className="text-sm text-[var(--muted)]">Available games</p>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
          <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">Leaderboard</h3>
          <div className="space-y-2">
            {gameData.leaderboard.map((entry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-[var(--text)]">{entry.player}</span>
                <span className="text-[var(--accent)]">{entry.score}</span>
                <span className="text-[var(--muted)] text-sm">{entry.gameType}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-[var(--accent)] hover:text-[var(--accent)] mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">🎮 Multiplayer Game Platform</h1>
          <p className="text-[var(--text)] text-lg">
            Real-time multiplayer gaming platform with advanced physics engine and network management
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Project Overview</h2>
                <p className="text-[var(--text)] leading-relaxed">
                  The Multiplayer Game Platform is a comprehensive gaming system that provides real-time multiplayer 
                  experiences with advanced physics simulation, network management, and scalable architecture for 
                  multiple game types and concurrent players.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Real-time multiplayer gaming</li>
                    <li>• Advanced physics simulation</li>
                    <li>• Scalable network architecture</li>
                    <li>• Multiple game type support</li>
                    <li>• Low-latency performance</li>
                    <li>• Cross-platform compatibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• React.js for game UI</li>
                    <li>• WebSocket for real-time communication</li>
                    <li>• Custom physics engine</li>
                    <li>• Node.js game server</li>
                    <li>• Redis for session management</li>
                    <li>• WebGL for graphics</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🎮 Game Engine</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Multiplayer room management</li>
                    <li>• Real-time game state synchronization</li>
                    <li>• Multiple game type support</li>
                    <li>• Player matchmaking</li>
                    <li>• Game session management</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🌐 Network Management</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• WebSocket real-time communication</li>
                    <li>• Low-latency data transmission</li>
                    <li>• Connection state management</li>
                    <li>• Input validation and processing</li>
                    <li>• Room-based broadcasting</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">⚡ Physics Engine</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Real-time physics simulation</li>
                    <li>• Collision detection and response</li>
                    <li>• Gravity and force calculations</li>
                    <li>• Object movement and positioning</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">📊 Analytics</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Player statistics tracking</li>
                    <li>• Game performance metrics</li>
                    <li>• Leaderboard system</li>
                    <li>• Achievement system</li>
                    <li>• Real-time analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Game Engine</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.gameEngine}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Network Manager</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.networkManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Physics Engine</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.physicsEngine}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Dashboard Component</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Frontend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• React.js game interface</li>
                      <li>• WebGL graphics rendering</li>
                      <li>• Real-time input handling</li>
                      <li>• Game state visualization</li>
                      <li>• Cross-platform compatibility</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Backend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• Node.js game server</li>
                      <li>• WebSocket communication</li>
                      <li>• Physics engine processing</li>
                      <li>• Room and session management</li>
                      <li>• Player data persistence</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">1</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Player Input</p>
                      <p className="text-[var(--text)] text-sm">Real-time input from connected players</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">2</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Game Processing</p>
                      <p className="text-[var(--text)] text-sm">Physics simulation and game logic</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">3</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">State Synchronization</p>
                      <p className="text-[var(--text)] text-sm">Real-time updates to all players</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Live Demo</h2>
              <p className="text-[var(--text)] mb-6">
                Experience the multiplayer game platform in action. The demo showcases real-time multiplayer gaming, 
                advanced physics simulation, and comprehensive game management features.
              </p>
              
              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">Interactive Game Platform Demo</h3>
                  <button
                    onClick={() => setCurrentPage('gameplatform')}
                    className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-[var(--text)] text-sm">
                  Click "Launch Demo" to experience the full multiplayer game platform with real-time gaming, 
                  physics simulation, and comprehensive game management.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePlatformProjectPage; 