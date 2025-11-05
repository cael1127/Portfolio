import React from 'react';
import ProjectLayout from '../ProjectLayout';

const UILAcademyProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="UIL Academy"
      subtitle="Educational platform with learning management features"
      emoji="📚"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'MinBod', onClick: () => setCurrentPage('minbod-project') }}
      demo={
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">UIL Academy</h3>
            <p className="text-gray-300 mb-4">Educational Learning Platform</p>
            <a
              href="https://uilacademy.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Visit Live Website →
            </a>
          </div>
        </div>
      }
      overview="Educational platform with learning management features including course catalog, student management, progress tracking, and interactive learning modules."
      role="Full-stack development, learning management system implementation, and UI/UX design"
      stack={["React", "Node.js", "MongoDB", "Tailwind CSS", "Express"]}
      challenges={[
        "Implementing learning management features",
        "Creating interactive learning modules",
        "Building progress tracking system",
        "Designing intuitive user interface"
      ]}
      results={[
        "Launched educational platform",
        "Implemented comprehensive LMS features",
        "Created engaging learning experience"
      ]}
      problem="Need for a modern educational platform with learning management capabilities."
      approach="Built comprehensive learning management system with React frontend and Node.js backend."
      highlights={[
        "Learning management system",
        "Course catalog",
        "Progress tracking",
        "Interactive modules",
        "Student management"
      ]}
      tutorialSummary="Educational platform with comprehensive learning management features."
      difficulty="Advanced"
      timeEstimate="4 weeks"
      keyConcepts={[
        { name: "Learning Management System", description: "LMS implementation" },
        { name: "Educational Technology", description: "EdTech platform development" }
      ]}
    />
  );
};

export default UILAcademyProjectPage;

