import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../pages/About/about';
import { MemoryRouter } from 'react-router';
import ContextProvider from '../context/contextProvider';

describe('About', () => {
  it('renders about page', () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </ContextProvider>
    );
    const description = screen.getByText(
      /Find info about Rick and Morty characters./i
    );

    expect(description).toBeInTheDocument();
  });
});
