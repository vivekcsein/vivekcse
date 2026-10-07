"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ModelErrorBoundaryProps = {
  /** Rendered instead of the model if loading/parsing throws. */
  fallback: ReactNode;
  children: ReactNode;
};

type ModelErrorBoundaryState = { failed: boolean };

/**
 * A failed GLB (404, corrupt file, unsupported extension) must never take the
 * page down — swap in the placeholder and log why in development.
 * (Error boundaries can only be class components.)
 */
export class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  state: ModelErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[3d] model failed to load, showing placeholder:",
        error,
        info,
      );
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
