import React from 'react';
import ProjectLayout from '../ProjectLayout';
import EdgeComputing from '../EdgeComputing';

const EdgeComputingProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Edge Orchestration Platform"
      subtitle="Manage distributed edge clusters with autonomous failover"
      emoji="🌐"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Quantum Lab', onClick: () => setCurrentPage('quantum-computing') }}
      demo={<EdgeComputing isEmbedded />}
      overview="Command-and-control cockpit for orchestrating edge nodes, IoT fleets, and AI workloads with real-time telemetry and automated remediation."
      role="Edge architecture, observability pipeline, workload scheduler, and UX"
      stack={[
        'React',
        'GraphQL',
        'Kubernetes',
        'Edge Device SDKs',
        'Tailwind CSS'
      ]}
      challenges={[
        'Surfacing thousands of edge metrics without overwhelming operators',
        'Coordinating IoT command + control across intermittent links',
        'Automating health policies that self-heal without regressions'
      ]}
      results={[
        '99.95% uptime across globally distributed edge clusters',
        'Predictive maintenance alerts that reduce downtime by 28%',
        'Streaming dashboards for latency, bandwidth, and device health'
      ]}
      problem="Edge deployments lack a unified view for compute health, data throughput, and automated mitigation."
      approach="Linked Kubernetes workloads with lightweight agents and GraphQL streaming APIs to deliver a live edge control plane."
      highlights={[
        'Node heatmaps with CPU, memory, bandwidth, and latency overlays',
        'Device inventory filtered by status, firmware, and manufacturer',
        'Data pipeline viewer for ingestion, inference, and backhaul metrics',
        'Incident automation with runbooks and self-healing policies'
      ]}
      tutorialSummary="Explains how to orchestrate edge fleets and visualise telemetry with modern web tooling."
      difficulty="Advanced"
      timeEstimate="4 weeks"
      keyConcepts={[
        { name: 'Edge Telemetry', description: 'Collect and stream device health with efficient protocols' },
        { name: 'Policy Automation', description: 'Define self-healing rules for workload failover' },
        { name: 'Distributed Observability', description: 'Unify metrics, logs, and traces for remote clusters' }
      ]}
      tutorialSteps={[
        'Instrument edge nodes with lightweight telemetry agents',
        'Expose health and workload data via GraphQL subscriptions',
        'Build responsive dashboards for operators in React',
        'Automate remediation flows for critical edge incidents'
      ]}
    />
  );
};

export default EdgeComputingProjectPage;

