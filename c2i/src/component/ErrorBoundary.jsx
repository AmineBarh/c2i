import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h2>
          <p className="text-gray-600 mb-4">Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-bluec2i-500 text-white rounded hover:bg-bluec2i-900 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
