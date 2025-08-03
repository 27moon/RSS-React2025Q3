import { fireEvent, render, screen } from '@testing-library/react';
import { SaveButton } from '../components/SaveButton/saveButton';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ContextProvider from '../context/contextProvider';
import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from '../store/selectedCardsSlice';
import { item } from './mockData';

const testStore = configureStore({
  reducer: { selectedCards: selectedCardsReducer },
  preloadedState: {
    selectedCards: {
      selected: [item],
    },
  },
});

global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('SaveButton', () => {
  it('Renders download button', () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <SaveButton />
        </ContextProvider>
      </Provider>
    );

    const btn = screen.getByText(/download/i);

    expect(btn).toBeInTheDocument();
  });

  it('Clicking download triggers CSV creation', () => {
    render(
      <Provider store={testStore}>
        <ContextProvider>
          <SaveButton />
        </ContextProvider>
      </Provider>
    );

    const btn = screen.getByText(/download/i);
    fireEvent.click(btn);

    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('returns null if no context is provided', () => {
    render(
      <Provider store={testStore}>
        <SaveButton />
      </Provider>
    );

    expect(screen.queryByText(/download/i)).toBeNull();
  });
});
