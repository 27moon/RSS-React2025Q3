import { NextResponse } from 'next/server';
import type { Character } from '../../services/types';

export async function generateCSV(selectedItems: Character[]) {
  const basicUrl = 'https://rickandmortyapi.com/api/character/';
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

  return new NextResponse(csv, {
    status: 200,
  });
}
