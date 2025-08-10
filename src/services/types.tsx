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
  info: {
    pages: number;
  };
  results: Character[];
};
