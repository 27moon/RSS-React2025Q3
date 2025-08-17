'use client';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Header } from '../Header/header';
import { Main } from './main-section';
import type { Character } from '../../services/types';

type ClientPageProps = {
  results: Character[];
  totalPages: number;
};

export function MainPage({ results, totalPages }: ClientPageProps) {
  return (
    <Provider store={store}>
      <Header />
      <Main
        results={results}
        loading={false}
        error={null}
        totalPages={totalPages}
      />
    </Provider>
  );
}
