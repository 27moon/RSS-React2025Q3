'use client';
import type { Character } from '../../services/types';
import { CardList } from '../CardList/cardList';
import { Loader } from '../Loader/loader';
import { ErrorButton } from '../ErrorButton/error-button';
import { Pagination } from '../Pagination/pagination';
import { useSearchParams } from 'next/navigation';
import './main-section.css';
import { SelectedItems } from '../SelectedItemsBlock/selectedItemsBlock';

type MainProps = {
  results: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
};

export function Main({ results, loading, error, totalPages }: MainProps) {
  const searchParams = useSearchParams();
  const detailsId = searchParams?.get('details');

  if (error) {
    return (
      <main data-testid="main">
        <div>{error}</div>
        <ErrorButton />
      </main>
    );
  } else if (loading) {
    return (
      <main data-testid="main">
        <Loader />
      </main>
    );
  } else {
    return (
      <main data-testid="main">
        <div className="containers-wrapper">
          <div className={`left-side`}>
            <Pagination totalPages={totalPages} />
            <CardList characters={results} />
          </div>
          {detailsId && (
            <div className="details-panel" onClick={(e) => e.stopPropagation()}>
              {/* <Outlet /> */}
            </div>
          )}
        </div>
        <SelectedItems />
        <ErrorButton />
      </main>
    );
  }
}
