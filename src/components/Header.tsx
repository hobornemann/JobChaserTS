import { Link } from 'react-router-dom'
import Search from './Search'
import styles from './Header.module.css'
import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { , addLocationFilters, removeLocationFilters, addSkillsFilters, removeSkillsFilters, updateSkillsOperand, clearAllFilters} from "../store/fetchAndFilterJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'



type HeaderProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  onSignOut: () => void;
};




function Header({searchTerm, onSearch, onClear, onChange, onSignOut}:HeaderProps): JSX.Element {

//Local states
const [currentSkillsFilter, setCurrentSkillsFilter] = useState<string[]>([])
const [currentSkillsOperand, setCurrentSkillsOperand] = useState<string>("OR") 
const [currentLocationsFilter, setCurrentLocationsFilter] = useState<string[]>([])

// Redux - hämta från globala state
const {messageToUser, balance, loan, loanPurpose, isLoading} = useSelector((state: RootState) => state.fetchAndFilterJobs.value)  // counter ?
// const {isActive, balance, loan, loanPurpose, isLoading} = useSelector((state: RootState) => state.counter.value)

// Redux - dispatch för att dispatcha actions
const dispatch = useDispatch<AppDispatch>();


// Redux - actions

const handleOpenAccount = () => {
  // Dispatcha action för att öppna konto
  dispatch(openAccount());
}

const handleCloseAccount = () => {
  // Dispatcha action för att stänga konto
  dispatch(closeAccount());
}

const handleWithdrawal = () => {
  // Dispatcha action för att göra uttag, beloppet som argument ör payload
  dispatch(withdraw(Number(withdrawalAmount)));
  // Nollställ input
  setWithdrawalAmount("");
} 

const handleDeposit = () => {
  // Dispatcha action för att göra insättning, beloppet och valutan som argument är payload
  dispatch(deposit({ amount: Number(depositAmount), currency }));
  // Nollställ input
  setDepositAmount("");
}

const handleRequestLoan = () => {
  // Dispatcha action för att göra låneansökan, beloppet och syftet som argument är payload
  dispatch(requestLoan({amount: Number(loanAmount), purpose}));
  // Nollställ input
  setLoanAmount("");
  setLoanPurpose("");
}

const handlePayLoan = () => {
  // Dispatcha action för att betala tillbaka lån, beloppet som argument är payload
  dispatch(payLoan(loan));
  // Nollställ input
  setLoanAmount("");
}

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



/* 
import { Link } from 'react-router-dom'
import Search from './Search'
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
*/