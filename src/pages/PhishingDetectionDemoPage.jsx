import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import PhishingDetectionDemo from '../components/demos/PhishingDetectionDemo';

const PhishingDetectionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Phishing Detection System"
      subtitle="Email analysis, URL scanning, domain reputation checking, and ML-based classification"
      emoji="🎣"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'OWASP Scanner', onClick: () => setCurrentPage('owasp-scanner-demo') }}
      demo={<PhishingDetectionDemo />}
      overview="An advanced phishing detection system that analyzes emails and URLs to identify phishing attempts. Uses machine learning, natural language processing, domain reputation checking, and pattern matching to detect and score phishing threats with high accuracy."
      role="Security engineering, machine learning model development, NLP implementation, threat intelligence integration, and detection system design"
      stack={["Python", "Machine Learning", "NLP", "React", "Threat Intelligence", "URL Analysis"]}
      challenges={[
        "Detecting sophisticated phishing attempts that evade simple pattern matching",
        "Reducing false positives while maintaining high detection accuracy",
        "Integrating multiple detection techniques effectively",
        "Processing emails and URLs in real-time"
      ]}
      results={[
        "High-accuracy phishing detection with ML models",
        "Multi-technique analysis (keywords, URLs, domain reputation)",
        "Comprehensive threat scoring and risk assessment",
        "Real-time analysis with actionable recommendations"
      ]}
      problem="Phishing attacks are becoming increasingly sophisticated and are a major security threat. Organizations need automated systems to detect phishing emails and malicious URLs before they reach users, protecting against data breaches and fraud."
      approach="Built a comprehensive phishing detection system that combines multiple detection techniques including keyword analysis, URL scanning, domain reputation checking, and machine learning classification. Created a unified scoring system that provides actionable threat assessments."
      highlights={[
        "Machine learning-based phishing classification",
        "Email content analysis with NLP",
        "URL and domain reputation checking",
        "Threat scoring and risk assessment",
        "Real-time analysis and detection",
        "Comprehensive threat indicators"
      ]}
    />
  );
};

export default PhishingDetectionDemoPage;
