import { Link } from 'react-router-dom'
import SearchJobs from './SearchJobs'
import styles from './Header.module.css'

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom';





interface HeaderProps {
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignOut }) => {

  const location = useLocation();
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.user !== null;

  const showSearch =
    location.pathname !== '/signup' &&
    location.pathname !== '/signin' &&
    location.pathname !== '/favourites';


  return (
    <header className={styles.header}>
      <nav>
          <ul className={styles.navContainer}>
            <Link className={styles.logoLink} to="/">
                <img src="./images/jobChaser-logo.svg" alt="" className={styles.jobChaserLogo}/>
            </Link>
            <div className={styles.normalLinks}>
              <li className={styles.li}>
                  <Link to="/">Search</Link>
              </li>
              {isAuthenticated && (<li className={styles.li}>
                  <Link to="/favourites">Favourites</Link>
              </li>)}
              <li className={styles.li}>
                  <Link to="/signup">Sign up</Link>
              </li>
              <li className={styles.li}>
                  <Link to="/signin">Sign in</Link>
              </li>
              <li>
                  <button className={styles.signOutButton} onClick={onSignOut!}>Sign out</button>
              </li>
            </div>
          </ul>
      </nav>
      {showSearch && <SearchJobs />}
    </header>
  );
}

export default Header