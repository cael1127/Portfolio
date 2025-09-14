import React from 'react';
import ResumeAnalyzerDemo from '../components/demos/ResumeAnalyzerDemo';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';

const ResumeAnalyzerDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Resume Analyzer Demo"
      subtitle="AI-powered resume analysis"
      emoji="📄"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Whiteboard', onClick: () => setCurrentPage('whiteboard-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="📄" accent="#06b6d4" />
        <ResumeAnalyzerDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="NLP pipeline to extract skills and match resumes to roles with explainability."
          role="Feature design, model integration, UX."
          stack={["React", "Python", "NLP", "Tailwind"]}
          challenges={["Entity extraction accuracy", "Latency under 1s"]}
          results={["Candidate scoring with highlights", "<700ms typical response"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default ResumeAnalyzerDemoPage; 