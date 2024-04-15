import { useRef } from 'react';
import styles from './Search.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateMessageToUser, updateAllJobs, updateCurrentJobs, fetchJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'



function SearchJobs() {

    // Non-Redux Functions and variables
    const searchButton = useRef<HTMLButtonElement>(null);

   /*  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission

            if(searchButton.current){
                searchButton.current.click(); // Trigger button click
            }
        }
    } */

    // Convert string to filter array



    // Local states    
    const [currentSkillsInputString, setCurrentSkillsInputString] = useState<string>('')
    const [currentSkillsOperandInputString, setCurrentSkillsOperandInputString] = useState<"AND"|"OR">("OR")
    const [currentLocationsInputString, setCurrentLocationsInputString] = useState<string>('')
    const [isCurrentSkillsOperandToggled, setIsCurrentSkillsOperandToggled] = useState<boolean>(false)

    // Redux - hämta från globala state
    const { currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters, currentSkillsOperand, allJobs } : {currentLocationFilters: string[], allLocationFilters: string[] , currentSkillsFilters: string[], allSkillsFilters: string[], currentSkillsOperand: string, currentJobs: Job[], allJobs: Job[]} = useSelector((state: RootState) => state.searchJobs.value)  // TODO: counter ?

    // Redux - dispatch för att dispatcha actions
    const dispatch = useDispatch<AppDispatch>();




    //  Functions
   const getNewUrlEndpoint = (): string => {
        let newUrlEndpoint = 'https://jobsearch.api.jobtechdev.se/search?q='
                
        currentSkillsFilters.map(skillsFilter => {
        newUrlEndpoint += `${skillsFilter}%20`
        })
        currentLocationFilters.map(locationFilter => {
        newUrlEndpoint += `${locationFilter}%20`
        })
        newUrlEndpoint  = newUrlEndpoint.slice(0, -3);  // excluding the last '%20' from the urlEndpoint
        newUrlEndpoint += '&limit=100'  // TODO:
        return newUrlEndpoint     
   }


    const needToFetchNewJobsData = (): boolean => {
        function doesMainArrayContainAllElementsOfSubArray(mainArray: string[], subArray: string[]) {
            return subArray.every(item => mainArray.includes(item));
        }
        const allSkillsFiltersContainCurrentSkillsFilters = doesMainArrayContainAllElementsOfSubArray(allSkillsFilters, currentSkillsFilters)
        const allLocationFiltersContainCurrentLocationFilters = doesMainArrayContainAllElementsOfSubArray(allLocationFilters, currentLocationFilters)
        const needToFetch = allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters ? false : true; 
        return needToFetch
    }


    const getNewCurrentJobs = (): Job[] => {
        if(currentSkillsOperand === "OR"){
            const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => currentSkillsFilters.includes(job.description.text!))
            const newCurrentJobs: Job[] = currentJobsFilteredBySkills.filter(job => currentLocationFilters.includes(job.description.text!))
            return newCurrentJobs
        } else if (currentSkillsOperand === "AND"){
            const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => {
              return currentSkillsFilters.every(filterValue => job.description.text!.includes(filterValue)); 
            })
            const newCurrentJobs: Job[] = currentJobsFilteredBySkills.filter(job => currentLocationFilters.includes(job.description.text!))
            return newCurrentJobs 
        } else {
            console.log("Error: CurrentSkillsOperand is not working");
            throw new Error
        } 
    }

    function convertSpaceSeparatedStringIntoStringArray (spaceSeparatedString: string): string[] {
        const stringArray: string[] = spaceSeparatedString.split(' ');
        return stringArray
    }


    // Redux - Actions
    const handleSearchJobs = () => {

        // Set the currentSkillsInputString, convert it into an array and update CurrentSkillsFilters 
        setCurrentSkillsInputString(currentSkillsInputString)
        const newCurrentSkillsFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentSkillsInputString)
        dispatch(updateCurrentSkillsFilters(newCurrentSkillsFilters))
       
        // Set the currentLocationsInputString, convert it into an array and update CurrentLocationFilters
        setCurrentLocationsInputString(currentLocationsInputString)
        const newCurrentLocationFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentLocationsInputString)
        dispatch(updateCurrentLocationFilters(newCurrentLocationFilters)) 

        // SkillsOperand Toggle button is handled in separate function below

        // Check if new data needs to be fetched from the external server
        const needToFetch: boolean = needToFetchNewJobsData()

        // Fetch data if necessary and update allJobs array
        if (needToFetch) {
            const newUrlEndpoint = getNewUrlEndpoint()
            const newAllJobs: Job[] = dispatch(fetchJobs({ urlEndpoint: newUrlEndpoint }));  
            dispatch(updateAllJobs(newAllJobs))
        } 
        // Filter allJobs array and update currentJobs
        const newCurrentJobs = getNewCurrentJobs()
        dispatch(updateCurrentJobs(newCurrentJobs))
    }


    const handleToggle = () => {
        setIsCurrentSkillsOperandToggled(!isCurrentSkillsOperandToggled);
        isCurrentSkillsOperandToggled ? setCurrentSkillsOperandInputString("AND") :  setCurrentSkillsOperandInputString("OR")
        dispatch(updateCurrentSkillsOperand(currentSkillsOperandInputString))
    };

    
    const handleClearAllFilters = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setCurrentSkillsInputString('')
        setCurrentSkillsOperandInputString("OR")
        setCurrentLocationsInputString('')
        setIsCurrentSkillsOperandToggled(false)
        dispatch(updateCurrentSkillsFilters([]))
        dispatch(updateCurrentSkillsOperand("OR"))
        dispatch(updateCurrentLocationFilters([]))
        dispatch(updateMessageToUser(""))
        dispatch(updateCurrentJobs([]))
        
        // TODO: Använda en default urlEndpoint och fetcha data? 
    }


    function handleChangeSkillsInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setCurrentSkillsInputString(e.target.value)
    }


    function handleChangeLocationsInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setCurrentLocationsInputString(e.target.value)
    }
    


    return (
        <div className={styles.search}>
            <label className={styles.searchIconAndInput}>
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                Sökord för jobbet:
                <input 
                    id="skillsInput"
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex: Javascript React Vue"}
                    value={currentSkillsInputString}
                    onChange={handleChangeSkillsInput}
                    //onKeyDown={handleKeyDownSkillsString}
                />
            </label>
           
            <button 
                onClick={handleToggle}
                className={styles.searchButton}
                >
                {isCurrentSkillsOperandToggled ? 'Minst 1 sökord' : 'Alla sökord'}
            </button>

            <label className={styles.searchIconAndInput}>
                Ort(er):
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                <input 
                    id="locationsInput"
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex:  Stockholm Uppsala"}
                    value={currentLocationsInputString}
                    onChange={handleChangeLocationsInput}
                    //onKeyDown={handleKeyDownLocationsString}
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
