import { render, screen } from '@testing-library/react';

import { App } from '../App';
import { Main } from '../components/Main/main-section';
import { MemoryRouter } from 'react-router';
import ContextProvider from '../context/contextProvider';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('App', () => {
  it('Renders header', async () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    );
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });

  it('Renders main', async () => {
    render(
      <Provider store={store}>
        <ContextProvider>
          <MemoryRouter>
            <Main results={[]} loading={false} error={null} totalPages={1} />
          </MemoryRouter>
        </ContextProvider>
      </Provider>
    );
    const main = screen.getByTestId(/main/i);

    expect(main).toBeInTheDocument();
  });
});
