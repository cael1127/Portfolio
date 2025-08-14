import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const AIAgentsDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [agents, setAgents] = useState([]);
  const [environment, setEnvironment] = useState([]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [agentTypes, setAgentTypes] = useState({
    explorer: { count: 3, color: '#10b981' },
    collector: { count: 2, color: '#3b82f6' },
    defender: { count: 1, color: '#ef4444' },
    coordinator: { count: 1, color: '#8b5cf6' }
  });
  const canvasRef = useRef(null);

  const ENVIRONMENT_SIZE = 50;
  const CELL_SIZE = 8;

  // Agent class
  class Agent {
    constructor(id, type, x, y) {
      this.id = id;
      this.type = type;
      this.x = x;
      this.y = y;
      this.energy = 100;
      this.resources = 0;
      this.target = null;
      this.memory = [];
      this.behavior = this.getBehavior();
    }

    getBehavior() {
      switch (this.type) {
        case 'explorer':
          return this.explorerBehavior;
        case 'collector':
          return this.collectorBehavior;
        case 'defender':
          return this.defenderBehavior;
        case 'coordinator':
          return this.coordinatorBehavior;
        default:
          return this.explorerBehavior;
      }
    }

    explorerBehavior(env, agents) {
      // Explore unknown areas and mark resources
      const nearbyResources = this.scanEnvironment(env, 3);
      if (nearbyResources.length > 0) {
        this.target = nearbyResources[0];
        this.moveTowards(this.target);
      } else {
        this.randomMove();
      }
      
      // Mark discovered resources
      this.markResources(env);
    }

    collectorBehavior(env, agents) {
      // Collect resources efficiently
      const nearbyResources = this.scanEnvironment(env, 5);
      if (nearbyResources.length > 0) {
        this.target = nearbyResources[0];
        this.moveTowards(this.target);
        
        // Collect if at resource
        if (this.distanceTo(this.target) < 2) {
          this.collectResource(env);
        }
      } else {
        // Ask coordinator for resource locations
        const coordinator = agents.find(a => a.type === 'coordinator');
        if (coordinator && coordinator.memory.length > 0) {
          this.target = coordinator.memory[0];
          this.moveTowards(this.target);
        } else {
          this.randomMove();
        }
      }
    }

    defenderBehavior(env, agents) {
      // Protect resources and other agents
      const threats = this.detectThreats(agents);
      if (threats.length > 0) {
        this.target = threats[0];
        this.moveTowards(this.target);
        this.attackThreat(threats[0]);
      } else {
        // Patrol around base
        const base = { x: ENVIRONMENT_SIZE / 2, y: ENVIRONMENT_SIZE / 2 };
        this.moveTowards(base);
      }
    }

    coordinatorBehavior(env, agents) {
      // Coordinate other agents and manage resources
      const collectors = agents.filter(a => a.type === 'collector');
      const explorers = agents.filter(a => a.type === 'explorer');
      
      // Share resource information
      this.shareInformation(collectors);
      
      // Direct explorers to new areas
      if (explorers.length > 0) {
        const unexploredArea = this.findUnexploredArea(env);
        if (unexploredArea) {
          explorers[0].target = unexploredArea;
        }
      }
      
      // Strategic positioning
      this.strategicMove(env);
    }

    scanEnvironment(env, range) {
      const resources = [];
      for (let dx = -range; dx <= range; dx++) {
        for (let dy = -range; dy <= range; dy++) {
          const nx = this.x + dx;
          const ny = this.y + dy;
          if (nx >= 0 && nx < ENVIRONMENT_SIZE && ny >= 0 && ny < ENVIRONMENT_SIZE) {
            if (env[ny] && env[ny][nx] === 'resource') {
              resources.push({ x: nx, y: ny });
            }
          }
        }
      }
      return resources;
    }

    moveTowards(target) {
      if (!target) return;
      
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        this.x += dx > 0 ? 1 : -1;
      } else {
        this.y += dy > 0 ? 1 : -1;
      }
      
      // Keep within bounds
      this.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.x));
      this.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.y));
    }

    randomMove() {
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
      
      this.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.x + dx));
      this.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.y + dy));
    }

    distanceTo(target) {
      return Math.sqrt((this.x - target.x) ** 2 + (this.y - target.y) ** 2);
    }

    markResources(env) {
      const range = 2;
      for (let dx = -range; dx <= range; dx++) {
        for (let dy = -range; dy <= range; dy++) {
          const nx = this.x + dx;
          const ny = this.y + dy;
          if (nx >= 0 && nx < ENVIRONMENT_SIZE && ny >= 0 && ny < ENVIRONMENT_SIZE) {
            if (env[ny] && env[ny][nx] === 'resource') {
              this.memory.push({ x: nx, y: ny, type: 'resource' });
            }
          }
        }
      }
    }

    collectResource(env) {
      if (env[this.y] && env[this.y][this.x] === 'resource') {
        this.resources += 10;
        this.energy -= 5;
        // Remove resource from environment
        const newEnv = [...env];
        newEnv[this.y] = [...newEnv[this.y]];
        newEnv[this.y][this.x] = 'empty';
        setEnvironment(newEnv);
      }
    }

    detectThreats(agents) {
      // Simulate threats (other agents with low energy)
      return agents.filter(a => a.energy < 30 && a.id !== this.id);
    }

    attackThreat(threat) {
      if (this.distanceTo(threat) < 3) {
        threat.energy -= 20;
        this.energy -= 10;
      }
    }

    shareInformation(collectors) {
      collectors.forEach(collector => {
        collector.memory = [...this.memory];
      });
    }

    findUnexploredArea(env) {
      // Find area with few explored cells
      for (let y = 0; y < ENVIRONMENT_SIZE; y += 5) {
        for (let x = 0; x < ENVIRONMENT_SIZE; x += 5) {
          if (!this.memory.some(m => Math.abs(m.x - x) < 3 && Math.abs(m.y - y) < 3)) {
            return { x, y };
          }
        }
      }
      return null;
    }

    strategicMove(env) {
      // Move to center to coordinate better
      const center = { x: ENVIRONMENT_SIZE / 2, y: ENVIRONMENT_SIZE / 2 };
      this.moveTowards(center);
    }
  }

  // Initialize environment
  const initializeEnvironment = () => {
    const env = [];
    for (let y = 0; y < ENVIRONMENT_SIZE; y++) {
      env[y] = [];
      for (let x = 0; x < ENVIRONMENT_SIZE; x++) {
        env[y][x] = Math.random() < 0.1 ? 'resource' : 'empty';
      }
    }
    return env;
  };

  // Initialize agents
  const initializeAgents = () => {
    const newAgents = [];
    let id = 1;
    
    Object.entries(agentTypes).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        const x = Math.floor(Math.random() * ENVIRONMENT_SIZE);
        const y = Math.floor(Math.random() * ENVIRONMENT_SIZE);
        newAgents.push(new Agent(id++, type, x, y));
      }
    });
    
    return newAgents;
  };

  // Start simulation
  const startSimulation = () => {
    setEnvironment(initializeEnvironment());
    setAgents(initializeAgents());
    setSimulationRunning(true);
    setStep(0);
  };

  // Stop simulation
  const stopSimulation = () => {
    setSimulationRunning(false);
  };

  // Reset simulation
  const resetSimulation = () => {
    setSimulationRunning(false);
    setAgents([]);
    setEnvironment([]);
    setStep(0);
  };

  // Simulation step
  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      setStep(prev => prev + 1);
      
      // Update agents
      setAgents(prevAgents => {
        const newAgents = prevAgents.map(agent => {
          const newAgent = { ...agent };
          newAgent.behavior(newAgent, environment, prevAgents);
          
          // Consume energy
          newAgent.energy = Math.max(0, newAgent.energy - 1);
          
          // Regenerate if at base
          const base = { x: ENVIRONMENT_SIZE / 2, y: ENVIRONMENT_SIZE / 2 };
          if (newAgent.distanceTo(base) < 5) {
            newAgent.energy = Math.min(100, newAgent.energy + 2);
          }
          
          return newAgent;
        });
        
        return newAgents;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [simulationRunning, environment]);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw environment
    for (let y = 0; y < ENVIRONMENT_SIZE; y++) {
      for (let x = 0; x < ENVIRONMENT_SIZE; x++) {
        if (environment[y] && environment[y][x] === 'resource') {
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    // Draw base
    const baseX = (ENVIRONMENT_SIZE / 2) * CELL_SIZE;
    const baseY = (ENVIRONMENT_SIZE / 2) * CELL_SIZE;
    ctx.fillStyle = '#374151';
    ctx.fillRect(baseX - 10, baseY - 10, 20, 20);

    // Draw agents
    agents.forEach(agent => {
      const color = agentTypes[agent.type]?.color || '#ffffff';
      ctx.fillStyle = color;
      ctx.fillRect(
        agent.x * CELL_SIZE + 1,
        agent.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      
      // Draw energy bar
      const energyBarWidth = CELL_SIZE - 2;
      const energyBarHeight = 2;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(
        agent.x * CELL_SIZE + 1,
        agent.y * CELL_SIZE - 3,
        energyBarWidth,
        energyBarHeight
      );
      ctx.fillStyle = '#10b981';
      ctx.fillRect(
        agent.x * CELL_SIZE + 1,
        agent.y * CELL_SIZE - 3,
        (energyBarWidth * agent.energy) / 100,
        energyBarHeight
      );
    });
  }, [agents, environment]);

  const demoCode = `/**
 * AI Agents Multi-Agent System Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a multi-agent system with different
 * agent types (explorer, collector, defender, coordinator) working together
 * in a simulated environment.
 */

import React, { useState, useEffect, useRef } from 'react';

const AIAgentsDemo = () => {
  const [agents, setAgents] = useState([]);
  const [environment, setEnvironment] = useState([]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  
  // Agent class with different behaviors
  class Agent {
    constructor(id, type, x, y) {
      this.id = id;
      this.type = type;
      this.x = x;
      this.y = y;
      this.energy = 100;
      this.resources = 0;
      this.target = null;
      this.memory = [];
      this.behavior = this.getBehavior();
    }

    getBehavior() {
      switch (this.type) {
        case 'explorer':
          return this.explorerBehavior;
        case 'collector':
          return this.collectorBehavior;
        case 'defender':
          return this.defenderBehavior;
        case 'coordinator':
          return this.coordinatorBehavior;
        default:
          return this.explorerBehavior;
      }
    }

    // Explorer behavior: Find new resources
    explorerBehavior(env, agents) {
      const nearbyResources = this.scanEnvironment(env, 3);
      if (nearbyResources.length > 0) {
        this.target = nearbyResources[0];
        this.moveTowards(this.target);
      } else {
        this.randomMove();
      }
      this.markResources(env);
    }

    // Collector behavior: Gather resources efficiently
    collectorBehavior(env, agents) {
      const nearbyResources = this.scanEnvironment(env, 5);
      if (nearbyResources.length > 0) {
        this.target = nearbyResources[0];
        this.moveTowards(this.target);
        
        if (this.distanceTo(this.target) < 2) {
          this.collectResource(env);
        }
      } else {
        // Ask coordinator for resource locations
        const coordinator = agents.find(a => a.type === 'coordinator');
        if (coordinator && coordinator.memory.length > 0) {
          this.target = coordinator.memory[0];
          this.moveTowards(this.target);
        } else {
          this.randomMove();
        }
      }
    }

    // Defender behavior: Protect resources and agents
    defenderBehavior(env, agents) {
      const threats = this.detectThreats(agents);
      if (threats.length > 0) {
        this.target = threats[0];
        this.moveTowards(this.target);
        this.attackThreat(threats[0]);
      } else {
        // Patrol around base
        const base = { x: ENVIRONMENT_SIZE / 2, y: ENVIRONMENT_SIZE / 2 };
        this.moveTowards(base);
      }
    }

    // Coordinator behavior: Manage other agents
    coordinatorBehavior(env, agents) {
      // Collect information from other agents
      const explorers = agents.filter(a => a.type === 'explorer');
      const collectors = agents.filter(a => a.type === 'collector');
      
      // Share resource locations with collectors
      explorers.forEach(explorer => {
        if (explorer.memory.length > 0) {
          this.memory = [...this.memory, ...explorer.memory];
        }
      });
      
      // Coordinate defense
      const defenders = agents.filter(a => a.type === 'defender');
      if (defenders.length > 0) {
        this.coordinateDefense(defenders, env);
      }
    }

    // Utility methods
    scanEnvironment(env, range) {
      const resources = [];
      for (let dx = -range; dx <= range; dx++) {
        for (let dy = -range; dy <= range; dy++) {
          const x = this.x + dx;
          const y = this.y + dy;
          if (x >= 0 && x < ENVIRONMENT_SIZE && y >= 0 && y < ENVIRONMENT_SIZE) {
            if (env[y][x] === 'resource') {
              resources.push({ x, y });
            }
          }
        }
      }
      return resources;
    }

    moveTowards(target) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        this.x += dx > 0 ? 1 : -1;
      } else {
        this.y += dy > 0 ? 1 : -1;
      }
      
      // Keep within bounds
      this.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.x));
      this.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.y));
    }

    randomMove() {
      const directions = [
        { dx: 0, dy: -1 }, { dx: 1, dy: 0 },
        { dx: 0, dy: 1 }, { dx: -1, dy: 0 }
      ];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      
      this.x = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.x + direction.dx));
      this.y = Math.max(0, Math.min(ENVIRONMENT_SIZE - 1, this.y + direction.dy));
    }

    distanceTo(target) {
      return Math.abs(this.x - target.x) + Math.abs(this.y - target.y);
    }

    markResources(env) {
      const nearbyResources = this.scanEnvironment(env, 2);
      nearbyResources.forEach(resource => {
        this.memory.push(resource);
      });
    }

    collectResource(env) {
      if (env[this.y][this.x] === 'resource') {
        env[this.y][this.x] = 'empty';
        this.resources++;
        this.energy = Math.min(100, this.energy + 10);
      }
    }

    detectThreats(agents) {
      return agents.filter(agent => 
        agent.type !== this.type && 
        this.distanceTo(agent) < 5
      );
    }

    attackThreat(threat) {
      if (this.distanceTo(threat) < 2) {
        threat.energy -= 20;
        this.energy -= 5;
      }
    }

    coordinateDefense(defenders, env) {
      // Strategic positioning of defenders
      defenders.forEach((defender, index) => {
        const angle = (index / defenders.length) * 2 * Math.PI;
        const radius = 5;
        defender.target = {
          x: ENVIRONMENT_SIZE / 2 + Math.cos(angle) * radius,
          y: ENVIRONMENT_SIZE / 2 + Math.sin(angle) * radius
        };
      });
    }
  }

  // Initialize environment with resources
  const initializeEnvironment = () => {
    const env = Array(ENVIRONMENT_SIZE).fill().map(() => 
      Array(ENVIRONMENT_SIZE).fill('empty')
    );
    
    // Add random resources
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * ENVIRONMENT_SIZE);
      const y = Math.floor(Math.random() * ENVIRONMENT_SIZE);
      env[y][x] = 'resource';
    }
    
    return env;
  };

  // Initialize agents
  const initializeAgents = () => {
    const agents = [];
    let id = 0;
    
    Object.entries(agentTypes).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        const x = Math.floor(Math.random() * ENVIRONMENT_SIZE);
        const y = Math.floor(Math.random() * ENVIRONMENT_SIZE);
        agents.push(new Agent(id++, type, x, y));
      }
    });
    
    return agents;
  };

  // Simulation step
  const runSimulationStep = () => {
    setAgents(prevAgents => {
      const newAgents = [...prevAgents];
      const newEnv = [...environment];
      
      // Update each agent
      newAgents.forEach(agent => {
        agent.behavior(newEnv, newAgents);
        
        // Consume energy
        agent.energy = Math.max(0, agent.energy - 1);
        
        // Remove dead agents
        if (agent.energy <= 0) {
          const index = newAgents.indexOf(agent);
          if (index > -1) {
            newAgents.splice(index, 1);
          }
        }
      });
      
      setEnvironment(newEnv);
      return newAgents;
    });
    
    setStep(prev => prev + 1);
  };

  // Start simulation
  const startSimulation = () => {
    setSimulationRunning(true);
    const interval = setInterval(runSimulationStep, 100);
    
    return () => clearInterval(interval);
  };

  // Stop simulation
  const stopSimulation = () => {
    setSimulationRunning(false);
  };

  // Reset simulation
  const resetSimulation = () => {
    setSimulationRunning(false);
    setStep(0);
    setEnvironment(initializeEnvironment());
    setAgents(initializeAgents());
  };

  return (
    <div className="ai-agents-container">
      <div className="simulation-controls">
        <button onClick={startSimulation} disabled={simulationRunning}>
          Start Simulation
        </button>
        <button onClick={stopSimulation} disabled={!simulationRunning}>
          Stop Simulation
        </button>
        <button onClick={resetSimulation}>
          Reset
        </button>
      </div>
      
      <div className="simulation-stats">
        <p>Step: {step}</p>
        <p>Agents: {agents.length}</p>
        <p>Resources: {environment.flat().filter(cell => cell === 'resource').length}</p>
      </div>
      
      <canvas ref={canvasRef} className="simulation-canvas" />
    </div>
  );
};

export default AIAgentsDemo;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">🤖 AI Agents in Pure Python</h1>
            <p className="text-gray-400">Multi-agent system with different behavior types and coordination</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Simulation Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Multi-Agent Simulation</h2>
                <div className="flex space-x-2">
                  <span className="text-sm text-gray-400">Step: {step}</span>
                  <span className="text-sm text-gray-400">Agents: {agents.length}</span>
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                <canvas
                  ref={canvasRef}
                  width={ENVIRONMENT_SIZE * CELL_SIZE}
                  height={ENVIRONMENT_SIZE * CELL_SIZE}
                  className="border border-gray-600 rounded"
                />
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!simulationRunning ? (
                  <button
                    onClick={startSimulation}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Start Simulation
                  </button>
                ) : (
                  <button
                    onClick={stopSimulation}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Stop Simulation
                  </button>
                )}
                
                <button
                  onClick={resetSimulation}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Agent Types:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Explorer - Discovers resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Collector - Gathers resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span>Defender - Protects base</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span>Coordinator - Manages others</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Environment:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Resources (gold)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-600 rounded"></div>
                      <span>Base (center)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Statistics */}
          <div className="space-y-6">
            {/* Agent Types Configuration */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">👥 Agent Configuration</h3>
              
              {Object.entries(agentTypes).map(([type, config]) => (
                <div key={type} className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: config.color }}
                    ></div>
                    <span className="capitalize">{type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setAgentTypes(prev => ({
                        ...prev,
                        [type]: { ...prev[type], count: Math.max(0, prev[type].count - 1) }
                      }))}
                      className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{config.count}</span>
                    <button
                      onClick={() => setAgentTypes(prev => ({
                        ...prev,
                        [type]: { ...prev[type], count: prev[type].count + 1 }
                      }))}
                      className="w-6 h-6 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent Statistics */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">📊 Agent Statistics</h3>
              
              {agents.length > 0 && (
                <div className="space-y-3">
                  {Object.keys(agentTypes).map(type => {
                    const typeAgents = agents.filter(a => a.type === type);
                    if (typeAgents.length === 0) return null;
                    
                    const avgEnergy = typeAgents.reduce((sum, a) => sum + a.energy, 0) / typeAgents.length;
                    const totalResources = typeAgents.reduce((sum, a) => sum + a.resources, 0);
                    
                    return (
                      <div key={type} className="border-b border-gray-700 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="capitalize font-medium">{type}</span>
                          <span className="text-sm text-gray-400">{typeAgents.length} agents</span>
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div className="flex justify-between">
                            <span>Avg Energy:</span>
                            <span>{avgEnergy.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Resources:</span>
                            <span>{totalResources}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {agents.length === 0 && (
                <p className="text-gray-400 text-sm">
                  Start simulation to see agent statistics
                </p>
              )}
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">✨ Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Multi-Agent Coordination</li>
                <li>• Behavior-Based AI</li>
                <li>• Resource Management</li>
                <li>• Energy System</li>
                <li>• Memory and Learning</li>
                <li>• Real-time Simulation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={demoCode}
        language="python"
        title="AI Agents Implementation"
      />
    </div>
  );
};

export default AIAgentsDemo; 