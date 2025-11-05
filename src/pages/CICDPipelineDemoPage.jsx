import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import CICDPipelineDemo from '../components/demos/CICDPipelineDemo';

const CICDPipelineDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="CI/CD Pipeline with GitHub Actions"
      subtitle="Automated testing, deployment, and monitoring"
      emoji="🚀"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Docker Platform', onClick: () => setCurrentPage('docker-platform-demo') }}
      demo={<CICDPipelineDemo />}
      overview="Complete CI/CD pipeline implementation using GitHub Actions that automates the entire software delivery process. The pipeline includes automated testing, building, deployment to multiple environments, and monitoring with rollback capabilities."
      role="DevOps engineering, CI/CD pipeline design, automation, infrastructure as code, and monitoring setup"
      stack={["GitHub Actions", "YAML", "Docker", "Node.js", "AWS", "Terraform", "Kubernetes"]}
      challenges={[
        "Designing multi-stage pipeline with proper dependencies",
        "Managing secrets and environment variables securely",
        "Implementing rollback mechanisms",
        "Optimizing pipeline execution time",
        "Setting up monitoring and alerting"
      ]}
      results={[
        "Reduced deployment time from 2 hours to 15 minutes",
        "Achieved 99.9% deployment success rate",
        "Implemented automated rollback on failures",
        "Created comprehensive pipeline documentation",
        "Set up monitoring and alerting system"
      ]}
      problem="Manual deployment processes are error-prone, time-consuming, and inconsistent. Teams need automated CI/CD pipelines that test code, build artifacts, deploy to environments, and monitor deployments automatically."
      approach="Built a comprehensive CI/CD pipeline using GitHub Actions that automates the entire software delivery lifecycle. The pipeline includes testing, building, deployment, and monitoring stages with proper error handling and rollback capabilities."
      highlights={[
        "Automated build and test pipeline",
        "Multi-environment deployment",
        "Artifact management and caching",
        "Health checks and monitoring",
        "Automatic rollback on failures",
        "Comprehensive logging and notifications"
      ]}
      tutorialSummary="Build a complete CI/CD pipeline using GitHub Actions that automates testing, building, deployment, and monitoring. Learn to configure workflows, manage secrets, and implement deployment strategies."
      difficulty="Intermediate"
      timeEstimate="120 min"
      keyConcepts={[
        { name: "Continuous Integration", description: "Automated testing on code changes" },
        { name: "Continuous Deployment", description: "Automated deployment to production" },
        { name: "Pipeline Orchestration", description: "Managing multi-stage workflows" },
        { name: "Infrastructure as Code", description: "Version-controlled infrastructure" }
      ]}
      tutorialSteps={[
        {
          title: "Setup GitHub Actions Workflow",
          description: "Create GitHub Actions workflow file",
          steps: [
            "Create .github/workflows directory",
            "Define workflow triggers (push, PR)",
            "Configure job dependencies",
            "Set up environment variables"
          ]
        },
        {
          title: "Implement Build Stage",
          description: "Configure build and artifact management",
          steps: [
            "Set up Node.js/Python environment",
            "Install dependencies",
            "Build application",
            "Upload build artifacts"
          ]
        },
        {
          title: "Add Testing Stage",
          description: "Implement automated testing",
          steps: [
            "Run unit tests",
            "Execute integration tests",
            "Generate coverage reports",
            "Upload test results"
          ]
        },
        {
          title: "Configure Deployment",
          description: "Set up deployment to staging and production",
          steps: [
            "Configure deployment secrets",
            "Set up staging deployment",
            "Implement production deployment",
            "Add rollback mechanisms"
          ]
        },
        {
          title: "Add Monitoring and Notifications",
          description: "Implement health checks and alerts",
          steps: [
            "Add health check endpoints",
            "Configure monitoring",
            "Set up notification system",
            "Create deployment dashboards"
          ]
        }
      ]}
      setupInstructions={`1. Create GitHub repository:
git init
git remote add origin <repo-url>

2. Create workflow file:
mkdir -p .github/workflows
Create ci-cd.yml file

3. Configure secrets:
Add secrets in GitHub repository settings:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- DEPLOYMENT_TOKEN

4. Push code:
git push origin main`}
      deploymentGuide={`1. Configure deployment environments:
Set up staging and production environments

2. Set up cloud resources:
- AWS: EC2, ECS, or Lambda
- GCP: Cloud Run or App Engine
- Azure: App Service or Container Instances

3. Configure deployment secrets:
Add secrets in GitHub Actions settings

4. Test pipeline:
Make a code change and verify pipeline runs`}
      troubleshooting={[
        {
          issue: "Pipeline fails on secret access",
          solution: "Verify secrets are properly configured in repository settings"
        },
        {
          issue: "Build artifacts not found",
          solution: "Check artifact upload/download steps and job dependencies"
        },
        {
          issue: "Deployment timeouts",
          solution: "Increase timeout limits and optimize deployment scripts"
        }
      ]}
    />
  );
};

export default CICDPipelineDemoPage;

