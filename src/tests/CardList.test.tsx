import { render, screen } from '@testing-library/react';
import { CardList } from '../components/CardList/cardList';

const itemArray = [
  {
    id: 1,
    name: 'Morty Smith',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    gender: 'Male',
    origin: {
      name: 'unknown',
    },
    location: {
      name: 'Citadel of Ricks',
    },
  },
  {
    id: 2,
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Citadel of Ricks',
    },
  },
  {
    id: 3,
    name: 'Summer Smith',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    gender: 'Female',
    origin: {
      name: 'Earth (Replacement Dimension)',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
  },
];

describe('CardList', () => {
  it('Renders correct number of items when data is provided', () => {
    render(<CardList characters={itemArray} />);
    const cardsContainer = screen.getByTestId('cards-container');

    expect(cardsContainer.children.length).toEqual(itemArray.length);
  });
});
