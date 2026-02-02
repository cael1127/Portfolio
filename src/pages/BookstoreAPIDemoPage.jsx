import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import BookstoreAPIDemo from '../components/demos/BookstoreAPIDemo';

const BookstoreAPIDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Bookstore REST API"
      subtitle="Complete REST API for bookstore management with CRUD operations"
      emoji="📚"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'MERN Expense Tracker', onClick: () => setCurrentPage('mern-expense-tracker-demo') }}
      demo={<BookstoreAPIDemo />}
      overview="A comprehensive REST API for bookstore management featuring book catalog management, author tracking, inventory control, and order processing. Built with best practices for API design, error handling, and data validation."
      role="Backend development, REST API design, database schema design, API documentation, and testing implementation"
      stack={["Node.js", "Express", "MongoDB", "REST API", "JWT Authentication", "API Documentation", "Testing"]}
      challenges={[
        "Designing RESTful API endpoints following best practices",
        "Implementing proper error handling and validation",
        "Managing database relationships and queries efficiently",
        "Creating comprehensive API documentation"
      ]}
      results={[
        "RESTful API with comprehensive CRUD operations",
        "Proper error handling and status codes",
        "Efficient database queries and relationships",
        "Complete API documentation",
        "Secure authentication and authorization"
      ]}
      problem="Bookstores need a robust API to manage books, authors, inventory, and orders. The API must be well-designed, secure, and easy to integrate with frontend applications."
      approach="Developed a RESTful API using Node.js and Express with MongoDB for data storage. Implemented proper error handling, data validation, authentication, and comprehensive API documentation. Designed efficient database schemas and queries."
      highlights={[
        "RESTful API design following best practices",
        "Comprehensive CRUD operations for all resources",
        "Proper error handling and HTTP status codes",
        "Data validation and input sanitization",
        "JWT-based authentication and authorization",
        "Complete API documentation and testing"
      ]}
      tutorialSummary="Build a complete REST API for bookstore management. Learn REST API design, database modeling, authentication, and API documentation."
      difficulty="Intermediate"
      timeEstimate="1-2 weeks"
      keyConcepts={[
        { name: "REST API", description: "Representational State Transfer API design" },
        { name: "CRUD Operations", description: "Create, Read, Update, Delete operations" },
        { name: "API Documentation", description: "Documenting API endpoints and usage" },
        { name: "Authentication", description: "Securing API endpoints" }
      ]}
      tutorialSteps={[
        "Design database schema and models",
        "Implement REST API endpoints with Express",
        "Add authentication and authorization",
        "Implement error handling and validation",
        "Create API documentation and tests"
      ]}
    />
  );
};

export default BookstoreAPIDemoPage;