import { Component } from 'react';

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
      throw new Error('Mission completed');
    }

    return <button onClick={this.handleClick}>Just break it already</button>;
  }
}
