import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UncontrolledForm } from '../components/UncontrolledForm/uncontrolledForm';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('UncontrolledForm', () => {
  const onCloseMock = vi.fn();

  it('renders all required fields', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
