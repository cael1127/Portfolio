import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import AIAgentsDemo from '../components/demos/AIAgentsDemo';

const AIAgentsDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="AI Agents in Pure Python"
      subtitle="Multi-agent system with different AI behaviors and coordination"
      emoji="🧠"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Sentiment Analysis', onClick: () => setCurrentPage('sentiment-analysis-demo') }}
      demo={<AIAgentsDemo />}
      overview="A multi-agent system implemented in pure Python where agents with complementary behaviors coordinate to achieve composite tasks. Features behavior trees, messaging protocols, and environment simulation for demonstrating AI agent coordination."
      role="Design of behavior trees, messaging protocols, agent coordination algorithms, simulation environment, and evaluation systems"
      stack={["Python", "Multi-Agent Systems", "Behavior Trees", "Simulation", "Agent Coordination"]}
      challenges={[
        "Preventing deadlocks in agent coordination",
        "Avoiding priority inversion in agent decision-making",
        "Designing effective messaging protocols",
        "Creating stable convergence mechanisms"
      ]}
      results={[
        "Stable convergence with coordinated agent behaviors",
        "Traceable decision-making processes",
        "Effective agent coordination without deadlocks",
        "Comprehensive simulation environment",
        "Clear demonstration of multi-agent systems"
      ]}
      problem="Multi-agent systems require careful design to enable agents to coordinate effectively without conflicts or deadlocks. Demonstrating agent behaviors and coordination patterns helps understand complex AI systems."
      approach="Built a multi-agent system in pure Python with behavior trees for decision-making, messaging protocols for communication, and a simulation environment. Implemented coordination mechanisms to prevent deadlocks and ensure stable convergence."
      highlights={[
        "Multi-agent coordination and communication",
        "Behavior trees for agent decision-making",
        "Messaging protocols for agent interaction",
        "Environment simulation",
        "Stable convergence mechanisms",
        "Traceable agent decisions"
      ]}
      tutorialSummary="Build a multi-agent system in Python with behavior trees, messaging protocols, and agent coordination. Learn how to design agents that work together to achieve complex tasks."
      difficulty="Advanced"
      timeEstimate="2-3 weeks"
      keyConcepts={[
        { name: "Multi-Agent Systems", description: "Systems with multiple autonomous agents" },
        { name: "Behavior Trees", description: "Decision-making structures for agents" },
        { name: "Agent Coordination", description: "How agents work together" },
        { name: "Messaging Protocols", description: "Communication between agents" }
      ]}
      tutorialSteps={[
        "Design agent behavior trees and decision logic",
        "Implement messaging protocols for agent communication",
        "Create coordination mechanisms to prevent conflicts",
        "Build simulation environment for agent interaction",
        "Test and evaluate agent coordination"
      ]}
    />
  );
};

export default AIAgentsDemoPage;