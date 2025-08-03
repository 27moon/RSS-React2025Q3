import { render } from '@testing-library/react';
import ContextProvider from '../context/contextProvider';

describe('ContextProvider', () => {
  it('Gets theme from LS', () => {
    localStorage.setItem('theme27moon', 'dark');

    const result = render(
      <ContextProvider>
        <div>some content as first child</div>
      </ContextProvider>
    );

    expect(result.container.firstChild).toHaveClass('dark');
  });
});
