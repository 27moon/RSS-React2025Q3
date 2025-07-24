import { useState } from 'react';
import './error-button.css';

export function ErrorButton() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error from ErrorBoundary is shown');
  }

  return (
    <button className="error-btn" onClick={() => setError(true)}>
      Error Button
    </button>
  );
}
