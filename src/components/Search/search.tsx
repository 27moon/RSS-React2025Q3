import { useContext, useState } from 'react';
import { type Character } from '../../services/api';
import './search.css';
import { useLocalStorage } from '../../hooks/lsHook';
import { useSearchParams } from 'react-router';
import { ThemeContext } from '../../context/themeContext';
import {
  useGetAllCharactersQuery,
  useSearchCharactersByNameQuery,
} from '../../services/apiRTK';
import { useEffect } from 'react';

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

  const [searchFiredName, setSearchTriggeredName] = useState(searchedName);

  const trimmedFiredName = searchFiredName.trim();

  const searchByName = useSearchCharactersByNameQuery(
    { name: trimmedFiredName, page },
    { skip: !trimmedFiredName }
  );

  const getAll = useGetAllCharactersQuery(page, {
    skip: trimmedFiredName ? true : false,
  });
  const data = trimmedFiredName ? searchByName.data : getAll.data;
  const error = trimmedFiredName ? searchByName.error : getAll.error;
  const isFetching = trimmedFiredName
    ? searchByName.isFetching
    : getAll.isFetching;

  useEffect(() => {
    onLoading(isFetching);
  }, [isFetching, onLoading]);

  useEffect(() => {
    if (error) {
      onError('An error occurred');
    } else {
      onError(null);
    }
  }, [error, onError]);

  useEffect(() => {
    if (data?.results) {
      onSearchResults(data.results);
      onTotalPages(data.info.pages);
    }
  }, [data, onSearchResults, onTotalPages]);

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
    setSearchTriggeredName(trimmedValue);
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
