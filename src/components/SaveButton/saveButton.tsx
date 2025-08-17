'use client';
import { useSelector } from 'react-redux';
import type { Character } from '../../services/types';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../../context/themeContext';
import './saveButton.css';

export function SaveButton() {
  const context = useContext(ThemeContext);

  const selectedItems = useSelector(
    (state: { selectedCards: { selected: Character[] } }) =>
      state.selectedCards.selected
  );

  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const basicUrl = 'https://rickandmortyapi.com/api/character/';

  if (!context) {
    return null;
  }

  const { theme } = context;

  const handleDownload = () => {
    if (selectedItems.length === 0) return;

    const headers = [
      'Name',
      'Species',
      'Gender',
      'Origin',
      'Location',
      'Details URL',
    ];

    const rows = selectedItems.map((item: Character) => [
      item.name,
      item.species,
      item.gender,
      item.origin.name,
      item.location.name,
      `${basicUrl}${item.id}`,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((field) => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedItems.length}_items.csv`;
      downloadLinkRef.current.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

  return (
    <>
      <button className={`save-button ${theme}`} onClick={handleDownload}>
        Download
      </button>
      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
    </>
  );
}
