import { Link } from 'react-router';
import './about.css';
import '../../components/ThemeButton/themeButton.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import ThemeButton from '../../components/ThemeButton/themeButton';

export default function About() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext must be used within ThemeProvider');
  }

  const { theme } = context;

  return (
    <>
      <div className="wrapper-theme">
        <ThemeButton />
      </div>
      <div className="container">
        <div className="wrapper">
          <p>Find info about Rick and Morty characters.</p>
          <p>Created by 27moon.</p>
          <Link className="nav-link" to={`/`}>
            <button className={`btn-about ${theme}`}>Back</button>
          </Link>
          <Link to="https://rs.school/courses/reactjs" target="_blank">
            <div className="img-logo"></div>
          </Link>
        </div>
      </div>
    </>
  );
}
