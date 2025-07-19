import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/header';

describe('Header', () => {
  it('Expects header to be on the screen', () => {
    render(
      <Header
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });
});
