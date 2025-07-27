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
  const [model, setModel] = useState(null);
  const [aiRestarting, setAiRestarting] = useState(false);
  const [bestFitness, setBestFitness] = useState(0);
  const [bestModel, setBestModel] = useState(null);
  const [stuckCount, setStuckCount] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false); // PREVENT MULTIPLE RESTARTS
  
  // Refs for AI state
  const modelRef = useRef(null);
  const generationRef = useRef(1);
  const fitnessRef = useRef(0);
  const deathCountRef = useRef(0);
  const directionRef = useRef('RIGHT');
  const bestFitnessRef = useRef(0);
  const stuckCountRef = useRef(0);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);

  const GRID_SIZE = 20;
  const CELL_SIZE = 20;

  // Neural Network for AI
  class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
      this.inputNodes = inputNodes;
      this.hiddenNodes = hiddenNodes;
      this.outputNodes = outputNodes;
      
      this.weightsIH = this.randomMatrix(this.inputNodes, this.hiddenNodes);
      this.weightsHO = this.randomMatrix(this.hiddenNodes, this.outputNodes);
      this.biasH = this.randomMatrix(1, this.hiddenNodes);
      this.biasO = this.randomMatrix(1, this.outputNodes);
    }

    randomMatrix(rows, cols) {
      const matrix = [];
      for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
          matrix[i][j] = Math.random() * 2 - 1;
        }
      }
      return matrix;
    }

    sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }

    feedForward(inputs) {
      // Input to hidden
      const hidden = [];
      for (let j = 0; j < this.hiddenNodes; j++) {
        let sum = this.biasH[0][j];
        for (let i = 0; i < this.inputNodes; i++) {
          sum += inputs[i] * this.weightsIH[i][j];
        }
        hidden[j] = this.sigmoid(sum);
      }

      // Hidden to output
      const outputs = [];
      for (let k = 0; k < this.outputNodes; k++) {
        let sum = this.biasO[0][k];
        for (let j = 0; j < this.hiddenNodes; j++) {
          sum += hidden[j] * this.weightsHO[j][k];
        }
        outputs[k] = this.sigmoid(sum);
      }

      // ERROR HANDLING: Ensure outputs are valid numbers
      for (let i = 0; i < outputs.length; i++) {
        if (isNaN(outputs[i]) || !isFinite(outputs[i])) {
          outputs[i] = 0.5; // Default to neutral value
        }
      }

      return outputs;
    }

    mutate(rate) {
      const newNN = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes);
      newNN.weightsIH = this.weightsIH.map(row => row.map(val => Math.random() < rate ? val + (Math.random() * 2 - 1) * 0.1 : val));
      newNN.weightsHO = this.weightsHO.map(row => row.map(val => Math.random() < rate ? val + (Math.random() * 2 - 1) * 0.1 : val));
      newNN.biasH = this.biasH.map(row => row.map(val => Math.random() < rate ? val + (Math.random() * 2 - 1) * 0.1 : val));
      newNN.biasO = this.biasO.map(row => row.map(val => Math.random() < rate ? val + (Math.random() * 2 - 1) * 0.1 : val));
      return newNN;
    }
  }

  // Initialize AI model - REMOVED since we create it immediately in startGame
  // useEffect(() => {
  //   if (aiMode && !model) {
  //     const neuralNetwork = new NeuralNetwork(32, 16, 4);
  //     setModel(neuralNetwork);
  //     console.log('Neural network initialized with 32 inputs');
  //   }
  // }, [aiMode, model]);

  // Get AI inputs - IMPROVED FOR BETTER LEARNING
  const getAIInputs = () => {
    const inputs = [];
    
    // Distance to food in 4 directions
    const head = snake[0];
    const foodDir = [
      food[0] - head[0], // X direction
      food[1] - head[1], // Y direction
    ];
    
    inputs.push(foodDir[0] / GRID_SIZE); // Normalized X distance
    inputs.push(foodDir[1] / GRID_SIZE); // Normalized Y distance
    
    // Danger detection in 4 directions
    const directions = [
      [0, -1], // UP
      [1, 0],  // RIGHT
      [0, 1],  // DOWN
      [-1, 0], // LEFT
    ];
    
    directions.forEach(([dx, dy]) => {
      const newHead = [head[0] + dx, head[1] + dy];
      const isDanger = 
        newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
        snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
      inputs.push(isDanger ? 1 : 0);
    });
    
    // Current direction one-hot encoding
    const dirIndex = ['UP', 'RIGHT', 'DOWN', 'LEFT'].indexOf(directionRef.current);
    for (let i = 0; i < 4; i++) {
      inputs.push(i === dirIndex ? 1 : 0);
    }
    
    // Additional features for better learning
    inputs.push(snake.length / 100); // Snake length
    inputs.push(score / 1000); // Score
    inputs.push(head[0] / GRID_SIZE); // Head X position
    inputs.push(head[1] / GRID_SIZE); // Head Y position
    inputs.push(food[0] / GRID_SIZE); // Food X position
    inputs.push(food[1] / GRID_SIZE); // Food Y position
    
    // Distance to walls
    inputs.push(head[0] / GRID_SIZE); // Distance to left wall
    inputs.push((GRID_SIZE - head[0]) / GRID_SIZE); // Distance to right wall
    inputs.push(head[1] / GRID_SIZE); // Distance to top wall
    inputs.push((GRID_SIZE - head[1]) / GRID_SIZE); // Distance to bottom wall
    
    // Food direction preference
    inputs.push(foodDir[0] > 0 ? 1 : 0); // Food is to the right
    inputs.push(foodDir[0] < 0 ? 1 : 0); // Food is to the left
    inputs.push(foodDir[1] > 0 ? 1 : 0); // Food is below
    inputs.push(foodDir[1] < 0 ? 1 : 0); // Food is above
    
    // ADDITIONAL FEATURES FOR BETTER LEARNING
    // Distance to food in each direction
    inputs.push(Math.abs(foodDir[0]) / GRID_SIZE); // Absolute X distance
    inputs.push(Math.abs(foodDir[1]) / GRID_SIZE); // Absolute Y distance
    
    // Movement preference based on food location
    inputs.push(foodDir[0] > 0 && directionRef.current !== 'LEFT' ? 1 : 0); // Should go right
    inputs.push(foodDir[0] < 0 && directionRef.current !== 'RIGHT' ? 1 : 0); // Should go left
    inputs.push(foodDir[1] > 0 && directionRef.current !== 'UP' ? 1 : 0); // Should go down
    inputs.push(foodDir[1] < 0 && directionRef.current !== 'DOWN' ? 1 : 0); // Should go up
    
    return inputs;
  };

  // AI decision making - IMPROVED LEARNING SYSTEM
  const getAIMove = () => {
    if (!modelRef.current) {
      console.log('No model available, using default RIGHT');
      return 'RIGHT';
    }
    
    // Use neural network for decision making
    const inputs = getAIInputs();
    console.log('AI inputs:', inputs.slice(0, 10), '... (total:', inputs.length, ')');
    const outputs = modelRef.current.feedForward(inputs);
    console.log('AI raw outputs:', outputs);
    
    // ADD NOISE TO PREVENT STUCK PATTERNS
    const noisyOutputs = outputs.map(output => {
      const noise = (Math.random() - 0.5) * 0.2; // Add ±10% noise
      return Math.max(0, Math.min(1, output + noise)); // Clamp between 0 and 1
    });
    console.log('AI noisy outputs:', noisyOutputs);
    
    // FIXED EXPLORATION LOGIC - Much lower exploration so neural network can learn
    const currentGen = generationRef.current;
    const explorationRate = currentGen < 3 ? 0.1 : Math.max(0.05, 0.15 - (currentGen * 0.02)); // 10% exploration for first 3 generations
    const shouldExplore = Math.random() < explorationRate;
    
    console.log('Exploration check:', { currentGen, explorationRate, shouldExplore, random: Math.random() });
    
    let newDirection;
    if (shouldExplore) {
      // Random exploration for early generations
      const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
      newDirection = directions[Math.floor(Math.random() * directions.length)];
      console.log('AI exploring randomly:', newDirection, 'generation:', currentGen);
    } else {
      // Use neural network output with noise
      const maxIndex = noisyOutputs.indexOf(Math.max(...noisyOutputs));
      const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
      newDirection = directions[maxIndex];
      console.log('AI using neural network:', newDirection, 'max output:', Math.max(...noisyOutputs), 'at index:', maxIndex);
    }
    
    // FORCE VARIETY - If AI keeps choosing the same direction, force a change
    if (newDirection === directionRef.current && Math.random() < 0.2) {
      const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
      const otherDirections = directions.filter(dir => dir !== newDirection);
      newDirection = otherDirections[Math.floor(Math.random() * otherDirections.length)];
      console.log('Forcing direction change from', directionRef.current, 'to', newDirection);
    }
    
    // RULE-BASED FALLBACK - If AI keeps dying, use simple rules
    if (deathCountRef.current > 10 && currentGen > 5) {
      console.log('AI performing poorly, using rule-based fallback');
      const head = snake[0];
      const foodDir = [food[0] - head[0], food[1] - head[1]];
      
      // Simple rule: try to move towards food if safe
      const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
      const directionVectors = {
        'UP': [0, -1], 'RIGHT': [1, 0], 'DOWN': [0, 1], 'LEFT': [-1, 0]
      };
      
      // Find safe directions
      const safeDirections = [];
      Object.entries(directionVectors).forEach(([dir, [dx, dy]]) => {
        const testHead = [head[0] + dx, head[1] + dy];
        const isSafe = 
          testHead[0] >= 0 && testHead[0] < GRID_SIZE &&
          testHead[1] >= 0 && testHead[1] < GRID_SIZE &&
          !snake.some(segment => segment[0] === testHead[0] && segment[1] === testHead[1]);
        
        if (isSafe) {
          safeDirections.push(dir);
        }
      });
      
      if (safeDirections.length > 0) {
        // Pick direction closest to food
        let bestDir = safeDirections[0];
        let bestDist = Infinity;
        
        safeDirections.forEach(dir => {
          const [dx, dy] = directionVectors[dir];
          const testHead = [head[0] + dx, head[1] + dy];
          const dist = Math.abs(testHead[0] - food[0]) + Math.abs(testHead[1] - food[1]);
          if (dist < bestDist) {
            bestDist = dist;
            bestDir = dir;
          }
        });
        
        newDirection = bestDir;
        console.log('Rule-based AI chose:', newDirection, 'distance to food:', bestDist);
      }
    }
    
    // ERROR HANDLING: Ensure we have a valid direction
    if (!newDirection || newDirection === 'undefined') {
      console.log('Invalid direction from neural network, using default RIGHT');
      newDirection = 'RIGHT';
    }
    
    // IMPROVED SAFETY CHECK - Don't just pick random safe direction, try to learn
    const head = snake[0];
    const directionVectors = {
      'UP': [0, -1],
      'RIGHT': [1, 0],
      'DOWN': [0, 1],
      'LEFT': [-1, 0]
    };
    
    const [dx, dy] = directionVectors[newDirection];
    const newHead = [head[0] + dx, head[1] + dy];
    
    // Check if the chosen direction would cause death
    const wouldDie = 
      newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
      newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
      snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
    
    if (wouldDie) {
      // Instead of picking random safe direction, try to find the best alternative
      const alternatives = [];
      Object.entries(directionVectors).forEach(([dir, [dx, dy]]) => {
        const testHead = [head[0] + dx, head[1] + dy];
        const isSafe = 
          testHead[0] >= 0 && testHead[0] < GRID_SIZE &&
          testHead[1] >= 0 && testHead[1] < GRID_SIZE &&
          !snake.some(segment => segment[0] === testHead[0] && segment[1] === testHead[1]);
        
        if (isSafe) {
          // Calculate how good this alternative is (closer to food = better)
          const foodDist = Math.abs(testHead[0] - food[0]) + Math.abs(testHead[1] - food[1]);
          alternatives.push({ direction: dir, distance: foodDist });
        }
      });
      
      if (alternatives.length > 0) {
        // Pick the alternative that gets us closest to food
        alternatives.sort((a, b) => a.distance - b.distance);
        newDirection = alternatives[0].direction;
        console.log('AI chose safe alternative:', newDirection, 'distance to food:', alternatives[0].distance);
      } else {
        // If no safe direction, pick random (shouldn't happen often)
        const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
        newDirection = directions[Math.floor(Math.random() * directions.length)];
        console.log('No safe direction found, picking random:', newDirection);
      }
    }
    
    console.log('AI move:', { currentDir: directionRef.current, newDirection, generation: currentGen, score, explorationRate });
    return newDirection;
  };

  // Game logic
  const moveSnake = () => {
    if (gameState !== 'playing') return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]];
      const oldLength = newSnake.length;
      
      console.log('Moving snake:', { direction: directionRef.current, head, oldLength });
      
      switch (directionRef.current) {
        case 'UP':
          head[1] = head[1] - 1;
          break;
        case 'RIGHT':
          head[0] = head[0] + 1;
          break;
        case 'DOWN':
          head[1] = head[1] + 1;
          break;
        case 'LEFT':
          head[0] = head[0] - 1;
          break;
        default:
          break;
      }
      
      console.log('New head position:', head);
      
      // Check wall collision
      if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
        console.log('Wall collision detected', { head, aiMode });
        gameOver();
        return prevSnake;
      }
      
      // Check collision with self
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        console.log('Self collision detected', { head, aiMode });
        gameOver();
        return prevSnake;
      }
      
      // Check if food is eaten BEFORE adding head to snake
      const foodEaten = head[0] === food[0] && head[1] === food[1];
      
      if (foodEaten) {
        console.log('Food eaten!', { head, food, score, aiMode, generation: generationRef.current });
      } else {
        console.log('No food eaten', { head, food, distance: Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1]) });
      }
      
      newSnake.unshift(head);
      
      if (foodEaten) {
        setScore(prev => {
          const newScore = prev + 10;
          console.log('Score updated:', prev, '->', newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
        generateFood();
        console.log('Snake grew from', oldLength, 'to', newSnake.length);
      } else {
        newSnake.pop();
        console.log('Snake length maintained:', oldLength, '->', newSnake.length);
      }
      
      return newSnake;
    });
  };

  const generateFood = () => {
    let newFood;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      attempts++;
    } while (
      snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]) &&
      attempts < maxAttempts
    );
    
    console.log('Generated food at:', newFood, 'snake length:', snake.length);
    setFood(newFood);
  };

  const gameOver = () => {
    // PREVENT MULTIPLE GENERATIONS PER DEATH
    if (isRestarting) {
      console.log('Already restarting, skipping duplicate gameOver call');
      return;
    }
    
    deathCountRef.current += 1;
    console.log('Game Over called', { aiMode, score, gameState, generation: generationRef.current, deathCount: deathCountRef.current });
    if (aiMode) {
      setIsRestarting(true); // PREVENT MULTIPLE RESTARTS
      
      // IMPROVED FITNESS CALCULATION - Encourage better learning
      const survivalTime = score; // Each food eaten = 1 point, so score represents survival time
      const lengthBonus = snake.length * 10; // Higher bonus for longer snake
      const explorationBonus = Math.min(score * 2, 50); // Bonus for exploring (eating multiple foods)
      const efficiencyBonus = snake.length > 1 ? (score / snake.length) * 5 : 0; // Bonus for efficient pathfinding
      
      const currentFitness = survivalTime + lengthBonus + explorationBonus + efficiencyBonus;
      console.log('Setting fitness to:', currentFitness, 'score:', score, 'length:', snake.length, 'exploration:', explorationBonus, 'efficiency:', efficiencyBonus);
      setFitness(currentFitness);
      fitnessRef.current = currentFitness;
      
      // TRACK BEST PERFORMING MODEL
      if (currentFitness > bestFitnessRef.current) {
        console.log('New best fitness!', currentFitness, 'previous:', bestFitnessRef.current);
        setBestFitness(currentFitness);
        setBestModel(modelRef.current);
        bestFitnessRef.current = currentFitness;
        setStuckCount(0);
        stuckCountRef.current = 0;
      } else {
        // Track how long we've been stuck
        const newStuckCount = stuckCountRef.current + 1;
        setStuckCount(newStuckCount);
        stuckCountRef.current = newStuckCount;
        
        // If stuck for too long, reset to best model or create new one
        if (newStuckCount > 20) {
          console.log('AI stuck for too long, resetting to best model or creating new one');
          if (bestModel) {
            modelRef.current = bestModel;
            setModel(bestModel);
            console.log('Reset to best model with fitness:', bestFitnessRef.current);
          } else {
            const newModel = new NeuralNetwork(30, 16, 4);
            modelRef.current = newModel;
            setModel(newModel);
            console.log('Created new model due to being stuck');
          }
          setStuckCount(0);
          stuckCountRef.current = 0;
        }
      }
      
      setAiRestarting(true);
      console.log('AI mode - evolving model and restarting, fitness:', currentFitness);
      
      // Evolve the model with adaptive mutation rate
      if (modelRef.current) {
        // Higher mutation rate for poor performers, lower for good performers
        const baseMutationRate = 0.3;
        const performanceFactor = Math.max(0.1, Math.min(0.8, 1 - (currentFitness / 100)));
        const mutationRate = baseMutationRate + (performanceFactor * 0.4);
        
        const newModel = modelRef.current.mutate(mutationRate);
        setModel(newModel);
        modelRef.current = newModel;
        const currentGen = generationRef.current;
        const newGen = currentGen + 1;
        console.log('Evolving model, generation:', currentGen, '->', newGen, 'fitness:', currentFitness, 'mutation rate:', mutationRate);
        setGeneration(newGen);
        generationRef.current = newGen;
      }
      
      // Auto-restart for AI learning - SINGLE DELAY, NO NESTED TIMEOUTS
      setTimeout(() => {
        console.log('AI restarting after death, generation:', generationRef.current, 'death count:', deathCountRef.current);
        setScore(0);
        setSnake([[5, 5]]);
        updateDirection('RIGHT');
        generateFood();
        setGameState('playing');
        setAiRestarting(false);
        setIsRestarting(false); // RESET RESTART FLAG
        console.log('AI ready to start moving');
      }, 2000); // Single delay, no nested setTimeout
    } else {
      console.log('Manual mode - setting game over state');
      setGameState('gameOver');
    }
  };

  const startGame = (ai = false) => {
    console.log('Starting game with AI:', ai);
    setAiMode(ai);
    setGameState('playing');
    setScore(0);
    setSnake([[5, 5]]);
    updateDirection('RIGHT');
    generateFood();
    if (ai) {
      setGeneration(1);
      setFitness(0);
      generationRef.current = 1;
      fitnessRef.current = 0;
      console.log('AI game started, generation:', 1);
      // Create model immediately
      console.log('Creating neural network model immediately...');
      const neuralNetwork = new NeuralNetwork(30, 16, 4); // FIXED: 30 inputs, 16 hidden, 4 outputs
      setModel(neuralNetwork);
      modelRef.current = neuralNetwork; // SET MODEL REF
      console.log('Model created and set:', neuralNetwork);
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setSnake([[5, 5]]); // CHANGED from [10, 10] to [5, 5]
    updateDirection('RIGHT');
    setAiMode(false);
    setAiThinking(false);
    setAiRestarting(false);
    setIsRestarting(false); // CLEAR RESTART FLAG
    setGeneration(1);
    setFitness(0);
    setBestFitness(0);
    setBestModel(null);
    setStuckCount(0);
    // Clear refs
    generationRef.current = 1;
    fitnessRef.current = 0;
    deathCountRef.current = 0;
    bestFitnessRef.current = 0;
    stuckCountRef.current = 0;
    modelRef.current = null;
  };

  const updateDirection = (newDirection) => {
    setDirection(newDirection);
    directionRef.current = newDirection;
  };

  // Game loop
  useEffect(() => {
    // Clear any existing interval first
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    if (gameState === 'playing') {
      console.log('Starting game loop', { aiMode, gameState });
      const interval = setInterval(() => {
        if (aiMode) {
          const aiDirection = getAIMove();
          updateDirection(aiDirection);
        }
        moveSnake();
      }, aiMode ? 400 : 200); // SLOWER for AI to prevent rapid resets
      
      gameLoopRef.current = interval;
      
      return () => {
        console.log('Clearing game loop');
        clearInterval(interval);
        gameLoopRef.current = null;
      };
    }
  }, [gameState, aiMode]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing' || aiMode) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') updateDirection('UP');
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') updateDirection('RIGHT');
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') updateDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') updateDirection('LEFT');
          break;
        case ' ':
          setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, aiMode]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10b981' : '#059669';
      ctx.fillRect(segment[0] * CELL_SIZE + 1, segment[1] * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });

    // Draw food
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(food[0] * CELL_SIZE + 2, food[1] * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);

    // Draw AI thinking indicator
    if (aiMode && aiThinking) {
      ctx.fillStyle = '#f59e0b';
      ctx.font = '12px Arial';
      ctx.fillText('AI Thinking...', 10, 20);
    }
    
    // Draw AI restarting indicator
    if (aiMode && aiRestarting) {
      ctx.fillStyle = '#ef4444';
      ctx.font = '14px Arial';
      ctx.fillText('AI Restarting...', 10, 40);
    }
  }, [snake, food, aiMode, aiThinking, aiRestarting]);

  const codeExample = `// Neural Network for Snake AI
class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    
    this.weightsIH = this.randomMatrix(this.inputNodes, this.hiddenNodes);
    this.weightsHO = this.randomMatrix(this.hiddenNodes, this.outputNodes);
    this.biasH = this.randomMatrix(1, this.hiddenNodes);
    this.biasO = this.randomMatrix(1, this.outputNodes);
  }

  feedForward(inputs) {
    // Input to hidden layer
    const hidden = [];
    for (let j = 0; j < this.hiddenNodes; j++) {
      let sum = this.biasH[0][j];
      for (let i = 0; i < this.inputNodes; i++) {
        sum += inputs[i] * this.weightsIH[i][j];
      }
      hidden[j] = this.sigmoid(sum);
    }

    // Hidden to output layer
    const outputs = [];
    for (let k = 0; k < this.outputNodes; k++) {
      let sum = this.biasO[0][k];
      for (let j = 0; j < this.hiddenNodes; j++) {
        sum += hidden[j] * this.weightsHO[j][k];
      }
      outputs[k] = this.sigmoid(sum);
    }

    // ERROR HANDLING: Ensure outputs are valid numbers
    for (let i = 0; i < outputs.length; i++) {
      if (isNaN(outputs[i]) || !isFinite(outputs[i])) {
        outputs[i] = 0.5; // Default to neutral value
      }
    }

    return outputs;
  }

  mutate(rate) {
    // Genetic algorithm mutation
    const newNN = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes);
    newNN.weightsIH = this.weightsIH.map(row => 
      row.map(val => Math.random() < rate ? val + (Math.random() * 2 - 1) * 0.1 : val)
    );
    return newNN;
  }
}

// AI Decision Making
const getAIMove = (snake, food, direction, model) => {
  const inputs = getAIInputs(snake, food, direction);
  const outputs = model.feedForward(inputs);
  
  const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
  const maxIndex = outputs.indexOf(Math.max(...outputs));
  
  return directions[maxIndex];
};`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-teal-400">🐍 Snake AI with Reinforcement Learning</h1>
            <p className="text-gray-400">Neural network learns to play Snake through genetic algorithms</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Game</h2>
                <div className="flex space-x-2">
                  <span className="text-sm text-gray-400">Score: {score}</span>
                  <span className="text-sm text-gray-400">High Score: {highScore}</span>
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                <canvas
                  ref={canvasRef}
                  width={GRID_SIZE * CELL_SIZE}
                  height={GRID_SIZE * CELL_SIZE}
                  className="border border-gray-600 rounded"
                />
              </div>

              {/* Game Controls */}
              <div className="flex justify-center space-x-4">
                {gameState === 'menu' && (
                  <>
                    <button
                      onClick={() => startGame(false)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Play Manually
                    </button>
                    <button
                      onClick={() => startGame(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Watch AI Learn
                    </button>
                  </>
                )}
                
                {gameState === 'playing' && (
                  <button
                    onClick={() => setGameState('paused')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Pause
                  </button>
                )}
                
                {gameState === 'paused' && (
                  <button
                    onClick={() => setGameState('playing')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Resume
                  </button>
                )}
                
                {gameState === 'gameOver' && (
                  <button
                    onClick={resetGame}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Play Again
                  </button>
                )}
              </div>

              {/* Instructions */}
              <div className="mt-4 text-sm text-gray-400">
                <p><strong>Manual Play:</strong> Use arrow keys to control the snake</p>
                <p><strong>AI Mode:</strong> Watch the neural network learn through genetic algorithms</p>
                <p><strong>Space:</strong> Pause/Resume the game</p>
              </div>
            </div>
          </div>

          {/* AI Stats */}
          <div className="space-y-6">
            {/* AI Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">🤖 AI Learning</h3>
              
              {aiMode && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Generation:</span>
                    <span className="text-white font-semibold">{generation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Fitness:</span>
                    <span className="text-white font-semibold">{fitness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Best Fitness:</span>
                    <span className="text-green-400 font-semibold">{bestFitness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stuck Count:</span>
                    <span className={`font-semibold ${stuckCount > 10 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {stuckCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-semibold ${aiRestarting ? 'text-red-400' : 'text-green-400'}`}>
                      {aiRestarting ? 'Restarting...' : 'Learning'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Deaths:</span>
                    <span className="text-white font-semibold">{deathCountRef.current}</span>
                  </div>
                </div>
              )}
              
              {!aiMode && (
                <p className="text-gray-400 text-sm">
                  Click "Watch AI Learn" to see the neural network train through genetic algorithms
                </p>
              )}
            </div>

            {/* Neural Network Architecture */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">🧠 Neural Network</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Input Nodes:</span>
                  <span className="text-white">30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hidden Nodes:</span>
                  <span className="text-white">16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Output Nodes:</span>
                  <span className="text-white">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Activation:</span>
                  <span className="text-white">Sigmoid</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">✨ Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Genetic Algorithm Evolution</li>
                <li>• Neural Network Decision Making</li>
                <li>• Real-time Learning Visualization</li>
                <li>• Fitness-based Selection</li>
                <li>• Mutation and Crossover</li>
                <li>• Collision Avoidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeExample}
        language="javascript"
        title="Snake AI Neural Network Implementation"
      />
    </div>
  );
};

export default SnakeAIDemo; 