import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import HealthcareDemo from '../components/demos/HealthcareDemo';

const HealthcareDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Healthcare Management System"
      subtitle="AI-powered patient monitoring and healthcare management"
      emoji="🏥"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Financial Platform', onClick: () => setCurrentPage('financial-demo') }}
      demo={<HealthcareDemo />}
      overview="Comprehensive healthcare management system featuring AI-powered patient monitoring, electronic health records, appointment scheduling, and real-time health analytics. Designed to improve patient care and streamline healthcare operations."
      role="Full-stack development, AI integration, healthcare data management, patient monitoring system design, and healthcare analytics implementation"
      stack={["React", "Node.js", "MongoDB", "AI/ML", "Healthcare APIs", "Real-time Monitoring", "Tailwind CSS"]}
      challenges={[
        "Ensuring HIPAA compliance and data security",
        "Real-time patient monitoring with accurate alerts",
        "Managing complex healthcare data relationships",
        "Integrating multiple healthcare systems and devices"
      ]}
      results={[
        "Real-time patient monitoring with instant alerts",
        "Comprehensive electronic health records system",
        "Streamlined appointment scheduling and management",
        "AI-powered health analytics and insights",
        "Secure and compliant healthcare data management"
      ]}
      problem="Healthcare providers need integrated systems to monitor patients, manage health records, schedule appointments, and analyze health data efficiently. Fragmented systems lead to inefficiencies and potential patient safety issues."
      approach="Built a comprehensive healthcare management system with AI-powered patient monitoring, electronic health records, and real-time analytics. Implemented secure data handling with HIPAA compliance considerations and created an intuitive interface for healthcare providers."
      highlights={[
        "AI-powered patient monitoring and alerting",
        "Electronic health records management",
        "Appointment scheduling and calendar integration",
        "Real-time health analytics and insights",
        "Secure healthcare data management",
        "Intuitive provider and patient interfaces"
      ]}
    />
  );
};

export default HealthcareDemoPage; 