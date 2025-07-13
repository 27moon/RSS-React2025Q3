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
      throw new Error('Mission completed - error is shown');
    }

    return (
      <button className="error-btn" onClick={this.handleClick}>
        Just break it already
      </button>
    );
  }
}
