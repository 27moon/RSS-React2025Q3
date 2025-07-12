import { Component } from 'react';
import './App.css';
import Header from './components/Header/header';

export class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div>Project</div>
      </>
    );
  }
}

export default App;
