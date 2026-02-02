import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import MicroservicesDemo from '../components/demos/MicroservicesDemo';

const MicroservicesDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Microservices Architecture Platform"
      subtitle="Service discovery, load balancing, inter-service communication, and health monitoring"
      emoji="🔧"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'GraphQL API', onClick: () => setCurrentPage('graphql-api-demo') }}
      demo={<MicroservicesDemo />}
      overview="A comprehensive microservices architecture platform featuring service discovery, load balancing, API gateway, inter-service communication, and health monitoring. Demonstrates how to build, deploy, and manage distributed microservices applications with proper service orchestration."
      role="Full-stack architecture, microservices design, service discovery implementation, API gateway development, and distributed systems engineering"
      stack={["Node.js", "Docker", "Kubernetes", "API Gateway", "Service Mesh", "Load Balancing"]}
      challenges={[
        "Implementing efficient service discovery and registration",
        "Managing inter-service communication and dependencies",
        "Handling service failures and circuit breakers",
        "Scaling individual services independently"
      ]}
      results={[
        "Service discovery and registration system",
        "Load balancing across service instances",
        "API gateway for unified entry point",
        "Comprehensive health monitoring and management"
      ]}
      problem="Large applications need to be broken down into smaller, independently deployable services. Managing microservices requires service discovery, load balancing, inter-service communication, and health monitoring capabilities that traditional monolithic architectures don't provide."
      approach="Built a microservices architecture platform with service discovery, API gateway, load balancing, and health monitoring. Implemented inter-service communication patterns, circuit breakers for resilience, and comprehensive monitoring for service management."
      highlights={[
        "Service discovery and registration",
        "Load balancing with multiple strategies",
        "API gateway for unified routing",
        "Inter-service communication",
        "Health monitoring and management",
        "Service topology visualization"
      ]}
    />
  );
};

export default MicroservicesDemoPage;
