import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import ComputerVisionPipelineDemo from '../components/demos/ComputerVisionPipelineDemo';

const ComputerVisionPipelineDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Computer Vision Pipeline"
      subtitle="End-to-end image processing, augmentation, and model inference"
      emoji="👁️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'NLP Sentiment API', onClick: () => setCurrentPage('nlp-sentiment-api-demo') }}
      demo={<ComputerVisionPipelineDemo />}
      overview="Complete computer vision pipeline that handles image preprocessing, data augmentation, feature extraction, and model inference. The system processes images through multiple stages to prepare them for machine learning models and extract meaningful features."
      role="Full-stack development, computer vision implementation, pipeline architecture, optimization, and API design"
      stack={["OpenCV", "TensorFlow", "Keras", "Python", "NumPy", "Albumentations", "FastAPI"]}
      challenges={[
        "Optimizing image preprocessing for large datasets",
        "Implementing efficient data augmentation pipelines",
        "Feature extraction with pre-trained models",
        "Batch processing optimization",
        "GPU memory management for large images"
      ]}
      results={[
        "Built modular pipeline with independent stages",
        "Achieved 10x speedup with batch processing",
        "Implemented GPU-accelerated preprocessing",
        "Created reusable augmentation library",
        "Built production-ready API endpoint"
      ]}
      problem="Computer vision applications require complex pipelines that process images through multiple stages (preprocessing, augmentation, feature extraction, inference). Building and maintaining these pipelines manually is time-consuming and error-prone."
      approach="Created a modular, production-ready computer vision pipeline that handles all stages of image processing. The pipeline is designed for flexibility, performance, and ease of use, with support for batch processing and GPU acceleration."
      highlights={[
        "Modular pipeline architecture",
        "Image preprocessing and normalization",
        "Data augmentation library",
        "Feature extraction with CNNs",
        "Batch processing support",
        "GPU acceleration"
      ]}
      tutorialSummary="Build a complete computer vision pipeline that processes images through preprocessing, augmentation, feature extraction, and model inference stages. The pipeline is optimized for production use with batch processing and GPU support."
      difficulty="Advanced"
      timeEstimate="150 min"
      keyConcepts={[
        { name: "Image Preprocessing", description: "Resizing, normalization, and format conversion" },
        { name: "Data Augmentation", description: "Applying transformations to increase dataset diversity" },
        { name: "Feature Extraction", description: "Using CNNs to extract meaningful features" },
        { name: "Batch Processing", description: "Processing multiple images efficiently" }
      ]}
      tutorialSteps={[
        {
          title: "Setup Image Processing Libraries",
          description: "Install and configure OpenCV, TensorFlow, and augmentation libraries",
          steps: [
            "Install OpenCV, TensorFlow, and Albumentations",
            "Set up image preprocessing functions",
            "Configure GPU support if available",
            "Create image loading utilities"
          ]
        },
        {
          title: "Implement Preprocessing Pipeline",
          description: "Build image preprocessing and normalization",
          steps: [
            "Create image resizing and cropping functions",
            "Implement normalization and color space conversion",
            "Add error handling for corrupted images",
            "Optimize for batch processing"
          ]
        },
        {
          title: "Build Augmentation System",
          description: "Implement data augmentation for training",
          steps: [
            "Configure augmentation transformations",
            "Implement augmentation pipeline",
            "Add random seed control for reproducibility",
            "Create visualization for augmented images"
          ]
        },
        {
          title: "Feature Extraction and Inference",
          description: "Extract features and run model predictions",
          steps: [
            "Load pre-trained feature extraction models",
            "Implement feature extraction pipeline",
            "Build model inference endpoint",
            "Add batch processing support"
          ]
        }
      ]}
      setupInstructions={`1. Install dependencies:
pip install opencv-python tensorflow keras numpy albumentations

2. Set up GPU support (optional):
pip install tensorflow-gpu

3. Prepare image dataset:
Organize images into train/validation/test directories

4. Configure pipeline parameters:
Set image size, normalization values, and augmentation settings`}
      deploymentGuide={`1. Build Docker image:
docker build -t cv-pipeline .

2. Deploy to cloud:
- AWS: Use EC2 with GPU instances or SageMaker
- GCP: Deploy to AI Platform or Cloud Run
- Azure: Use Azure ML or Container Instances

3. Set up API endpoint:
Configure FastAPI/Flask server for inference

4. Monitor performance:
Set up logging and metrics collection`}
      troubleshooting={[
        {
          issue: "Memory errors with large images",
          solution: "Implement image resizing and batch size limits"
        },
        {
          issue: "Slow preprocessing",
          solution: "Use GPU acceleration and optimize OpenCV operations"
        },
        {
          issue: "Inconsistent augmentation results",
          solution: "Set random seeds and validate augmentation pipeline"
        }
      ]}
    />
  );
};

export default ComputerVisionPipelineDemoPage;

