import { Component } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { Api, type Character } from './services/api';

type AppState = {
  characters: Character[];
  loading: boolean;
  error: string | null;
};

export class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const data = await Api.getAllCharacters();

      this.setState({ characters: data.results });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'something went wrong' });
      }
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { characters, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error occurred: {error}</div>;
    }

    return (
      <>
        <Header />
        <Main results={characters} />
      </>
    );
  }
}

export default App;
