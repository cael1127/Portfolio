import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import APISecurityGatewayDemo from '../components/demos/APISecurityGatewayDemo';

const APISecurityGatewayDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="API Security Gateway"
      subtitle="API authentication, authorization, rate limiting, and request validation"
      emoji="🔐"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Phishing Detection', onClick: () => setCurrentPage('phishing-detection-demo') }}
      demo={<APISecurityGatewayDemo />}
      overview="A comprehensive API security gateway that provides authentication, authorization, rate limiting, and request validation for API endpoints. Supports multiple authentication methods including API keys, JWT tokens, and OAuth2, with advanced rate limiting and request validation."
      role="Backend security engineering, API gateway development, authentication system design, rate limiting implementation, and security policy enforcement"
      stack={["Node.js", "Express", "JWT", "OAuth2", "Rate Limiting", "API Security", "Redis"]}
      challenges={[
        "Implementing multiple authentication methods",
        "Creating efficient rate limiting without performance impact",
        "Validating requests without blocking legitimate traffic",
        "Managing API keys and tokens securely"
      ]}
      results={[
        "Multi-method authentication (API Key, JWT, OAuth2)",
        "Efficient rate limiting with Redis backend",
        "Request validation and security policies",
        "Comprehensive API key management"
      ]}
      problem="APIs need robust security to protect against unauthorized access, abuse, and attacks. A security gateway is required to handle authentication, authorization, rate limiting, and request validation consistently across all API endpoints."
      approach="Built an API security gateway that acts as a single point of entry for all API requests. Implemented multiple authentication methods, rate limiting with Redis, request validation, and comprehensive API key management. Created an interface for testing and monitoring API security."
      highlights={[
        "Multiple authentication methods (API Key, JWT, OAuth2)",
        "Advanced rate limiting and throttling",
        "Request validation and security policies",
        "API key management and rotation",
        "CORS configuration",
        "Comprehensive security monitoring"
      ]}
    />
  );
};

export default APISecurityGatewayDemoPage;
