import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import NotFound from '../pages/NotFound/not-found';
import ContextProvider from '../context/contextProvider';

describe('NotFound', () => {
  it('Renders not found page', () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </ContextProvider>
    );
    const header = screen.getByText(/404/i);
    const backBtn = screen.getByText(/Back to the main page/i);

    expect(header).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();
  });
});
