import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import KubernetesManagementDemo from '../components/demos/KubernetesManagementDemo';

const KubernetesManagementDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Kubernetes Cluster Management"
      subtitle="Deployment, service mesh, auto-scaling, and monitoring"
      emoji="☸️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Terraform IaC', onClick: () => setCurrentPage('terraform-iac-demo') }}
      demo={<KubernetesManagementDemo />}
      overview="Comprehensive Kubernetes cluster management system for deploying, scaling, and managing containerized applications. Includes deployment management, service discovery, auto-scaling with HPA, health checks, and configuration management."
      role="DevOps engineering, Kubernetes administration, cluster management, auto-scaling configuration, and monitoring setup"
      stack={["Kubernetes", "Kubectl", "Helm", "Kustomize", "Prometheus", "Grafana", "AWS EKS"]}
      challenges={[
        "Configuring Kubernetes deployments with proper resource limits",
        "Implementing auto-scaling based on metrics",
        "Setting up service discovery and load balancing",
        "Managing ConfigMaps and Secrets securely",
        "Monitoring and observability setup"
      ]}
      results={[
        "Deployed 10+ microservices to Kubernetes",
        "Implemented auto-scaling reducing costs by 40%",
        "Achieved 99.9% uptime with health checks",
        "Set up comprehensive monitoring and alerting",
        "Created reusable Helm charts"
      ]}
      problem="Managing containerized applications at scale requires orchestration, auto-scaling, service discovery, and monitoring. Kubernetes provides these capabilities but requires proper configuration and management."
      approach="Built a comprehensive Kubernetes management system with deployment manifests, service configurations, auto-scaling with HPA, health checks, and configuration management. The system includes monitoring and observability for production use."
      highlights={[
        "Deployment management with rolling updates",
        "Service discovery and load balancing",
        "Auto-scaling with HPA",
        "Health checks and probes",
        "ConfigMap and Secret management",
        "Monitoring and observability"
      ]}
      tutorialSummary="Learn Kubernetes cluster management including deployments, services, auto-scaling, and configuration management. Build production-ready Kubernetes configurations for containerized applications."
      difficulty="Advanced"
      timeEstimate="150 min"
      keyConcepts={[
        { name: "Deployments", description: "Managing application deployments" },
        { name: "Services", description: "Exposing applications with load balancing" },
        { name: "Auto-scaling", description: "Scaling based on CPU and memory metrics" },
        { name: "ConfigMaps", description: "Managing configuration separately from code" }
      ]}
      tutorialSteps={[
        {
          title: "Setup Kubernetes Cluster",
          description: "Set up Kubernetes cluster or use managed service",
          steps: [
            "Install kubectl CLI",
            "Set up cluster (EKS, GKE, or local)",
            "Configure kubectl context",
            "Verify cluster connectivity"
          ]
        },
        {
          title: "Create Deployment Manifest",
          description: "Define application deployment",
          steps: [
            "Create Deployment YAML",
            "Configure replicas and selectors",
            "Set resource limits and requests",
            "Add health checks (liveness/readiness)"
          ]
        },
        {
          title: "Configure Services and Networking",
          description: "Expose applications with services",
          steps: [
            "Create Service manifest",
            "Configure service type (ClusterIP, LoadBalancer)",
            "Set up ingress for external access",
            "Test service discovery"
          ]
        },
        {
          title: "Implement Auto-scaling",
          description: "Configure horizontal pod autoscaling",
          steps: [
            "Create HPA manifest",
            "Configure CPU and memory metrics",
            "Set min and max replicas",
            "Test auto-scaling behavior"
          ]
        },
        {
          title: "Add Monitoring and Configuration",
          description: "Set up monitoring and config management",
          steps: [
            "Create ConfigMaps for configuration",
            "Set up Secrets for sensitive data",
            "Configure Prometheus monitoring",
            "Set up Grafana dashboards"
          ]
        }
      ]}
      setupInstructions={`1. Install kubectl:
# On macOS
brew install kubectl

# On Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

2. Configure cluster access:
kubectl config set-context my-cluster

3. Verify connection:
kubectl cluster-info

4. Apply manifests:
kubectl apply -f deployment.yaml`}
      deploymentGuide={`1. Deploy to cluster:
kubectl apply -f deployment.yaml

2. Check deployment status:
kubectl get deployments
kubectl get pods

3. Monitor services:
kubectl get services
kubectl get ingress

4. Scale application:
kubectl scale deployment web-app --replicas=5`}
      troubleshooting={[
        {
          issue: "Pods not starting",
          solution: "Check pod logs and events: kubectl describe pod <pod-name>"
        },
        {
          issue: "Service not accessible",
          solution: "Verify service selectors match pod labels and check ingress configuration"
        },
        {
          issue: "Auto-scaling not working",
          solution: "Verify metrics server is installed and HPA metrics are configured correctly"
        }
      ]}
    />
  );
};

export default KubernetesManagementDemoPage;

