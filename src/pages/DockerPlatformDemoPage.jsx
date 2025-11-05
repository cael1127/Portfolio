import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import DockerPlatformDemo from '../components/demos/DockerPlatformDemo';

const DockerPlatformDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Docker Containerization Platform"
      subtitle="Multi-stage builds, orchestration, and production deployment"
      emoji="🐳"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Kubernetes Management', onClick: () => setCurrentPage('kubernetes-management-demo') }}
      demo={<DockerPlatformDemo />}
      overview="Comprehensive Docker containerization platform featuring multi-stage builds, container orchestration with Docker Compose, health checks, volume management, and production-ready configurations. The platform enables consistent deployment across all environments."
      role="DevOps engineering, containerization, Docker architecture, orchestration, and deployment optimization"
      stack={["Docker", "Docker Compose", "Multi-stage Builds", "Health Checks", "Volumes", "Networking"]}
      challenges={[
        "Optimizing Docker image sizes with multi-stage builds",
        "Configuring container orchestration for complex applications",
        "Implementing health checks and automatic recovery",
        "Managing volumes and persistent data",
        "Setting up container networking and security"
      ]}
      results={[
        "Reduced image sizes by 60% with multi-stage builds",
        "Implemented container orchestration for 5+ services",
        "Achieved 99.9% uptime with health checks",
        "Created production-ready Docker configurations",
        "Established container security best practices"
      ]}
      problem="Applications need consistent environments across development, staging, and production. Traditional deployment methods are prone to configuration drift and environment-specific issues. Containerization provides a solution but requires proper setup and orchestration."
      approach="Built a comprehensive Docker platform with multi-stage builds for optimization, Docker Compose for orchestration, health checks for reliability, and production-ready configurations. The platform ensures consistent deployments across all environments."
      highlights={[
        "Multi-stage Docker builds",
        "Container orchestration with Docker Compose",
        "Health checks and monitoring",
        "Volume management for data persistence",
        "Network configuration",
        "Production-ready security settings"
      ]}
      tutorialSummary="Build a complete Docker containerization platform with multi-stage builds, container orchestration, health checks, and production-ready configurations. Learn Docker best practices for building and deploying containerized applications."
      difficulty="Intermediate"
      timeEstimate="90 min"
      keyConcepts={[
        { name: "Containerization", description: "Packaging applications in containers" },
        { name: "Multi-stage Builds", description: "Optimizing Docker images" },
        { name: "Orchestration", description: "Managing multiple containers" },
        { name: "Health Checks", description: "Monitoring container health" }
      ]}
      tutorialSteps={[
        {
          title: "Create Dockerfile",
          description: "Build multi-stage Dockerfile for application",
          steps: [
            "Create base Dockerfile",
            "Implement multi-stage build",
            "Configure build arguments",
            "Set up production stage"
          ]
        },
        {
          title: "Configure Docker Compose",
          description: "Set up container orchestration",
          steps: [
            "Define services in docker-compose.yml",
            "Configure networking",
            "Set up volumes",
            "Add environment variables"
          ]
        },
        {
          title: "Implement Health Checks",
          description: "Add health monitoring",
          steps: [
            "Create health check endpoint",
            "Configure health checks in Dockerfile",
            "Set up health check in Compose",
            "Test health check functionality"
          ]
        },
        {
          title: "Optimize and Deploy",
          description: "Optimize images and deploy",
          steps: [
            "Optimize image sizes",
            "Set up security best practices",
            "Build and test containers",
            "Deploy to production"
          ]
        }
      ]}
      setupInstructions={`1. Install Docker:
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# On macOS
brew install docker docker-compose

2. Verify installation:
docker --version
docker-compose --version

3. Create Dockerfile:
Create Dockerfile in project root

4. Build and run:
docker-compose up --build`}
      deploymentGuide={`1. Build Docker images:
docker build -t myapp:latest .

2. Push to registry:
docker tag myapp:latest registry.example.com/myapp:latest
docker push registry.example.com/myapp:latest

3. Deploy with Compose:
docker-compose -f docker-compose.prod.yml up -d

4. Monitor containers:
docker-compose ps
docker-compose logs -f`}
      troubleshooting={[
        {
          issue: "Large image sizes",
          solution: "Use multi-stage builds and Alpine-based images to reduce size"
        },
        {
          issue: "Container startup failures",
          solution: "Check health checks and ensure dependencies are properly configured"
        },
        {
          issue: "Volume mounting issues",
          solution: "Verify volume paths and permissions in docker-compose.yml"
        }
      ]}
    />
  );
};

export default DockerPlatformDemoPage;

