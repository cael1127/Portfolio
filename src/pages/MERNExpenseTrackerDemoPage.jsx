import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import MERNExpenseTrackerDemo from '../components/demos/MERNExpenseTrackerDemo';

const MERNExpenseTrackerDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="MERN Expense Tracker"
      subtitle="Full-stack expense tracker with MongoDB, Express, React, and Node.js"
      emoji="💰"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Social Network', onClick: () => setCurrentPage('social-network-demo') }}
      demo={<MERNExpenseTrackerDemo />}
      overview="A complete full-stack expense tracking application built with the MERN stack. Features expense management, category tracking, budget planning, and financial analytics. Demonstrates full-stack development with modern web technologies."
      role="Full-stack development, database design, API development, state management, and user interface design"
      stack={["MongoDB", "Express", "React", "Node.js", "MERN Stack", "State Management", "REST API"]}
      challenges={[
        "Designing efficient database schema for expense data",
        "Implementing real-time updates across frontend and backend",
        "Managing complex state in React application",
        "Creating intuitive user interface for financial data"
      ]}
      results={[
        "Complete expense tracking with CRUD operations",
        "Category-based expense organization",
        "Budget planning and tracking features",
        "Financial analytics and reporting",
        "Responsive design for all devices"
      ]}
      problem="Users need a simple yet powerful tool to track expenses, manage budgets, and analyze spending patterns. A full-stack application is required to provide real-time updates and data persistence."
      approach="Built a MERN stack application with MongoDB for data storage, Express for API development, React for the frontend, and Node.js for the backend. Implemented comprehensive expense management features with real-time updates and financial analytics."
      highlights={[
        "Full-stack MERN application architecture",
        "Real-time expense tracking and updates",
        "Category-based expense organization",
        "Budget planning and monitoring",
        "Financial analytics and reporting",
        "Responsive and intuitive user interface"
      ]}
      tutorialSummary="Build a complete MERN stack expense tracker. Learn full-stack development, database design, API development, and React state management."
      difficulty="Intermediate"
      timeEstimate="2-3 weeks"
      keyConcepts={[
        { name: "MERN Stack", description: "MongoDB, Express, React, Node.js full-stack" },
        { name: "Full-Stack Development", description: "Building both frontend and backend" },
        { name: "State Management", description: "Managing application state in React" },
        { name: "REST API", description: "Backend API for data operations" }
      ]}
      tutorialSteps={[
        "Set up MongoDB database and schema",
        "Build Express API with CRUD endpoints",
        "Create React frontend with state management",
        "Implement expense tracking and category features",
        "Add budget planning and analytics"
      ]}
    />
  );
};

export default MERNExpenseTrackerDemoPage;