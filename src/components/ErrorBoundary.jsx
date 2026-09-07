import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center p-4">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">Something went wrong</h1>
            <p className="text-[var(--text)] mb-4">
              {this.state.error?.toString() || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-[var(--text)] font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Reload Page
            </button>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-[var(--muted)] hover:text-[var(--text)]">
                Error Details
              </summary>
              <pre className="mt-2 p-4 bg-[var(--surface)] rounded text-xs overflow-auto">
                {this.state.error?.stack || 'No stack trace available'}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
