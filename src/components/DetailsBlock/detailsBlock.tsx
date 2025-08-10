import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Loader } from '../Loader/loader';
import './detailsBlock.css';
import { ThemeContext } from '../../context/themeContext';
import { useSearchCharacterByIdQuery } from '../../services/apiRTK';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../../services/functions';

export function DetailsBlock() {
  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details');
  const navigate = useNavigate();
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Pagination must be used within ThemeProvider');
  }

  const { theme } = context;

  const {
    data: character,
    error,
    isLoading,
    isFetching,
  } = useSearchCharacterByIdQuery(detailsId ? Number(detailsId) : skipToken);

  const handleCloseShowCard = () => {
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  if (!detailsId) return null;
  if (isLoading || isFetching)
    return (
      <div className="details-block">
        <Loader />
      </div>
    );
  if (error) {
    if ('status' in error && typeof error.status === 'number') {
      return <div>{getErrorMessage(error.status)}</div>;
    }
    return <div>An unexpected error occurred.</div>;
  }
  if (!character) return <div>Character not found.</div>;

  return (
    <div className="details-block" data-testid="details-block">
      <button onClick={handleCloseShowCard} className={`btn-close ${theme}`}>
        Close
      </button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}
