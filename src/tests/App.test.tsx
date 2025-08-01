import { render, screen } from '@testing-library/react';

import { App } from '../App';
import { Main } from '../components/Main/main-section';
import { MemoryRouter } from 'react-router';
import ContextProvider from '../context/contextProvider';

describe('App', () => {
  it('Renders header', async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });

  it('Renders main', async () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <Main results={[]} loading={false} error={null} totalPages={1} />
        </MemoryRouter>
      </ContextProvider>
    );
    const main = screen.getByTestId(/main/i);

    expect(main).toBeInTheDocument();
  });
});
