import { Link, useSearchParams } from 'react-router';
import type { Character } from '../../services/types';
import './card.css';

import { addCard, removeCard } from '../../store/selectedCardsSlice';
import { useDispatch, useSelector } from 'react-redux';

type CardProps = {
  character: Character;
};

export function Card({ character }: CardProps) {
  const { id, name, image } = character;
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: { selectedCards: { selected: Character[] } }) =>
      Boolean(
        state.selectedCards.selected.find((item) => item.id === character.id)
      )
  );

  const handleCheckboxChange = () => {
    if (selectedItems) {
      dispatch(removeCard(id));
    } else {
      dispatch(addCard(character));
    }
  };

  return (
    <Link to={`?page=${page}&details=${character.id}`}>
      <div className="card" data-testid="card">
        <img className="img" src={image} alt={name}></img>
        <h3 className="name">{name}</h3>
        <input
          className="checkbox"
          type="checkbox"
          checked={selectedItems}
          onChange={handleCheckboxChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </Link>
  );
}
