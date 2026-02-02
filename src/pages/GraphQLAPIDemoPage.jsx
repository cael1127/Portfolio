import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import GraphQLAPIDemo from '../components/demos/GraphQLAPIDemo';

const GraphQLAPIDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="GraphQL API with React Frontend"
      subtitle="Type-safe queries, real-time subscriptions, query optimization, and caching"
      emoji="📡"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Real-time Collaboration', onClick: () => setCurrentPage('realtime-collaboration-platform-demo') }}
      demo={<GraphQLAPIDemo />}
      overview="A full-stack GraphQL API with React frontend demonstrating type-safe queries, real-time subscriptions, query optimization, and intelligent caching. Features a GraphQL playground for interactive query testing and comprehensive schema documentation."
      role="Full-stack development, GraphQL schema design, Apollo Server implementation, React Apollo Client integration, and query optimization"
      stack={["GraphQL", "Apollo Server", "React", "Apollo Client", "Type Safety", "Real-time Subscriptions"]}
      challenges={[
        "Designing efficient GraphQL schemas and resolvers",
        "Implementing real-time subscriptions with WebSocket",
        "Optimizing query performance and reducing over-fetching",
        "Managing caching strategies for GraphQL queries"
      ]}
      results={[
        "Type-safe GraphQL API with comprehensive schema",
        "Real-time subscriptions for live data updates",
        "Query optimization and intelligent caching",
        "Interactive GraphQL playground for testing"
      ]}
      problem="REST APIs often suffer from over-fetching and under-fetching problems. Clients need to make multiple requests to get related data. GraphQL provides a solution with flexible queries, but requires proper implementation of schemas, resolvers, and optimization strategies."
      approach="Built a comprehensive GraphQL API using Apollo Server with well-designed schemas and resolvers. Implemented real-time subscriptions, query optimization, and caching strategies. Created a React frontend with Apollo Client and an interactive GraphQL playground for testing."
      highlights={[
        "Type-safe GraphQL schema and queries",
        "Real-time subscriptions with WebSocket",
        "Query optimization and batching",
        "Intelligent caching strategies",
        "GraphQL playground for interactive testing",
        "Comprehensive schema documentation"
      ]}
    />
  );
};

export default GraphQLAPIDemoPage;
