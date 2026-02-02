import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const ServerlessPlatformDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [functions, setFunctions] = useState([
    { id: 'func-1', name: 'processOrder', status: 'active', invocations: 0, errors: 0, avgDuration: 0, cost: 0 },
    { id: 'func-2', name: 'sendEmail', status: 'active', invocations: 0, errors: 0, avgDuration: 0, cost: 0 },
    { id: 'func-3', name: 'generateReport', status: 'active', invocations: 0, errors: 0, avgDuration: 0, cost: 0 }
  ]);
  const [invocations, setInvocations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFunctions(prev => prev.map(func => {
        const newInvocations = func.invocations + Math.floor(Math.random() * 3);
        const duration = Math.floor(Math.random() * 500) + 100;
        const hasError = Math.random() > 0.9;
        const newErrors = hasError ? func.errors + 1 : func.errors;
        const cost = newInvocations * 0.0000166667; // $0.0000166667 per 100ms

        // Add invocation log
        if (newInvocations > func.invocations) {
          setInvocations(prev => [{
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            functionName: func.name,
            duration,
            status: hasError ? 'error' : 'success',
            cost: 0.0000166667 * (duration / 100)
          }, ...prev].slice(0, 20));
        }

        return {
          ...func,
          invocations: newInvocations,
          errors: newErrors,
          avgDuration: Math.floor((func.avgDuration * func.invocations + duration) / newInvocations),
          cost: cost
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const codeData = {
    code: `// Serverless Application Platform
const AWS = require('aws-sdk');
const serverless = require('serverless-http');
const express = require('express');

// AWS Lambda Function Example
exports.handler = async (event, context) => {
  const { httpMethod, path, body, queryStringParameters } = event;
  
  try {
    // Process request
    const result = await processRequest(httpMethod, path, body, queryStringParameters);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function processRequest(method, path, body, queryParams) {
  // Business logic here
  return { message: 'Request processed successfully' };
}

// Serverless Framework Configuration (serverless.yml)
/*
service: my-serverless-app

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  memorySize: 256
  timeout: 30
  environment:
    NODE_ENV: production
    DATABASE_URL: \${env:DATABASE_URL}
  
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:Query
            - dynamodb:PutItem
            - s3:GetObject
          Resource: "*"

functions:
  processOrder:
    handler: src/handlers/order.process
    events:
      - http:
          path: /orders
          method: post
          cors: true
    environment:
      QUEUE_URL: \${self:custom.queueUrl}
    timeout: 10
    memorySize: 512

  sendEmail:
    handler: src/handlers/email.send
    events:
      - sqs:
          arn: arn:aws:sqs:us-east-1:123456789:email-queue
          batchSize: 10
    timeout: 30
    memorySize: 256

  generateReport:
    handler: src/handlers/report.generate
    events:
      - schedule: rate(1 hour)
    timeout: 300
    memorySize: 1024

plugins:
  - serverless-offline
  - serverless-plugin-warmup

custom:
  queueUrl: \${env:QUEUE_URL}
  warmup:
    enabled: true
    events:
      - schedule: rate(5 minutes)
*/

// Serverless Function with Express
const app = express();
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Export for serverless
module.exports.handler = serverless(app);

// Auto-scaling Configuration
const autoScalingConfig = {
  minCapacity: 1,
  maxCapacity: 10,
  targetTrackingScalingPolicy: {
    targetValue: 70.0, // 70% utilization
    scaleInCooldown: 300,
    scaleOutCooldown: 60
  }
};

// Cost Optimization
class ServerlessCostOptimizer {
  analyzeCosts(functions) {
    return functions.map(func => ({
      name: func.name,
      invocations: func.invocations,
      totalCost: this.calculateCost(func),
      recommendations: this.getRecommendations(func)
    }));
  }

  calculateCost(func) {
    // AWS Lambda pricing: $0.0000166667 per GB-second
    const gbSeconds = (func.invocations * func.avgDuration * func.memorySize) / 1000;
    return gbSeconds * 0.0000166667;
  }

  getRecommendations(func) {
    const recommendations = [];
    
    if (func.avgDuration > 1000) {
      recommendations.push('Consider optimizing function execution time');
    }
    
    if (func.memorySize > 512 && func.avgDuration < 100) {
      recommendations.push('Reduce memory allocation to save costs');
    }
    
    if (func.errors / func.invocations > 0.05) {
      recommendations.push('High error rate - review error handling');
    }
    
    return recommendations;
  }
}

// Monitoring and Logging
class ServerlessMonitor {
  constructor() {
    this.cloudWatch = new AWS.CloudWatch();
    this.logs = new AWS.CloudWatchLogs();
  }

  async getMetrics(functionName, startTime, endTime) {
    const params = {
      MetricName: 'Invocations',
      Namespace: 'AWS/Lambda',
      Dimensions: [
        { Name: 'FunctionName', Value: functionName }
      ],
      StartTime: startTime,
      EndTime: endTime,
      Period: 300,
      Statistics: ['Sum', 'Average', 'Maximum']
    };

    return await this.cloudWatch.getMetricStatistics(params).promise();
  }

  async getLogs(functionName, startTime, endTime) {
    const logGroupName = \`/aws/lambda/\${functionName}\`;
    
    const params = {
      logGroupName,
      startTime,
      endTime,
      limit: 100
    };

    return await this.logs.filterLogEvents(params).promise();
  }
}

module.exports = { handler, autoScalingConfig, ServerlessCostOptimizer, ServerlessMonitor };`,
    language: 'javascript',
    title: 'Serverless Application Platform'
  };

  const totalCost = functions.reduce((sum, func) => sum + func.cost, 0);
  const totalInvocations = functions.reduce((sum, func) => sum + func.invocations, 0);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-gray-400 text-sm">Total Functions</div>
          <div className="text-2xl font-bold text-white mt-1">{functions.length}</div>
        </motion.div>
        <motion.div 
          className="bg-blue-900/30 border-blue-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-blue-400 text-sm">Total Invocations</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{totalInvocations}</div>
        </motion.div>
        <motion.div 
          className="bg-green-900/30 border-green-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-green-400 text-sm">Total Cost</div>
          <div className="text-2xl font-bold text-green-400 mt-1">${totalCost.toFixed(4)}</div>
        </motion.div>
        <motion.div 
          className="bg-yellow-900/30 border-yellow-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-yellow-400 text-sm">Avg Duration</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">
            {Math.floor(functions.reduce((sum, f) => sum + f.avgDuration, 0) / functions.length)}ms
          </div>
        </motion.div>
      </div>

      {/* Functions List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Serverless Functions</h3>
        <div className="space-y-3">
          {functions.map((func) => (
            <div key={func.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    func.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="font-semibold text-white">{func.name}</span>
                </div>
                <span className="text-sm text-gray-400">{func.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Invocations</div>
                  <div className="text-white font-semibold">{func.invocations}</div>
                </div>
                <div>
                  <div className="text-gray-400">Errors</div>
                  <div className="text-red-400 font-semibold">{func.errors}</div>
                </div>
                <div>
                  <div className="text-gray-400">Avg Duration</div>
                  <div className="text-white font-semibold">{func.avgDuration}ms</div>
                </div>
                <div>
                  <div className="text-gray-400">Cost</div>
                  <div className="text-green-400 font-semibold">${func.cost.toFixed(4)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invocation Log */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Invocation Log</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {invocations.map((invocation) => (
            <motion.div
              key={invocation.id}
              className={`flex items-center gap-4 p-3 rounded border ${
                invocation.status === 'success' 
                  ? 'bg-gray-900 border-gray-700' 
                  : 'bg-red-900/20 border-red-500/50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-gray-500 text-xs w-20">{invocation.timestamp}</span>
              <span className="text-blue-400 font-mono text-sm">{invocation.functionName}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                invocation.status === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
              }`}>
                {invocation.status}
              </span>
              <span className="text-gray-400 text-sm">{invocation.duration}ms</span>
              <span className="text-gray-400 text-xs ml-auto">${invocation.cost.toFixed(6)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Auto-scaling</div>
            <div className="text-sm text-gray-400">Automatic scaling based on demand</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Pay-per-use</div>
            <div className="text-sm text-gray-400">Only pay for actual execution time</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Zero Maintenance</div>
            <div className="text-sm text-gray-400">No server management required</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          View Code
        </button>
      </div>

      {showCodeViewer && (
        <CodeViewer
          code={codeData.code}
          language={codeData.language}
          title={codeData.title}
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default ServerlessPlatformDemo;
