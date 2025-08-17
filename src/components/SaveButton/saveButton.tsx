'use client';
import { useSelector } from 'react-redux';
import type { Character } from '../../services/types';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import './saveButton.css';
import { generateCSV } from '../../app/actions/generateCSV';

export function SaveButton() {
  const context = useContext(ThemeContext);

  const selectedItems = useSelector(
    (state: { selectedCards: { selected: Character[] } }) =>
      state.selectedCards.selected
  );

  if (!context) {
    return null;
  }

  const { theme } = context;

  const handleDownload = async () => {
    if (selectedItems.length === 0) return;

    const response = await generateCSV(selectedItems);

    if (response) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedItems.length}_items.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };
  return (
    <button className={`save-button ${theme}`} onClick={handleDownload}>
      Download
    </button>
  );
}
