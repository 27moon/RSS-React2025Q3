import { useEffect, useState } from 'react';

export function useLocalStorage() {
  const key = 'searchedChar';

  useEffect(() => {
    const savedChar = localStorage.getItem(key);

    if (savedChar) {
      setSearchedName(savedChar);
    }
  }, []);

  const saveLS = (value: string) => {
    setSearchedName(value);
    localStorage.setItem(key, value);
  };

  const getLS = (): string => {
    return localStorage.getItem(key) || '';
  };

  const [searchedName, setSearchedName] = useState('');

  return {
    searchedName,
    setSearchedName,
    getLS,
    saveLS,
  };
}
