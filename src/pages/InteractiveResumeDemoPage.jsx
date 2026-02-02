import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import InteractiveResumeDemo from '../components/demos/InteractiveResumeDemo';

const InteractiveResumeDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Interactive Resume Builder"
      subtitle="Real-time editing resume with responsive design and live preview"
      emoji="📝"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Deepfake Detection', onClick: () => setCurrentPage('deepfake-detection-demo') }}
      demo={<InteractiveResumeDemo />}
      overview="An interactive resume builder that allows users to create, edit, and customize their resumes in real-time. Features live preview, responsive design, multiple templates, and export capabilities for professional resume creation."
      role="Frontend development, real-time editing implementation, template design, export functionality, and user experience design"
      stack={["React", "Real-time Editing", "PDF Generation", "Responsive Design", "Template System", "Export"]}
      challenges={[
        "Implementing real-time editing with live preview",
        "Creating responsive resume layouts",
        "Generating high-quality PDF exports",
        "Designing intuitive editing interface"
      ]}
      results={[
        "Real-time resume editing with instant preview",
        "Multiple professional resume templates",
        "Responsive design for all screen sizes",
        "High-quality PDF export functionality",
        "Intuitive drag-and-drop editing interface"
      ]}
      problem="Job seekers need an easy way to create professional resumes without complex software. An interactive, web-based resume builder with real-time editing and export capabilities would solve this problem."
      approach="Built an interactive resume builder with real-time editing capabilities, live preview, and multiple templates. Implemented responsive design for all devices and added PDF export functionality for professional resume generation."
      highlights={[
        "Real-time editing with live preview",
        "Multiple professional resume templates",
        "Responsive design for all devices",
        "Drag-and-drop section organization",
        "PDF export with high quality",
        "Intuitive and user-friendly interface"
      ]}
    />
  );
};

export default InteractiveResumeDemoPage;