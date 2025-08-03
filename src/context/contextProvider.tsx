import { useState, type ReactNode } from 'react';
import { ThemeContext } from './themeContext';

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const themeKey = 'theme27moon';
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem(themeKey);
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    const themeToBe = theme === 'light' ? 'dark' : 'light';
    setTheme(themeToBe);
    localStorage.setItem(themeKey, themeToBe);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
