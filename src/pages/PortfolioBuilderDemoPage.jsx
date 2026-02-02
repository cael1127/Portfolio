import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import PortfolioBuilderDemo from '../components/demos/PortfolioBuilderDemo';

const PortfolioBuilderDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Portfolio Website Builder"
      subtitle="Drag-and-drop website builder for creating professional portfolios"
      emoji="🎨"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Realtime Chat', onClick: () => setCurrentPage('realtime-chat-demo') }}
      demo={<PortfolioBuilderDemo />}
      overview="A drag-and-drop website builder that enables users to create professional portfolio websites without coding. Features intuitive editing, multiple templates, responsive design, and live preview for building stunning portfolio sites."
      role="Full-stack development, drag-and-drop implementation, template system design, responsive layout engine, and user experience design"
      stack={["React", "Drag and Drop", "Template System", "Responsive Design", "Live Preview", "Export"]}
      challenges={[
        "Implementing smooth drag-and-drop functionality",
        "Creating flexible layout system for various templates",
        "Ensuring responsive design across all devices",
        "Managing complex component state and updates"
      ]}
      results={[
        "Intuitive drag-and-drop website builder",
        "Multiple professional portfolio templates",
        "Real-time preview of changes",
        "Responsive design for all screen sizes",
        "Export functionality for deployment"
      ]}
      problem="Professionals need an easy way to create portfolio websites without coding knowledge. A drag-and-drop builder with templates and live preview would enable anyone to create professional portfolios."
      approach="Built a drag-and-drop website builder with an intuitive interface, multiple templates, and real-time preview. Implemented a flexible layout system that supports responsive design and created an export system for easy deployment."
      highlights={[
        "Drag-and-drop component placement",
        "Multiple professional portfolio templates",
        "Real-time preview of changes",
        "Responsive design system",
        "Component customization and styling",
        "Export and deployment capabilities"
      ]}
    />
  );
};

export default PortfolioBuilderDemoPage; 