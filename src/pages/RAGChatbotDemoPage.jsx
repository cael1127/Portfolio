import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import RAGChatbotDemo from '../components/demos/RAGChatbotDemo';

const RAGChatbotDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="RAG Chatbot"
      subtitle="Retrieval-Augmented Generation chatbot with context awareness"
      emoji="🤖"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Bookstore API', onClick: () => setCurrentPage('bookstore-api-demo') }}
      demo={<RAGChatbotDemo />}
      overview="A Retrieval-Augmented Generation (RAG) chatbot that combines information retrieval with language generation to provide accurate, context-aware responses. Uses vector embeddings and semantic search to retrieve relevant information before generating responses."
      role="Full-stack development, RAG architecture design, vector database integration, semantic search implementation, and chatbot interface development"
      stack={["React", "Python", "Vector Database", "LLM Integration", "Semantic Search", "Embeddings", "RAG"]}
      challenges={[
        "Implementing efficient semantic search and retrieval",
        "Integrating vector embeddings with language models",
        "Maintaining conversation context across interactions",
        "Balancing retrieval accuracy with response quality"
      ]}
      results={[
        "Context-aware responses with accurate information retrieval",
        "Semantic search for relevant document retrieval",
        "Maintained conversation context across multiple turns",
        "High-quality responses based on retrieved knowledge",
        "Intuitive chatbot interface with conversation history"
      ]}
      problem="Traditional chatbots often provide generic responses or hallucinate information. A RAG system is needed to provide accurate, context-aware responses by retrieving relevant information before generating answers."
      approach="Built a RAG chatbot system that uses vector embeddings for semantic search, retrieves relevant documents from a knowledge base, and generates context-aware responses using language models. Implemented conversation context management for multi-turn interactions."
      highlights={[
        "Retrieval-Augmented Generation architecture",
        "Semantic search with vector embeddings",
        "Context-aware response generation",
        "Multi-turn conversation support",
        "Knowledge base integration",
        "Intuitive chat interface with history"
      ]}
      tutorialSummary="Build a RAG chatbot that combines information retrieval with language generation. Learn how to implement semantic search, vector embeddings, and context-aware response generation."
      difficulty="Advanced"
      timeEstimate="2-3 weeks"
      keyConcepts={[
        { name: "RAG", description: "Retrieval-Augmented Generation for accurate responses" },
        { name: "Vector Embeddings", description: "Semantic representations of text" },
        { name: "Semantic Search", description: "Finding relevant information by meaning" },
        { name: "Context Management", description: "Maintaining conversation state" }
      ]}
      tutorialSteps={[
        "Set up vector database and embeddings",
        "Implement semantic search and retrieval system",
        "Integrate language model for response generation",
        "Build conversation context management",
        "Create chatbot interface with conversation history"
      ]}
    />
  );
};

export default RAGChatbotDemoPage;