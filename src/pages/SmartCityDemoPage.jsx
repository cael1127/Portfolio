import React from 'react';
import SmartCityDemo from '../components/demos/SmartCityDemo';
import ProjectLayout from '../components/ProjectLayout';

const SmartCityDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Smart City Demo"
      subtitle="Infrastructure and traffic monitoring"
      emoji="🏙️"
      onBack={() => setCurrentPage('demo-organizer')}
    >
      <SmartCityDemo />
    </ProjectLayout>
  );
};

export default SmartCityDemoPage; 