import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const KubernetesManagementDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  const codeData = {
    code: `# Kubernetes Deployment Manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
# Service Manifest
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer

---
# HorizontalPodAutoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

---
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.properties: |
    log.level=info
    cache.enabled=true
    cache.ttl=3600`,
    explanation: `Kubernetes cluster management provides orchestration, scaling, and management of containerized applications.

## Key Features

**Deployments**: Manage application deployments with rolling updates and rollback capabilities.

**Services**: Expose applications with load balancing and service discovery.

**Auto-scaling**: Automatically scale applications based on CPU and memory usage.

**ConfigMaps & Secrets**: Manage configuration and sensitive data separately from application code.

## Technical Implementation

The platform uses Kubernetes manifests for declarative configuration, implements health checks, resource limits, and auto-scaling for production workloads.

## Benefits

- **Scalability**: Auto-scale based on demand
- **High Availability**: Multi-replica deployments with health checks
- **Service Discovery**: Automatic service discovery and load balancing
- **Resource Management**: Efficient resource allocation and limits`,
    technologies: [
      { name: 'Kubernetes', description: 'Container orchestration', tags: ['Orchestration', 'DevOps'] },
      { name: 'Kubectl', description: 'Kubernetes CLI', tags: ['CLI', 'Management'] },
      { name: 'Helm', description: 'Package manager', tags: ['Packaging', 'Deployment'] },
      { name: 'Kustomize', description: 'Configuration management', tags: ['Configuration'] }
    ],
    concepts: [
      { name: 'Deployments', description: 'Managing application deployments', example: 'Rolling updates and rollbacks' },
      { name: 'Services', description: 'Exposing applications', example: 'Load balancing and service discovery' },
      { name: 'Auto-scaling', description: 'Scaling based on metrics', example: 'HPA for CPU/memory scaling' },
      { name: 'ConfigMaps', description: 'Configuration management', example: 'Separating config from code' }
    ],
    features: [
      'Deployment management',
      'Service discovery and load balancing',
      'Auto-scaling with HPA',
      'Health checks and probes',
      'Resource limits and requests',
      'ConfigMap and Secret management'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Kubernetes Cluster Management</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-sm font-medium text-white">Deployments</div>
              <div className="text-xs text-gray-400 mt-1">3 replicas</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">🌐</div>
              <div className="text-sm font-medium text-white">Services</div>
              <div className="text-xs text-gray-400 mt-1">LoadBalancer</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm font-medium text-white">Auto-scaling</div>
              <div className="text-xs text-gray-400 mt-1">3-10 pods</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium text-white">ConfigMaps</div>
              <div className="text-xs text-gray-400 mt-1">App config</div>
            </div>
          </div>
        </div>
      </div>
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="yaml"
        title="Kubernetes Management"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default KubernetesManagementDemo;

