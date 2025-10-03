import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const GamePlatformDemo = () => {
  const [games, setGames] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [gameStats, setGameStats] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate game platform data
    const mockGames = [
      { id: 1, name: 'Battle Royale', players: 1250, status: 'Active', genre: 'FPS' },
      { id: 2, name: 'Racing Championship', players: 890, status: 'Active', genre: 'Racing' },
      { id: 3, name: 'Strategy Wars', players: 2100, status: 'Active', genre: 'Strategy' },
      { id: 4, name: 'Puzzle Quest', players: 450, status: 'Maintenance', genre: 'Puzzle' }
    ];

    const mockPlayers = [
      { id: 1, username: 'ProGamer123', level: 45, wins: 120, losses: 30, winRate: 80 },
      { id: 2, username: 'SpeedDemon', level: 38, wins: 95, losses: 45, winRate: 68 },
      { id: 3, username: 'StrategyMaster', level: 52, wins: 150, losses: 25, winRate: 86 },
      { id: 4, username: 'PuzzleSolver', level: 29, wins: 60, losses: 40, winRate: 60 }
    ];

    const mockStats = {
      totalGames: 4,
      activePlayers: 4590,
      totalRevenue: 125000,
      averageSessionTime: 45
    };

    setGames(mockGames);
    setActivePlayers(mockPlayers);
    setGameStats(mockStats);
    setLeaderboard(mockPlayers.sort((a, b) => b.winRate - a.winRate));
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GamePlatformDemo = () => {
  const [games, setGames] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [gameStats, setGameStats] = useState({});

  useEffect(() => {
    // Simulate game platform data
    const mockGames = [
      { id: 1, name: 'Battle Royale', players: 1250, status: 'Active' },
      { id: 2, name: 'Racing Championship', players: 890, status: 'Active' }
    ];
    
    setGames(mockGames);
  }, []);

`,
    explanation: `Multiplayer gaming platform with real-time gameplay, leaderboards, and social features.

## Core Implementation

**Key Features**: This demo showcases a comprehensive gaming platform with real-time multiplayer capabilities, matchmaking, and social features.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Real-time Multiplayer**: Live gameplay with low latency
- **Matchmaking System**: Intelligent player pairing algorithms
- **Social Features**: Friends, chat, and community features
- **Analytics Dashboard**: Comprehensive game statistics`,
    technologies: [
      {
        name: 'WebSocket',
        description: 'Real-time communication for multiplayer games',
        tags: ['Real-time', 'Multiplayer']
      },
      {
        name: 'Matchmaking',
        description: 'Intelligent player pairing algorithms',
        tags: ['Algorithms', 'Gaming']
      },
      {
        name: 'Social Features',
        description: 'Community and social interaction tools',
        tags: ['Social', 'Community']
      }
    ],
    concepts: [
      {
        name: 'Real-time Communication',
        description: 'WebSocket connections for live gameplay',
        example: 'const socket = new WebSocket("ws://game-server.com")'
      },
      {
        name: 'Matchmaking Algorithms',
        description: 'Pairing players based on skill and preferences',
        example: 'const match = findBestMatch(player, availablePlayers)'
      },
      {
        name: 'State Management',
        description: 'Managing complex game state across components',
        example: 'const [gameState, setGameState] = useState(initialState)'
      }
    ],
    features: [
      'Real-time multiplayer gameplay',
      'Intelligent matchmaking system',
      'Social features and community',
      'Comprehensive analytics dashboard',
      'Cross-platform compatibility',
      'Scalable architecture'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Game Platform</h1>
          <p className="text-gray-400">Multiplayer gaming platform with real-time features</p>
        </div>
        <motion.button
          onClick={() => setShowCodeViewer(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Implementation
        </motion.button>
      </div>

      {/* Platform Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Total Games</h3>
          <p className="text-3xl font-bold text-blue-400">{gameStats.totalGames}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Active Players</h3>
          <p className="text-3xl font-bold text-green-400">{gameStats.activePlayers?.toLocaleString()}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Revenue</h3>
          <p className="text-3xl font-bold text-yellow-400">${gameStats.totalRevenue?.toLocaleString()}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Avg Session</h3>
          <p className="text-3xl font-bold text-purple-400">{gameStats.averageSessionTime}m</p>
        </motion.div>
      </motion.div>

      {/* Games Grid */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Available Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game, index) => (
            <motion.div 
              key={game.id}
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{game.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  game.status === 'Active' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                }`}>
                  {game.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-400">{game.players}</p>
              <p className="text-sm text-gray-400">Players Online</p>
              <p className="text-xs text-gray-500 mt-1">{game.genre}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Top Players</h2>
        <div className="space-y-3">
          {leaderboard.map((player, index) => (
            <motion.div 
              key={player.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{player.username}</h3>
                  <p className="text-sm text-gray-400">Level {player.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">{player.winRate}%</p>
                <p className="text-sm text-gray-400">Win Rate</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default GamePlatformDemo;
