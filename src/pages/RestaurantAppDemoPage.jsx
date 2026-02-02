import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import RestaurantAppDemo from '../components/demos/RestaurantAppDemo';

const RestaurantAppDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Restaurant Management System"
      subtitle="Complete restaurant management solution with ordering, inventory, and analytics"
      emoji="🍽️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Portfolio Builder', onClick: () => setCurrentPage('portfolio-builder-demo') }}
      demo={<RestaurantAppDemo />}
      overview="Comprehensive restaurant management platform featuring online ordering, table management, inventory tracking, menu management, and analytics. Streamlines restaurant operations from order taking to kitchen management and customer service."
      role="Full-stack development, restaurant operations system design, order management, inventory tracking, and analytics dashboard implementation"
      stack={["React", "Node.js", "MongoDB", "Real-time Updates", "Payment Processing", "Inventory Management", "Analytics"]}
      challenges={[
        "Managing real-time order updates across multiple systems",
        "Synchronizing kitchen display with order management",
        "Tracking inventory levels accurately in real-time",
        "Handling peak-hour order volumes efficiently"
      ]}
      results={[
        "Streamlined order management reducing wait times by 30%",
        "Real-time inventory tracking preventing stockouts",
        "Integrated kitchen display system for efficient food preparation",
        "Comprehensive analytics for business insights",
        "Improved customer experience with online ordering"
      ]}
      problem="Restaurants need integrated systems to manage orders, inventory, tables, and operations efficiently. Disconnected systems lead to errors, delays, and poor customer experience."
      approach="Built a comprehensive restaurant management system with real-time order processing, inventory management, table reservations, and analytics. Integrated all components into a unified platform for seamless restaurant operations."
      highlights={[
        "Real-time order management and processing",
        "Inventory tracking and automatic reordering",
        "Table management and reservation system",
        "Kitchen display system integration",
        "Comprehensive restaurant analytics dashboard",
        "Online ordering and payment processing"
      ]}
    />
  );
};

export default RestaurantAppDemoPage; 