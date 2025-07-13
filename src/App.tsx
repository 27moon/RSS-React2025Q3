import { Component } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/api';

type AppState = {
  characters: Character[];
  loading: boolean;
};

export class App extends Component<object, AppState> {
  state: AppState = {
    characters: [],
    loading: false,
  };
  handleLoading = (loading: boolean) => {
    this.setState({ loading });
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
        />
        <Main results={this.state.characters} loading={this.state.loading} />
      </>
    );
  }
}

export default App;
