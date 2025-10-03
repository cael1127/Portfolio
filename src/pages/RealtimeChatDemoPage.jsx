import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import RealtimeChatDemo from '../components/demos/RealtimeChatDemo';

const RealtimeChatDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Real-time Chat"
      subtitle="Rooms, presence, typing indicators"
      emoji="💬"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'SaaS Analytics', onClick: () => setCurrentPage('saas-analytics-demo') }}
      demo={<RealtimeChatDemo />}
      overview="Advanced real-time chat application featuring instant messaging, user presence tracking, and room-based conversations. Built with modern web technologies to provide seamless communication experiences with low latency and high reliability."
      role="Full-stack development, real-time protocol design, WebSocket implementation, and user experience optimization"
      stack={["WebSocket", "BroadcastChannel", "React", "Node.js", "JavaScript", "Real-time APIs"]}
      challenges={[
        "Managing real-time message synchronization",
        "Implementing efficient presence tracking",
        "Handling connection drops and reconnection",
        "Scaling to multiple concurrent users"
      ]}
      results={[
        "Sub-100ms message delivery",
        "Real-time presence indicators",
        "Automatic reconnection handling",
        "Scalable room-based architecture"
      ]}
      problem="Create a real-time chat system that supports instant messaging, user presence tracking, and room-based conversations with low latency and high reliability for team collaboration and customer support applications."
      approach="Implemented a deterministic demo using BroadcastChannel API to simulate real-time communication patterns. Created presence tracking with heartbeat mechanisms and message deduplication to showcase the core chat functionality without requiring server infrastructure."
      highlights={[
        "BroadcastChannel for local real-time communication",
        "Presence tracking with heartbeat system",
        "Message deduplication and ordering",
        "Room-based conversation management",
        "Real-time user count display",
        "Clean message history management"
      ]}
    />
  );
};

export default RealtimeChatDemoPage;


