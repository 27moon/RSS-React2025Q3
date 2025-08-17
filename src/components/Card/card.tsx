import { useSearchParams, useRouter } from 'next/navigation';
import type { Character } from '../../services/types';
import { addCard, removeCard } from '../../store/selectedCardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import './card.css';

type CardProps = {
  character: Character;
};

export function Card({ character }: CardProps) {
  const { id, name, image } = character;
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams?.get('page') || '1';
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

  const handleCardClick = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page);
    params.set('details', id.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="card" data-testid="card" onClick={handleCardClick}>
      <Image src={image} alt={name} width={250} height={250} className="img" />
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
  );
}
