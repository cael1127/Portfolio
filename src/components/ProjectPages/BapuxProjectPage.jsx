import React from 'react';
import ProjectLayout from '../ProjectLayout';

const BapuxProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Bapux"
      subtitle="Full-stack web application"
      emoji="🌐"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'BPAWD', onClick: () => setCurrentPage('bpawd-project') }}
      demo={
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">Bapux</h3>
            <a
              href="https://bapux.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Visit Live Website →
            </a>
          </div>
        </div>
      }
      overview="Full-stack web application built with modern technologies. The platform features responsive design, fast performance, and excellent user experience."
      role="Full-stack development, UI/UX design, and deployment"
      stack={["React", "Node.js", "Tailwind CSS", "Netlify"]}
      challenges={[
        "Building responsive design",
        "Optimizing performance",
        "Ensuring cross-browser compatibility"
      ]}
      results={[
        "Launched production website",
        "Achieved excellent performance scores",
        "Created responsive mobile experience"
      ]}
      problem="Need for a modern, responsive web application with excellent user experience."
      approach="Built a full-stack application with React, implementing responsive design and optimizing for performance."
      highlights={[
        "Responsive design",
        "Fast performance",
        "Modern UI/UX",
        "Cross-browser compatibility"
      ]}
      tutorialSummary="Full-stack web application showcasing modern development practices and responsive design."
      difficulty="Intermediate"
      timeEstimate="2 weeks"
      keyConcepts={[
        { name: "Full-stack Development", description: "Complete application development" },
        { name: "Responsive Design", description: "Mobile-first design approach" }
      ]}
    />
  );
};

export default BapuxProjectPage;

