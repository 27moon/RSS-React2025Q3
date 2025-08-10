import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/header';
import { MemoryRouter } from 'react-router';
import ContextProvider from '../context/contextProvider';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Header', () => {
  it('Expects header to be on the screen', () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Header
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });
});
