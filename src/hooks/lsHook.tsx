import { useState } from 'react';

export function useLocalStorage() {
  const key = 'searchedChar';

  const saveLS = (item: string) => {
    localStorage.setItem(key, item);
  };

  const getLS = (): string => {
    return localStorage.getItem(key) || '';
  };

  const [searchedName, setSearchedName] = useState<string>(() => getLS());

  return {
    searchedName,
    setSearchedName,
    saveLS,
    getLS,
  };
}
