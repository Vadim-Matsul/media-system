import { PureComponent, ReactNode } from 'react';

type Props = Readonly<Record<'children', ReactNode>>;
type State = Record<'Error', boolean>;

class ErrorBoundaries extends PureComponent<Props, State> {
  public state: State = { Error: false };

  static getDerivedStateFromError(): State {
    return { Error: true };
  };

  render(): ReactNode {
    if (this.state.Error) {
      return (
        <div className="center-wrap">
          <span>Something went wrong...</span>
        </div>
      )
    }
    return this.props.children;
  };
}

export default ErrorBoundaries;
