import React from 'react';
import ProjectLayout from '../ProjectLayout';

const BPAWDProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="BPAWD"
      subtitle="Full-stack web application"
      emoji="🚀"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'UIL Academy', onClick: () => setCurrentPage('uil-academy-project') }}
      demo={
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">BPAWD</h3>
            <a
              href="https://bpawd.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Visit Live Website →
            </a>
          </div>
        </div>
      }
      overview="Full-stack web application showcasing modern development practices and technologies."
      role="Full-stack development and deployment"
      stack={["React", "Node.js", "Tailwind CSS", "Netlify"]}
      challenges={["Performance optimization", "Responsive design"]}
      results={["Successful deployment", "Excellent performance"]}
      problem="Need for modern web application."
      approach="Built with React and modern best practices."
      highlights={["Modern stack", "Fast performance", "Responsive design"]}
      tutorialSummary="Full-stack web application project."
      difficulty="Intermediate"
      timeEstimate="2 weeks"
    />
  );
};

export default BPAWDProjectPage;

