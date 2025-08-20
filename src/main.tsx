import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';

import './colors.css';

createRoot(
  document.querySelector('#root') || document.createElement('div')
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
