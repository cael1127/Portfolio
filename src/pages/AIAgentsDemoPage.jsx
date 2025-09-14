import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';

const AIAgentsDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="AI Agents in Python"
      subtitle="Multi-agent behaviors and coordination"
      emoji="🧠"
      onBack={() => setCurrentPage('demo-organizer')}
    >
      <Reveal>
        <ProjectThumb emoji="🧠" accent="#22c55e" />
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <p className="text-gray-300">Overview of agent roles, behavior trees, and messaging. (Code sample available on request.)</p>
        </div>
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Agents with complementary behaviors coordinate to achieve composite tasks."
          role="Design of behavior trees, messaging protocols, and evaluation."
          stack={["Python", "Behavior Trees", "Simulation"]}
          challenges={["Deadlocks", "Priority inversion"]}
          results={["Stable convergence", "Traceable decisions"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default AIAgentsDemoPage;