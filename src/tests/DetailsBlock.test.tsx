import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { DetailsBlock } from '../components/DetailsBlock/detailsBlock';
import * as ApiRTK from '../../src/services/apiRTK';
import { item } from './mockData';
import ContextProvider from '../context/contextProvider';

describe('DetailsBlock', () => {
  it('Renders card details', async () => {
    vi.spyOn(ApiRTK, 'useSearchCharacterByIdQuery').mockReturnValue({
      data: item,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={['/?details=2']}>
          <Routes>
            <Route path="/" element={<DetailsBlock />} />
          </Routes>
        </MemoryRouter>
      </ContextProvider>
    );

    const image = await screen.findByAltText(`${item.name}`);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`Species: ${item.species}`)).toBeInTheDocument();
    expect(image).toHaveAttribute('src', item.image);
    expect(screen.getByText(`Gender: ${item.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Origin: ${item.origin.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${item.location.name}`)
    ).toBeInTheDocument();
  });

  it('Renders Loader on isLoading true', () => {
    vi.spyOn(ApiRTK, 'useSearchCharacterByIdQuery').mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<DetailsBlock />} />
          </Routes>
        </MemoryRouter>
      </ContextProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Renders Loader on isFetching is true', () => {
    vi.spyOn(ApiRTK, 'useSearchCharacterByIdQuery').mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isFetching: true,
      refetch: vi.fn(),
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<DetailsBlock />} />
          </Routes>
        </MemoryRouter>
      </ContextProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Clicking refetch button stops caching', () => {
    const refetchMock = vi.fn();

    vi.spyOn(ApiRTK, 'useSearchCharacterByIdQuery').mockReturnValue({
      data: item,
      error: null,
      isLoading: false,
      isFetching: false,
      refetch: refetchMock,
    });

    render(
      <ContextProvider>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<DetailsBlock />} />
          </Routes>
        </MemoryRouter>
      </ContextProvider>
    );

    const button = screen.getByText('refetch');
    fireEvent.click(button);

    expect(refetchMock).toHaveBeenCalled();
  });
});
