import { Component } from 'react';
import type { Character } from '../../services/api';
import { CardList } from '../CardList/cardList';
import { Loader } from '../Loader/loader';

type MainProps = {
  results: Character[];
  loading: boolean;
  error: string | null;
};

export class Main extends Component<MainProps> {
  render() {
    const { results, loading, error } = this.props;

    if (error) {
      return (
        <main>
          <div>{error}</div>
        </main>
      );
    } else if (loading) {
      return (
        <main>
          <Loader />
        </main>
      );
    } else {
      return (
        <main>
          <CardList characters={results} />
        </main>
      );
    }
  }
}
