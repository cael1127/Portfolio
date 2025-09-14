import React from 'react';
import WhiteboardDemo from '../components/demos/WhiteboardDemo';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';

const WhiteboardDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Whiteboard Demo"
      subtitle="Collaborative drawing platform"
      emoji="🖼️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Aquaculture', onClick: () => setCurrentPage('aquaculture-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="🖼️" accent="#a78bfa" />
        <WhiteboardDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Realtime collaborative canvas with presence and drawing tools."
          role="Frontend, WebRTC consultation, UX."
          stack={["React", "Canvas API", "WebSocket", "Tailwind"]}
          challenges={["Sync conflicts", "Network jitter smoothing"]}
          results={["Low-latency drawing", "Intuitive tool palette"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default WhiteboardDemoPage; 