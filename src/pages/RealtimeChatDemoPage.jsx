import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';
import DemoReadme from '../components/DemoReadme';
import RealtimeChatDemo from '../components/demos/RealtimeChatDemo';

const RealtimeChatDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Real-time Chat"
      subtitle="Rooms, presence, typing indicators"
      emoji="💬"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'SaaS Analytics', onClick: () => setCurrentPage('saas-analytics-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="💬" accent="#22d3ee" />
        <RealtimeChatDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="WebSocket chat supporting rooms, presence, and delivery states."
          role="Protocol design, frontend integration."
          stack={["WebSocket", "Node.js", "React"]}
          challenges={["Presence scalability", "Typing state thrashing"]}
          results={["Stable presence", "Smooth UX"]}
        />
      </Reveal>
      <Reveal delay={250}>
        <DemoReadme
          problem="Show realtime collaboration patterns without server setup."
          approach="Use BroadcastChannel to emulate rooms, presence, and message fanout deterministically."
          highlights={["Local channel", "Presence map", "Message dedup"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default RealtimeChatDemoPage;


