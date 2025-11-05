import React from 'react';
import ProjectLayout from '../ProjectLayout';

const ThreeSistersOysterProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Three Sisters Oyster Co."
      subtitle="Full-stack e-commerce platform for premium Texas oysters"
      emoji="🦪"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Bapux', onClick: () => setCurrentPage('bapux-project') }}
      demo={
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">Three Sisters Oyster Co.</h3>
            <p className="text-gray-300 mb-4">Premium Texas Oysters - Sustainable Aquaculture</p>
            <a
              href="https://threesistersoyster.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Visit Live Website →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">E-commerce Features</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Product catalog and inventory</li>
                <li>• Shopping cart and checkout</li>
                <li>• Order management system</li>
                <li>• Customer account management</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Key Highlights</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Responsive design</li>
                <li>• SEO optimized</li>
                <li>• Fast loading times</li>
                <li>• Mobile-friendly interface</li>
              </ul>
            </div>
          </div>
        </div>
      }
      overview="Full-stack e-commerce platform for Three Sisters Oyster Co., a sustainable aquaculture business in Port Lavaca, Texas. The platform features product catalog, inventory management, shopping cart, checkout system, and order management for premium Gulf Coast oysters."
      role="Full-stack development, e-commerce implementation, UI/UX design, payment integration, and deployment"
      stack={["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Express", "Netlify"]}
      challenges={[
        "Implementing inventory management for perishable products",
        "Creating intuitive product browsing experience",
        "Integrating payment processing securely",
        "Optimizing for mobile devices",
        "Ensuring fast page load times"
      ]}
      results={[
        "Launched production e-commerce platform",
        "Implemented secure payment processing",
        "Achieved 95+ Lighthouse performance score",
        "Created responsive mobile experience",
        "Established reliable inventory tracking"
      ]}
      problem="Three Sisters Oyster Co. needed a modern e-commerce platform to sell premium oysters online. The platform needed to handle inventory management, process orders, and provide an excellent user experience for customers."
      approach="Built a full-stack e-commerce platform with React frontend, Node.js backend, and MongoDB database. Implemented secure payment processing, inventory management, and responsive design for optimal user experience across all devices."
      highlights={[
        "Full-stack e-commerce platform",
        "Inventory management system",
        "Secure payment processing",
        "Responsive design",
        "SEO optimization",
        "Fast performance"
      ]}
      tutorialSummary="Built a complete e-commerce platform for Three Sisters Oyster Co., featuring product catalog, shopping cart, checkout, and order management. The platform showcases sustainable aquaculture and premium Texas oysters."
      difficulty="Advanced"
      timeEstimate="3-4 weeks"
      keyConcepts={[
        { name: "E-commerce Platform", description: "Complete online store implementation" },
        { name: "Inventory Management", description: "Tracking and managing product inventory" },
        { name: "Payment Processing", description: "Secure payment integration" },
        { name: "Responsive Design", description: "Mobile-first design approach" }
      ]}
      tutorialSteps={[
        {
          title: "Requirements & Design",
          description: "Gather requirements and design the platform",
          steps: [
            "Define product catalog structure",
            "Design user interface and user flows",
            "Plan inventory management system",
            "Design database schema"
          ]
        },
        {
          title: "Frontend Development",
          description: "Build React frontend with responsive design",
          steps: [
            "Create product catalog components",
            "Implement shopping cart functionality",
            "Build checkout flow",
            "Add responsive design for mobile"
          ]
        },
        {
          title: "Backend Development",
          description: "Implement Node.js backend and API",
          steps: [
            "Set up Express server",
            "Create product and order APIs",
            "Implement inventory management",
            "Add authentication and authorization"
          ]
        },
        {
          title: "Payment Integration",
          description: "Integrate secure payment processing",
          steps: [
            "Set up Stripe account",
            "Implement payment processing",
            "Add order confirmation",
            "Test payment flows"
          ]
        },
        {
          title: "Deployment & Launch",
          description: "Deploy and launch the platform",
          steps: [
            "Deploy frontend to Netlify",
            "Deploy backend to cloud platform",
            "Configure domain and SSL",
            "Launch and monitor"
          ]
        }
      ]}
      setupInstructions={`The Three Sisters Oyster Co. website is live at:
https://threesistersoyster.com

For development setup:
1. Clone repository
2. Install dependencies (npm install)
3. Set up environment variables
4. Run development server (npm start)`}
      deploymentGuide={`Production deployment:
- Frontend: Netlify
- Backend: Cloud platform (AWS/Heroku)
- Database: MongoDB Atlas
- Payment: Stripe
- Domain: Configured via Netlify`}
      troubleshooting={[
        {
          issue: "Payment processing errors",
          solution: "Verify Stripe API keys and webhook configuration"
        },
        {
          issue: "Inventory sync issues",
          solution: "Check database connection and inventory update logic"
        }
      ]}
    />
  );
};

export default ThreeSistersOysterProjectPage;

