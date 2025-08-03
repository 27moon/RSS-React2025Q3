import { useSelector } from 'react-redux';
import type { Character } from '../../services/api';
import { useRef } from 'react';

export function SaveButton() {
  const selectedItems = useSelector(
    (state: { selectedCards: { selected: Character[] } }) =>
      state.selectedCards.selected
  );

  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const basicUrl = 'https://rickandmortyapi.com/api/character/';

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
      <button onClick={handleDownload}>Download</button>;
      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
    </>
  );
}
