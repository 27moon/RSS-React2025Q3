import { Link, useSearchParams } from 'react-router';
import type { Character } from '../../services/api';
import './card.css';

type CardProps = {
  character: Character;
};

export function Card({ character }: CardProps) {
  const { name, image } = character;
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  return (
    <Link to={`?page=${page}&details=${character.id}`}>
      <div className="card" data-testid="card">
        <img className="img" src={image} alt={name}></img>
        <h3 className="name">{name}</h3>
      </div>
    </Link>
  );
}
