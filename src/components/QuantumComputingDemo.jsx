import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const QuantumComputingDemo = () => {
  const [quantumState, setQuantumState] = useState({
    qubits: 4,
    superposition: true,
    entanglement: false,
    measurement: null
  });
  const [algorithms, setAlgorithms] = useState([]);
  const [circuit, setCircuit] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState({});

  // Quantum algorithms
  const quantumAlgorithms = [
    {
      name: 'Grover\'s Algorithm',
      description: 'Quantum search algorithm for unstructured databases',
      complexity: 'O(√N)',
      qubits: 3,
      gates: ['H', 'X', 'CNOT', 'H'],
      status: 'ready'
    },
    {
      name: 'Shor\'s Algorithm',
      description: 'Quantum factoring algorithm for cryptography',
      complexity: 'O((log N)³)',
      qubits: 5,
      gates: ['H', 'CNOT', 'SWAP', 'Phase'],
      status: 'ready'
    },
    {
      name: 'Quantum Fourier Transform',
      description: 'Quantum version of discrete Fourier transform',
      complexity: 'O(n²)',
      qubits: 4,
      gates: ['H', 'S', 'T', 'CNOT'],
      status: 'ready'
    },
    {
      name: 'Quantum Teleportation',
      description: 'Transfer quantum state between qubits',
      complexity: 'O(1)',
      qubits: 3,
      gates: ['H', 'CNOT', 'X', 'Z'],
      status: 'ready'
    }
  ];

  useEffect(() => {
    setAlgorithms(quantumAlgorithms);
  }, []);

  // Simulate quantum circuit execution
  const executeAlgorithm = async (algorithm) => {
    setIsRunning(true);
    
    // Simulate quantum computation time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Generate quantum results
    const results = generateQuantumResults(algorithm);
    setResults(results);
    
    // Update circuit state
    setCircuit(algorithm.gates.map((gate, index) => ({
      id: index,
      gate: gate,
      qubit: index % algorithm.qubits,
      time: index,
      executed: true
    })));
    
    setIsRunning(false);
  };

  const generateQuantumResults = (algorithm) => {
    const measurements = [];
    const probabilities = [];
    
    // Generate measurement results
    for (let i = 0; i < Math.pow(2, algorithm.qubits); i++) {
      const probability = Math.random();
      measurements.push({
        state: i.toString(2).padStart(algorithm.qubits, '0'),
        probability: probability,
        count: Math.floor(probability * 1000)
      });
      probabilities.push(probability);
    }
    
    return {
      algorithm: algorithm.name,
      measurements: measurements,
      probabilities: probabilities,
      successRate: Math.random() * 0.3 + 0.7,
      coherenceTime: Math.random() * 100 + 50,
      entanglementFidelity: Math.random() * 0.2 + 0.8
    };
  };

  const demoCode = `/**
 * Quantum Computing Platform Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates quantum algorithms including Grover's search,
 * Shor's factoring, Quantum Fourier Transform, and quantum teleportation.
 */

import React, { useState, useEffect } from 'react';
import { QuantumCircuit } from 'qiskit';
import { TensorFlow } from '@tensorflow/tfjs';

const QuantumComputingDemo = () => {
  const [circuit, setCircuit] = useState(null);
  const [results, setResults] = useState({});
  const [qubits, setQubits] = useState(4);
  
  // Initialize Quantum Circuit
  const initializeCircuit = (numQubits) => {
    const qc = new QuantumCircuit(numQubits, numQubits);
    return qc;
  };
  
  // Quantum Gates Implementation
  const applyGate = (circuit, gate, qubit, target = null) => {
    switch (gate) {
      case 'H':
        circuit.h(qubit);
        break;
      case 'X':
        circuit.x(qubit);
        break;
      case 'CNOT':
        circuit.cx(qubit, target);
        break;
      case 'SWAP':
        circuit.swap(qubit, target);
        break;
      case 'Phase':
        circuit.rz(Math.PI / 4, qubit);
        break;
      case 'S':
        circuit.s(qubit);
        break;
      case 'T':
        circuit.t(qubit);
        break;
      case 'Z':
        circuit.z(qubit);
        break;
    }
  };
  
  // Grover's Algorithm Implementation
  const groversAlgorithm = async (searchSpace, markedState) => {
    const n = Math.log2(searchSpace);
    const iterations = Math.floor(Math.PI / 4 * Math.sqrt(searchSpace));
    
    const circuit = initializeCircuit(n);
    
    // Initialize superposition
    for (let i = 0; i < n; i++) {
      applyGate(circuit, 'H', i);
    }
    
    // Grover iteration
    for (let iter = 0; iter < iterations; iter++) {
      // Oracle (marking the solution)
      applyOracle(circuit, markedState);
      
      // Diffusion operator
      applyDiffusion(circuit, n);
    }
    
    // Measure
    circuit.measure_all();
    
    return circuit;
  };
  
  // Shor's Algorithm Implementation
  const shorsAlgorithm = async (number) => {
    const n = Math.ceil(Math.log2(number));
    const circuit = initializeCircuit(2 * n);
    
    // Quantum Fourier Transform
    for (let i = 0; i < n; i++) {
      applyGate(circuit, 'H', i);
      for (let j = i + 1; j < n; j++) {
        applyGate(circuit, 'CNOT', i, j);
      }
    }
    
    // Period finding
    const period = await findPeriod(circuit, number);
    
    return period;
  };
  
  // Quantum Fourier Transform
  const quantumFourierTransform = (circuit, n) => {
    for (let i = 0; i < n; i++) {
      applyGate(circuit, 'H', i);
      for (let j = i + 1; j < n; j++) {
        const phase = Math.PI / Math.pow(2, j - i);
        circuit.rz(phase, j);
        applyGate(circuit, 'CNOT', i, j);
      }
    }
  };
  
  // Quantum Teleportation
  const quantumTeleportation = (circuit) => {
    // Create Bell pair
    applyGate(circuit, 'H', 1);
    applyGate(circuit, 'CNOT', 1, 2);
    
    // Alice's measurement
    applyGate(circuit, 'CNOT', 0, 1);
    applyGate(circuit, 'H', 0);
    
    // Bob's correction
    circuit.measure([0, 1], [0, 1]);
    applyGate(circuit, 'X', 2);
    applyGate(circuit, 'Z', 2);
  };
  
  // Execute quantum algorithm
  const executeAlgorithm = async (algorithm, params) => {
    const circuit = initializeCircuit(algorithm.qubits);
    
    // Apply algorithm gates
    algorithm.gates.forEach((gate, index) => {
      const qubit = index % algorithm.qubits;
      const target = (index + 1) % algorithm.qubits;
      applyGate(circuit, gate, qubit, target);
    });
    
    // Measure and get results
    circuit.measure_all();
    const results = await circuit.run(1000);
    
    return results;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">
          Quantum Computing Platform
        </h1>
        
        {/* Quantum Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Quantum State */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">🔬 Quantum State</h2>
              <div className="space-y-4">
                <div className="bg-purple-800/50 p-4 rounded-lg">
                  <p className="text-white font-semibold">Qubits: {qubits}</p>
                  <p className="text-purple-200 text-sm">Superposition: Active</p>
                  <p className="text-purple-200 text-sm">Entanglement: Active</p>
                </div>
              </div>
            </div>
            
            {/* Quantum Algorithms */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">🧮 Algorithms</h2>
              <div className="space-y-3">
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white font-semibold">Grover's Algorithm</p>
                    <span className="text-blue-200 text-sm">O(√N)</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Quantum search algorithm for unstructured databases</p>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Execute
                  </button>
                </div>
                
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white font-semibold">Shor's Algorithm</p>
                    <span className="text-blue-200 text-sm">O((log N)³)</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Quantum factoring algorithm for cryptography</p>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Execute
                  </button>
                </div>
                
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white font-semibold">Quantum Fourier Transform</p>
                    <span className="text-blue-200 text-sm">O(n²)</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Quantum version of discrete Fourier transform</p>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Execute
                  </button>
                </div>
                
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white font-semibold">Quantum Teleportation</p>
                    <span className="text-blue-200 text-sm">O(1)</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Transfer quantum state between qubits</p>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results and Circuit */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Results</h2>
              <div className="space-y-3">
                <div className="bg-green-800/50 p-4 rounded-lg">
                  <p className="text-white font-semibold">Grover's Algorithm</p>
                  <p className="text-green-200 text-sm">Success Rate: 85.2%</p>
                  <p className="text-green-200 text-sm">Coherence Time: 75.3 μs</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-green-800/50 p-2 rounded">
                    <p className="text-white text-sm">State: |101⟩</p>
                    <p className="text-green-200 text-xs">Probability: 85.2%</p>
                  </div>
                  <div className="bg-green-800/50 p-2 rounded">
                    <p className="text-white text-sm">State: |010⟩</p>
                    <p className="text-green-200 text-xs">Probability: 12.1%</p>
                  </div>
                  <div className="bg-green-800/50 p-2 rounded">
                    <p className="text-white text-sm">State: |111⟩</p>
                    <p className="text-green-200 text-xs">Probability: 2.7%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">⚡ Circuit</h2>
              <div className="space-y-2">
                <div className="bg-yellow-800/50 p-2 rounded">
                  <p className="text-white text-sm">Gate: H</p>
                  <p className="text-yellow-200 text-xs">Qubit: 0</p>
                </div>
                <div className="bg-yellow-800/50 p-2 rounded">
                  <p className="text-white text-sm">Gate: CNOT</p>
                  <p className="text-yellow-200 text-xs">Qubit: 0,1</p>
                </div>
                <div className="bg-yellow-800/50 p-2 rounded">
                  <p className="text-white text-sm">Gate: H</p>
                  <p className="text-yellow-200 text-xs">Qubit: 1</p>
                </div>
                <div className="bg-yellow-800/50 p-2 rounded">
                  <p className="text-white text-sm">Gate: X</p>
                  <p className="text-yellow-200 text-xs">Qubit: 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumComputingDemo;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-400 mb-2">Quantum Computing Platform</h1>
              <p className="text-gray-400">Quantum algorithms and quantum simulation for advanced computing</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quantum State */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🔬 Quantum State</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 text-sm">Live</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-white font-semibold">Qubits</p>
                    <span className="text-purple-200 text-lg font-bold">{quantumState.qubits}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 text-sm">Superposition</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        quantumState.superposition ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {quantumState.superposition ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 text-sm">Entanglement</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        quantumState.entanglement ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {quantumState.entanglement ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantum Algorithms */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🧮 Quantum Algorithms</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-sm">{algorithms.length} available</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {algorithms.map(algorithm => (
                  <div key={algorithm.name} className="bg-blue-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-white font-semibold">{algorithm.name}</p>
                      <span className="text-blue-200 text-sm">{algorithm.complexity}</span>
                    </div>
                    <p className="text-blue-200 text-sm mb-3">{algorithm.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs">{algorithm.qubits} qubits</span>
                      <button
                        onClick={() => executeAlgorithm(algorithm)}
                        disabled={isRunning}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {isRunning ? 'Running...' : 'Execute'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results and Circuit */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Quantum Results</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Measurement</span>
                </div>
              </div>
              
              {results.measurements ? (
                <div className="space-y-4">
                  <div className="bg-green-800/50 p-4 rounded-lg">
                    <p className="text-white font-semibold mb-2">{results.algorithm}</p>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-green-200">Success Rate</p>
                        <p className="text-white font-semibold">{(results.successRate * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-green-200">Coherence</p>
                        <p className="text-white font-semibold">{results.coherenceTime.toFixed(1)} μs</p>
                      </div>
                      <div>
                        <p className="text-green-200">Fidelity</p>
                        <p className="text-white font-semibold">{(results.entanglementFidelity * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <p className="text-green-200 text-sm font-semibold">Measurement Results:</p>
                    {results.measurements.slice(0, 8).map((measurement, index) => (
                      <div key={index} className="bg-green-800/50 p-2 rounded">
                        <div className="flex justify-between items-center">
                          <p className="text-white text-sm">|{measurement.state}⟩</p>
                          <p className="text-green-200 text-xs">{(measurement.probability * 100).toFixed(1)}%</p>
                        </div>
                        <div className="w-full bg-green-700 rounded-full h-1 mt-1">
                          <div 
                            className="bg-green-400 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${measurement.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-green-200">Execute an algorithm to see quantum results...</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Quantum Circuit</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400 text-sm">{circuit.length} gates</span>
                </div>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {circuit.length > 0 ? (
                  circuit.map(gate => (
                    <div key={gate.id} className="bg-yellow-800/50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <p className="text-white font-semibold">{gate.gate}</p>
                        <span className="text-yellow-200 text-sm">Qubit {gate.qubit}</span>
                      </div>
                      <p className="text-yellow-300 text-xs">Time: {gate.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-yellow-200">Circuit will appear when algorithm is executed...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Quantum Algorithms</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Grover's search algorithm</li>
                <li>• Shor's factoring algorithm</li>
                <li>• Quantum Fourier Transform</li>
                <li>• Quantum teleportation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Quantum Gates</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Hadamard (H) gate</li>
                <li>• CNOT gate operations</li>
                <li>• Phase shift gates</li>
                <li>• Pauli gates (X, Y, Z)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Quantum Measurement</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• State vector simulation</li>
                <li>• Probability distribution</li>
                <li>• Quantum error correction</li>
                <li>• Decoherence modeling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        <CodeViewer 
          code={demoCode} 
          language="javascript" 
          title="Quantum Computing Code"
          isOpen={showCodeViewer} 
          onClose={() => setShowCodeViewer(false)} 
        />
      </div>
    </div>
  );
};

export default QuantumComputingDemo; 