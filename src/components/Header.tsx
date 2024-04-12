import { Link } from 'react-router-dom'
import Search from './SearchJobs'
import styles from './Header.module.css'



type HeaderProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  onSignOut: () => void;
};




function Header({searchTerm, onSearch, onClear, onChange, onSignOut}:HeaderProps): JSX.Element {

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
              <li className={styles.li}>
                  <Link to="/signup">Sign up</Link>
              </li>
              <li className={styles.li}>
                  <Link to="/signin">Sign in</Link>
              </li>
              <li>
                  <button className={styles.signOutButton} onClick={onSignOut}>Sign out</button>
              </li>
            </div>
          </ul>
      </nav>
      <Search 
        searchTerm={searchTerm}
        onChange={onChange}
        onSearch={onSearch}
        onClear={onClear}
      />
    </header>
  );
}

export default Header