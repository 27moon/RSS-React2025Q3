import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from './selectedCardsSlice';
import { ApiRTK } from '../services/apiRTK';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [ApiRTK.reducerPath]: ApiRTK.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiRTK.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
