import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import EventDrivenArchitectureDemo from '../components/demos/EventDrivenArchitectureDemo';

const EventDrivenArchitectureDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Event-Driven Architecture System"
      subtitle="Event streaming, event replay, CQRS pattern, and event visualization"
      emoji="⚡"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Serverless Platform', onClick: () => setCurrentPage('serverless-platform-demo') }}
      demo={<EventDrivenArchitectureDemo />}
      overview="An event-driven architecture system that implements event sourcing, CQRS (Command Query Responsibility Segregation), and event streaming. Features event replay capabilities, saga pattern for distributed transactions, and comprehensive event visualization for system state reconstruction."
      role="Backend architecture, event-driven system design, event sourcing implementation, CQRS pattern development, and distributed systems engineering"
      stack={["Node.js", "Event Sourcing", "Message Queue", "React", "CQRS", "Saga Pattern"]}
      challenges={[
        "Implementing event sourcing and event store",
        "Designing CQRS with separate read and write models",
        "Managing distributed transactions with saga pattern",
        "Handling event replay and state reconstruction"
      ]}
      results={[
        "Event sourcing with complete event history",
        "CQRS pattern with optimized read models",
        "Saga pattern for distributed transactions",
        "Event replay and state reconstruction capabilities"
      ]}
      problem="Traditional architectures struggle with scalability, auditability, and distributed transaction management. Event-driven architecture provides solutions through event sourcing, CQRS, and event streaming, but requires careful implementation of event handling and state management."
      approach="Built an event-driven architecture system with event sourcing for complete audit trails, CQRS for optimized read/write separation, and saga pattern for distributed transaction management. Implemented event streaming, replay capabilities, and comprehensive visualization."
      highlights={[
        "Event sourcing with complete event history",
        "CQRS pattern with separate read/write models",
        "Saga pattern for distributed transactions",
        "Event streaming and processing",
        "Event replay and state reconstruction",
        "Comprehensive event visualization"
      ]}
    />
  );
};

export default EventDrivenArchitectureDemoPage;
