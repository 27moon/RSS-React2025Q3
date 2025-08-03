import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from '../store/selectedCardsSlice';
import { item } from './mockData';
import { Provider } from 'react-redux';
import ContextProvider from '../context/contextProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedItems } from '../components/SelectedItemsBlock/selectedItemsBlock';

const testStore = configureStore({
  reducer: { selectedCards: selectedCardsReducer },
  preloadedState: {
    selectedCards: {
      selected: [item],
    },
  },
});

describe('SelectedItemsBlock', () => {
  it('Block renders when there are selected items', () => {
    render(
      <Provider store={testStore}>
        <ContextProvider>
          <SelectedItems />
        </ContextProvider>
      </Provider>
    );
    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
    expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
  });

  it('Unselect all button clears the list', () => {
    render(
      <Provider store={testStore}>
        <ContextProvider>
          <SelectedItems />
        </ContextProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText(/unselect all/i));

    expect(screen.queryByText(/item selected/i)).toBeNull();
  });

  it('returns null if no context is provided', () => {
    const rendered = render(
      <Provider store={testStore}>
        <SelectedItems />
      </Provider>
    );

    expect(rendered.container.firstChild).toBeNull();
  });
});
