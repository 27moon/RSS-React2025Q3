import type { Character } from '../../services/api';
import { Card } from '../Card/card';
import './cardList.css';

type CardListProps = {
  characters: Character[];
};

export function CardList({ characters }: CardListProps) {
  return (
    <div className="cards-container" data-testid="cards-container">
      {characters.map((item) => (
        <Card key={item.id} character={item} />
      ))}
    </div>
  );
}
