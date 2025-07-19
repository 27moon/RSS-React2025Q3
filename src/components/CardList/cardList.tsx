import { Component } from 'react';
import type { Character } from '../../services/api';
import { Card } from '../Card/card';
import './cardList.css';

type CardListProps = {
  characters: Character[];
};

export class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="cards-container" data-testid="cards-container">
        {this.props.characters.map((item) => (
          <Card key={item.id} character={item} />
        ))}
      </div>
    );
  }
}
