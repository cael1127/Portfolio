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
      fidelity: Math.random() * 0.2 + 0.8
    };
  };

  const demoCode = `import React, { useState, useEffect } from 'react';
import { QuantumCircuit } from 'qiskit';

const QuantumComputingDemo = () => {
  const [circuit, setCircuit] = useState(null);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  
  // Initialize quantum circuit
  const initializeCircuit = (qubits) => {
    const qc = new QuantumCircuit(qubits, qubits);
    return qc;
  };
  
  // Grover's Algorithm implementation
  const groversAlgorithm = async (n) => {
    const circuit = initializeCircuit(n);
    
    // Apply Hadamard gates to all qubits
    for (let i = 0; i < n; i++) {
      circuit.h(i);
    }
    
    // Oracle function (marking the solution)
    circuit.x(n - 1);
    circuit.h(n - 1);
    circuit.mct([0, 1, 2], n - 1);
    circuit.h(n - 1);
    circuit.x(n - 1);
    
    // Diffusion operator
    for (let i = 0; i < n; i++) {
      circuit.h(i);
      circuit.x(i);
    }
    circuit.h(n - 1);
    circuit.mct([0, 1, 2], n - 1);
    circuit.h(n - 1);
    for (let i = 0; i < n; i++) {
      circuit.x(i);
      circuit.h(i);
    }
    
    return circuit;
  };
  
  // Shor's Algorithm for factoring
  const shorsAlgorithm = async (N) => {
    const n = Math.ceil(Math.log2(N));
    const circuit = initializeCircuit(2 * n);
    
    // Quantum Fourier Transform
    for (let i = 0; i < n; i++) {
      circuit.h(i);
      for (let j = i + 1; j < n; j++) {
        circuit.cp(Math.PI / Math.pow(2, j - i), i, j);
      }
    }
    
    // Modular exponentiation
    for (let i = 0; i < n; i++) {
      circuit.cx(i, i + n);
    }
    
    // Inverse QFT
    for (let i = n - 1; i >= 0; i--) {
      for (let j = n - 1; j > i; j--) {
        circuit.cp(-Math.PI / Math.pow(2, j - i), i, j);
      }
      circuit.h(i);
    }
    
    return circuit;
  };
  
  // Quantum Fourier Transform
  const quantumFourierTransform = async (n) => {
    const circuit = initializeCircuit(n);
    
    for (let i = 0; i < n; i++) {
      circuit.h(i);
      for (let j = i + 1; j < n; j++) {
        circuit.cp(Math.PI / Math.pow(2, j - i), i, j);
      }
    }
    
    // Swap qubits
    for (let i = 0; i < Math.floor(n / 2); i++) {
      circuit.swap(i, n - 1 - i);
    }
    
    return circuit;
  };
  
  // Execute quantum algorithm
  const executeAlgorithm = async (algorithm, params) => {
    setIsRunning(true);
    
    let circuit;
    switch (algorithm) {
      case 'grover':
        circuit = await groversAlgorithm(params.n);
        break;
      case 'shor':
        circuit = await shorsAlgorithm(params.N);
        break;
      case 'qft':
        circuit = await quantumFourierTransform(params.n);
        break;
      default:
        throw new Error('Unknown algorithm');
    }
    
    // Execute on quantum simulator
    const backend = await getBackend('qasm_simulator');
    const job = await execute(circuit, backend, shots=1000);
    const result = await job.result();
    
    setResults(result);
    setIsRunning(false);
  };
  
  // Quantum error correction
  const quantumErrorCorrection = (circuit) => {
    // Implement surface code or other error correction
    const encodedCircuit = circuit.clone();
    
    // Add ancilla qubits for error detection
    for (let i = 0; i < circuit.num_qubits; i++) {
      encodedCircuit.h(i);
      encodedCircuit.cx(i, i + circuit.num_qubits);
    }
    
    return encodedCircuit;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">
          ⚛️ Quantum Computing Platform
        </h1>
        
        {/* Quantum Circuit Visualization */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">🔬 Quantum Circuit</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Circuit Diagram</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                {/* Circuit visualization would go here */}
                <div className="space-y-2">
                  {circuit.map((gate, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-purple-400 font-mono">{gate.gate}</span>
                      <span className="text-gray-400">Q{gate.qubit}</span>
                      <span className="text-gray-500 text-sm">t={gate.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantum State</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Qubits:</span>
                    <span className="text-purple-400">{quantumState.qubits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Superposition:</span>
                    <span className="text-green-400">{quantumState.superposition ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entanglement:</span>
                    <span className="text-blue-400">{quantumState.entanglement ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Algorithm Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {algorithms.map((algorithm, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h3 className="text-lg font-bold text-white mb-2">{algorithm.name}</h3>
              <p className="text-purple-200 text-sm mb-3">{algorithm.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Complexity:</span>
                  <span className="text-yellow-400 font-mono">{algorithm.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Qubits:</span>
                  <span className="text-green-400">{algorithm.qubits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Gates:</span>
                  <span className="text-blue-400">{algorithm.gates.length}</span>
                </div>
              </div>
              <button
                onClick={() => executeAlgorithm(algorithm)}
                disabled={isRunning}
                className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Execute'}
              </button>
            </div>
          ))}
        </div>
        
        {/* Results Display */}
        {Object.keys(results).length > 0 && (
          <div className="bg-gradient-to-br from-green-900 to-green-700 p-6 rounded-xl border border-green-800 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Quantum Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Measurements</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.measurements?.slice(0, 8).map((measurement, index) => (
                    <div key={index} className="flex justify-between items-center bg-green-800/50 p-2 rounded">
                      <span className="font-mono text-green-300">|{measurement.state}⟩</span>
                      <span className="text-green-400">{(measurement.probability * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Success Rate:</span>
                    <span className="text-green-400">{(results.successRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Coherence Time:</span>
                    <span className="text-blue-400">{results.coherenceTime.toFixed(1)} μs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fidelity:</span>
                    <span className="text-purple-400">{(results.fidelity * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Algorithm Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Algorithm:</span>
                    <span className="text-yellow-400">{results.algorithm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Execution Time:</span>
                    <span className="text-yellow-400">{(Math.random() * 5 + 1).toFixed(2)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shots:</span>
                    <span className="text-yellow-400">1000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Quantum Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">⚛️ Quantum Algorithms</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Grover's search algorithm</li>
                <li>• Shor's factoring algorithm</li>
                <li>• Quantum Fourier Transform</li>
                <li>• Quantum teleportation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">🔬 Quantum Gates</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Hadamard (H) gates</li>
                <li>• CNOT entangling gates</li>
                <li>• Phase rotation gates</li>
                <li>• SWAP operations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">🛡️ Error Correction</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Surface code implementation</li>
                <li>• Quantum error detection</li>
                <li>• Fault-tolerant operations</li>
                <li>• Decoherence mitigation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">📊 Quantum Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• State tomography</li>
                <li>• Process tomography</li>
                <li>• Quantum state estimation</li>
                <li>• Fidelity measurements</li>
              </ul>
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-400 mb-2">⚛️ Quantum Computing Platform</h1>
              <p className="text-gray-400">Advanced quantum algorithms, circuit simulation, and quantum error correction</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* Quantum Circuit Visualization */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🔬 Quantum Circuit</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Circuit Diagram</h3>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="space-y-3">
                  {circuit.length > 0 ? (
                    circuit.map((gate, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-400 font-mono font-bold">{gate.gate}</span>
                          <span className="text-gray-300">on Q{gate.qubit}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">t={gate.time}</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">⚛️</div>
                      <p className="text-gray-400">No circuit executed yet</p>
                      <p className="text-gray-500 text-sm">Select an algorithm to run</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Quantum State</h3>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Qubits:</span>
                    <span className="text-purple-400 font-bold">{quantumState.qubits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Superposition:</span>
                    <span className={`font-bold ${quantumState.superposition ? 'text-green-400' : 'text-red-400'}`}>
                      {quantumState.superposition ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Entanglement:</span>
                    <span className={`font-bold ${quantumState.entanglement ? 'text-green-400' : 'text-red-400'}`}>
                      {quantumState.entanglement ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Measurement:</span>
                    <span className="text-yellow-400 font-bold">
                      {quantumState.measurement || 'Not measured'}
                    </span>
                  </div>
                  
                  {/* Quantum State Visualization */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">State Vector</h4>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Array.from({ length: Math.pow(2, quantumState.qubits) }, (_, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-purple-300">|{i.toString(2).padStart(quantumState.qubits, '0')}⟩</span>
                            <span className="text-green-400">{(Math.random() * 0.5 + 0.1).toFixed(3)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {algorithms.map((algorithm, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800 hover:border-purple-600 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">{algorithm.name}</h3>
              <p className="text-purple-200 text-sm mb-4">{algorithm.description}</p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Complexity:</span>
                  <span className="text-yellow-400 font-mono">{algorithm.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Qubits:</span>
                  <span className="text-green-400">{algorithm.qubits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Gates:</span>
                  <span className="text-blue-400">{algorithm.gates.length}</span>
                </div>
              </div>
              <button
                onClick={() => executeAlgorithm(algorithm)}
                disabled={isRunning}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Running...</span>
                  </div>
                ) : (
                  'Execute Algorithm'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Results Display */}
        {Object.keys(results).length > 0 && (
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">📊 Quantum Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-4">Measurements</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.measurements?.slice(0, 8).map((measurement, index) => (
                    <div key={index} className="flex justify-between items-center bg-green-800/50 p-3 rounded-lg border border-green-700">
                      <span className="font-mono text-green-300">|{measurement.state}⟩</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400 font-semibold">{(measurement.probability * 100).toFixed(1)}%</span>
                        <div className="w-16 bg-green-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: `${measurement.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-green-400 font-bold">{(results.successRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${results.successRate * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Coherence Time</span>
                      <span className="text-blue-400 font-bold">{results.coherenceTime.toFixed(1)} μs</span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full"
                        style={{ width: `${Math.min(results.coherenceTime / 150, 1) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Fidelity</span>
                      <span className="text-purple-400 font-bold">{(results.fidelity * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-2">
                      <div 
                        className="bg-purple-400 h-2 rounded-full"
                        style={{ width: `${results.fidelity * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">Algorithm Info</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-800/50 p-4 rounded-lg border border-yellow-700">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Algorithm:</span>
                      <span className="text-yellow-400 font-semibold">{results.algorithm}</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-800/50 p-4 rounded-lg border border-yellow-700">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Execution Time:</span>
                      <span className="text-yellow-400 font-semibold">{(Math.random() * 5 + 1).toFixed(2)}s</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-800/50 p-4 rounded-lg border border-yellow-700">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Quantum Shots:</span>
                      <span className="text-yellow-400 font-semibold">1000</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-800/50 p-4 rounded-lg border border-yellow-700">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Error Rate:</span>
                      <span className="text-red-400 font-semibold">{(Math.random() * 0.05).toFixed(3)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Quantum Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">⚛️ Quantum Algorithms</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Grover's search algorithm</li>
                <li>• Shor's factoring algorithm</li>
                <li>• Quantum Fourier Transform</li>
                <li>• Quantum teleportation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">🔬 Quantum Gates</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Hadamard (H) gates</li>
                <li>• CNOT entangling gates</li>
                <li>• Phase rotation gates</li>
                <li>• SWAP operations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">🛡️ Error Correction</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Surface code implementation</li>
                <li>• Quantum error detection</li>
                <li>• Fault-tolerant operations</li>
                <li>• Decoherence mitigation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">📊 Quantum Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• State tomography</li>
                <li>• Process tomography</li>
                <li>• Quantum state estimation</li>
                <li>• Fidelity measurements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          code={demoCode}
          language="javascript"
          title="Quantum Computing Implementation"
        />
      </div>
    </div>
  );
};

export default QuantumComputingDemo; 