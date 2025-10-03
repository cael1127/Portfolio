import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import EcommerceDemo from '../components/demos/EcommerceDemo';

const EcommerceDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="E-commerce Storefront"
      subtitle="Catalog, cart, and checkout"
      emoji="🛍️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Real-time Chat', onClick: () => setCurrentPage('realtime-chat-demo') }}
      demo={<EcommerceDemo />}
      overview="Complete e-commerce platform featuring product catalog, shopping cart, and secure checkout functionality. Built with modern web technologies to provide a seamless shopping experience with real-time inventory updates and responsive design."
      role="Full-stack development, payment integration, state management, and user experience design"
      stack={["React", "Stripe", "Tailwind CSS", "JavaScript", "Local Storage", "Context API"]}
      challenges={[
        "Managing complex cart state efficiently",
        "Implementing real-time price calculations",
        "Handling payment processing securely",
        "Creating responsive product layouts"
      ]}
      results={[
        "Instant cart updates with Map-based state",
        "Memoized calculations for optimal performance",
        "Secure Stripe payment integration",
        "Mobile-responsive design"
      ]}
      problem="Build a high-performance e-commerce storefront that handles product catalog browsing, shopping cart management, and secure checkout processing with real-time updates and responsive design."
      approach="Implemented a deterministic demo using React state management with Map-based cart storage for efficient updates. Used memoized calculations for totals and implemented product filtering with category tags for easy navigation."
      highlights={[
        "Map-based cart for O(1) operations",
        "Memoized total calculations for performance",
        "Product filtering with category tags",
        "Real-time cart updates",
        "Responsive grid layout",
        "Clean separation of concerns"
      ]}
    />
  );
};

export default EcommerceDemoPage;


