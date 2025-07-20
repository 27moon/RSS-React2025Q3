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

  handleLoading = (loading: boolean) => {
    this.setState({ loading });
  };
  handleError = (error: string | null) => {
    this.setState({ error });
  };

  handleResults = (characters: Character[]) => {
    this.setState({ characters });
  };

  render() {
    return (
      <>
        <Header
          onSearchResults={this.handleResults}
          onLoading={this.handleLoading}
          onError={this.handleError}
        />
        <Main
          results={this.state.characters}
          loading={this.state.loading}
          error={this.state.error}
        />
      </>
    );
  }
}

export default App;
