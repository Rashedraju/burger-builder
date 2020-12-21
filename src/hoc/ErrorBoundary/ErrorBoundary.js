import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    errorInfo: null,
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <h2 style={{ textAlign: 'center' }}> Something went worng. </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
