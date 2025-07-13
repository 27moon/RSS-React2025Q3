import { Component } from 'react';
import './error-button.css';

type ErrorButtonState = {
  hasError: boolean;
};

export class ErrorButton extends Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    hasError: false,
  };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Error from ErrorBoundary is shown');
    }

    return (
      <button className="error-btn" onClick={this.handleClick}>
        Error Button
      </button>
    );
  }
}
