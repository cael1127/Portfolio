import React from 'react';
import ProjectLayout from '../ProjectLayout';
import RealTimeCollaboration from '../RealTimeCollaboration';

const RealTimeCollaborationProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Enterprise Collaboration Hub"
      subtitle="Unified co-editing, presence, and real-time communications"
      emoji="🤝"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'AI Interview Simulator', onClick: () => setCurrentPage('ai-interview-simulator') }}
      demo={<RealTimeCollaboration isEmbedded />}
      overview="A mission-critical collaboration surface that synchronises teams across chat, documents, and shared canvases with live presence and WebRTC communication."
      role="Solution design, WebSocket orchestration, WebRTC integration, and UI engineering"
      stack={[
        'React',
        'WebSocket',
        'WebRTC',
        'Operational Transform',
        'Tailwind CSS'
      ]}
      challenges={[
        'Maintaining state consistency across globally distributed teams',
        'Providing responsive UX during network volatility',
        'Coordinating chat, documents, and presence in a single canvas'
      ]}
      results={[
        'Sub-second sync across 50+ concurrent collaborators',
        'Built-in resilience with reconnection + offline queueing',
        'Unified workspace that reduces context switching by 35%'
      ]}
      problem="Enterprise teams juggle scattered tools for chat, documents, and stand-ups, slowing decisions."
      approach="Merged WebSocket event streams, WebRTC video, and OT document editing into one orchestrated experience."
      highlights={[
        'Live presence indicators with typing + activity states',
        'Document collaboration powered by operational transforms',
        'Realtime chat feed with system events and alerts',
        'Edge node health + latency monitoring for reliable sessions'
      ]}
      tutorialSummary="Walks through building a resilient collaboration stack with WebSocket + WebRTC primitives."
      difficulty="Advanced"
      timeEstimate="3-4 weeks"
      keyConcepts={[
        { name: 'Realtime Presence', description: 'Broadcast user activity with WebSocket fan-out' },
        { name: 'Operational Transform', description: 'Resolve document conflicts without losing intent' },
        { name: 'WebRTC Mesh', description: 'Enable low-latency video + audio channels alongside data streams' }
      ]}
      tutorialSteps={[
        'Model the collaboration domain events and WebSocket channels',
        'Implement OT-based document editing with conflict resolution',
        'Layer WebRTC signalling for live media + screen sharing',
        'Instrument analytics for latency, uptime, and engagement'
      ]}
    />
  );
};

export default RealTimeCollaborationProjectPage;

