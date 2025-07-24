import type { Character } from '../../services/api';
import { CardList } from '../CardList/cardList';
import { Loader } from '../Loader/loader';
import { ErrorButton } from '../ErrorButton/error-button';

type MainProps = {
  results: Character[];
  loading: boolean;
  error: string | null;
};

export function Main({ results, loading, error }: MainProps) {
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
        <CardList characters={results} />
        <ErrorButton />
      </main>
    );
  }
}
