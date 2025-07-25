import { render, screen } from '@testing-library/react';

import { App } from '../App';
import { Main } from '../components/Main/main-section';

describe('App', () => {
  it('Renders header', async () => {
    render(<App />);
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });

  it('Renders main', async () => {
    render(<Main results={[]} loading={false} error={null} />);
    const main = screen.getByTestId(/main/i);

    expect(main).toBeInTheDocument();
  });
});
