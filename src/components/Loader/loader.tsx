import load from '/load.gif';
import './loader.css';

export function Loader() {
  return (
    <div data-testid="loader">
      <img src={load} alt="loading" className="load" />
    </div>
  );
}
