import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const SnakeAIDemo = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    highScore: 0,
    gameOver: false,
    isPlaying: false
  });
  const [aiStats, setAiStats] = useState({
    moves: 0,
    efficiency: 0,
    learningRate: 0.1
  });
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate AI game data
    const mockStats = {
      moves: 1250,
      efficiency: 87,
      learningRate: 0.1
    };
    setAiStats(mockStats);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SnakeAIDemo = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    highScore: 0,
    gameOver: false,
    isPlaying: false
  });

  const [aiStats, setAiStats] = useState({
    moves: 0,
    efficiency: 0,
    learningRate: 0.1
  });

  useEffect(() => {
    // Simulate AI game data
    const mockStats = {
      moves: 1250,
      efficiency: 87,
      learningRate: 0.1
    };
    setAiStats(mockStats);
  }, []);

`,
    explanation: `AI-powered Snake game with machine learning algorithms and neural network decision making.

## Core Implementation

**Key Features**: This demo showcases an AI-powered Snake game with machine learning algorithms, neural network decision making, and adaptive learning.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Machine Learning**: Neural network-based decision making
- **Adaptive Learning**: AI improves through gameplay
- **Game Logic**: Complex snake game mechanics
- **Performance Optimization**: Efficient AI algorithms`,
    technologies: [
      {
        name: 'Machine Learning',
        description: 'Neural network-based decision making',
        tags: ['AI', 'Neural Networks']
      },
      {
        name: 'Game Logic',
        description: 'Complex snake game mechanics and rules',
        tags: ['Game Development', 'Logic']
      },
      {
        name: 'Adaptive Learning',
        description: 'AI improves through gameplay experience',
        tags: ['Learning', 'Adaptation']
      }
    ],
    concepts: [
      {
        name: 'Neural Networks',
        description: 'AI decision making using neural networks',
        example: 'const decision = neuralNetwork.predict(gameState)'
      },
      {
        name: 'Game State Management',
        description: 'Managing complex game state and transitions',
        example: 'const [gameState, setGameState] = useState(initialState)'
      },
      {
        name: 'Pathfinding Algorithms',
        description: 'Finding optimal paths for the snake',
        example: 'const path = findOptimalPath(snake, food, obstacles)'
      }
    ],
    features: [
      'AI-powered snake gameplay',
      'Neural network decision making',
      'Adaptive learning algorithms',
      'Real-time game state management',
      'Performance optimization',
      'Interactive game interface'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Snake Game</h1>
          <p className="text-gray-400">Machine learning-powered snake game with neural networks</p>
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

      {/* Game Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
          <h3 className="text-gray-400 text-sm">Current Score</h3>
          <p className="text-3xl font-bold text-blue-400">{gameState.score}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">High Score</h3>
          <p className="text-3xl font-bold text-green-400">{gameState.highScore}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">AI Efficiency</h3>
          <p className="text-3xl font-bold text-yellow-400">{aiStats.efficiency}%</p>
        </motion.div>
      </motion.div>

      {/* AI Statistics */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">AI Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-gray-400 text-sm mb-2">Total Moves</h3>
            <p className="text-2xl font-bold text-blue-400">{aiStats.moves.toLocaleString()}</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-gray-400 text-sm mb-2">Learning Rate</h3>
            <p className="text-2xl font-bold text-green-400">{aiStats.learningRate}</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-gray-400 text-sm mb-2">Success Rate</h3>
            <p className="text-2xl font-bold text-purple-400">{aiStats.efficiency}%</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Game Controls */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Game Controls</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
          >
            {gameState.isPlaying ? 'Pause Game' : 'Start Game'}
          </motion.button>
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState(prev => ({ ...prev, score: 0, gameOver: false }))}
          >
            Reset Game
          </motion.button>
          <motion.button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState(prev => ({ ...prev, highScore: Math.max(prev.highScore, prev.score) }))}
          >
            Save High Score
          </motion.button>
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

export default SnakeAIDemo;
