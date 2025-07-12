import { Component } from 'react';
import type { Character } from '../../services/api';
import { CardList } from '../CardList/cardList';

type MainProps = {
  results: Character[];
};

export class Main extends Component<MainProps> {
  render() {
    const { results } = this.props;

    return (
      <main>
        <CardList characters={results} />
      </main>
    );
  }
}
