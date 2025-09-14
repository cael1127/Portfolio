import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';
import DemoReadme from '../components/DemoReadme';
import ProductConfiguratorDemo from '../components/demos/ProductConfiguratorDemo';

const ProductConfiguratorDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="3D Product Configurator"
      subtitle="Color and material variants in 3D"
      emoji="🧩"
      onBack={() => setCurrentPage('demo-organizer')}
    >
      <Reveal>
        <ProjectThumb emoji="🧩" accent="#a78bfa" />
        <ProductConfiguratorDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="WebGL-based configurator with orbit controls and variant switching."
          role="3D integration, controls, and UX."
          stack={["React", "Three.js", "WebGL"]}
          challenges={["Asset optimization", "Mobile performance"]}
          results={["Smooth orbit controls", "Quick variant changes"]}
        />
      </Reveal>
      <Reveal delay={250}>
        <DemoReadme
          problem="Let users preview product variants quickly and responsively."
          approach="Start with deterministic variant colors; optionally swap in real meshes later."
          highlights={["Variant chips", "Responsive preview", "Minimal state"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default ProductConfiguratorDemoPage;


