'use client';

import { Component, type ReactNode } from 'react';

interface WebGLBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface WebGLBoundaryState {
  failed: boolean;
}

export class WebGLBoundary extends Component<WebGLBoundaryProps, WebGLBoundaryState> {
  state: WebGLBoundaryState = { failed: false };

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
