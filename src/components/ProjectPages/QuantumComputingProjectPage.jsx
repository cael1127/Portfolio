import React from 'react';
import ProjectLayout from '../ProjectLayout';
import QuantumComputingDemo from '../QuantumComputingDemo';

const QuantumComputingProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Quantum Computing Lab"
      subtitle="Design and visualise qubit circuits with educational overlays"
      emoji="⚛️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Blockchain Ops Center', onClick: () => setCurrentPage('blockchain-advanced') }}
      demo={<QuantumComputingDemo isEmbedded />}
      overview="Interactive laboratory that demystifies qubit states, circuit composition, and post-quantum workflows for engineering and education teams."
      role="Quantum UX design, simulation modelling, and knowledge capture"
      stack={[
        'React',
        'Qiskit.js',
        'SVG Visualization',
        'Tailwind CSS'
      ]}
      challenges={[
        'Translating complex quantum concepts into approachable visuals',
        'Simulating qubit states and gates with accurate math',
        'Providing educational context without overwhelming newcomers'
      ]}
      results={[
        'Circuit composer with drag-and-drop gates and live state viewer',
        'Bloch sphere visualisations and probability heatmaps',
        'Scenario templates for quantum supremacy, error correction, and security'
      ]}
      problem="Quantum computing lacks intuitive tools that help teams explore circuits before allocating expensive hardware time."
      approach="Modelled qubit operations with Qiskit-inspired math and built interactive diagrams and tutorials in React."
      highlights={[
        'Gate library with live qubit state transformations',
        'Measurement explorer showing outcome probabilities',
        'Post-quantum cryptography threat simulator',
        'Guided lesson paths for engineers and executives'
      ]}
      tutorialSummary="Covers building a quantum circuit playground with gate simulation and educational overlays."
      difficulty="Advanced"
      timeEstimate="3 weeks"
      keyConcepts={[
        { name: 'Qubit States', description: 'Track amplitudes and visualise them on the Bloch sphere' },
        { name: 'Quantum Gates', description: 'Compose gates and observe state transformations in real time' },
        { name: 'Post-Quantum Security', description: 'Simulate how quantum algorithms affect modern cryptography' }
      ]}
      tutorialSteps={[
        'Model core qubit maths and gate matrices',
        'Render circuits and Bloch spheres with SVG animations',
        'Simulate measurements and probability heatmaps',
        'Package lesson modules for guided exploration'
      ]}
    />
  );
};

export default QuantumComputingProjectPage;

