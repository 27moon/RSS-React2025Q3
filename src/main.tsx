import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/error-boundary.tsx';
import ContextProvider from './context/contextProvider.tsx';
import './colors.css';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';

createRoot(
  document.querySelector('#root') || document.createElement('div')
).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ContextProvider>
    </Provider>
  </StrictMode>
);
