import React from 'react';
import ProjectLayout from '../ProjectLayout';

const MinBodProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="MinBod"
      subtitle="Health and wellness application with health tracking features"
      emoji="💪"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'JF Resume', onClick: () => setCurrentPage('jf-resume-project') }}
      demo={
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">MinBod</h3>
            <p className="text-gray-300 mb-4">Health Directory & Wellness Platform</p>
            <a
              href="https://minbod.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Visit Live Website →
            </a>
          </div>
        </div>
      }
      overview="Health and wellness application featuring health directory, professional listings, health tracking, and wellness resources. The platform connects users with health professionals including therapists, psychiatrists, health coaches, and personal trainers."
      role="Full-stack development, health directory implementation, and UI/UX design"
      stack={["React", "Node.js", "MongoDB", "Tailwind CSS", "Express"]}
      challenges={[
        "Implementing health professional directory",
        "Creating search and filtering system",
        "Building user-friendly interface",
        "Ensuring data privacy and security"
      ]}
      results={[
        "Launched health directory platform",
        "Implemented comprehensive search functionality",
        "Created intuitive user experience"
      ]}
      problem="Need for a comprehensive health directory platform connecting users with health professionals."
      approach="Built health directory platform with search, filtering, and professional listings."
      highlights={[
        "Health professional directory",
        "Advanced search and filtering",
        "Professional listings",
        "Health tracking features",
        "Responsive design"
      ]}
      tutorialSummary="Health and wellness platform with comprehensive directory and tracking features."
      difficulty="Advanced"
      timeEstimate="3 weeks"
      keyConcepts={[
        { name: "Health Directory", description: "Professional directory implementation" },
        { name: "Health Tracking", description: "Wellness and health tracking features" }
      ]}
    />
  );
};

export default MinBodProjectPage;

