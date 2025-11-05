import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const DockerPlatformDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState('node:18');
  const [containers, setContainers] = useState([]);

  const images = [
    { name: 'node:18', description: 'Node.js 18 runtime' },
    { name: 'python:3.11', description: 'Python 3.11 runtime' },
    { name: 'nginx:alpine', description: 'Nginx web server' },
    { name: 'postgres:15', description: 'PostgreSQL database' }
  ];

  const codeData = {
    code: `# Multi-stage Dockerfile for production
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node healthcheck.js

# Start application
CMD ["node", "dist/index.js"]

# Docker Compose for orchestration
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge`,
    explanation: `Docker containerization platform provides a complete solution for building, deploying, and orchestrating containerized applications.

## Key Features

**Multi-stage Builds**: Optimize Docker images by using multi-stage builds to reduce image size and improve security.

**Docker Compose**: Orchestrate multiple containers with Docker Compose for development and production environments.

**Health Checks**: Implement health checks to ensure containers are running properly and enable automatic recovery.

**Networking**: Configure container networking for service communication and isolation.

## Technical Implementation

The platform uses multi-stage Dockerfiles for optimized builds, Docker Compose for orchestration, and includes health checks, volume management, and networking configuration.

## Benefits

- **Consistency**: Same environment across development, staging, and production
- **Isolation**: Containers are isolated from each other and the host system
- **Scalability**: Easy to scale applications horizontally
- **Portability**: Run anywhere Docker is supported`,
    technologies: [
      { name: 'Docker', description: 'Containerization platform', tags: ['Containers', 'DevOps'] },
      { name: 'Docker Compose', description: 'Container orchestration', tags: ['Orchestration', 'DevOps'] },
      { name: 'Multi-stage Builds', description: 'Optimized image building', tags: ['Optimization'] },
      { name: 'Health Checks', description: 'Container health monitoring', tags: ['Monitoring'] }
    ],
    concepts: [
      { name: 'Containerization', description: 'Packaging applications in containers', example: 'Docker containers for apps' },
      { name: 'Multi-stage Builds', description: 'Optimizing Docker images', example: 'Separate build and runtime stages' },
      { name: 'Orchestration', description: 'Managing multiple containers', example: 'Docker Compose for services' },
      { name: 'Health Checks', description: 'Monitoring container health', example: 'Automatic container restart on failure' }
    ],
    features: [
      'Multi-stage Docker builds',
      'Container orchestration',
      'Health checks and monitoring',
      'Volume management',
      'Network configuration',
      'Production-ready configuration'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Docker Containerization Platform</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Base Images</label>
            <div className="grid grid-cols-2 gap-2">
              {images.map(img => (
                <button
                  key={img.name}
                  onClick={() => setSelectedImage(img.name)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedImage === img.name
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-white font-medium text-sm">{img.name}</div>
                  <div className="text-gray-400 text-xs mt-1">{img.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Container Features</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Multi-stage builds for optimized images</li>
              <li>• Health checks and monitoring</li>
              <li>• Volume management for data persistence</li>
              <li>• Network configuration for service communication</li>
              <li>• Production-ready security settings</li>
            </ul>
          </div>
        </div>
      </div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="dockerfile"
        title="Docker Platform Configuration"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default DockerPlatformDemo;

