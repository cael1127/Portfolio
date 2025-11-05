import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import MLTrainingDashboardDemo from '../components/demos/MLTrainingDashboardDemo';

const MLTrainingDashboardDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="ML Model Training Dashboard"
      subtitle="Real-time training visualization and hyperparameter tuning"
      emoji="📊"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Computer Vision Pipeline', onClick: () => setCurrentPage('computer-vision-pipeline-demo') }}
      demo={<MLTrainingDashboardDemo />}
      overview="Comprehensive machine learning training dashboard that provides real-time visualization of training metrics, hyperparameter tuning capabilities, and model comparison tools. The system integrates with TensorFlow/Keras to monitor loss, accuracy, and validation metrics during model training."
      role="Full-stack development, ML integration, real-time data visualization, hyperparameter optimization, and dashboard UI/UX design"
      stack={["TensorFlow", "Keras", "Python", "React", "Matplotlib", "WebSockets", "Node.js"]}
      challenges={[
        "Real-time streaming of training metrics from Python to frontend",
        "Visualizing large datasets of training history efficiently",
        "Implementing hyperparameter tuning with live updates",
        "Handling long-running training jobs with progress tracking",
        "Comparing multiple model architectures side-by-side"
      ]}
      results={[
        "Real-time metrics visualization with <100ms latency",
        "Implemented hyperparameter tuning interface",
        "Built model comparison dashboard",
        "Added checkpointing and early stopping",
        "Created training history export functionality"
      ]}
      problem="Machine learning practitioners need comprehensive tools to monitor training progress, tune hyperparameters, and compare model architectures. Without proper visualization and monitoring, it's difficult to optimize models and identify issues during training."
      approach="Built a real-time training dashboard that streams metrics from TensorFlow/Keras training sessions, provides interactive visualization of training progress, and enables hyperparameter tuning and model comparison through an intuitive web interface."
      highlights={[
        "Real-time training metrics streaming",
        "Interactive loss and accuracy plots",
        "Hyperparameter tuning interface",
        "Model architecture comparison",
        "Checkpointing and early stopping",
        "Training history export"
      ]}
      tutorialSummary="Build a comprehensive ML training dashboard that visualizes training metrics in real-time, enables hyperparameter tuning, and compares multiple model architectures. The dashboard integrates with TensorFlow/Keras to provide live monitoring of training progress."
      difficulty="Advanced"
      timeEstimate="120 min"
      keyConcepts={[
        { name: "Training Metrics", description: "Tracking loss, accuracy, and validation metrics during training" },
        { name: "Real-time Visualization", description: "Streaming and visualizing metrics as training progresses" },
        { name: "Hyperparameter Tuning", description: "Optimizing model parameters for better performance" },
        { name: "Model Comparison", description: "Evaluating multiple architectures side-by-side" }
      ]}
      tutorialSteps={[
        {
          title: "Setup TensorFlow and Data Pipeline",
          description: "Configure TensorFlow/Keras and prepare training data",
          steps: [
            "Install TensorFlow and required dependencies",
            "Load and preprocess training dataset",
            "Create data generators for training and validation",
            "Define model architecture"
          ]
        },
        {
          title: "Implement Metrics Tracking",
          description: "Build system to track and stream training metrics",
          steps: [
            "Create custom callbacks for metric logging",
            "Set up WebSocket server for real-time streaming",
            "Implement metric aggregation and storage",
            "Add support for multiple metrics (loss, accuracy, etc.)"
          ]
        },
        {
          title: "Build Dashboard UI",
          description: "Create React components for visualization",
          steps: [
            "Design metrics display components",
            "Implement real-time chart updates",
            "Build hyperparameter tuning interface",
            "Create model comparison views"
          ]
        },
        {
          title: "Add Advanced Features",
          description: "Enhance dashboard with additional capabilities",
          steps: [
            "Implement checkpointing and model saving",
            "Add early stopping functionality",
            "Create training history export",
            "Build model comparison tools"
          ]
        }
      ]}
      setupInstructions={`1. Install Python dependencies:
pip install tensorflow keras matplotlib numpy

2. Install Node.js dependencies:
npm install react websocket

3. Set up training data:
Prepare your dataset and split into train/validation sets

4. Configure model architecture:
Define your neural network model structure`}
      deploymentGuide={`1. Build the frontend:
npm run build

2. Set up Python backend:
Create a Flask/FastAPI server for training

3. Deploy both services:
- Frontend: Deploy to Netlify/Vercel
- Backend: Deploy to AWS/GCP with GPU support

4. Configure WebSocket connections:
Set up secure WebSocket communication`}
      troubleshooting={[
        {
          issue: "Metrics not updating in real-time",
          solution: "Check WebSocket connection and ensure callbacks are properly configured"
        },
        {
          issue: "High memory usage during training",
          solution: "Implement data generators and batch processing to reduce memory footprint"
        },
        {
          issue: "Slow visualization updates",
          solution: "Implement data sampling and throttling for large training histories"
        }
      ]}
    />
  );
};

export default MLTrainingDashboardDemoPage;

