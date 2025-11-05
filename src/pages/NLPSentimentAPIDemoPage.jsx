import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import NLPSentimentAPIDemo from '../components/demos/NLPSentimentAPIDemo';

const NLPSentimentAPIDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="NLP Sentiment Analysis API"
      subtitle="Production-ready REST API for multi-language sentiment analysis"
      emoji="💬"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'CI/CD Pipeline', onClick: () => setCurrentPage('cicd-pipeline-demo') }}
      demo={<NLPSentimentAPIDemo />}
      overview="Production-ready REST API for sentiment analysis that supports multiple languages and batch processing. Built with Flask and Hugging Face Transformers, the API provides real-time sentiment analysis with state-of-the-art transformer models."
      role="Backend development, API design, NLP model integration, multi-language support, and deployment"
      stack={["Flask", "Python", "Transformers", "BERT", "PyTorch", "Docker", "AWS"]}
      challenges={[
        "Integrating multiple language models efficiently",
        "Handling high-volume API requests",
        "Optimizing model loading and inference time",
        "Implementing batch processing for efficiency",
        "Managing memory with large transformer models"
      ]}
      results={[
        "Built RESTful API with <200ms response time",
        "Supported 4+ languages with multilingual models",
        "Implemented batch processing for 10x throughput",
        "Achieved 99.9% uptime with proper error handling",
        "Created comprehensive API documentation"
      ]}
      problem="Applications need to analyze sentiment of user-generated content, reviews, and social media posts. Building sentiment analysis from scratch is complex and requires significant ML expertise. A production-ready API would enable developers to integrate sentiment analysis easily."
      approach="Built a production-ready REST API using Flask and Hugging Face Transformers. The API supports multiple languages, batch processing, and includes proper error handling, logging, and health checks for production use."
      highlights={[
        "Multi-language sentiment analysis",
        "RESTful API design",
        "Batch processing support",
        "Real-time analysis with transformer models",
        "Production-ready error handling",
        "Comprehensive API documentation"
      ]}
      tutorialSummary="Build a production-ready REST API for sentiment analysis using Flask and Hugging Face Transformers. The API supports multiple languages, batch processing, and includes proper error handling and documentation."
      difficulty="Intermediate"
      timeEstimate="90 min"
      keyConcepts={[
        { name: "REST API Design", description: "Designing clean, RESTful API endpoints" },
        { name: "Transformer Models", description: "Using pre-trained BERT models for sentiment analysis" },
        { name: "Multi-language Support", description: "Supporting multiple languages with multilingual models" },
        { name: "Batch Processing", description: "Processing multiple texts efficiently" }
      ]}
      tutorialSteps={[
        {
          title: "Setup Flask and Dependencies",
          description: "Install Flask and Hugging Face Transformers",
          steps: [
            "Install Flask and required dependencies",
            "Set up virtual environment",
            "Install transformers library",
            "Configure Flask application"
          ]
        },
        {
          title: "Implement Sentiment Analysis",
          description: "Integrate transformer models for sentiment analysis",
          steps: [
            "Load pre-trained sentiment analysis models",
            "Implement sentiment analysis function",
            "Add multi-language support",
            "Optimize model loading and inference"
          ]
        },
        {
          title: "Build API Endpoints",
          description: "Create RESTful API endpoints",
          steps: [
            "Create POST endpoint for single text analysis",
            "Implement batch processing endpoint",
            "Add error handling and validation",
            "Create health check endpoint"
          ]
        },
        {
          title: "Deploy and Test",
          description: "Deploy API and test with real requests",
          steps: [
            "Containerize with Docker",
            "Deploy to cloud platform",
            "Test API endpoints",
            "Monitor performance and errors"
          ]
        }
      ]}
      setupInstructions={`1. Install dependencies:
pip install flask transformers torch

2. Set up environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

3. Configure API:
Create Flask app and set up routes

4. Test locally:
python app.py`}
      deploymentGuide={`1. Create Dockerfile:
docker build -t sentiment-api .

2. Deploy to cloud:
- AWS: Use ECS, Lambda, or EC2
- GCP: Deploy to Cloud Run or App Engine
- Azure: Use Container Instances or App Service

3. Set up load balancing:
Configure load balancer for high availability

4. Monitor and scale:
Set up monitoring and auto-scaling`}
      troubleshooting={[
        {
          issue: "Slow model loading",
          solution: "Use model caching and lazy loading for better performance"
        },
        {
          issue: "Memory errors with large texts",
          solution: "Implement text truncation and batch size limits"
        },
        {
          issue: "API timeout errors",
          solution: "Add request timeout handling and async processing for long texts"
        }
      ]}
    />
  );
};

export default NLPSentimentAPIDemoPage;

