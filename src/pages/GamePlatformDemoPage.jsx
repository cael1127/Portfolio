import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import GamePlatformDemo from '../components/demos/GamePlatformDemo';

const GamePlatformDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Multiplayer Gaming Platform"
      subtitle="Interactive multiplayer gaming with real-time features"
      emoji="🎮"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'AI Assistant', onClick: () => setCurrentPage('ai-assistant-demo') }}
      demo={<GamePlatformDemo />}
      overview="A comprehensive multiplayer gaming platform featuring real-time game sessions, player matchmaking, leaderboards, and social features. Built to provide seamless multiplayer gaming experiences with low latency and engaging gameplay."
      role="Full-stack development, game engine integration, real-time multiplayer networking, matchmaking system design, and gaming platform architecture"
      stack={["React", "WebSocket", "Game Engine", "Node.js", "Real-time Networking", "Matchmaking", "Leaderboards"]}
      challenges={[
        "Implementing low-latency real-time multiplayer networking",
        "Creating efficient matchmaking algorithms",
        "Synchronizing game state across multiple clients",
        "Handling network disconnections and reconnections gracefully"
      ]}
      results={[
        "Real-time multiplayer gaming with <50ms latency",
        "Efficient matchmaking system connecting players quickly",
        "Synchronized game state across all players",
        "Comprehensive leaderboard and achievement system",
        "Robust network error handling and recovery"
      ]}
      problem="Gamers need a platform that enables seamless multiplayer experiences with low latency, fair matchmaking, and engaging social features. Existing solutions often have high latency or poor matchmaking."
      approach="Developed a multiplayer gaming platform with WebSocket-based real-time networking for low latency, intelligent matchmaking algorithms, and comprehensive game state synchronization. Built social features including leaderboards and player profiles."
      highlights={[
        "Real-time multiplayer game sessions",
        "Intelligent player matchmaking system",
        "Live leaderboards and achievements",
        "Synchronized game state management",
        "Social features and player profiles",
        "Low-latency networking architecture"
      ]}
    />
  );
};

export default GamePlatformDemoPage; 