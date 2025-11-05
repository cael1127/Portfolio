import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const CICDPipelineDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState('idle');
  const [currentStage, setCurrentStage] = useState(null);
  const [buildLogs, setBuildLogs] = useState([]);

  const stages = [
    { id: 'build', name: 'Build', status: 'pending', duration: '0s' },
    { id: 'test', name: 'Test', status: 'pending', duration: '0s' },
    { id: 'deploy', name: 'Deploy', status: 'pending', duration: '0s' },
    { id: 'monitor', name: 'Monitor', status: 'pending', duration: '0s' }
  ];

  const runPipeline = async () => {
    setPipelineStatus('running');
    setBuildLogs([]);
    
    for (let i = 0; i < stages.length; i++) {
      setCurrentStage(stages[i].id);
      setBuildLogs(prev => [...prev, `Starting ${stages[i].name} stage...`]);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBuildLogs(prev => [...prev, `${stages[i].name} stage completed successfully`]);
    }
    
    setPipelineStatus('success');
    setCurrentStage(null);
  };

  const codeData = {
    code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  deploy:
    runs-on: ubuntu-latest
    needs: [build, test]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
      
      - name: Deploy to staging
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
      
      - name: Deploy to production
        if: github.event_name == 'push'
        run: |
          echo "Deploying to production..."
          # Add deployment commands here

  monitor:
    runs-on: ubuntu-latest
    needs: deploy
    steps:
      - name: Health check
        run: |
          curl -f https://app.example.com/health || exit 1
      
      - name: Performance check
        run: |
          npm run lighthouse -- --output=json
      
      - name: Send notifications
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: \${{ job.status }}
          text: 'Deployment failed!'`,
    explanation: `GitHub Actions CI/CD pipeline automates the entire software delivery process from code commit to production deployment.

## Pipeline Stages

**Build**: Compiles the application, installs dependencies, and creates build artifacts.

**Test**: Runs unit tests, integration tests, and E2E tests with coverage reporting.

**Deploy**: Deploys to staging and production environments after successful tests.

**Monitor**: Performs health checks, performance monitoring, and sends notifications.

## Technical Implementation

The pipeline uses GitHub Actions workflows with conditional deployment, artifact management, and multi-stage execution. It includes proper error handling and rollback capabilities.

## Benefits

- **Automation**: Eliminates manual deployment steps
- **Quality**: Ensures code quality through automated testing
- **Speed**: Fast feedback on code changes
- **Reliability**: Consistent deployment process`,
    technologies: [
      { name: 'GitHub Actions', description: 'CI/CD platform', tags: ['CI/CD', 'Automation'] },
      { name: 'Node.js', description: 'Runtime environment', tags: ['JavaScript', 'Backend'] },
      { name: 'Docker', description: 'Containerization', tags: ['Containers', 'Deployment'] },
      { name: 'AWS/GCP', description: 'Cloud platforms', tags: ['Cloud', 'Infrastructure'] }
    ],
    concepts: [
      { name: 'Continuous Integration', description: 'Automated testing on code changes', example: 'Running tests on every commit' },
      { name: 'Continuous Deployment', description: 'Automated deployment to production', example: 'Deploying after successful tests' },
      { name: 'Artifact Management', description: 'Storing and sharing build artifacts', example: 'Uploading build files between jobs' },
      { name: 'Pipeline Orchestration', description: 'Managing multi-stage workflows', example: 'Sequential job execution with dependencies' }
    ],
    features: [
      'Automated build and test',
      'Multi-stage deployment',
      'Artifact management',
      'Health checks and monitoring',
      'Rollback capabilities',
      'Notification system'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">CI/CD Pipeline</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>

        {/* Pipeline Stages */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-300">Pipeline Stages</h4>
            <span className={`text-xs px-2 py-1 rounded ${
              pipelineStatus === 'success' ? 'bg-green-900/20 text-green-400' :
              pipelineStatus === 'running' ? 'bg-blue-900/20 text-blue-400' :
              'bg-gray-700 text-gray-400'
            }`}>
              {pipelineStatus.toUpperCase()}
            </span>
          </div>
          <div className="space-y-2">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStage === stage.id ? 'bg-blue-600 text-white animate-pulse' :
                  pipelineStatus === 'success' ? 'bg-green-600 text-white' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{stage.name}</span>
                    <span className="text-xs text-gray-400">{stage.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Run Pipeline Button */}
        <button
          onClick={runPipeline}
          disabled={pipelineStatus === 'running'}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors mb-4"
        >
          {pipelineStatus === 'running' ? 'Pipeline Running...' : 'Run CI/CD Pipeline'}
        </button>

        {/* Build Logs */}
        {buildLogs.length > 0 && (
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Build Logs</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {buildLogs.map((log, index) => (
                <div key={index} className="text-xs text-gray-400 font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="yaml"
        title="CI/CD Pipeline Configuration"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default CICDPipelineDemo;

