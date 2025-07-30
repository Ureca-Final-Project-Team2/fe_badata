interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <p>코인 정보를 불러오지 못했습니다.</p>;
    }
    return this.props.children;
  }
} 