import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import EncryptionSystemDemo from '../components/demos/EncryptionSystemDemo';

const EncryptionSystemDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Encryption & Key Management System"
      subtitle="AES/RSA encryption, key rotation, secure storage, and API integration"
      emoji="🔒"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Security Monitoring', onClick: () => setCurrentPage('security-monitoring-demo') }}
      demo={<EncryptionSystemDemo />}
      overview="Comprehensive encryption and key management system supporting AES symmetric encryption and RSA asymmetric encryption. Includes key generation, rotation, secure storage, and API integration for protecting sensitive data."
      role="Security engineering, cryptography implementation, key management, secure storage, and API development"
      stack={["Python", "Cryptography", "AES", "RSA", "Key Management", "HashiCorp Vault", "AWS KMS"]}
      challenges={[
        "Implementing secure encryption algorithms",
        "Managing encryption keys securely",
        "Implementing key rotation without service disruption",
        "Integrating with key management services",
        "Ensuring compliance with security standards"
      ]}
      results={[
        "Implemented AES and RSA encryption",
        "Set up automated key rotation",
        "Integrated with key management services",
        "Achieved compliance with security standards",
        "Created secure API for encryption operations"
      ]}
      problem="Applications need to encrypt sensitive data at rest and in transit. Managing encryption keys securely and implementing key rotation are critical for maintaining security. A comprehensive encryption system is needed."
      approach="Built a comprehensive encryption system supporting both symmetric (AES) and asymmetric (RSA) encryption. The system includes key generation, rotation, secure storage, and API integration for easy use by applications."
      highlights={[
        "AES symmetric encryption",
        "RSA asymmetric encryption",
        "Key generation and management",
        "Automated key rotation",
        "Secure key storage",
        "API integration"
      ]}
      tutorialSummary="Build a comprehensive encryption and key management system with AES and RSA encryption. Learn key generation, rotation, secure storage, and API integration for protecting sensitive data."
      difficulty="Advanced"
      timeEstimate="120 min"
      keyConcepts={[
        { name: "Symmetric Encryption", description: "Same key for encryption and decryption" },
        { name: "Asymmetric Encryption", description: "Public/private key pairs" },
        { name: "Key Rotation", description: "Periodically changing encryption keys" },
        { name: "Key Management", description: "Secure key storage and lifecycle" }
      ]}
      tutorialSteps={[
        {
          title: "Setup Cryptography Library",
          description: "Install and configure encryption libraries",
          steps: [
            "Install cryptography library",
            "Set up encryption algorithms",
            "Configure key sizes",
            "Test encryption/decryption"
          ]
        },
        {
          title: "Implement Symmetric Encryption",
          description: "Build AES encryption functionality",
          steps: [
            "Generate symmetric keys",
            "Implement encryption/decryption",
            "Add key derivation",
            "Test symmetric encryption"
          ]
        },
        {
          title: "Implement Asymmetric Encryption",
          description: "Build RSA encryption functionality",
          steps: [
            "Generate RSA key pairs",
            "Implement public key encryption",
            "Implement private key decryption",
            "Test asymmetric encryption"
          ]
        },
        {
          title: "Add Key Management",
          description: "Implement key storage and rotation",
          steps: [
            "Set up secure key storage",
            "Implement key rotation",
            "Add key versioning",
            "Create key management API"
          ]
        }
      ]}
      setupInstructions={`1. Install dependencies:
pip install cryptography

2. Set up key storage:
Configure secure key storage (Vault, KMS)

3. Configure encryption:
Set encryption algorithms and key sizes

4. Test encryption:
Run encryption/decryption tests`}
      deploymentGuide={`1. Set up key management service:
Configure AWS KMS or HashiCorp Vault

2. Deploy encryption service:
Deploy to secure server

3. Configure API access:
Set up authentication and authorization

4. Monitor key usage:
Set up monitoring and alerting`}
      troubleshooting={[
        {
          issue: "Key rotation failures",
          solution: "Implement gradual key rotation with dual-key support during transition"
        },
        {
          issue: "Performance issues with encryption",
          solution: "Use symmetric encryption for large data and optimize key operations"
        },
        {
          issue: "Key storage security",
          solution: "Use dedicated key management services and encrypt keys at rest"
        }
      ]}
    />
  );
};

export default EncryptionSystemDemoPage;

