import { Component, type ErrorInfo, type ReactNode } from "react";
import { logError } from "@/lib/error-logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logError({
      type: "react",
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack ?? undefined,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div
        role="alert"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          gap: "0.75rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Algo deu errado ao carregar esta página
        </h1>
        <p style={{ opacity: 0.75, maxWidth: 480 }}>
          Já registramos o erro. Tente recarregar; se persistir, abra o console e
          rode <code>__getErrors()</code> para copiar o detalhe.
        </p>
        {this.state.error?.message && (
          <pre
            style={{
              maxWidth: 640,
              overflow: "auto",
              background: "rgba(0,0,0,0.04)",
              padding: "0.75rem 1rem",
              borderRadius: 8,
              fontSize: "0.8rem",
            }}
          >
            {this.state.error.message}
          </pre>
        )}
        <button
          onClick={this.handleReload}
          style={{
            marginTop: "0.5rem",
            padding: "0.6rem 1.2rem",
            borderRadius: 8,
            background: "#500daa",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Recarregar
        </button>
      </div>
    );
  }
}
