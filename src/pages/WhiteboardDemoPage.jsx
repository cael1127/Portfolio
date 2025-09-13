import React from 'react';
import WhiteboardDemo from '../components/demos/WhiteboardDemo';
import ProjectLayout from '../components/ProjectLayout';

const WhiteboardDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Whiteboard Demo"
      subtitle="Collaborative drawing platform"
      emoji="🖼️"
      onBack={() => setCurrentPage('demo-organizer')}
    >
      <WhiteboardDemo />
    </ProjectLayout>
  );
};

export default WhiteboardDemoPage; 