import { Link } from 'react-router-dom'
import SearchJobs from './SearchJobs'
import styles from './Header.module.css'

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'





/* type HeaderProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  onSignOut: () => void;
}; */




interface HeaderProps {
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignOut }) => {

  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.user !== null;

  return (
    <header className={styles.header}>
      <nav>
          <ul className={styles.navContainer}>
            <Link className={styles.logoLink} to="/">
                <img src="./images/jobChaser-logo.svg" alt="" className={styles.jobChaserLogo}/>
            </Link>
            <div className={styles.normalLinks}>
              <li className={styles.li}>
                  <Link to="/">Home</Link>
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
      <SearchJobs />
    </header>
  );
}

export default Header