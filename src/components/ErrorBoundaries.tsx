import { PureComponent, ReactNode } from 'react';

type Props = Readonly<Record<'children', ReactNode>>;
type State = Record<'Error', boolean>;

class ErrorBoundaries extends PureComponent<Props, State> {
  public state: State = { Error: false };

  static getDerivedStateFromError(): State {
    return { Error: true };
  };

  render(): ReactNode {
    if (this.state.Error) return <h1>Something went wrong...</h1>;
    return this.props.children;
  };
}

export default ErrorBoundaries;
