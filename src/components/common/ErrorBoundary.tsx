import { Component, ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="max-w-md text-sm text-zinc-400">
            {this.state.error.message}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}