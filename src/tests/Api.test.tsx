import { vi } from 'vitest';
import { itemArray } from './mockData';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';

const mockBaseQueryApi: BaseQueryApi = {
  signal: new AbortController().signal,
  abort: () => {},
  dispatch: () => {},
  getState: () => {},
  extra: {},
  endpoint: '',
  type: 'query',
  forced: false,
};

describe('Api', () => {
  it('Returns data on api call', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(itemArray)))
    );

    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });

    const data = await baseQuery(
      { url: 'character?page=1' },
      mockBaseQueryApi,
      {}
    );

    expect(data.data).toEqual(itemArray);
    vi.restoreAllMocks();
  });

  it('Returns data by name on api call', async () => {
    const name = 'Morty';
    const mockResponse = {
      info: { pages: 1 },
      results: [
        {
          id: 2,
          name: 'Morty Smith',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          gender: 'Male',
          origin: { name: 'Earth' },
          location: { name: 'Earth' },
        },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(mockResponse)))
    );

    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });

    const result = await baseQuery(
      { url: `character/?name=${name}&page=1` },
      mockBaseQueryApi,
      {}
    );

    expect(result.data).toEqual(mockResponse);
    vi.restoreAllMocks();
  });

  it('Returns error on not ok response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 404,
          statusText: 'Character not found.',
        })
      )
    );
    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });

    const result = await baseQuery(
      { url: 'character?page=1' },
      mockBaseQueryApi,
      {}
    );

    expect(result.error?.status).toBe(404);
    vi.restoreAllMocks();
  });

  it('Returns error on not ok response - search by name', async () => {
    const name = 'Morty';

    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 404,
          statusText: 'Character not found.',
        })
      )
    );

    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });

    const result = await baseQuery(
      { url: `character/?name=${name}&page=1` },
      mockBaseQueryApi,
      {}
    );

    expect(result.error?.status).toBe(404);
    vi.restoreAllMocks();
  });

  it('throws error on fetch data', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('some error')));

    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });

    const result = await baseQuery(
      { url: 'character?page=1' },
      mockBaseQueryApi,
      {}
    );

    expect(result.error).toBeDefined();

    vi.restoreAllMocks();
  });

  it('throws error on fetch data by name on new Error', async () => {
    const name = 'Morty';
    global.fetch = vi.fn(() => Promise.reject(new Error('some error')));

    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });

    const result = await baseQuery(
      { url: `character/?name=${name}&page=1` },
      mockBaseQueryApi,
      {}
    );

    expect(result.error).toBeDefined();
  });

  it('Returns error on not ok response - search by id', async () => {
    const id = 2;

    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 404,
          statusText: 'Character not found.',
        })
      )
    );

    const baseQuery = fetchBaseQuery({
      baseUrl: 'https://rickandmortyapi.com/api/',
    });
    const result = await baseQuery(
      { url: `character/${id}` },
      mockBaseQueryApi,
      {}
    );

    expect(result.error).toBeDefined();
    expect(result.error?.status).toBe(404);

    vi.restoreAllMocks();
  });

  it('Caches page data', () => {});
});
