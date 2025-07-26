import type { ReactElement } from 'react';
import { Link } from 'react-router';
import './about.css';

export default function About(): ReactElement {
  return (
    <>
      <div className="container">
        <div className="wrapper">
          <p>Find info about Rick and Morty characters.</p>
          <p>Created by 27moon.</p>
          <Link className="nav-link" to={`/`}>
            <button>Back</button>
          </Link>
          <Link to="https://rs.school/courses/reactjs" target="_blank">
            <div className="img-logo"></div>
          </Link>
        </div>
      </div>
    </>
  );
}
