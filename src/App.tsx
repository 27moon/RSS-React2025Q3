import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/api';

export function App() {
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
    <>
      <Header
        onSearchResults={handleResults}
        onLoading={handleLoading}
        onError={handleError}
      />
      <Main results={characters} loading={loading} error={error} />
    </>
  );
}

export default App;
