import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import DeepfakeDetectionDemo from '../components/demos/DeepfakeDetectionDemo';

const DeepfakeDetectionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Deepfake Detection System"
      subtitle="AI-powered media verification using computer vision"
      emoji="🎭"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Object Detection', onClick: () => setCurrentPage('object-detection-demo') }}
      demo={<DeepfakeDetectionDemo />}
      overview="Advanced deepfake detection system that uses computer vision and machine learning to identify manipulated media. Analyzes facial features, video consistency, and audio-visual synchronization to detect deepfakes with high accuracy."
      role="Machine learning engineering, computer vision development, deepfake detection algorithm design, video processing, and analysis dashboard implementation"
      stack={["Python", "OpenCV", "TensorFlow", "Computer Vision", "Video Processing", "Face Analysis", "ML"]}
      challenges={[
        "Detecting subtle deepfake artifacts in high-quality media",
        "Processing video files efficiently for real-time analysis",
        "Reducing false positives while maintaining high accuracy",
        "Handling various video formats and quality levels"
      ]}
      results={[
        "High-accuracy deepfake detection with detailed analysis",
        "Real-time video processing and analysis",
        "Face analysis with confidence scoring",
        "Comprehensive detection reports and visualizations",
        "Support for multiple video formats"
      ]}
      problem="The rise of deepfake technology poses significant risks for misinformation and fraud. Organizations need reliable tools to detect manipulated media and verify content authenticity."
      approach="Developed a deepfake detection system using computer vision techniques and machine learning models. Implemented face analysis, video consistency checking, and audio-visual synchronization analysis to identify deepfake artifacts."
      highlights={[
        "Advanced computer vision-based detection",
        "Face analysis with detailed feature examination",
        "Video processing and consistency analysis",
        "Confidence scoring and detailed reports",
        "Support for various media formats",
        "Comprehensive detection visualization"
      ]}
      tutorialSummary="Build a deepfake detection system using computer vision and machine learning. Learn video processing, face analysis, and deepfake detection techniques."
      difficulty="Advanced"
      timeEstimate="3-4 weeks"
      keyConcepts={[
        { name: "Deepfake Detection", description: "Identifying AI-generated manipulated media" },
        { name: "Computer Vision", description: "Analyzing visual content with AI" },
        { name: "Face Analysis", description: "Examining facial features for authenticity" },
        { name: "Video Processing", description: "Analyzing video frames and consistency" }
      ]}
      tutorialSteps={[
        "Set up computer vision libraries and models",
        "Implement face detection and analysis",
        "Create video processing pipeline",
        "Build deepfake detection algorithms",
        "Develop analysis dashboard and reporting"
      ]}
    />
  );
};

export default DeepfakeDetectionDemoPage; 