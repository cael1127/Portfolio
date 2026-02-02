import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import WhiteboardDemo from '../components/demos/WhiteboardDemo';

const WhiteboardDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Collaborative Whiteboard"
      subtitle="Real-time collaborative drawing platform with presence and drawing tools"
      emoji="🖼️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Aquaculture', onClick: () => setCurrentPage('aquaculture-demo') }}
      demo={<WhiteboardDemo />}
      overview="A real-time collaborative whiteboard platform that enables multiple users to draw, sketch, and collaborate simultaneously. Features presence indicators, various drawing tools, and low-latency synchronization for seamless collaborative experiences."
      role="Frontend development, WebRTC consultation, real-time synchronization, canvas rendering, and user experience design"
      stack={["React", "Canvas API", "WebSocket", "Tailwind CSS", "Real-time Collaboration", "Drawing Tools"]}
      challenges={[
        "Resolving sync conflicts when multiple users draw simultaneously",
        "Smoothing network jitter for smooth drawing experience",
        "Optimizing canvas rendering performance",
        "Implementing efficient real-time synchronization"
      ]}
      results={[
        "Low-latency drawing with smooth synchronization",
        "Intuitive tool palette with various drawing options",
        "Real-time presence indicators showing active users",
        "Seamless collaborative drawing experience",
        "Responsive design for all devices"
      ]}
      problem="Teams need collaborative whiteboard tools for brainstorming, planning, and visual collaboration. Existing solutions often have latency issues or lack real-time synchronization, making collaboration difficult."
      approach="Built a real-time collaborative whiteboard using Canvas API for drawing, WebSocket for synchronization, and implemented conflict resolution algorithms. Created an intuitive interface with various drawing tools and presence indicators."
      highlights={[
        "Real-time collaborative canvas",
        "Multiple drawing tools and brushes",
        "User presence indicators",
        "Low-latency synchronization",
        "Intuitive tool palette",
        "Smooth drawing experience"
      ]}
    />
  );
};

export default WhiteboardDemoPage; 