import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../pages/About/about';
import { MemoryRouter } from 'react-router';

describe('About', () => {
  it('renders about page', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const description = screen.getByText(
      /Find info about Rick and Morty characters./i
    );

    expect(description).toBeInTheDocument();
  });
});
