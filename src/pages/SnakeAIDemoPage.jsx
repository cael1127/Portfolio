import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SnakeAIDemo from '../components/demos/SnakeAIDemo';

const SnakeAIDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Snake AI with Reinforcement Learning"
      subtitle="AI learns to play Snake using neural networks and genetic algorithms"
      emoji="🐍"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'AI Agents', onClick: () => setCurrentPage('ai-agents-demo') }}
      demo={<SnakeAIDemo />}
      overview="An AI system that learns to play Snake using reinforcement learning, neural networks, and genetic algorithms. The AI improves its performance through training, learning optimal strategies and decision-making patterns to achieve high scores."
      role="Machine learning engineering, reinforcement learning algorithm development, neural network architecture design, genetic algorithm implementation, and training pipeline creation"
      stack={["Python", "Neural Networks", "Genetic Algorithms", "Reinforcement Learning", "TensorFlow", "Game Logic"]}
      challenges={[
        "Designing effective reward functions for reinforcement learning",
        "Optimizing neural network architecture for game performance",
        "Implementing genetic algorithms for population evolution",
        "Balancing exploration vs exploitation in learning"
      ]}
      results={[
        "AI achieves high scores through learned strategies",
        "Real-time training visualization and metrics",
        "Genetic algorithm population evolution tracking",
        "Performance metrics and learning curve analysis",
        "Interactive demo showing AI learning process"
      ]}
      problem="Teaching AI to play games requires effective learning algorithms that can discover optimal strategies. Traditional programming approaches don't scale well for complex games with many possible states."
      approach="Implemented a reinforcement learning system using neural networks for decision-making and genetic algorithms for population evolution. Created a training pipeline that allows the AI to learn from experience and improve its performance over time."
      highlights={[
        "Reinforcement learning with neural networks",
        "Real-time training and performance visualization",
        "Genetic algorithm for population evolution",
        "Performance metrics and learning analytics",
        "Interactive game demonstration",
        "Adaptive learning strategies"
      ]}
      tutorialSummary="Build an AI that learns to play Snake using reinforcement learning, neural networks, and genetic algorithms. Learn how to implement training pipelines and optimize learning strategies."
      difficulty="Advanced"
      timeEstimate="2-3 weeks"
      keyConcepts={[
        { name: "Reinforcement Learning", description: "Learning through trial and error with rewards" },
        { name: "Neural Networks", description: "Deep learning models for decision-making" },
        { name: "Genetic Algorithms", description: "Evolutionary algorithms for optimization" },
        { name: "Training Pipelines", description: "Structured approaches to AI learning" }
      ]}
      tutorialSteps={[
        "Design the game environment and reward system",
        "Implement neural network architecture for decision-making",
        "Create reinforcement learning training loop",
        "Integrate genetic algorithms for population evolution",
        "Build visualization and metrics tracking system"
      ]}
    />
  );
};

export default SnakeAIDemoPage; 