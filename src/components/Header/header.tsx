import { Search } from '../Search/search';
import type { Character } from '../../services/api';

type HeaderProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
};

export function Header({ onSearchResults, onLoading, onError }: HeaderProps) {
  return (
    <header>
      <h1>Search Rick and Morty characters by name</h1>
      <Search
        onSearchResults={onSearchResults}
        onLoading={onLoading}
        onError={onError}
      />
    </header>
  );
}
