"use client";

import { Component, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render/suspense failures from the GLTF loader (e.g. missing file)
 * and swaps in the placeholder so the rest of the UI keeps working.
 */
export class ModelErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Non-fatal: the model just couldn't load. Surface for debugging only.
    console.warn("[Enchiridion] Model failed to load, showing placeholder.", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
