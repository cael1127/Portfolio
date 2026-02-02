import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import RealtimeCollaborationDemo from '../components/demos/RealtimeCollaborationDemo';

const RealtimeCollaborationDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Real-time Collaboration Platform"
      subtitle="Multi-user collaboration, presence indicators, conflict resolution, and real-time sync"
      emoji="👥"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Event-Driven Architecture', onClick: () => setCurrentPage('event-driven-architecture-demo') }}
      demo={<RealtimeCollaborationDemo />}
      overview="A real-time collaboration platform that enables multiple users to work together simultaneously. Features presence indicators, conflict resolution using operational transform, real-time synchronization, and comprehensive collaboration tools for seamless multi-user experiences."
      role="Full-stack development, real-time synchronization, WebSocket implementation, conflict resolution algorithms, and collaboration system design"
      stack={["Node.js", "WebSocket", "Redis", "React", "Operational Transform", "Real-time Sync"]}
      challenges={[
        "Implementing conflict-free collaborative editing",
        "Synchronizing state across multiple clients in real-time",
        "Handling network latency and connection issues",
        "Managing presence and user state efficiently"
      ]}
      results={[
        "Real-time collaborative editing with conflict resolution",
        "Presence indicators showing active users",
        "Efficient real-time synchronization",
        "Comprehensive collaboration features"
      ]}
      problem="Teams need tools to collaborate in real-time on documents, code, and projects. Traditional systems require manual merging and don't support simultaneous editing. A real-time collaboration platform is needed for seamless multi-user experiences."
      approach="Built a real-time collaboration platform using WebSocket for real-time communication, operational transform for conflict resolution, and Redis for state management. Implemented presence indicators, change tracking, and efficient synchronization algorithms."
      highlights={[
        "Real-time collaborative editing",
        "Operational transform for conflict resolution",
        "Presence indicators and user awareness",
        "Efficient real-time synchronization",
        "Change tracking and history",
        "Multi-user collaboration support"
      ]}
    />
  );
};

export default RealtimeCollaborationDemoPage;
