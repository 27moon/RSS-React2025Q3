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

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchedChar', 'some character');
    render(
      <Search
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toHaveValue('some character');
  });

  it('Shows empty input when no saved term exists', () => {
    localStorage.clear();
    render(
      <Search
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toHaveValue('');
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

  it('Saves search term to localStorage when search button is clicked', () => {
    render(
      <Search
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: 'some character' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some character');
  });

  it('Trims whitespace from search input before saving', () => {
    render(
      <Search
        onSearchResults={() => {}}
        onLoading={() => {}}
        onError={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: ' some character ' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some character');
  });
});
