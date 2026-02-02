import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import ServerlessPlatformDemo from '../components/demos/ServerlessPlatformDemo';

const ServerlessPlatformDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Serverless Application Platform"
      subtitle="Function deployment, auto-scaling, cost optimization, and monitoring"
      emoji="☁️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Multi-tenant SaaS', onClick: () => setCurrentPage('multi-tenant-saas-demo') }}
      demo={<ServerlessPlatformDemo />}
      overview="A comprehensive serverless application platform for deploying and managing serverless functions. Features automatic scaling, pay-per-use pricing, function monitoring, cost optimization, and comprehensive deployment tools. Demonstrates serverless architecture patterns and best practices."
      role="Cloud architecture, serverless platform development, function orchestration, cost optimization, and monitoring system design"
      stack={["AWS Lambda", "Serverless Framework", "API Gateway", "React", "Cloud Functions", "Auto-scaling"]}
      challenges={[
        "Managing function deployment and versioning",
        "Implementing efficient auto-scaling strategies",
        "Optimizing costs while maintaining performance",
        "Monitoring and debugging serverless functions"
      ]}
      results={[
        "Serverless function deployment and management",
        "Automatic scaling based on demand",
        "Cost optimization and monitoring",
        "Comprehensive function metrics and logging"
      ]}
      problem="Traditional server-based applications require constant server management, scaling, and maintenance. Serverless computing provides a solution with automatic scaling and pay-per-use pricing, but requires proper architecture and cost optimization strategies."
      approach="Built a serverless application platform that manages function deployment, auto-scaling, and monitoring. Implemented cost optimization strategies, comprehensive metrics tracking, and deployment automation. Created an interface for managing serverless functions and monitoring their performance."
      highlights={[
        "Serverless function deployment",
        "Automatic scaling and load balancing",
        "Pay-per-use cost model",
        "Function monitoring and metrics",
        "Cost optimization strategies",
        "Comprehensive deployment tools"
      ]}
    />
  );
};

export default ServerlessPlatformDemoPage;
