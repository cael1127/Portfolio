import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import ProductConfiguratorDemo from '../components/demos/ProductConfiguratorDemo';

const ProductConfiguratorDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Product Configurator"
      subtitle="Interactive product customization"
      emoji="🧩"
      onBack={() => setCurrentPage('demo-organizer')}
      demo={<ProductConfiguratorDemo />}
      overview="Interactive product configurator that allows users to customize products with different colors, materials, and variants in real-time. Built with modern web technologies to provide an engaging shopping experience with instant visual feedback."
      role="Frontend development, 3D integration, user experience design, and state management"
      stack={["React", "CSS3", "JavaScript", "State Management", "Responsive Design", "WebGL"]}
      challenges={[
        "Managing complex product variant states",
        "Implementing smooth visual transitions",
        "Creating responsive design for all devices",
        "Optimizing performance for real-time updates"
      ]}
      results={[
        "Instant variant switching with smooth transitions",
        "Responsive design for mobile and desktop",
        "Clean state management with React hooks",
        "Intuitive user interface design"
      ]}
      problem="Create an interactive product configurator that allows customers to visualize different product variants and customizations in real-time, improving the shopping experience and reducing return rates."
      approach="Implemented a deterministic demo using CSS gradients and React state to showcase product variant switching. Created a clean interface with color-coded options and instant visual feedback to demonstrate the configuration workflow."
      highlights={[
        "Real-time variant switching",
        "Color-coded option selection",
        "Responsive grid layout",
        "Smooth visual transitions",
        "Clean state management",
        "Intuitive user interface"
      ]}
    />
  );
};

export default ProductConfiguratorDemoPage;


