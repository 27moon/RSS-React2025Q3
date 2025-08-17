'use client';
import { useContext } from 'react';
import { Loader } from '../Loader/loader';
import './detailsBlock.css';
import { ThemeContext } from '../../context/themeContext';
import { useSearchCharacterByIdQuery } from '../../services/apiRTK';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../../services/functions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

type DetailsBlockProps = {
  id: number;
};

export function DetailsBlock({ id }: DetailsBlockProps) {
  const searchParams = useSearchParams();
  const context = useContext(ThemeContext);
  const router = useRouter();

  if (!context) {
    throw new Error('Pagination must be used within ThemeProvider');
  }

  const { theme } = context;

  const {
    data: character,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useSearchCharacterByIdQuery(id ? Number(id) : skipToken);

  const handleCloseShowCard = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.replace(`?${params.toString()}`);
  };

  if (!id) return null;
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
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
      />
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      <button onClick={refetch}>refetch</button>
    </div>
  );
}
