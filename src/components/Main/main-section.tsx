import type { Character } from '../../services/api';
import { CardList } from '../CardList/cardList';
import { Loader } from '../Loader/loader';
import { ErrorButton } from '../ErrorButton/error-button';
import { Pagination } from '../Pagination/pagination';
import { Outlet, useSearchParams } from 'react-router';
import './main-section.css';

type MainProps = {
  results: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
};

export function Main({ results, loading, error, totalPages }: MainProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const handleCloseShowCard = () => {
    if (detailsId) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

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
          <div
            className={`left-side ${detailsId ? 'dimmed' : ''}`}
            onClick={handleCloseShowCard}
          >
            <Pagination totalPages={totalPages} />
            <CardList characters={results} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </div>
        </div>
        <ErrorButton />
      </main>
    );
  }
}
