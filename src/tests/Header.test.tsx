import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/header';
import { MemoryRouter } from 'react-router';
import ContextProvider from '../context/contextProvider';

describe('Header', () => {
  it('Expects header to be on the screen', () => {
    render(
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
    );
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });
});
