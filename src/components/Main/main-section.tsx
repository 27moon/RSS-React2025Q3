import { Component } from 'react';
import type { Character } from '../../services/api';
import { CardList } from '../CardList/cardList';
import { Loader } from '../Loader/loader';

type MainProps = {
  results: Character[];
  loading: boolean;
};

export class Main extends Component<MainProps> {
  render() {
    const { results, loading } = this.props;

    return (
      <main>{loading ? <Loader /> : <CardList characters={results} />}</main>
    );
  }
}
