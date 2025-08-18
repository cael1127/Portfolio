import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const SnakeAIDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState('RIGHT');
  const [aiMode, setAiMode] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [generation, setGeneration] = useState(1);
  const [fitness, setFitness] = useState(0);
  const [aiStats, setAiStats] = useState({
    moves: 0,
    successfulMoves: 0,
    foodCollected: 0,
    survivalTime: 0
  });
  
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const aiLoopRef = useRef(null);

  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const GAME_SPEED = 150;

  // Deterministic food placement
  const placeFood = (currentSnake) => {
    // Use deterministic pattern based on score and generation
    const seed = (score * 7 + generation * 13) % (GRID_SIZE * GRID_SIZE);
    let attempts = 0;
    let newFood;
    
    do {
      const x = (seed + attempts * 11) % GRID_SIZE;
      const y = (seed + attempts * 17) % GRID_SIZE;
      newFood = [x, y];
      attempts++;
    } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
    
    return newFood;
  };

  // Deterministic AI decision making
  const makeAIDecision = (currentSnake, currentFood, currentDirection) => {
    const head = currentSnake[0];
    const [foodX, foodY] = currentFood;
    
    // Calculate deterministic path to food
    const pathToFood = findPathToFood(currentSnake, head, currentFood);
    
    if (pathToFood && pathToFood.length > 1) {
      const nextMove = pathToFood[1];
      const dx = nextMove[0] - head[0];
      const dy = nextMove[1] - head[1];
      
      // Convert movement to direction
      if (dx === 1) return 'RIGHT';
      if (dx === -1) return 'LEFT';
      if (dy === 1) return 'DOWN';
      if (dy === -1) return 'UP';
    }
    
    // Fallback: use deterministic pattern based on current state
    const fallbackDirection = getFallbackDirection(currentSnake, currentDirection);
    return fallbackDirection;
  };

  // Deterministic pathfinding using A* algorithm
  const findPathToFood = (snake, start, goal) => {
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), heuristic(start, goal));
    
    while (openSet.length > 0) {
      // Sort by fScore for deterministic behavior
      openSet.sort((a, b) => {
        const aScore = fScore.get(a.toString()) || Infinity;
        const bScore = fScore.get(b.toString()) || Infinity;
        if (aScore === bScore) {
          // Use deterministic tiebreaker
          return a[0] - b[0] || a[1] - b[1];
        }
        return aScore - bScore;
      });
      
      const current = openSet.shift();
      
      if (current[0] === goal[0] && current[1] === goal[1]) {
        // Reconstruct path
        const path = [];
        let temp = current;
        while (temp) {
          path.unshift(temp);
          temp = cameFrom.get(temp.toString());
        }
        return path;
      }
      
      const neighbors = getValidNeighbors(current, snake);
      for (const neighbor of neighbors) {
        const tentativeGScore = (gScore.get(current.toString()) || Infinity) + 1;
        
        if (tentativeGScore < (gScore.get(neighbor.toString()) || Infinity)) {
          cameFrom.set(neighbor.toString(), current);
          gScore.set(neighbor.toString(), tentativeGScore);
          fScore.set(neighbor.toString(), tentativeGScore + heuristic(neighbor, goal));
          
          if (!openSet.some(pos => pos[0] === neighbor[0] && pos[1] === neighbor[1])) {
            openSet.push(neighbor);
          }
        }
      }
    }
    
    return null; // No path found
  };

  const heuristic = (a, b) => {
    // Manhattan distance for deterministic behavior
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  const getValidNeighbors = (pos, snake) => {
    const [x, y] = pos;
    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];
    
    return neighbors.filter(([nx, ny]) => {
      // Check bounds
      if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return false;
      
      // Check collision with snake
      return !snake.some(segment => segment[0] === nx && segment[1] === ny);
    });
  };

  const getFallbackDirection = (currentSnake, currentDirection) => {
    const head = currentSnake[0];
    const [x, y] = head;
    
    // Deterministic fallback pattern
    const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    const currentIndex = directions.indexOf(currentDirection);
    
    // Try each direction in order until we find a valid move
    for (let i = 0; i < 4; i++) {
      const testIndex = (currentIndex + i) % 4;
      const testDirection = directions[testIndex];
      
      let testX = x, testY = y;
      switch (testDirection) {
        case 'UP': testY = (y - 1 + GRID_SIZE) % GRID_SIZE; break;
        case 'DOWN': testY = (y + 1) % GRID_SIZE; break;
        case 'LEFT': testX = (x - 1 + GRID_SIZE) % GRID_SIZE; break;
        case 'RIGHT': testX = (x + 1) % GRID_SIZE; break;
      }
      
      // Check if move is valid
      if (!currentSnake.some(segment => segment[0] === testX && segment[1] === testY)) {
        return testDirection;
      }
    }
    
    return currentDirection; // Keep current direction if no valid move
  };

  const moveSnake = (currentSnake, currentDirection, currentFood) => {
    const newSnake = [...currentSnake];
    const head = [...newSnake[0]];
    
    // Move head based on direction
    switch (currentDirection) {
      case 'UP': head[1] = (head[1] - 1 + GRID_SIZE) % GRID_SIZE; break;
      case 'DOWN': head[1] = (head[1] + 1) % GRID_SIZE; break;
      case 'LEFT': head[1] = (head[1] - 1 + GRID_SIZE) % GRID_SIZE; break;
      case 'RIGHT': head[1] = (head[1] + 1) % GRID_SIZE; break;
    }
    
    // Check collision with self
    if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
      return { newSnake: currentSnake, gameOver: true, foodEaten: false };
    }
    
    newSnake.unshift(head);
    
    // Check if food was eaten
    const foodEaten = head[0] === currentFood[0] && head[1] === currentFood[1];
    
    if (foodEaten) {
      // Place new food deterministically
      const newFood = placeFood(newSnake);
      setFood(newFood);
      setScore(prev => prev + 10);
      setHighScore(prev => Math.max(prev, score + 10));
    } else {
      // Remove tail if no food eaten
      newSnake.pop();
    }
    
    return { newSnake, gameOver: false, foodEaten };
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection('RIGHT');
    setAiStats({ moves: 0, successfulMoves: 0, foodCollected: 0, survivalTime: 0 });
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
  };

  const startAI = () => {
    setAiMode(true);
    setGeneration(1);
    setFitness(0);
    startGame();
    
    if (aiLoopRef.current) clearInterval(aiLoopRef.current);
    aiLoopRef.current = setInterval(aiLoop, GAME_SPEED);
  };

  const gameLoop = () => {
    if (gameState !== 'playing') return;
    
    setSnake(currentSnake => {
      const result = moveSnake(currentSnake, direction, food);
      
      if (result.gameOver) {
        setGameState('gameOver');
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        return currentSnake;
      }
      
      return result.newSnake;
    });
  };

  const aiLoop = () => {
    if (gameState !== 'playing' || !aiMode) return;
    
    setAiThinking(true);
    
    // Make AI decision
    const aiDirection = makeAIDecision(snake, food, direction);
    setDirection(aiDirection);
    
    // Update AI stats
    setAiStats(prev => ({
      ...prev,
      moves: prev.moves + 1,
      survivalTime: prev.survivalTime + 1
    }));
    
    setAiThinking(false);
  };

  const pauseGame = () => {
    if (gameState === 'playing') {
      setGameState('paused');
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (aiLoopRef.current) clearInterval(aiLoopRef.current);
    } else if (gameState === 'paused') {
      setGameState('playing');
      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
      if (aiMode) {
        aiLoopRef.current = setInterval(aiLoop, GAME_SPEED);
      }
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection('RIGHT');
    setAiMode(false);
    setGeneration(1);
    setFitness(0);
    setAiStats({ moves: 0, successfulMoves: 0, foodCollected: 0, survivalTime: 0 });
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (aiLoopRef.current) clearInterval(aiLoopRef.current);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing' || aiMode) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          pauseGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, direction, aiMode]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    
    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }
    
    // Draw snake
    ctx.fillStyle = '#10b981';
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head
        ctx.fillStyle = '#059669';
      } else {
        ctx.fillStyle = '#10b981';
      }
      ctx.fillRect(
        segment[0] * CELL_SIZE + 1,
        segment[1] * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });
    
    // Draw food
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(
      food[0] * CELL_SIZE + 2,
      food[1] * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
  }, [snake, food]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🐍 Snake AI with Deterministic Algorithms</h1>
          <p className="text-gray-300 text-lg">
            Classic Snake game with AI that uses deterministic pathfinding and decision-making algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Game Board</h2>
                <div className="flex gap-2">
                  {gameState === 'menu' && (
                    <>
                      <button
                        onClick={startGame}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        🎮 Start Game
                      </button>
                      <button
                        onClick={startAI}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        🤖 Start AI
                      </button>
                    </>
                  )}
                  
                  {gameState === 'playing' && (
                    <button
                      onClick={pauseGame}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      ⏸️ Pause
                    </button>
                  )}
                  
                  {gameState === 'paused' && (
                    <button
                      onClick={pauseGame}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      ▶️ Resume
                    </button>
                  )}
                  
                  {(gameState === 'playing' || gameState === 'paused' || gameState === 'gameOver') && (
                    <button
                      onClick={resetGame}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      🔄 Reset
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-600 rounded-lg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-400">
                <p>Use arrow keys to control the snake | Space to pause</p>
                {aiMode && <p>🤖 AI Mode Active - Generation {generation}</p>}
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Score</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{score}</div>
                <div className="text-gray-400">High Score: {highScore}</div>
              </div>
            </div>

            {/* Game State */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Game State</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-semibold ${
                    gameState === 'playing' ? 'text-green-400' :
                    gameState === 'paused' ? 'text-yellow-400' :
                    gameState === 'gameOver' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {gameState.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Direction:</span>
                  <span className="text-blue-400">{direction}</span>
                </div>
                <div className="flex justify-between">
                  <span>Snake Length:</span>
                  <span className="text-green-400">{snake.length}</span>
                </div>
              </div>
            </div>

            {/* AI Stats */}
            {aiMode && (
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
                <h3 className="text-xl font-bold mb-4">AI Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Generation:</span>
                    <span className="text-purple-400">{generation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moves:</span>
                    <span className="text-blue-400">{aiStats.moves}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Survival Time:</span>
                    <span className="text-green-400">{aiStats.survivalTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food Collected:</span>
                    <span className="text-yellow-400">{aiStats.foodCollected}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Snake AI Implementation"
          code={`
// Deterministic Snake AI Implementation
class SnakeAI {
  constructor() {
    this.gridSize = 20;
    this.directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
  }

  // Deterministic decision making
  makeDecision(snake, food, currentDirection) {
    const head = snake[0];
    const path = this.findPathToFood(snake, head, food);
    
    if (path && path.length > 1) {
      return this.getDirectionToPosition(head, path[1]);
    }
    
    return this.getFallbackDirection(snake, currentDirection);
  }

  // A* pathfinding algorithm
  findPathToFood(snake, start, goal) {
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), this.heuristic(start, goal));
    
    while (openSet.length > 0) {
      // Sort by fScore for deterministic behavior
      openSet.sort((a, b) => {
        const aScore = fScore.get(a.toString()) || Infinity;
        const bScore = fScore.get(b.toString()) || Infinity;
        if (aScore === bScore) {
          // Use deterministic tiebreaker
          return a[0] - b[0] || a[1] - b[1];
        }
        return aScore - bScore;
      });
      
      const current = openSet.shift();
      
      if (current[0] === goal[0] && current[1] === goal[1]) {
        return this.reconstructPath(cameFrom, current);
      }
      
      const neighbors = this.getValidNeighbors(current, snake);
      for (const neighbor of neighbors) {
        const tentativeGScore = (gScore.get(current.toString()) || Infinity) + 1;
        
        if (tentativeGScore < (gScore.get(neighbor.toString()) || Infinity)) {
          cameFrom.set(neighbor.toString(), current);
          gScore.set(neighbor.toString(), tentativeGScore);
          fScore.set(neighbor.toString(), tentativeGScore + this.heuristic(neighbor, goal));
          
          if (!openSet.some(pos => pos[0] === neighbor[0] && pos[1] === neighbor[1])) {
            openSet.push(neighbor);
          }
        }
      }
    }
    
    return null;
  }

  // Manhattan distance heuristic
  heuristic(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  // Get valid neighboring positions
  getValidNeighbors(pos, snake) {
    const [x, y] = pos;
    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];
    
    return neighbors.filter(([nx, ny]) => {
      if (nx < 0 || nx >= this.gridSize || ny < 0 || ny >= this.gridSize) return false;
      return !snake.some(segment => segment[0] === nx && segment[1] === ny);
    });
  }

  // Deterministic fallback direction
  getFallbackDirection(snake, currentDirection) {
    const head = snake[0];
    const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    const currentIndex = directions.indexOf(currentDirection);
    
    // Try each direction in order until we find a valid move
    for (let i = 0; i < 4; i++) {
      const testIndex = (currentIndex + i) % 4;
      const testDirection = directions[testIndex];
      
      if (this.isValidMove(head, testDirection, snake)) {
        return testDirection;
      }
    }
    
    return currentDirection;
  }
}
          `}
        />
      )}
    </div>
  );
};

export default SnakeAIDemo; 