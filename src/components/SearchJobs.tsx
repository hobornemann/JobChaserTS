import { useRef } from 'react';
import styles from './Search.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateAllJobs, updateCurrentJobs, fetchJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'
import ToggleButton from './ToggleButton';



function SearchJobs() {

    // Non-Redux Functions and variables
    const searchButton = useRef<HTMLButtonElement>(null);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission

            if(searchButton.current){
                searchButton.current.click(); // Trigger button click
            }
        }
    }

    // Convert string to filter array



    //Local states
    /* const [newCurrentSkillsFilters, setNewCurrentSkillsFilters] = useState<string[]>([])
    const [newCurrentSkillsOperand, setNewCurrentSkillsOperand] = useState<string>("OR") 
    const [newCurrentLocationFilters, setNewCurrentLocationFilters] = useState<string[]>([]) */
    
    const [currentSkillsString, setCurrentSkillsString] = useState<string>('')
    const [currentLocationsString, setCurrentLocationsString] = useState<string>('')

    // Redux - hämta från globala state
    const {currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters, currentSkillsOperand, currentJobs, allJobs } : {currentLocationFilters: string[], allLocationFilters: string[] , currentSkillsFilters: string[], allSkillsFilters: string[], currentSkillsOperand: string, currentJobs: Job[], allJobs: Job[] } = useSelector((state: RootState) => state.searchJobs.value)  // TODO: counter ?

    // Redux - dispatch för att dispatcha actions
    const dispatch = useDispatch<AppDispatch>();

    // Redux - actions
   const handleFetchJobs = () => {
        let newUrlEndpoint = 'https://jobsearch.api.jobtechdev.se/search?q='
                
        currentSkillsFilters.map(skillsFilter => {
        newUrlEndpoint += `${skillsFilter}%20`
        })
        currentLocationFilters.map(locationFilter => {
        newUrlEndpoint += `${locationFilter}%20`
        })
        newUrlEndpoint  = newUrlEndpoint.slice(0, -3);  // excluding the last '%20' from the urlEndpoint
        
        const newAllJobsData: Job[] = dispatch(fetchJobs({ urlEndpoint: newUrlEndpoint }));  
        dispatch(updateAllJobs(newAllJobsData))
   }

    const handleFilterJobs = () => {
        if(currentSkillsOperand === "OR"){
            const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => currentSkillsFilters.includes(job.description.text!))
            const newCurrentJobs: Job[] = currentJobsFilteredBySkills.filter(job => currentLocationFilters.includes(job.description.text!))
            dispatch(updateCurrentJobs(newCurrentJobs))
        } else if (currentSkillsOperand === "AND"){
            const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => {
              return currentSkillsFilters.every(filterValue => job.description.text!.includes(filterValue)); 
            })
            const newCurrentJobs: Job[] = currentJobsFilteredBySkills.filter(job => currentLocationFilters.includes(job.description.text!))
            dispatch(updateCurrentJobs(newCurrentJobs))
        } else {
            console.log("Error: CurrentSkillsOperand is not working");
            throw new Error
        } 
    }

    const handleSearchJobs = () => {

        // 1. Check if data needs to be fetched from external server
        function doesMainArrayContainAllElementsOfSubArray(mainArray: string[], subArray: string[]) {
            return subArray.every(item => mainArray.includes(item));
        }

        const allSkillsFiltersContainCurrentSkillsFilters = doesMainArrayContainAllElementsOfSubArray(allSkillsFilters, currentSkillsFilters)
        const allLocationFiltersContainCurrentLocationFilters = doesMainArrayContainAllElementsOfSubArray(allLocationFilters, currentLocationFilters)
        
        if (!(allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters)) {
            handleFetchJobs()
        } 
        handleFilterJobs()
    }


    const handleClearAllFilters = () => {
        // TODO:
    }




    return (
        <div className={styles.search}>
            <label className={styles.searchIconAndInput}>
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                Sökord för jobbet:
                <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex: Javascript, React, Vue"}
                    value={currentSkillsString}
                    // onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            </label>
            {/* <ToggleButton > */}

            <label className={styles.searchIconAndInput}>
                Ort(er):
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex:  Stockholm, Uppsala"}
                    value={currentLocationsString}
                    //onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            </label>
            <div className={styles.buttons}>
                <button ref={searchButton} className={styles.searchButton} onClick={handleSearchJobs}>Sök</button>
                <button className={styles.searchButton} onClick={handleClearAllFilters}>Nollställ alla sökord</button>
            </div>
        </div>
    );
}

export default SearchJobs;


/* 
 <label className={styles.searchIconAndInput}>
                <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} />
                <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Write your search term(s) here"}
                    value={searchTerm}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            </label>

*/

/* 

/*     const handleRequestLoan = () => {
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
    } */


   /*  const handleAddLocationFilters = () => {
    dispatch(addLocationFilters());
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
    }  */


/* type SearchProps = {
    searchTerm: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
    onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  }; */

 /* 
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
