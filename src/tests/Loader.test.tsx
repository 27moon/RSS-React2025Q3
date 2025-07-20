import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '../components/Loader/loader';

describe('Loader', () => {
  it('renders a loading gif', () => {
    render(<Loader />);
    const gif = screen.getByAltText('loading');

    expect(gif).toBeInTheDocument();
  });
});
