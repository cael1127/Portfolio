import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const EventDrivenArchitectureDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [events, setEvents] = useState([]);
  const [systemState, setSystemState] = useState({
    orders: 0,
    payments: 0,
    inventory: 100,
    notifications: 0
  });

  useEffect(() => {
    const eventTypes = [
      { type: 'order.created', data: { orderId: 'ORD-001', amount: 99.99 }, handler: 'OrderService' },
      { type: 'payment.processed', data: { paymentId: 'PAY-001', amount: 99.99 }, handler: 'PaymentService' },
      { type: 'inventory.updated', data: { productId: 'PROD-001', quantity: -1 }, handler: 'InventoryService' },
      { type: 'notification.sent', data: { userId: 'USER-001', message: 'Order confirmed' }, handler: 'NotificationService' }
    ];

    const interval = setInterval(() => {
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const newEvent = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        ...randomEvent
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 30));

      // Update system state based on event
      if (newEvent.type === 'order.created') {
        setSystemState(prev => ({ ...prev, orders: prev.orders + 1 }));
      } else if (newEvent.type === 'payment.processed') {
        setSystemState(prev => ({ ...prev, payments: prev.payments + 1 }));
      } else if (newEvent.type === 'inventory.updated') {
        setSystemState(prev => ({ ...prev, inventory: Math.max(0, prev.inventory + newEvent.data.quantity) }));
      } else if (newEvent.type === 'notification.sent') {
        setSystemState(prev => ({ ...prev, notifications: prev.notifications + 1 }));
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getEventColor = (type) => {
    if (type.includes('order')) return 'bg-[var(--accent-soft)]/30 border-[var(--accent)]/50 text-[var(--accent)]';
    if (type.includes('payment')) return 'bg-[var(--accent-soft)]/30 border-[var(--accent)]/50 text-[var(--accent)]';
    if (type.includes('inventory')) return 'bg-[var(--accent-soft)]/30 border-[var(--accent)]/50 text-[var(--accent)]';
    return 'bg-[var(--accent-soft)]/30 border-[var(--accent)]/50 text-[var(--accent)]';
  };

  const codeData = {
    code: `// Event-Driven Architecture System
const EventEmitter = require('events');
const Redis = require('redis');

class EventDrivenArchitecture {
  constructor() {
    this.eventBus = new EventEmitter();
    this.eventStore = [];
    this.subscribers = new Map();
    this.redis = Redis.createClient();
    this.eventHandlers = new Map();
  }

  // Event Publishing
  publish(eventType, eventData, metadata = {}) {
    const event = {
      id: this.generateEventId(),
      type: eventType,
      data: eventData,
      metadata: {
        timestamp: new Date().toISOString(),
        version: 1,
        ...metadata
      }
    };

    // Store event in event store
    this.eventStore.push(event);
    this.redis.lpush('events', JSON.stringify(event));

    // Emit to subscribers
    this.eventBus.emit(eventType, event);
    this.eventBus.emit('*', event); // Wildcard subscribers

    return event;
  }

  // Event Subscription
  subscribe(eventType, handler, handlerName) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }

    this.subscribers.get(eventType).push({
      handler,
      name: handlerName
    });

    this.eventBus.on(eventType, (event) => {
      try {
        handler(event);
      } catch (error) {
        console.error(\`Error in handler \${handlerName}:\`, error);
      }
    });
  }

  // Event Sourcing - Replay Events
  async replayEvents(fromVersion = 0) {
    const events = this.eventStore.filter(e => e.metadata.version >= fromVersion);
    
    // Replay events to rebuild system state
    for (const event of events) {
      const handlers = this.subscribers.get(event.type) || [];
      for (const { handler } of handlers) {
        await handler(event);
      }
    }

    return events.length;
  }

  // CQRS - Command Query Separation
  async executeCommand(command) {
    // Validate command
    if (!this.validateCommand(command)) {
      throw new Error('Invalid command');
    }

    // Execute command and publish event
    const event = this.publish(\`\${command.type}.executed\`, command.data, {
      commandId: command.id,
      userId: command.userId
    });

    return event;
  }

  // Query Handler (Read Model)
  async query(queryType, queryData) {
    // Query read model (optimized for reads)
    // In production, this would query a separate read database
    return this.readModel.query(queryType, queryData);
  }

  // Saga Pattern for Distributed Transactions
  async executeSaga(sagaSteps) {
    const compensationSteps = [];

    try {
      for (const step of sagaSteps) {
        const result = await this.executeStep(step);
        compensationSteps.unshift({
          step: step.name,
          compensation: step.compensation,
          result
        });
      }
      return { success: true };
    } catch (error) {
      // Compensate for completed steps
      for (const compensation of compensationSteps) {
        await compensation.compensation(compensation.result);
      }
      throw error;
    }
  }

  async executeStep(step) {
    // Execute individual saga step
    const event = this.publish(\`saga.\${step.name}.started\`, step.data);
    
    try {
      const result = await step.action(step.data);
      this.publish(\`saga.\${step.name}.completed\`, result);
      return result;
    } catch (error) {
      this.publish(\`saga.\${step.name}.failed\`, { error: error.message });
      throw error;
    }
  }

  // Event Store Query
  getEventsByType(eventType, limit = 100) {
    return this.eventStore
      .filter(e => e.type === eventType)
      .slice(-limit)
      .reverse();
  }

  getEventsByTimeRange(startTime, endTime) {
    return this.eventStore.filter(e => {
      const eventTime = new Date(e.metadata.timestamp);
      return eventTime >= startTime && eventTime <= endTime;
    });
  }

  generateEventId() {
    return \`evt_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }

  validateCommand(command) {
    // Command validation logic
    return command && command.type && command.data;
  }
}

// Example Usage
const eventSystem = new EventDrivenArchitecture();

// Subscribe to events
eventSystem.subscribe('order.created', (event) => {
  console.log('Order created:', event.data);
  // Update read model, send notification, etc.
}, 'OrderCreatedHandler');

eventSystem.subscribe('payment.processed', (event) => {
  console.log('Payment processed:', event.data);
  // Update inventory, send confirmation, etc.
}, 'PaymentProcessedHandler');

// Publish events
eventSystem.publish('order.created', {
  orderId: 'ORD-001',
  userId: 'USER-001',
  items: [{ productId: 'PROD-001', quantity: 2 }],
  total: 99.99
});

// Execute saga
eventSystem.executeSaga([
  {
    name: 'create_order',
    action: async (data) => {
      // Create order
      return { orderId: 'ORD-001' };
    },
    compensation: async (result) => {
      // Cancel order
      console.log('Compensating: cancel order', result.orderId);
    }
  },
  {
    name: 'process_payment',
    action: async (data) => {
      // Process payment
      return { paymentId: 'PAY-001' };
    },
    compensation: async (result) => {
      // Refund payment
      console.log('Compensating: refund payment', result.paymentId);
    }
  }
]);

module.exports = EventDrivenArchitecture;`,
    language: 'javascript',
    title: 'Event-Driven Architecture System'
  };

  return (
    <div className="space-y-6">
      {/* System State */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[var(--muted)] text-sm">Orders</div>
          <div className="text-2xl font-bold text-[var(--text)] mt-1">{systemState.orders}</div>
        </motion.div>
        <motion.div 
          className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-[var(--muted)] text-sm">Payments</div>
          <div className="text-2xl font-bold text-[var(--text)] mt-1">{systemState.payments}</div>
        </motion.div>
        <motion.div 
          className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-[var(--muted)] text-sm">Inventory</div>
          <div className="text-2xl font-bold text-[var(--text)] mt-1">{systemState.inventory}</div>
        </motion.div>
        <motion.div 
          className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-[var(--muted)] text-sm">Notifications</div>
          <div className="text-2xl font-bold text-[var(--text)] mt-1">{systemState.notifications}</div>
        </motion.div>
      </div>

      {/* Event Stream */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Event Stream</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className={`p-4 rounded border ${getEventColor(event.type)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{event.type}</span>
                    <span className="text-xs text-[var(--muted)]">{event.timestamp}</span>
                  </div>
                  <div className="text-sm text-[var(--text)] mb-1">
                    Handler: <span className="text-[var(--accent)]">{event.handler}</span>
                  </div>
                  <pre className="text-xs bg-[var(--bg)]/50 p-2 rounded mt-2 overflow-x-auto">
                    {JSON.stringify(event.data, null, 2)}
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Event Flow</h3>
        <div className="flex items-center justify-center p-8 bg-[var(--bg)] rounded">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-lg flex items-center justify-center mb-2">
                <span className="text-[var(--text)] text-xs text-center">Event<br/>Publisher</span>
              </div>
            </div>
            <div className="text-[var(--muted)]">→</div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-lg flex items-center justify-center mb-2">
                <span className="text-[var(--text)] text-xs text-center">Event<br/>Bus</span>
              </div>
            </div>
            <div className="text-[var(--muted)]">→</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="w-16 h-16 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="text-[var(--text)] text-xs">Handler 1</span>
              </div>
              <div className="w-16 h-16 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="text-[var(--text)] text-xs">Handler 2</span>
              </div>
              <div className="w-16 h-16 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="text-[var(--text)] text-xs">Handler 3</span>
              </div>
              <div className="w-16 h-16 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="text-[var(--text)] text-xs">Handler 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Event Sourcing</div>
            <div className="text-sm text-[var(--muted)]">Complete event history for state reconstruction</div>
          </div>
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">CQRS</div>
            <div className="text-sm text-[var(--muted)]">Separate read and write models for optimization</div>
          </div>
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Saga Pattern</div>
            <div className="text-sm text-[var(--muted)]">Distributed transaction management</div>
          </div>
          <div className="p-4 bg-[var(--bg)] rounded border border-[var(--border)]">
            <div className="text-[var(--accent)] font-semibold mb-2">Event Replay</div>
            <div className="text-sm text-[var(--muted)]">Rebuild system state from events</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-[var(--text)] rounded-lg transition-colors"
        >
          View Code
        </button>
      </div>

      {showCodeViewer && (
        <CodeViewer
          code={codeData.code}
          language={codeData.language}
          title={codeData.title}
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default EventDrivenArchitectureDemo;
