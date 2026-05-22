import React, { ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);
    // Could send to error tracking service here (e.g., Sentry)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Something Went Wrong</h1>
              <p className="text-navy-300 mb-4">
                We encountered an unexpected error. Our team has been notified.
              </p>
              <p className="text-xs text-navy-400 mb-6 break-words font-mono bg-black/30 p-3 rounded">
                {this.state.error?.message || 'Unknown error'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={this.resetError}
                  className="flex-1 rounded-lg bg-gradient-to-r from-yellow-400 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="flex-1 rounded-lg border border-navy-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
