import { useState, type JSX } from 'react';
import './App.css';

import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/api';
import { BrowserRouter, Route, Routes } from 'react-router';
import About from './pages/About/about';
import NotFound from './pages/NotFound/not-found';

export function App(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleError = (error: string | null) => {
    setError(error);
  };

  const handleResults = (characters: Character[]) => {
    setCharacters(characters);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                onSearchResults={handleResults}
                onLoading={handleLoading}
                onError={handleError}
              />
              <Main results={characters} loading={loading} error={error} />
            </>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
