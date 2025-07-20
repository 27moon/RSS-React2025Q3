import { render, screen, within } from '@testing-library/react';
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

  it('Correctly displays item names and descriptions', () => {
    render(<CardList characters={itemArray} />);
    const allCards = screen.getAllByTestId('card');

    allCards.forEach((card, index) => {
      const item = itemArray[index];
      const image = within(card).getByAltText(item.name);

      expect(within(card).getByText(item.name)).toBeInTheDocument();
      expect(
        within(card).getByText(`Species: ${item.species}`)
      ).toBeInTheDocument();
      expect(image).toHaveAttribute('src', item.image);
      expect(
        within(card).getByText(`Gender: ${item.gender}`)
      ).toBeInTheDocument();
      expect(
        within(card).getByText(`Origin: ${item.origin.name}`)
      ).toBeInTheDocument();
      expect(
        within(card).getByText(`Location: ${item.location.name}`)
      ).toBeInTheDocument();
    });
  });
});
