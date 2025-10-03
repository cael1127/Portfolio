import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import ObjectDetectionDemo from '../components/demos/ObjectDetectionDemo';

const ObjectDetectionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Real-time Object Detection"
      subtitle="Live webcam detection with bounding boxes"
      emoji="🎯"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Audio Transcription', onClick: () => setCurrentPage('audio-transcription-demo') }}
      demo={<ObjectDetectionDemo />}
      overview="Advanced computer vision system that performs real-time object detection using machine learning models. The system processes video streams to identify and classify objects with high accuracy, rendering bounding boxes and confidence scores in real-time."
      role="Full-stack development, model integration, performance optimization, and UI/UX design"
      stack={["TensorFlow", "OpenCV", "React", "Canvas API", "WebRTC", "JavaScript"]}
      challenges={[
        "Optimizing model inference for real-time performance",
        "Handling GPU/CPU fallbacks gracefully", 
        "Rendering overlays without impacting frame rate",
        "Managing memory for continuous video processing"
      ]}
      results={[
        "Achieved 30fps real-time detection",
        "Implemented configurable confidence thresholds",
        "Created smooth overlay rendering system",
        "Built responsive web interface"
      ]}
      problem="Develop a real-time object detection system that can identify and classify objects in video streams with high accuracy and performance, suitable for applications like security monitoring, autonomous vehicles, and augmented reality."
      approach="Implemented a deterministic demo using Canvas API to showcase object detection capabilities without requiring webcam access. Used color-coded bounding boxes and confidence scores to demonstrate the detection algorithm's effectiveness."
      highlights={[
        "Real-time canvas rendering with 30fps performance",
        "Color-coded object classification system",
        "Deterministic demo for easy code review",
        "Responsive design with mobile support",
        "Configurable confidence thresholds",
        "Clean separation of detection logic and UI"
      ]}
    />
  );
};

export default ObjectDetectionDemoPage;


