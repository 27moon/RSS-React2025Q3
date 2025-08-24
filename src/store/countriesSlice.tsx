import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countryList } from '../helpers/countries';

export type Country = {
  name: string;
};

type Countries = {
  allCountries: Country[];
  selected: Country | null;
};

const initialState: Countries = {
  allCountries: countryList.map((country) => ({ name: country })),
  selected: null,
};

const countriesSlice = createSlice({
  name: 'countriesSlice',
  initialState,
  reducers: {
    selectCountry: (state, action: PayloadAction<Country>) => {
      state.selected = action.payload;
    },
  },
});

export const { selectCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
