import { Link } from 'react-router';
import './not-found.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';

export default function NotFound() {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  const { theme } = context;

  return (
    <>
      <section className="no-page">
        <div className="no-page-container">
          <h1>404</h1>
          <p>Oops! Such page does not exist...</p>
          <button className={`go-home-button ${theme}`}>
            <Link to="/">Back to the main page</Link>
          </button>
        </div>
      </section>
    </>
  );
}
