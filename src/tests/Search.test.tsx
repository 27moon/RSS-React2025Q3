import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Search } from '../components/Search/search';

describe('Search', () => {
  it('Renders search input and search button', () => {
    render(
      <Search
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Updates input value when user types', () => {
    render(
      <Search
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, {
      target: { value: 'some character' },
    });

    expect(input).toHaveValue('some character');
  });
});
