import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary/error-boundary';
import { vi } from 'vitest';

describe('ErrorButton', () => {
  it('Catches and handles JavaScript errors in child components', () => {
    const ThrowError = () => {
      throw new Error('ErrorBoundary error');
    };

    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleMock).toHaveBeenCalled();
    expect(
      screen.getByText('Something went wrong! Try to reload the page.')
    ).toBeInTheDocument();
  });

  it('Renders fallback UI when error occurs', () => {
    const ThrowError = () => {
      throw new Error('ErrorBoundary error');
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    const UI = screen.getByTestId('error-ui');

    expect(UI).toBeInTheDocument();
  });

  it('Logs error to console', () => {
    const ThrowError = () => {
      throw new Error('ErrorBoundary error');
    };

    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleMock).toHaveBeenCalled();
  });
});
