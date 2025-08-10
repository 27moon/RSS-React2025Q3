import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Search } from '../components/Search/search';
import { MemoryRouter } from 'react-router';
import ContextProvider from '../context/contextProvider';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ApiRTK } from '../services/apiRTK';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Renders search input and search button', () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchedChar', 'some character');
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toHaveValue('some character');
  });

  it('Shows empty input when no saved term exists', () => {
    localStorage.clear();
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toHaveValue('');
  });

  it('Updates input value when user types', () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, {
      target: { value: 'some character' },
    });

    expect(input).toHaveValue('some character');
  });

  it('Saves search term to localStorage when search button is clicked', () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
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
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: ' some character ' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some character');
  });

  it('Overwrites existing localStorage value when new search is performed', () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    localStorage.setItem('searchedChar', 'some character');

    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: 'some new character' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some new character');
  });

  it('Checks for error on unsuccessful result', async () => {
    const onError = vi.fn();
    vi.spyOn(ApiRTK, 'useSearchCharactersByNameQuery').mockReturnValue({
      data: undefined,
      error: { status: 404 },
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: true,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={() => {}}
              onError={onError}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, {
      target: { value: 'something non-existent' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Character not found.');
    });
  });

  it('Calls onLoading true when data is fetching', () => {
    const onLoadingMock = vi.fn();

    vi.spyOn(ApiRTK, 'useGetAllCharactersQuery').mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isFetching: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Search
              onSearchResults={() => {}}
              onLoading={onLoadingMock}
              onError={() => {}}
              onTotalPages={() => {}}
            />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );

    expect(onLoadingMock).toHaveBeenCalled();
  });
});
