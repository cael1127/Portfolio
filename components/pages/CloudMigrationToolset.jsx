import React, { useState } from 'react';

export default function CloudMigrationToolset() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const startMigration = async () => {
    setLoading(true);
    setStatus('running');
    setMessage('');
    try {
      const res = await fetch('http://localhost:4000/api/migrate', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <section className="animate-fade-in">
      <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Cloud Migration Toolset</h2>
      <p className="mb-4 text-gray-700">This tool simulates migrating a legacy system to AWS cloud infrastructure using automated scripts and CI/CD pipelines.</p>
      <div className="mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          onClick={startMigration}
          disabled={loading}
        >
          {loading ? 'Migrating...' : 'Start Migration'}
        </button>
      </div>
      {status !== 'idle' && (
        <div className={`p-4 rounded-lg mb-4 ${status === 'success' ? 'bg-green-100 text-green-800' : status === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          <strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}<br />
          {message}
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Included Artifacts</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Migration Script:</strong> <code>backend/migrate.js</code></li>
          <li><strong>CloudFormation Template:</strong> <code>backend/cloudformation-template.json</code></li>
          <li><strong>CI/CD Pipeline:</strong> <code>backend/.github/workflows/deploy.yml</code></li>
        </ul>
      </div>
    </section>
  );
} 