import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AllCharacters, Character } from './api';

export const ApiRTK = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    searchCharacterById: builder.query<Character, number>({
      query: (id) => `character/${id}`,
      providesTags: ['Characters'],
    }),
    getAllCharacters: builder.query<AllCharacters, number>({
      query: (page = 1) => `character?page=${page}`,
      providesTags: ['Characters'],
    }),
    searchCharactersByName: builder.query<
      AllCharacters,
      { name: string; page?: number }
    >({
      query: ({ name, page = 1 }) =>
        `character/?name=${encodeURIComponent(name.trim())}&page=${page}`,
      providesTags: ['Characters'],
    }),
  }),
});

export const {
  useSearchCharacterByIdQuery,
  useGetAllCharactersQuery,
  useSearchCharactersByNameQuery,
} = ApiRTK;
