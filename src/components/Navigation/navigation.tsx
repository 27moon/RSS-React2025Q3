import { Link } from 'react-router';
import './navigation.css';

type Props = {
  items: string[];
  className?: string;
  onClick?: () => void;
};

export default function Navigation({ items }: Props) {
  return (
    <>
      <nav className={'nav-menu'}>
        <ul>
          {items.map((item) => (
            <li key={item} className={`li-menu`}>
              <Link className="nav-link" to={`/${item}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
