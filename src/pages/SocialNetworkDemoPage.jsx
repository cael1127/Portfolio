import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SocialNetworkDemo from '../components/demos/SocialNetworkDemo';

const SocialNetworkDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Social Network Platform"
      subtitle="Social media platform with user authentication, posts, and interactions"
      emoji="🌐"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Interactive Resume', onClick: () => setCurrentPage('interactive-resume-demo') }}
      demo={<SocialNetworkDemo />}
      overview="A comprehensive social media platform featuring user authentication, profile management, post creation, likes, comments, and social interactions. Built with modern web technologies to provide a seamless social networking experience."
      role="Full-stack development, authentication system, real-time updates, social features implementation, and user interface design"
      stack={["React", "Node.js", "MongoDB", "JWT Authentication", "Real-time Updates", "Social Features", "REST API"]}
      challenges={[
        "Implementing secure user authentication and authorization",
        "Managing real-time updates for posts and interactions",
        "Handling complex social relationships and feeds",
        "Optimizing performance for large user bases"
      ]}
      results={[
        "Secure user authentication and profile management",
        "Real-time post updates and social interactions",
        "Efficient feed generation and content delivery",
        "Comprehensive social features (likes, comments, follows)",
        "Responsive design for all devices"
      ]}
      problem="Users need a social media platform that enables connections, content sharing, and real-time interactions. The platform must be secure, performant, and provide an engaging user experience."
      approach="Built a full-stack social media platform with secure authentication, real-time updates, and comprehensive social features. Implemented efficient database queries for feed generation and optimized the user experience for engagement."
      highlights={[
        "Secure user authentication and authorization",
        "Real-time post updates and notifications",
        "Social interactions (likes, comments, follows)",
        "User profiles and feed management",
        "Content creation and sharing",
        "Responsive and intuitive user interface"
      ]}
    />
  );
};

export default SocialNetworkDemoPage;