import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const AIAgentsDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [agents, setAgents] = useState([]);
  const [environment, setEnvironment] = useState([]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [stats, setStats] = useState({
    totalResources: 0,
    collectedResources: 0,
    explorationCoverage: 0,
    agentEfficiency: 0
  });
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const ENVIRONMENT_SIZE = 50;
  const CELL_SIZE = 8;

  // Deterministic agent positioning and behavior
  const initializeEnvironment = () => {
    const env = Array(ENVIRONMENT_SIZE).fill(null).map(() => 
      Array(ENVIRONMENT_SIZE).fill('empty')
    );
    
    // Place resources in a deterministic pattern (no randomness)
    for (let i = 0; i < ENVIRONMENT_SIZE; i += 8) {
      for (let j = 0; j < ENVIRONMENT_SIZE; j += 8) {
        if ((i + j) % 16 === 0) {
          env[i][j] = 'resource';
        }
      }
    }
    
    // Place base at center
    const center = Math.floor(ENVIRONMENT_SIZE / 2);
    env[center][center] = 'base';
    
    setEnvironment(env);
    return env;
  };

  const initializeAgents = () => {
    const center = Math.floor(ENVIRONMENT_SIZE / 2);
    const newAgents = [
      // Explorer agents - spread out in a pattern
      { id: 1, type: 'explorer', x: center - 5, y: center - 5, energy: 100, resources: 0, direction: 0, memory: [] },
      { id: 2, type: 'explorer', x: center + 5, y: center - 5, energy: 100, resources: 0, direction: 1, memory: [] },
      { id: 3, type: 'explorer', x: center - 5, y: center + 5, energy: 100, resources: 0, direction: 2, memory: [] },
      
      // Collector agents - near base
      { id: 4, type: 'collector', x: center - 2, y: center, energy: 100, resources: 0, direction: 0, memory: [] },
      { id: 5, type: 'collector', x: center + 2, y: center, energy: 100, resources: 0, direction: 1, memory: [] },
      
      // Defender agent - at base
      { id: 6, type: 'defender', x: center, y: center, energy: 100, resources: 0, direction: 0, memory: [] },
      
      // Coordinator agent - near base
      { id: 7, type: 'coordinator', x: center, y: center - 2, energy: 100, resources: 0, direction: 0, memory: [] }
    ];
    
    setAgents(newAgents);
    return newAgents;
  };

  // Deterministic movement patterns
  const moveAgent = (agent, env) => {
    const newAgent = { ...agent };
    
    switch (agent.type) {
      case 'explorer':
        newAgent.direction = (agent.direction + 1) % 4;
        const [dx, dy] = getDirectionVector(agent.direction);
        newAgent.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, agent.x + dx));
        newAgent.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, agent.y + dy));
        break;
        
      case 'collector':
        // Move towards nearest resource using deterministic pathfinding
        const nearestResource = findNearestResource(agent, env);
        if (nearestResource) {
          const path = getDeterministicPath(agent, nearestResource);
          if (path.length > 1) {
            newAgent.x = path[1].x;
            newAgent.y = path[1].y;
          }
        }
        break;
        
      case 'defender':
        // Patrol in a square pattern around base
        const center = Math.floor(ENVIRONMENT_SIZE / 2);
        const patrolRadius = 3;
        const angle = (step * 0.1) % (2 * Math.PI);
        newAgent.x = center + Math.floor(patrolRadius * Math.cos(angle));
        newAgent.y = center + Math.floor(patrolRadius * Math.sin(angle));
        break;
        
      case 'coordinator':
        // Stay near base, move slightly for visual interest
        const baseCenter = Math.floor(ENVIRONMENT_SIZE / 2);
        newAgent.x = baseCenter + Math.floor(Math.sin(step * 0.05) * 2);
        newAgent.y = baseCenter - 2 + Math.floor(Math.cos(step * 0.05) * 2);
        break;
    }
    
    // Keep within bounds
    newAgent.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, newAgent.x));
    newAgent.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, newAgent.y));
    
    // Update energy and collect resources
    newAgent.energy = Math.max(0, newAgent.energy - 1);
    if (env[newAgent.y] && env[newAgent.y][newAgent.x] === 'resource') {
      newAgent.resources += 10;
      // Mark resource as collected
      env[newAgent.y][newAgent.x] = 'collected';
    }
    
    return newAgent;
  };

  const getDirectionVector = (direction) => {
    const vectors = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // Up, Right, Down, Left
    return vectors[direction];
  };

  const findNearestResource = (agent, env) => {
    let nearest = null;
    let minDistance = Infinity;
    
    for (let y = 0; y < ENVIRONMENT_SIZE; y++) {
      for (let x = 0; x < ENVIRONMENT_SIZE; x++) {
        if (env[y][x] === 'resource') {
          const distance = Math.abs(x - agent.x) + Math.abs(y - agent.y);
          if (distance < minDistance) {
            minDistance = distance;
            nearest = { x, y };
          }
        }
      }
    }
    
    return nearest;
  };

  const getDeterministicPath = (start, end) => {
    // Simple deterministic pathfinding - always move towards target
    const path = [start];
    let current = { ...start };
    
    while (current.x !== end.x || current.y !== end.y) {
      if (current.x < end.x) current.x++;
      else if (current.x > end.x) current.x--;
      
      if (current.y < end.y) current.y++;
      else if (current.y > end.y) current.y--;
      
      path.push({ ...current });
    }
    
    return path;
  };

  const runSimulation = () => {
    if (!simulationRunning) return;
    
    setStep(prev => prev + 1);
    
    // Update agents
    const newAgents = agents.map(agent => moveAgent(agent, environment));
    setAgents(newAgents);
    
    // Update stats
    const totalResources = environment.flat().filter(cell => cell === 'resource').length;
    const collectedResources = newAgents.reduce((sum, agent) => sum + agent.resources, 0);
    const explorationCoverage = calculateExplorationCoverage(newAgents);
    const agentEfficiency = calculateAgentEfficiency(newAgents);
    
    setStats({
      totalResources,
      collectedResources,
      explorationCoverage,
      agentEfficiency
    });
    
    // Continue simulation
    animationRef.current = requestAnimationFrame(runSimulation);
  };

  const calculateExplorationCoverage = (currentAgents) => {
    const exploredCells = new Set();
    currentAgents.forEach(agent => {
      // Mark cells within agent's range as explored
      for (let dx = -3; dx <= 3; dx++) {
        for (let dy = -3; dy <= 3; dy++) {
          const x = agent.x + dx;
          const y = agent.y + dy;
          if (x >= 0 && x < ENVIRONMENT_SIZE && y >= 0 && y < ENVIRONMENT_SIZE) {
            exploredCells.add(`${x},${y}`);
          }
        }
      }
    });
    
    return Math.round((exploredCells.size / (ENVIRONMENT_SIZE * ENVIRONMENT_SIZE)) * 100);
  };

  const calculateAgentEfficiency = (currentAgents) => {
    const totalEnergy = currentAgents.reduce((sum, agent) => sum + agent.energy, 0);
    const totalResources = currentAgents.reduce((sum, agent) => sum + agent.resources, 0);
    return Math.round((totalResources / (totalEnergy + 1)) * 100);
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setStep(0);
    runSimulation();
  };

  const stopSimulation = () => {
    setSimulationRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetSimulation = () => {
    stopSimulation();
    const env = initializeEnvironment();
    const newAgents = initializeAgents();
    setStep(0);
    setStats({
      totalResources: env.flat().filter(cell => cell === 'resource').length,
      collectedResources: 0,
      explorationCoverage: 0,
      agentEfficiency: 0
    });
  };

  useEffect(() => {
    initializeEnvironment();
    initializeAgents();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (simulationRunning) {
      runSimulation();
    }
  }, [simulationRunning]);

  // Render environment and agents
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = ENVIRONMENT_SIZE * CELL_SIZE;
    canvas.height = ENVIRONMENT_SIZE * CELL_SIZE;
    
    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw environment
    for (let y = 0; y < ENVIRONMENT_SIZE; y++) {
      for (let x = 0; x < ENVIRONMENT_SIZE; x++) {
        const cell = environment[y]?.[x];
        if (cell === 'resource') {
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else if (cell === 'base') {
          ctx.fillStyle = '#8b5cf6';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else if (cell === 'collected') {
          ctx.fillStyle = '#10b981';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
    
    // Draw agents
    agents.forEach(agent => {
      const color = getAgentColor(agent.type);
      ctx.fillStyle = color;
      ctx.fillRect(
        agent.x * CELL_SIZE + 1,
        agent.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      
      // Draw agent type indicator
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        agent.type.charAt(0).toUpperCase(),
        agent.x * CELL_SIZE + CELL_SIZE / 2,
        agent.y * CELL_SIZE + CELL_SIZE / 2 + 3
      );
    });
  }, [environment, agents]);

  const getAgentColor = (type) => {
    const colors = {
      explorer: '#10b981',
      collector: '#3b82f6',
      defender: '#ef4444',
      coordinator: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🤖 AI Agents Simulation</h1>
          <p className="text-gray-300 text-lg">
            Multi-agent system with deterministic behaviors for exploration, collection, defense, and coordination
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Simulation Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Simulation Environment</h2>
                <div className="flex gap-2">
                  <button
                    onClick={startSimulation}
                    disabled={simulationRunning}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    ▶️ Start
                  </button>
                  <button
                    onClick={stopSimulation}
                    disabled={!simulationRunning}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    ⏸️ Stop
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    🔄 Reset
                  </button>
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
                <p>🟡 Resources | 🟣 Base | 🟢 Collected | 🤖 Agents</p>
                <p>Step: {step} | Running: {simulationRunning ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Controls and Stats */}
          <div className="space-y-6">
            {/* Agent Types */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Agent Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">🔍 Explorer</span>
                  <span className="text-gray-300">{agents.filter(a => a.type === 'explorer').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400">📦 Collector</span>
                  <span className="text-gray-300">{agents.filter(a => a.type === 'collector').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400">🛡️ Defender</span>
                  <span className="text-gray-300">{agents.filter(a => a.type === 'defender').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">🧠 Coordinator</span>
                  <span className="text-gray-300">{agents.filter(a => a.type === 'coordinator').length}</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Resources:</span>
                  <span className="text-yellow-400">{stats.totalResources}</span>
                </div>
                <div className="flex justify-between">
                  <span>Collected:</span>
                  <span className="text-green-400">{stats.collectedResources}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exploration:</span>
                  <span className="text-blue-400">{stats.explorationCoverage}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="text-purple-400">{stats.agentEfficiency}%</span>
                </div>
              </div>
            </div>

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

        {/* Agent Details */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Agent Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map(agent => (
              <div key={agent.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{agent.type}</span>
                  <span className="text-xs text-gray-400">#{agent.id}</span>
                </div>
                <div className="text-xs space-y-1">
                  <div>Position: ({agent.x}, {agent.y})</div>
                  <div>Energy: {agent.energy}</div>
                  <div>Resources: {agent.resources}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="AI Agents Implementation"
          code={`
// Deterministic AI Agents System
class Agent {
  constructor(id, type, x, y) {
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.energy = 100;
    this.resources = 0;
    this.direction = 0;
    this.memory = [];
  }

  // Deterministic movement patterns
  move(environment, agents, step) {
    switch (this.type) {
      case 'explorer':
        // Systematic exploration in a pattern
        this.direction = (this.direction + 1) % 4;
        const [dx, dy] = this.getDirectionVector();
        this.x += dx;
        this.y += dy;
        break;
        
      case 'collector':
        // Move towards nearest resource
        const nearest = this.findNearestResource(environment);
        if (nearest) {
          const path = this.getDeterministicPath(nearest);
          if (path.length > 1) {
            this.x = path[1].x;
            this.y = path[1].y;
          }
        }
        break;
        
      case 'defender':
        // Patrol in a square pattern
        const center = Math.floor(ENVIRONMENT_SIZE / 2);
        const radius = 3;
        const angle = (step * 0.1) % (2 * Math.PI);
        this.x = center + Math.floor(radius * Math.cos(angle));
        this.y = center + Math.floor(radius * Math.sin(angle));
        break;
        
      case 'coordinator':
        // Strategic positioning near base
        const baseCenter = Math.floor(ENVIRONMENT_SIZE / 2);
        this.x = baseCenter + Math.floor(Math.sin(step * 0.05) * 2);
        this.y = baseCenter - 2 + Math.floor(Math.cos(step * 0.05) * 2);
        break;
    }
    
    // Keep within bounds
    this.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.x));
    this.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.y));
  }
}

// Deterministic pathfinding
getDeterministicPath(start, end) {
  const path = [start];
  let current = { ...start };
  
  while (current.x !== end.x || current.y !== end.y) {
    if (current.x < end.x) current.x++;
    else if (current.x > end.x) current.x--;
    
    if (current.y < end.y) current.y++;
    else if (current.y > end.y) current.y--;
    
    path.push({ ...current });
  }
  
  return path;
}
          `}
        />
      )}
    </div>
  );
};

export default AIAgentsDemo; 