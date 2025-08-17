import GoHomeButton from '../components/GoHomeButton/go-home-button';
import './not-found.css';

export default function NotFound() {
  return (
    <>
      <section className="no-page">
        <div className="no-page-container">
          <h1>404</h1>
          <p>Oops! Such page does not exist...</p>
          <GoHomeButton />
        </div>
      </section>
    </>
  );
}
