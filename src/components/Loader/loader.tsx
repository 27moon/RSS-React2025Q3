import load from '../../assets/load.gif';
import './loader.css';

export function Loader() {
  return (
    <div>
      <img src={load} alt="loading" className="load" />
    </div>
  );
}
