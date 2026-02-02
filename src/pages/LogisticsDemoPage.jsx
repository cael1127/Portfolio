import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import LogisticsDemo from '../components/demos/LogisticsDemo';

const LogisticsDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Logistics Management System"
      subtitle="Fleet and route optimization for efficient delivery operations"
      emoji="🚚"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Restaurant App', onClick: () => setCurrentPage('restaurant-app-demo') }}
      demo={<LogisticsDemo />}
      overview="Comprehensive logistics management system featuring fleet tracking, route optimization, delivery scheduling, and real-time shipment monitoring. Designed to maximize efficiency and reduce operational costs in supply chain and delivery operations."
      role="Full-stack development, route optimization algorithms, fleet management system design, real-time tracking implementation, and logistics analytics"
      stack={["React", "Node.js", "MongoDB", "Route Optimization", "GPS Tracking", "Maps API", "Real-time Updates"]}
      challenges={[
        "Optimizing routes for multiple vehicles and destinations",
        "Real-time fleet tracking and location updates",
        "Managing complex delivery schedules and constraints",
        "Handling dynamic route changes and traffic conditions"
      ]}
      results={[
        "Route optimization reducing delivery time by 25%",
        "Real-time fleet tracking with GPS integration",
        "Automated delivery scheduling and assignment",
        "Comprehensive logistics analytics and reporting",
        "Improved customer satisfaction with accurate ETAs"
      ]}
      problem="Logistics companies struggle with inefficient route planning, poor fleet visibility, and manual scheduling processes. This leads to increased fuel costs, delayed deliveries, and reduced customer satisfaction."
      approach="Developed a logistics management system with advanced route optimization algorithms, real-time fleet tracking, and automated scheduling. Integrated GPS tracking and mapping APIs to provide comprehensive visibility and efficient route planning."
      highlights={[
        "Advanced route optimization algorithms",
        "Real-time fleet tracking and monitoring",
        "Automated delivery scheduling and assignment",
        "GPS integration with live location updates",
        "Comprehensive logistics analytics dashboard",
        "Dynamic route adjustment for traffic conditions"
      ]}
    />
  );
};

export default LogisticsDemoPage; 