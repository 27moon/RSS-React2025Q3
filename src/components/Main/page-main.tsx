'use client';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Header } from '../Header/header';
import { Main } from './main-section';
import type { Character } from '../../services/types';
import { useState } from 'react';

interface MainPageProps {
  results: Character[];
  totalPages: number;
}

export function MainPage({ results, totalPages }: MainPageProps) {
  const [characters, setCharacters] = useState<Character[]>(results);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState(totalPages);

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleError = (error: string | null) => {
    setError(error);
  };

  const handleResults = (characters: Character[]) => {
    setCharacters(characters);
  };

  const handleTotalPages = (pages: number) => {
    setPages(pages);
  };

  return (
    <Provider store={store}>
      <Header
        onSearchResults={handleResults}
        onLoading={handleLoading}
        onError={handleError}
        onTotalPages={handleTotalPages}
      />
      <Main
        results={characters}
        loading={loading}
        error={error}
        totalPages={pages}
      />
    </Provider>
  );
}
