import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import ResumeAnalyzerDemo from '../components/demos/ResumeAnalyzerDemo';

const ResumeAnalyzerDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="AI Resume Analyzer"
      subtitle="Intelligent resume analysis with skill matching"
      emoji="📄"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Whiteboard', onClick: () => setCurrentPage('whiteboard-demo') }}
      demo={<ResumeAnalyzerDemo />}
      overview="An AI-powered resume analysis system that extracts skills, matches candidates to job roles, and provides detailed scoring with explainability. Uses NLP techniques to analyze resumes and provide actionable insights for recruiters and candidates."
      role="Feature design, NLP model integration, skill extraction algorithm development, candidate scoring system, and user experience design"
      stack={["React", "Python", "NLP", "Machine Learning", "Tailwind CSS", "Text Processing"]}
      challenges={[
        "Achieving accurate entity extraction from unstructured resume text",
        "Maintaining analysis latency under 1 second",
        "Matching skills to job requirements accurately",
        "Providing explainable scoring results"
      ]}
      results={[
        "Candidate scoring with detailed highlights and explanations",
        "Average response time under 700ms",
        "High accuracy in skill extraction and matching",
        "Comprehensive resume analysis with actionable insights"
      ]}
      problem="Recruiters need tools to quickly analyze resumes and match candidates to job requirements. Manual resume review is time-consuming and may miss relevant skills or experience. An AI-powered system can automate this process."
      approach="Built an AI-powered resume analyzer using NLP techniques for skill extraction and matching. Implemented a scoring system that provides explainable results and highlights relevant sections of resumes for recruiters."
      highlights={[
        "AI-powered skill extraction from resumes",
        "Intelligent candidate-to-job matching",
        "Detailed scoring with explainability",
        "Fast analysis with sub-second response times",
        "Comprehensive resume insights",
        "User-friendly interface for recruiters"
      ]}
    />
  );
};

export default ResumeAnalyzerDemoPage; 