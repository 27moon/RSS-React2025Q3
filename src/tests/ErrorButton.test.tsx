import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorButton } from '../components/ErrorButton/error-button';

describe('ErrorButton', () => {
  it('Throws error when test button is clicked', () => {
    render(<ErrorButton />);
    const buttonError = screen.getByRole('button', { name: /error button/i });

    expect(() => fireEvent.click(buttonError)).toThrowError(
      'Error from ErrorBoundary is shown'
    );
  });
});
