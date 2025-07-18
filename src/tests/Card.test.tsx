import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card/card';

const item = {
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
};

describe('Card', () => {
  it('Displays item name and description correctly', () => {
    render(<Card key={item.id} character={item} />);

    expect(screen.getByText(item.name)).toBeInTheDocument();
  });
});
