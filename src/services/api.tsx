import { Component } from 'react';

export type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
};

export type AllCharacters = {
  results: Character[];
};

export class Api extends Component {
  static async getAllCharacters(): Promise<AllCharacters> {
    const url = 'https://rickandmortyapi.com/api/character';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`error: ${response.status}`);
      }
      const data: AllCharacters = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Oops something went wrong:', error);
      throw new Error('something went wrong');
    }
  }

  static async searchCharactersByName(name: string): Promise<AllCharacters> {
    const searchedName = name.trim();
    const url = `https://rickandmortyapi.com/api/character/?name=${searchedName}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Character not found');
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      }
      const data: AllCharacters = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Oops something went wrong:', error);
      throw error;
    }
  }
}
