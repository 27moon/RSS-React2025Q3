import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '../components/Card/card';
import { MemoryRouter } from 'react-router';
import { item } from './mockData';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from '../store/selectedCardsSlice';

describe('Card', () => {
  it('Displays item name and description correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card key={item.id} character={item} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByAltText(`${item.name}`);

    expect(screen.getByText(item.name)).toBeInTheDocument();

    expect(image).toHaveAttribute('src', item.image);
  });

  it('Toggles checkbox', () => {
    const store = configureStore({
      reducer: { selectedCards: selectedCardsReducer },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={item} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
