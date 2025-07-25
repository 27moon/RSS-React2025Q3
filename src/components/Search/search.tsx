import { useEffect, useState } from 'react';
import {
  getAllCharacters,
  searchCharactersByName,
  type AllCharacters,
  type Character,
} from '../../services/api';
import { getLS, saveLS } from '../../services/ls';
import './search.css';

type SearchProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
};

export function Search({ onSearchResults, onLoading, onError }: SearchProps) {
  const [searchedName, setSearchedName] = useState(() => getLS() || '');

  const getCharacters = async (name: string) => {
    onLoading(true);
    onError(null);

    try {
      let data: AllCharacters;

      if (name) {
        data = await searchCharactersByName(name);
      } else {
        data = await getAllCharacters();
      }

      onSearchResults(data.results);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';

      onError(message);
    } finally {
      onLoading(false);
    }
  };

  useEffect(() => {
    getCharacters(searchedName);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedValue = searchedName.trim();

    saveLS(trimmedValue);
    getCharacters(trimmedValue);
  };

  return (
    <div>
      <input
        type="text"
        value={searchedName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="input"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
