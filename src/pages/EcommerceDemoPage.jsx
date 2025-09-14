import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';
import DemoReadme from '../components/DemoReadme';
import EcommerceDemo from '../components/demos/EcommerceDemo';

const EcommerceDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="E-commerce Storefront"
      subtitle="Catalog, cart, and checkout"
      emoji="🛍️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Real-time Chat', onClick: () => setCurrentPage('realtime-chat-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="🛍️" accent="#f97316" />
        <EcommerceDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Stripe-powered checkout with a responsive product grid and cart."
          role="Frontend, payment integration."
          stack={["React", "Stripe", "Tailwind"]}
          challenges={["Cart performance", "Payment error handling"]}
          results={["Fast cart updates", "Reliable checkout"]}
        />
      </Reveal>
      <Reveal delay={250}>
        <DemoReadme
          problem="Build a performant storefront with clear cart interactions and accurate totals."
          approach="Deterministic cart map and memoized totals; product filtering by tag."
          highlights={["Map-based cart", "Memoized totals", "Filter chips"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default EcommerceDemoPage;


