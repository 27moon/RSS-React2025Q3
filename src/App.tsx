import { Component } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/api';

type AppState = {
  characters: Character[];
  loading: boolean;
  error: string | null;
};

export class App extends Component<object, AppState> {
  state: AppState = {
    characters: [],
    loading: false,
    error: null,
  };

  handleResults = (characters: Character[]) => {
    this.setState({ characters });
  };

  render() {
    const { characters } = this.state;

    return (
      <>
        <Header onSearchResults={this.handleResults} />
        <Main results={characters} />
      </>
    );
  }
}

export default App;
