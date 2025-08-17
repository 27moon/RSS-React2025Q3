import Link from 'next/link';
import './about.css';
import '../../components/ThemeButton/themeButton.css';
import ThemeButton from '../../components/ThemeButton/themeButton';

export default function About() {
  return (
    <>
      <div className="wrapper-theme">
        <ThemeButton />
      </div>
      <div className="container">
        <div className="wrapper">
          <p>Find info about Rick and Morty characters.</p>
          <p>Created by 27moon.</p>
          <Link className="nav-link" href="/">
            <button className="btn-about">Back</button>
          </Link>
          <Link href="https://rs.school/courses/reactjs" target="_blank">
            <div className="img-logo"></div>
          </Link>
        </div>
      </div>
    </>
  );
}
