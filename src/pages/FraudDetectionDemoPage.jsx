import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import FraudDetectionDemo from '../components/demos/FraudDetectionDemo';

const FraudDetectionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Fraud Detection System"
      subtitle="AI-powered financial fraud detection with real-time analysis"
      emoji="🔍"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Deepfake Detection', onClick: () => setCurrentPage('deepfake-detection-demo') }}
      demo={<FraudDetectionDemo />}
      overview="Advanced AI-powered fraud detection system that analyzes financial transactions in real-time to identify suspicious patterns and potential fraudulent activities. Uses machine learning algorithms to detect anomalies and assess risk scores for each transaction."
      role="Machine learning engineering, fraud detection algorithm development, real-time data processing, risk scoring system design, and dashboard implementation"
      stack={["Python", "TensorFlow", "Scikit-learn", "React", "Real-time Processing", "Machine Learning"]}
      challenges={[
        "Detecting fraud patterns in high-volume transaction streams",
        "Reducing false positives while maintaining high detection accuracy",
        "Processing transactions in real-time with low latency",
        "Handling imbalanced datasets in fraud detection"
      ]}
      results={[
        "Real-time fraud detection with <100ms processing time",
        "High accuracy rate with minimal false positives",
        "Pattern recognition across multiple transaction types",
        "Comprehensive risk scoring system",
        "Interactive dashboard for fraud analysis"
      ]}
      problem="Financial institutions need automated systems to detect fraudulent transactions in real-time. Manual review is slow and cannot scale to handle millions of transactions daily. An AI-powered solution is essential for protecting customers and reducing financial losses."
      approach="Developed a machine learning-based fraud detection system using TensorFlow and Scikit-learn. Implemented real-time transaction analysis with pattern recognition algorithms, anomaly detection, and risk scoring. Built an interactive dashboard for monitoring and analyzing fraud patterns."
      highlights={[
        "Real-time transaction analysis and monitoring",
        "Advanced pattern recognition algorithms",
        "Risk scoring with confidence levels",
        "Anomaly detection across multiple dimensions",
        "Interactive fraud analysis dashboard",
        "Scalable architecture for high-volume processing"
      ]}
      tutorialSummary="Build an AI-powered fraud detection system with real-time transaction monitoring, pattern recognition, and risk scoring. Learn machine learning techniques for anomaly detection and fraud prevention."
      difficulty="Advanced"
      timeEstimate="3-4 weeks"
      keyConcepts={[
        { name: "Anomaly Detection", description: "Identifying unusual patterns in transaction data" },
        { name: "Risk Scoring", description: "Calculating fraud probability scores for transactions" },
        { name: "Real-time Processing", description: "Analyzing transactions as they occur" },
        { name: "Pattern Recognition", description: "Detecting fraud patterns using ML algorithms" }
      ]}
      tutorialSteps={[
        "Collect and preprocess transaction data",
        "Train machine learning models for fraud detection",
        "Implement real-time transaction processing pipeline",
        "Build risk scoring and alerting system",
        "Create interactive dashboard for fraud analysis"
      ]}
    />
  );
};

export default FraudDetectionDemoPage; 