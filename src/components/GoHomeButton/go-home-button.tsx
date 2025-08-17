'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useRouter } from 'next/navigation';

export default function GoHomeButton() {
  const context = useContext(ThemeContext);
  const router = useRouter();

  if (!context) return null;

  const { theme } = context;

  return (
    <button
      className={`go-home-button ${theme}`}
      onClick={() => router.push('/')}
    >
      Back to the main page
    </button>
  );
}
