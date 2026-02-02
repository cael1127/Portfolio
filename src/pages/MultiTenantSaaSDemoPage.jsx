import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import MultiTenantSaaSDemo from '../components/demos/MultiTenantSaaSDemo';

const MultiTenantSaaSDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Multi-tenant SaaS Platform"
      subtitle="Tenant isolation, subscription management, usage tracking, and billing integration"
      emoji="🏢"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'WAF', onClick: () => setCurrentPage('waf-demo') }}
      demo={<MultiTenantSaaSDemo />}
      overview="A comprehensive multi-tenant SaaS platform that enables a single application instance to serve multiple tenants with complete data isolation. Features row-level security, subscription management, usage tracking, billing integration, and flexible plan management for scalable SaaS applications."
      role="Full-stack architecture, multi-tenancy system design, data isolation implementation, subscription management, and billing system integration"
      stack={["Node.js", "PostgreSQL", "Row-level Security", "React", "Multi-tenancy", "Billing"]}
      challenges={[
        "Implementing secure tenant data isolation",
        "Managing subscriptions and plan upgrades/downgrades",
        "Tracking usage across multiple tenants efficiently",
        "Scaling to support large numbers of tenants"
      ]}
      results={[
        "Complete tenant data isolation with row-level security",
        "Flexible subscription and plan management",
        "Real-time usage tracking and limits",
        "Comprehensive billing and invoicing system"
      ]}
      problem="SaaS applications need to serve multiple customers (tenants) from a single application instance while maintaining complete data isolation. Traditional approaches don't scale well and may have security issues. A proper multi-tenant architecture is needed."
      approach="Built a multi-tenant SaaS platform using PostgreSQL row-level security for data isolation, flexible subscription management, and usage tracking. Implemented tenant context management, plan-based feature access, and comprehensive billing integration."
      highlights={[
        "Row-level security for tenant isolation",
        "Flexible subscription and plan management",
        "Real-time usage tracking and limits",
        "Billing and invoicing integration",
        "Multi-tenant data architecture",
        "Scalable tenant management"
      ]}
    />
  );
};

export default MultiTenantSaaSDemoPage;
