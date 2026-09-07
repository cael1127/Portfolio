import React from 'react';

const TestDemoPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header with Back Button */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                console.log('Back button clicked');
                setCurrentPage('work');
              }}
              className="flex items-center space-x-2 text-[var(--text)] hover:text-[var(--text)] transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Demos</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--text)]">🧪 Test Demo Page</h1>
            <p className="text-[var(--muted)] text-sm">Testing navigation in Edge</p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Test Content */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="bg-[var(--surface)] p-6 rounded-xl">
          <h2 className="text-xl font-bold text-[var(--text)] mb-4">Test Page Working!</h2>
          <p className="text-[var(--text)] mb-4">If you can see this page, the navigation is working.</p>
          <button
            onClick={() => setCurrentPage('work')}
            className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
          >
            Go Back to Demo Organizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDemoPage; 