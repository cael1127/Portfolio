import React from 'react';
import ProjectLayout from '../ProjectLayout';

const JFResumeProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="JF Resume"
      subtitle="Interactive resume builder application"
      emoji="📄"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Back to Projects', onClick: () => setCurrentPage('demo-organizer') }}
      demo={
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">JF Resume</h3>
            <p className="text-gray-300 mb-4">Interactive Resume Builder</p>
            <a
              href="https://jfresume.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              Visit Live Website →
            </a>
          </div>
        </div>
      }
      overview="Interactive resume builder application that allows users to create professional resumes with real-time editing, multiple templates, and export capabilities. The platform features drag-and-drop functionality, template customization, and PDF export."
      role="Full-stack development, resume builder implementation, and UI/UX design"
      stack={["React", "Node.js", "MongoDB", "Tailwind CSS", "PDF Generation"]}
      challenges={[
        "Implementing real-time resume editing",
        "Creating multiple resume templates",
        "Building PDF export functionality",
        "Designing intuitive user interface"
      ]}
      results={[
        "Launched resume builder platform",
        "Implemented comprehensive editing features",
        "Created multiple professional templates",
        "Added PDF export functionality"
      ]}
      problem="Users need an easy way to create professional resumes without complex software."
      approach="Built interactive resume builder with real-time editing, templates, and export capabilities."
      highlights={[
        "Interactive resume builder",
        "Real-time editing",
        "Multiple templates",
        "PDF export",
        "Template customization",
        "User-friendly interface"
      ]}
      tutorialSummary="Interactive resume builder with real-time editing and professional templates."
      difficulty="Intermediate"
      timeEstimate="2-3 weeks"
      keyConcepts={[
        { name: "Resume Builder", description: "Interactive resume creation tool" },
        { name: "PDF Generation", description: "Export resumes to PDF format" }
      ]}
    />
  );
};

export default JFResumeProjectPage;

