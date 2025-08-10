import { vi } from 'vitest';
import {
  getAllCharacters,
  searchCharacterById,
  searchCharactersByName,
} from '../services/functions';
import { item, itemArray } from './mockData';

describe('Api', () => {
  it('Returns data on api call', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(itemArray)))
    );
    const data = await getAllCharacters();

    expect(data).toEqual(itemArray);
  });

  it('Returns data by name on api call', async () => {
    const name = 'Morty';

    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(item)))
    );
    const data = await searchCharactersByName(name);

    expect(data).toEqual(item);
  });

  it('Returns error on not ok response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(getAllCharacters()).rejects.toThrow('Character not found.');
  });

  it('Returns error on not ok response - search by name', async () => {
    const name = 'Morty';

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(searchCharactersByName(name)).rejects.toThrow(
      'Character not found.'
    );
  });

  it('throws error on fetch data', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('some error')));

    await expect(getAllCharacters()).rejects.toThrow('some error');
  });

  it('throws error on on fetch data by name on new Error', async () => {
    const name = 'Morty';
    global.fetch = vi.fn(() => Promise.reject(new Error('some error')));

    await expect(searchCharactersByName(name)).rejects.toThrow('some error');
  });

  it('Returns error on not ok response - search by id', async () => {
    const id = 2;

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(searchCharacterById(id)).rejects.toThrow(
      'Character not found.'
    );
  });
});
