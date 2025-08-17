import { getErrorMessage } from './functions';
import type { AllCharacters } from './types';

export async function getAllCharacters(page = 1): Promise<AllCharacters> {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = getErrorMessage(response.status);
      throw new Error(message);
    }
    const data: AllCharacters = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Oops something went wrong:', error);
    throw error;
  }
}
