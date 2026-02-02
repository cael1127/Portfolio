import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import AIAssistantDemo from '../components/demos/AIAssistantDemo';

const AIAssistantDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="AI Assistant"
      subtitle="Intelligent conversational AI with natural language processing"
      emoji="🤖"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Snake AI', onClick: () => setCurrentPage('snake-ai-demo') }}
      demo={<AIAssistantDemo />}
      overview="An intelligent conversational AI assistant that provides natural language understanding, context awareness, and smart responses. Built with modern NLP techniques to deliver human-like interactions and helpful assistance across various domains."
      role="Full-stack development, NLP integration, API design, conversation flow engineering, and user experience design"
      stack={["React", "NLP", "API Integration", "JavaScript", "Tailwind CSS", "Context API"]}
      challenges={[
        "Implementing natural language understanding",
        "Maintaining conversation context across interactions",
        "Handling ambiguous user queries",
        "Providing accurate and helpful responses"
      ]}
      results={[
        "Natural conversation flow with context retention",
        "Smart response generation based on user intent",
        "Seamless API integration for real-time responses",
        "Intuitive user interface for chat interactions"
      ]}
      problem="Users need an intelligent AI assistant that can understand natural language, maintain conversation context, and provide helpful, accurate responses across various topics and use cases."
      approach="Built a conversational AI assistant using React for the frontend and integrated NLP capabilities for natural language understanding. Implemented context management to maintain conversation flow and designed an intuitive chat interface for seamless user interactions."
      highlights={[
        "Natural language processing and understanding",
        "Context-aware conversation management",
        "Real-time response generation",
        "Intuitive chat interface",
        "Multi-turn conversation support",
        "Smart query interpretation"
      ]}
    />
  );
};

export default AIAssistantDemoPage; 