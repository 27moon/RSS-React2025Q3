import { useContext, useEffect } from 'react';
import {
  getAllCharacters,
  searchCharactersByName,
  type AllCharacters,
  type Character,
} from '../../services/api';

import './search.css';
import { useLocalStorage } from '../../hooks/lsHook';
import { useSearchParams } from 'react-router';
import { ThemeContext } from '../../context/themeContext';

type SearchProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  onTotalPages: (pages: number) => void;
};

export function Search({
  onSearchResults,
  onLoading,
  onError,
  onTotalPages,
}: SearchProps) {
  const { searchedName, setSearchedName, saveLS } = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Pagination must be used within ThemeProvider');
  }

  const { theme } = context;

  const getCharacters = async (name: string, page: number) => {
    onLoading(true);
    onError(null);

    try {
      let data: AllCharacters;

      if (name) {
        data = await searchCharactersByName(name, page);
      } else {
        data = await getAllCharacters(page);
      }

      onSearchResults(data.results);
      onTotalPages(data.info.pages);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';

      onError(message);
    } finally {
      onLoading(false);
    }
  };

  useEffect(() => {
    getCharacters(searchedName, page);
  }, [page]);

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
    setSearchParams({ page: '1' });
    getCharacters(trimmedValue, 1);
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
      <button onClick={handleSearch} className={`btn-search ${theme}`}>
        Search
      </button>
    </div>
  );
}
