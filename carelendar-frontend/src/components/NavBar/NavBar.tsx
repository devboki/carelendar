import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        📅 달력
      </Link>
      <Link to="/pets" className={location.pathname === '/pets' ? 'active' : ''}>
        🐶 반려동물 관리
      </Link>
    </nav>
  );
};

export default NavBar;
