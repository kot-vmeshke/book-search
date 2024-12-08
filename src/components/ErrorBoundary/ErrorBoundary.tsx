import './ErrorBoundary.scss';
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}
interface ErrorBoundaryState {
  error: null | Error;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString(), error: error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error.toString(), info.componentStack);
  }

  render() {
    const { children } = this.props;
    if (this.state.error) {
      return (
        <div className="error">
          <p>{this.state.errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="main-button"
            data-testid="refresh-button"
          >
            Refresh
          </button>
        </div>
      );
    }
    return children;
  }
}

export { ErrorBoundary };
