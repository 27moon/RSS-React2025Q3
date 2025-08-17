'use client';
import { Search } from '../Search/search';
import type { Character } from '../../services/types';
import Navigation from '../Navigation/navigation';

import ThemeButton from '../ThemeButton/themeButton';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  onSearchResults?: (characters: Character[]) => void;
  onLoading?: (loading: boolean) => void;
  onError?: (error: string | null) => void;
  onTotalPages?: (pages: number) => void;
};

const items = ['About'];

export function Header({
  onSearchResults,
  onLoading,
  onError,
  onTotalPages,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <>
      <header>
        <ThemeButton />
        <h1>Search Rick and Morty characters by name</h1>
        <Navigation items={items} />
        {pathname === '/' && (
          <Search
            onSearchResults={onSearchResults}
            onLoading={onLoading}
            onError={onError}
            onTotalPages={onTotalPages}
          />
        )}
      </header>
    </>
  );
}
