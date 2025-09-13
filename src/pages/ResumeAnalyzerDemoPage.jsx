import React from 'react';
import ResumeAnalyzerDemo from '../components/demos/ResumeAnalyzerDemo';
import ProjectLayout from '../components/ProjectLayout';

const ResumeAnalyzerDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Resume Analyzer Demo"
      subtitle="AI-powered resume analysis"
      emoji="📄"
      onBack={() => setCurrentPage('demo-organizer')}
    >
      <ResumeAnalyzerDemo />
    </ProjectLayout>
  );
};

export default ResumeAnalyzerDemoPage; 