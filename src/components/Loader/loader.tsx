import { Component } from 'react';
import load from '../../assets/load.gif';

export class Loader extends Component {
  render() {
    return (
      <div>
        <img src={load} />
      </div>
    );
  }
}
