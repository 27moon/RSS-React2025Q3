import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/error-boundary.tsx';
import ContextProvider from './context/contextProvider.tsx';
import './colors.css';

createRoot(
  document.querySelector('#root') || document.createElement('div')
).render(
  <StrictMode>
    <ContextProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ContextProvider>
  </StrictMode>
);
