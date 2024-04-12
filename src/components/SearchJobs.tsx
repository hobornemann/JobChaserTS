import { useRef } from 'react';
import styles from './Search.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { searchJobs, addLocationFilters, removeLocationFilters, addSkillsFilters, removeSkillsFilters, updateSkillsOperand, clearAllFilters} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'




type SearchProps = {
    searchTerm: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
    onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  };

function Search({ searchTerm, onSearch, onClear, onChange }: SearchProps) {
    const searchButton = useRef<HTMLButtonElement>(null);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            if(searchButton.current){
                searchButton.current.click(); // Trigger button click
            }
        }
    }


    //Local states
const [currentSkillsFilters, setCurrentSkillsFilters] = useState<string[]>([])
const [currentSkillsOperand, setCurrentSkillsOperand] = useState<string>("OR") 
const [currentLocationsFilters, setCurrentLocationsFilters] = useState<string[]>([])

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

const handleSearchJobs = () => {
  // Dispatcha action för att söka/hämta jobb-annonserna enligt angivna filter. currentSkillsFilters, currentSkillsOperand, currentLocationFilters är argumenten som ingår i payload
  dispatch(searchJobs({ currentSkillsFilters, currentSkillsOperand, currentLocationsFilters }));
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
        <div className={styles.search}>
            <label className={styles.searchIconAndInput}>
                <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} />
                <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Write your search text here"}
                    value={searchTerm}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            </label>
            <div className={styles.buttons}>
                <button ref={searchButton} className={styles.searchButton} onClick={onSearch}>Search</button>
                <button className={styles.searchButton} onClick={onClear}>Clear</button>
            </div>
        </div>
    );
}

export default Search;



/* 


import {useRef} from 'react'
import './styles/search.css'

export default Search

const searchButton = useRef{null}

function Search({searchTerm, onSearch, onClear, onChange}){

    function handleKeyDown (event){
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            searchButton.current.click(); // Trigger button click
        }
    }
    

    return (
        <div className="searchBar">
            <label className="search-icon-and-input">
                <img src="./images/search-icon.svg" alt="" className="search-icon" />
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Write your search text here"
                    value={searchTerm}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            </label>
            <div className="buttons">
                <button ref="searchButton" className='searchBar-button' onClick={onSearch}>Search</button>
                <button className='searchBar-button' onClick={onClear}>Clear</button>
            </div>
        </div>
    );
} */
