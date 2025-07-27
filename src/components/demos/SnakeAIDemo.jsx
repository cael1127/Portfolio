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
  const [nnVisualization, setNnVisualization] = useState({
    inputs: [],
    hidden: [],
    outputs: [],
    decision: '',
    exploration: false
  });
  
  // AI tracking variables
  const [gameTime, setGameTime] = useState(0);
  const [lastMoveWasSuccessful, setLastMoveWasSuccessful] = useState(false);
  const [lastFoodDistance, setLastFoodDistance] = useState(0);
  
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
    
    // CLEAR GOAL SIGNAL - Food eating is the primary objective
    const head = snake[0];
    const foodDir = [
      food[0] - head[0], // X direction
      food[1] - head[1], // Y direction
    ];
    
    // 1. FOOD DISTANCE (Primary goal)
    inputs.push(foodDir[0] / GRID_SIZE); // X distance to food
    inputs.push(foodDir[1] / GRID_SIZE); // Y distance to food
    inputs.push((Math.abs(foodDir[0]) + Math.abs(foodDir[1])) / (GRID_SIZE * 2)); // Total distance to food
    
    // 2. DANGER DETECTION (Survival)
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
    
    // 3. CURRENT DIRECTION (Context)
    const dirIndex = ['UP', 'RIGHT', 'DOWN', 'LEFT'].indexOf(directionRef.current);
    for (let i = 0; i < 4; i++) {
      inputs.push(i === dirIndex ? 1 : 0);
    }
    
    // 4. FOOD DIRECTION PREFERENCE (Clear movement hints)
    inputs.push(foodDir[0] > 0 ? 1 : 0); // Food is to the right
    inputs.push(foodDir[0] < 0 ? 1 : 0); // Food is to the left
    inputs.push(foodDir[1] > 0 ? 1 : 0); // Food is below
    inputs.push(foodDir[1] < 0 ? 1 : 0); // Food is above
    
    // 5. SAFE MOVEMENT TOWARDS FOOD (Smart hints)
    inputs.push(foodDir[0] > 0 && directionRef.current !== 'LEFT' ? 1 : 0); // Can go right safely
    inputs.push(foodDir[0] < 0 && directionRef.current !== 'RIGHT' ? 1 : 0); // Can go left safely
    inputs.push(foodDir[1] > 0 && directionRef.current !== 'UP' ? 1 : 0); // Can go down safely
    inputs.push(foodDir[1] < 0 && directionRef.current !== 'DOWN' ? 1 : 0); // Can go up safely
    
    // 6. WALL DISTANCE (Boundary awareness)
    inputs.push(head[0] / GRID_SIZE); // Distance to left wall
    inputs.push((GRID_SIZE - head[0]) / GRID_SIZE); // Distance to right wall
    inputs.push(head[1] / GRID_SIZE); // Distance to top wall
    inputs.push((GRID_SIZE - head[1]) / GRID_SIZE); // Distance to bottom wall
    
    // 7. PERFORMANCE METRICS (Reward signals)
    inputs.push(snake.length / 50); // Snake length (normalized)
    inputs.push(score / 500); // Score (normalized)
    
    // 8. FOOD PROXIMITY (Urgency signal)
    const distanceToFood = Math.abs(foodDir[0]) + Math.abs(foodDir[1]);
    inputs.push(distanceToFood < 2 ? 1 : 0); // Food is very close
    inputs.push(distanceToFood < 5 ? 1 : 0); // Food is close
    
    // 9. SURVIVAL TIME (Encourage longer survival)
    inputs.push(Math.min(gameTime / 1000, 1)); // Survival time (normalized)
    
    // 10. LAST MOVE SUCCESS (Learning from recent actions)
    inputs.push(lastMoveWasSuccessful ? 1 : 0); // Did last move help?
    
    return inputs;
  };

  // AI decision making - IMPROVED RULE-BASED SYSTEM WITH BETTER NEURAL NETWORK TRANSITION
  const getAIMove = () => {
    try {
      const head = snake[0];
      const foodDir = [food[0] - head[0], food[1] - head[1]];
      
      // IMPROVED RULE-BASED AI FOR EARLY GENERATIONS
      const currentGen = generationRef.current;
      if (currentGen <= 15) {
        // Use enhanced rules for early generations
        const safeDirections = [];
        const directions = [
          { dir: 'UP', dx: 0, dy: -1 },
          { dir: 'RIGHT', dx: 1, dy: 0 },
          { dir: 'DOWN', dx: 0, dy: 1 },
          { dir: 'LEFT', dx: -1, dy: 0 }
        ];
        
        // Find safe directions
        directions.forEach(({ dir, dx, dy }) => {
          const newHead = [head[0] + dx, head[1] + dy];
          const isSafe = 
            newHead[0] >= 0 && newHead[0] < GRID_SIZE &&
            newHead[1] >= 0 && newHead[1] < GRID_SIZE &&
            !snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
          
          if (isSafe) {
            safeDirections.push(dir);
          }
        });
        
        if (safeDirections.length === 0) {
          return ['UP', 'RIGHT', 'DOWN', 'LEFT'][Math.floor(Math.random() * 4)];
        }
        
        // ENHANCED SCORING SYSTEM - Prioritize food eating and survival
        let bestDirection = safeDirections[0];
        let bestScore = -Infinity;
        
        safeDirections.forEach(dir => {
          let score = 0;
          const newHead = [head[0], head[1]];
          
          switch (dir) {
            case 'UP': newHead[1] -= 1; break;
            case 'RIGHT': newHead[0] += 1; break;
            case 'DOWN': newHead[1] += 1; break;
            case 'LEFT': newHead[0] -= 1; break;
          }
          
          // Score based on distance to food
          const newDistance = Math.abs(newHead[0] - food[0]) + Math.abs(newHead[1] - food[1]);
          const currentDistance = Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1]);
          
          if (newDistance < currentDistance) {
            score += 20; // Moving towards food is very good
          } else if (newDistance > currentDistance) {
            score -= 10; // Moving away from food is bad
          }
          
          // Bonus for moving directly towards food
          if (foodDir[0] > 0 && dir === 'RIGHT') score += 15;
          if (foodDir[0] < 0 && dir === 'LEFT') score += 15;
          if (foodDir[1] > 0 && dir === 'DOWN') score += 15;
          if (foodDir[1] < 0 && dir === 'UP') score += 15;
          
          // Bonus for staying away from walls
          const wallDistance = Math.min(newHead[0], newHead[1], GRID_SIZE - 1 - newHead[0], GRID_SIZE - 1 - newHead[1]);
          score += wallDistance * 2; // Prefer positions away from walls
          
          // Bonus for moving towards center when no clear food direction
          if (Math.abs(foodDir[0]) < 2 && Math.abs(foodDir[1]) < 2) {
            const centerDistance = Math.abs(newHead[0] - GRID_SIZE/2) + Math.abs(newHead[1] - GRID_SIZE/2);
            score += (GRID_SIZE - centerDistance) * 0.5;
          }
          
          if (score > bestScore) {
            bestScore = score;
            bestDirection = dir;
          }
        });
        
        // Update visualization for rule-based decisions
        const currentDistance = Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1]);
        setNnVisualization({
          inputs: [foodDir[0], foodDir[1], currentDistance, ...safeDirections.map(d => d === bestDirection ? 1 : 0)],
          hidden: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
          outputs: [0.25, 0.25, 0.25, 0.25],
          decision: bestDirection,
          exploration: false
        });
        
        return bestDirection;
      }
      
      // HYBRID SYSTEM FOR MIDDLE GENERATIONS (16-30)
      if (currentGen <= 30) {
        // Mix rule-based and neural network
        const ruleBasedMove = getRuleBasedMove(head, food, snake);
        const nnMove = getNeuralNetworkMove(head, food);
        
        // Use rule-based 70% of the time, neural network 30%
        const useRuleBased = Math.random() < 0.7;
        const finalMove = useRuleBased ? ruleBasedMove : nnMove;
        
        setNnVisualization({
          inputs: [foodDir[0], foodDir[1], Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1])],
          hidden: [0.6, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
          outputs: [0.25, 0.25, 0.25, 0.25],
          decision: finalMove,
          exploration: !useRuleBased
        });
        
        return finalMove;
      }
      
      // PURE NEURAL NETWORK FOR LATER GENERATIONS
      return getNeuralNetworkMove(head, food);
    } catch (error) {
      // Fallback to a safe direction
      return 'RIGHT';
    }
  };

  // Helper function for rule-based moves
  const getRuleBasedMove = (head, food, snake) => {
    const foodDir = [food[0] - head[0], food[1] - head[1]];
    const directions = [
      { dir: 'UP', dx: 0, dy: -1 },
      { dir: 'RIGHT', dx: 1, dy: 0 },
      { dir: 'DOWN', dx: 0, dy: 1 },
      { dir: 'LEFT', dx: -1, dy: 0 }
    ];
    
    const safeDirections = directions.filter(({ dir, dx, dy }) => {
      const newHead = [head[0] + dx, head[1] + dy];
      return newHead[0] >= 0 && newHead[0] < GRID_SIZE &&
             newHead[1] >= 0 && newHead[1] < GRID_SIZE &&
             !snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
    });
    
    if (safeDirections.length === 0) return 'RIGHT';
    
    // Simple rule: move towards food if safe
    let bestDir = safeDirections[0].dir;
    let bestScore = -Infinity;
    
    safeDirections.forEach(({ dir, dx, dy }) => {
      const newHead = [head[0] + dx, head[1] + dy];
      const newDistance = Math.abs(newHead[0] - food[0]) + Math.abs(newHead[1] - food[1]);
      const currentDistance = Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1]);
      
      let score = 0;
      if (newDistance < currentDistance) score += 10;
      if (foodDir[0] > 0 && dir === 'RIGHT') score += 5;
      if (foodDir[0] < 0 && dir === 'LEFT') score += 5;
      if (foodDir[1] > 0 && dir === 'DOWN') score += 5;
      if (foodDir[1] < 0 && dir === 'UP') score += 5;
      
      if (score > bestScore) {
        bestScore = score;
        bestDir = dir;
      }
    });
    
    return bestDir;
  };

  // Helper function for neural network moves
  const getNeuralNetworkMove = (head, food) => {
    if (!modelRef.current) {
      return 'RIGHT';
    }
    
    // Use neural network for decision making
    const inputs = getAIInputs();
    const outputs = modelRef.current.feedForward(inputs);
    
    // Get hidden layer activations for visualization
    const hidden = [];
    for (let j = 0; j < modelRef.current.hiddenNodes; j++) {
      let sum = modelRef.current.biasH[0][j];
      for (let i = 0; i < modelRef.current.inputNodes; i++) {
        sum += inputs[i] * modelRef.current.weightsIH[i][j];
      }
      hidden[j] = modelRef.current.sigmoid(sum);
    }
    
    // ADD NOISE TO PREVENT STUCK PATTERNS
    const noisyOutputs = outputs.map(output => {
      const noise = (Math.random() - 0.5) * 0.1; // Reduced noise for later generations
      return Math.max(0, Math.min(1, output + noise)); // Clamp between 0 and 1
    });
    
    // Use neural network output
    const maxIndex = noisyOutputs.indexOf(Math.max(...noisyOutputs));
    const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    const newDirection = directions[maxIndex];
    
    // Update visualization data
    setNnVisualization({
      inputs: inputs.slice(0, 10), // Show first 10 inputs
      hidden: hidden.slice(0, 8), // Show first 8 hidden nodes
      outputs: noisyOutputs,
      decision: newDirection,
      exploration: false
    });
    
    return newDirection;
  };

  // Game logic
  const moveSnake = () => {
    if (gameState !== 'playing') {
      return;
    }

    // Update game time for AI
    setGameTime(prev => prev + 1);

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]];
      const oldLength = newSnake.length;
      
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
          head[0] = head[0] + 1; // Default to RIGHT
          break;
      }
      
      // Check wall collision
      if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
        gameOver();
        return prevSnake;
      }
      
      // Check collision with self
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        gameOver();
        return prevSnake;
      }
      
      // Check if food is eaten BEFORE adding head to snake
      const foodEaten = head[0] === food[0] && head[1] === food[1];
      
      // Track food distance for AI learning
      const currentFoodDistance = Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1]);
      const movedCloserToFood = currentFoodDistance < lastFoodDistance;
      
      if (foodEaten) {
        setLastMoveWasSuccessful(true); // Food eating is always successful
      } else {
        // Track if the move brought us closer to food
        setLastMoveWasSuccessful(movedCloserToFood);
      }
      
      setLastFoodDistance(currentFoodDistance);
      
      newSnake.unshift(head);
      
      if (foodEaten) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
        generateFood();
      } else {
        newSnake.pop();
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
    
    setFood(newFood);
  };

  const gameOver = () => {
    // PREVENT MULTIPLE GENERATIONS PER DEATH
    if (isRestarting) {
      return;
    }
    
    deathCountRef.current += 1;
    if (aiMode) {
      setIsRestarting(true); // PREVENT MULTIPLE RESTARTS
      
      // IMPROVED FITNESS CALCULATION - Encourage better learning
      const survivalTime = score; // Each food eaten = 1 point, so score represents survival time
      const lengthBonus = snake.length * 20; // Higher bonus for longer snake
      const explorationBonus = Math.min(score * 5, 100); // Much higher bonus for eating multiple foods
      const efficiencyBonus = snake.length > 1 ? (score / snake.length) * 10 : 0; // Bonus for efficient pathfinding
      const foodEatingBonus = score * 50; // Massive bonus for actually eating food
      
      const currentFitness = survivalTime + lengthBonus + explorationBonus + efficiencyBonus + foodEatingBonus;
      setFitness(currentFitness);
      fitnessRef.current = currentFitness;
      
      // TRACK BEST PERFORMING MODEL
      if (currentFitness > bestFitnessRef.current) {
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
          if (bestModel) {
            modelRef.current = bestModel;
            setModel(bestModel);
          } else {
            const newModel = new NeuralNetwork(25, 16, 4);
            modelRef.current = newModel;
            setModel(newModel);
          }
          setStuckCount(0);
          stuckCountRef.current = 0;
        }
      }
      
      setAiRestarting(true);
      
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
        setGeneration(newGen);
        generationRef.current = newGen;
      }
      
      // Auto-restart for AI learning - SINGLE DELAY, NO NESTED TIMEOUTS
      setTimeout(() => {
        setScore(0);
        setSnake([[10, 10]]);
        setFood([15, 15]);
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        setGameState('playing');
        setAiRestarting(false);
        setIsRestarting(false);
        setGameTime(0);
        setLastMoveWasSuccessful(false);
        setLastFoodDistance(0);
        generateFood();
      }, 1000);
    } else {
      setGameState('gameOver');
    }
  };

  const startGame = (ai = false) => {
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
      // Create model immediately
      const neuralNetwork = new NeuralNetwork(25, 16, 4); // FIXED: 25 inputs, 16 hidden, 4 outputs
      setModel(neuralNetwork);
      modelRef.current = neuralNetwork; // SET MODEL REF
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
      const interval = setInterval(() => {
        
        if (aiMode) {
          try {
            const aiDirection = getAIMove();
            if (aiDirection && ['UP', 'RIGHT', 'DOWN', 'LEFT'].includes(aiDirection)) {
              updateDirection(aiDirection);
            }
          } catch (error) {
            console.error('Error in AI decision:', error);
            // Keep current direction as fallback
          }
        }
        
        moveSnake();
      }, aiMode ? 400 : 200); // SLOWER for AI to prevent rapid resets
      
      gameLoopRef.current = interval;
      
      return () => {
        clearInterval(interval);
        gameLoopRef.current = null;
      };
    } else {
      return () => {
        // No-op if game is not playing
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
    
    // Draw grid coordinates for debugging
    ctx.fillStyle = '#6b7280';
    ctx.font = '8px Arial';
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        ctx.fillText(`${x},${y}`, x * CELL_SIZE + 2, y * CELL_SIZE + 8);
      }
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
                  <>
                    <button
                      onClick={() => setGameState('paused')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Pause
                    </button>
                  </>
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
              
              {/* Neural Network Visualization */}
              {aiMode && (
                <div className="mt-6 bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">🧠 Neural Network Live Visualization</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Input Layer */}
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">Input Layer (First 10)</h4>
                      <div className="space-y-1">
                        {nnVisualization.inputs.map((value, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <div className="flex-1 bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-blue-400 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${Math.abs(value) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300 w-8 text-right">
                              {value.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hidden Layer */}
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-400 mb-3">Hidden Layer (First 8)</h4>
                      <div className="space-y-1">
                        {nnVisualization.hidden.map((value, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <div className="flex-1 bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-green-400 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${value * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300 w-8 text-right">
                              {value.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Output Layer */}
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-red-400 mb-3">Output Layer</h4>
                      <div className="space-y-1">
                        {['UP', 'RIGHT', 'DOWN', 'LEFT'].map((direction, index) => (
                          <div key={direction} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${nnVisualization.decision === direction ? 'bg-red-400' : 'bg-gray-500'}`}></div>
                            <div className="flex-1 bg-gray-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-200 ${nnVisualization.decision === direction ? 'bg-red-400' : 'bg-gray-500'}`}
                                style={{ width: `${(nnVisualization.outputs[index] || 0) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300 w-8 text-right">
                              {(nnVisualization.outputs[index] || 0).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decision Info */}
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Decision:</span>
                      <span className={`font-semibold ${nnVisualization.exploration ? 'text-yellow-400' : 'text-blue-400'}`}>
                        {nnVisualization.decision} {nnVisualization.exploration ? '(Exploration)' : '(Neural Network)'}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      <span>Max Output: {(Math.max(...(nnVisualization.outputs || [0])) || 0).toFixed(3)}</span>
                      <span className="ml-4">Exploration Rate: {((generation < 3 ? 0.1 : Math.max(0.05, 0.15 - (generation * 0.02))) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}
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
                  <span className="text-white">25</span>
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