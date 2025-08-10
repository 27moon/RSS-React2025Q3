import type { PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../services/types';
import { createSlice } from '@reduxjs/toolkit';

type SelectedCardsState = {
  selected: Character[];
};

const initialState: SelectedCardsState = {
  selected: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Character>) => {
      if (!state.selected.find((item) => item.id === action.payload.id)) {
        state.selected.push(action.payload);
      }
    },
    removeCard: (state, action: PayloadAction<number>) => {
      state.selected = state.selected.filter(
        (item) => item.id !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selected = [];
    },
  },
});

export const { addCard, removeCard, unselectAll } = selectedCardsSlice.actions;
export default selectedCardsSlice.reducer;
