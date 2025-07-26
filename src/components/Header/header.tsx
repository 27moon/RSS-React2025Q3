import { Search } from '../Search/search';
import type { Character } from '../../services/api';
import Navigation from '../Navigation/navigation';

type HeaderProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
};
const items = ['About'];

export function Header({ onSearchResults, onLoading, onError }: HeaderProps) {
  return (
    <header>
      <h1>Search Rick and Morty characters by name</h1>
      <Navigation items={items} />
      <Search
        onSearchResults={onSearchResults}
        onLoading={onLoading}
        onError={onError}
      />
    </header>
  );
}
