import { fireEvent, render, screen } from '@testing-library/react';
import ThemeButton from '../components/ThemeButton/themeButton';
import ContextProvider from '../context/contextProvider';

describe('ThemeButton', () => {
  it('Switches theme from light to dark on click', () => {
    render(
      <ContextProvider>
        <ThemeButton />
      </ContextProvider>
    );
    const btn = screen.getByTestId('theme-btn');

    expect(btn).toHaveClass('theme-btn light');
    fireEvent.click(btn);
    expect(btn).toHaveClass('theme-btn dark');
  });

  it('Changes theme in localStorage', () => {
    localStorage.setItem('theme27moon', 'light');
    render(
      <ContextProvider>
        <ThemeButton />
      </ContextProvider>
    );
    const btn = screen.getByTestId('theme-btn');
    fireEvent.click(btn);

    expect(localStorage.getItem('theme27moon')).toBe('dark');
  });

  it('Throws error if ThemeToggleButton is not used within ContextProvider', () => {
    expect(() => render(<ThemeButton />)).toThrow(
      'ThemeToggleButton must be used within ContextProvider'
    );
  });
});
