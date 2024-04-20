import { useRef } from 'react';
import styles from './SearchJobs.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateMessageToUser, updateCurrentJobs, fetchJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'
import { useEffect } from 'react';


function SearchJobs() {

    // LOCAL STATES    
    const [currentSkillsInputString, setCurrentSkillsInputString] = useState<string>('')
    const [currentSkillsOperandChosen, setCurrentSkillsOperandChosen] = useState<LogicOperand>("OR")
    const [currentLocationsInputString, setCurrentLocationsInputString] = useState<string>('')
    
    // GLOBAL STATES
    const { currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters, currentSkillsOperand, allJobs } : {currentLocationFilters: string[], allLocationFilters: string[], currentSkillsFilters: string[], allSkillsFilters: string[], currentSkillsOperand: string, allJobs: Job[]} = useSelector((state: RootState) => state.searchJobs)  // TODO: counter eller searchJobs?

    // OTHER
    const searchButton = useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    type LogicOperand = "AND" | "OR"; 

    // INITIALISATION 
    useEffect(() => {
        // Trigger the button click event when the component mounts
        if (searchButton.current) {
            searchButton.current.click();
        }
      }, []);


    //  HELPER FUNCTIONS
    const getNewUrlEndpoint = (): string => {
            let newUrlEndpoint = 'https://jobsearch.api.jobtechdev.se/search?q='
            console.log("newUrlEndpoint första omgången:",newUrlEndpoint);
            // https://jobsearch.api.jobtechdev.se/search?q=?limit=50
            console.log("currentSkillsFilters:",currentSkillsFilters);
            console.log("currentLocationFilters:",currentLocationFilters);
            
            if((currentSkillsFilters.length > 0) || (currentLocationFilters.length > 0)){
                currentSkillsFilters.map(skillsFilter => {
                newUrlEndpoint += `${skillsFilter}%20`
                })
                currentLocationFilters.map(locationFilter => {
                newUrlEndpoint += `${locationFilter}%20`
                })
                if(newUrlEndpoint.slice(-3) ==="%20"){
                    newUrlEndpoint  = newUrlEndpoint.slice(0, -3);  // excluding the last '%20' from the urlEndpoint
                }
            } else {
                newUrlEndpoint += '?'
            }
            console.log("newUrlEndpoint efter ? i getNewUrlEndpoint:",newUrlEndpoint);
            
            newUrlEndpoint += '&limit=50'  // TODO: Gör max-antalet valbart för användaren?
            console.log("newUrlEndpoint i slutet av getNewUrlEndpoint:",newUrlEndpoint);
            return newUrlEndpoint     
    }


    const needToFetchNewJobsData = (): boolean => {
        return true  // TODO:
        let needToFetch = false
/*         if(!allLocationFilters ){
            needToFetch = true
            return needToFetch
        } */
        function doesMainArrayContainAllElementsOfSubArray(mainArray: string[], subArray: string[]) {
            return subArray.every(item => mainArray.includes(item));
        }
        const allSkillsFiltersContainCurrentSkillsFilters = doesMainArrayContainAllElementsOfSubArray(allSkillsFilters, currentSkillsFilters)
        const allLocationFiltersContainCurrentLocationFilters = doesMainArrayContainAllElementsOfSubArray(allLocationFilters, currentLocationFilters)
        needToFetch = allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters ? false : true; 
        console.log("needToFetch:",needToFetch);
        return needToFetch
    }


    const getNewCurrentJobs = (): Job[] => {
        console.log("currentSkillsOperand in getNewCurrentJobs: ",currentSkillsOperand);
        console.log("allJobs in getNewCurrentJobs:",allJobs);
        
        if(currentSkillsOperand === "OR"){
            console.log("currentSkillsOperand in getNewCurrentJobs OR: ", currentSkillsOperand);
            //const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => currentSkillsFilters.includes(job.description.text!))
            const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => {
                return currentSkillsFilters.some(filterValue => job.description.text?.toLowerCase()!.includes(filterValue.toLowerCase()));
            });
            console.log("currentJobsFilteredBySkills in in getNewCurrentJobs OR:",currentJobsFilteredBySkills);
            const newCurrentJobs: Job[] = currentJobsFilteredBySkills.filter(job => {
                return currentLocationFilters.some(filterValue => job.description.text?.toLowerCase()!.includes(filterValue.toLowerCase()));
            });
            console.log("newCurrentJobs in OR: ",newCurrentJobs);
            return newCurrentJobs
        
        } else if (currentSkillsOperand === "AND"){
            console.log("currentSkillsOperand in SearchJobs has the value AND: ", currentSkillsOperand);
            const currentJobsFilteredBySkills: Job[] = allJobs.filter(job => {
              return currentSkillsFilters.every(filterValue => job.description.text?.toLowerCase()!.includes(filterValue.toLowerCase())); 
            });
            console.log("currentJobsFilteredBySkills in AND: ",currentJobsFilteredBySkills);
            const newCurrentJobs: Job[] = currentJobsFilteredBySkills.filter(job => currentLocationFilters.includes(job.description.text!))
            console.log("newCurrentJobs in AND: ",newCurrentJobs);
            return newCurrentJobs 
        } else {
            console.log("Error: CurrentSkillsOperand is not working");
            throw new Error
        } 
    }


    function convertSpaceSeparatedStringIntoStringArray (commaOrSpaceSeparatedString: string): string[] {
        const stringWithoutCommas = commaOrSpaceSeparatedString.replace(/,/g, '');
        const stringArray: string[] = stringWithoutCommas.split(' ');
        return stringArray
    }


    // HANDLE EVENTS
    
    function handleSkillsInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setCurrentSkillsInputString(e.target.value)
        console.log("currentSkillsInputString in Search/handleChangeSkillsInput::",currentSkillsInputString);
    }
    
        
   /*  function handleBlurSkillsInput(e: React.FocusEvent<HTMLInputElement>){
        e.preventDefault();
        // Set the currentSkillsInputString, convert it into an array and update CurrentSkillsFilters 
        setCurrentSkillsInputString(currentSkillsInputString)
        const newCurrentSkillsFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentSkillsInputString)
        console.log("newCurrentSkillsFilters i handleKeyDownSkillsInput:",newCurrentSkillsFilters);
        dispatch(updateCurrentSkillsFilters(newCurrentSkillsFilters))
        console.log("currentSkillsFilters (state) in Search:",currentSkillsFilters);
    } */
    
    
    const handleSkillsOperandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as LogicOperand
        setCurrentSkillsOperandChosen(value)
        dispatch(updateCurrentSkillsOperand(currentSkillsOperandChosen))
        //dispatch(updateCurrentSkillsOperand(setCurrentSkillsOperandChosen(value)))

    }


    function handleLocationsInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setCurrentLocationsInputString(e.target.value)
        console.log("currentLocationsInputString:",currentLocationsInputString)
    }
    

/*     function handleBlurLocationsInput(e: React.FocusEvent<HTMLInputElement>){
        e.preventDefault();
        // Set the currentLocationsInputString, convert it into an array and update CurrentLocationFilters 
        setCurrentLocationsInputString(currentLocationsInputString)
        const newCurrentLocationFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentLocationsInputString)
        console.log("newCurrentLocationFilters i handleBlurLocationsInput:",newCurrentLocationFilters);
        dispatch(updateCurrentLocationFilters(newCurrentLocationFilters))
        console.log("currentLocationFilters (state) in Search:",currentLocationFilters); 
    } */


    const handleSearchJobs = () => {

        console.log("currentSkillsInputString in Search:",currentSkillsInputString)
        console.log("currentLocationsInputString in Search:",currentLocationsInputString);
        
        // Update CurrentSkillsFilters
        setCurrentSkillsInputString(currentSkillsInputString)
        const newCurrentSkillsFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentSkillsInputString)
        dispatch(updateCurrentSkillsFilters(newCurrentSkillsFilters))
        console.log("currentSkillsFilters (state) in Search:",currentSkillsFilters);
        
        // Update Current Location Filters 
        setCurrentLocationsInputString(currentLocationsInputString)
        const newCurrentLocationFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentLocationsInputString)
        dispatch(updateCurrentLocationFilters(newCurrentLocationFilters)) 
        console.log("currentLocationFilters (state) in Search:",currentLocationFilters);

        // Fetch data from external serve (if needed)
        const needToFetch: boolean = needToFetchNewJobsData()
        if (needToFetch) {
            const newUrlEndpoint = getNewUrlEndpoint()
            dispatch(fetchJobs(newUrlEndpoint));  
        } 

        // Filter allJobs array and update currentJobs
        const newCurrentJobs: Job[] = getNewCurrentJobs()
        console.log("newCurrentJobs in handleSearchJobs:",newCurrentJobs);
        dispatch(updateCurrentJobs(newCurrentJobs))
    }

    
    const handleClearAllFilters = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setCurrentSkillsInputString('')
        setCurrentSkillsOperandChosen("OR")
        setCurrentLocationsInputString('')
        dispatch(updateCurrentSkillsFilters([]))
        dispatch(updateCurrentSkillsOperand("OR"))
        dispatch(updateCurrentLocationFilters([]))
        dispatch(updateMessageToUser(""))
        dispatch(updateCurrentJobs([]))
        // TODO: Använda en default urlEndpoint och fetcha data? 
    }
    


    return (
        <div className={styles.search}>
            <label className={styles.searchIconAndInput}>
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                Sökord:
                <input 
                    id="skillsInput"
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex: Javascript React Vue"}
                    value={currentSkillsInputString}
                    onChange={handleSkillsInputChange}
                    //onBlur={handleBlurSkillsInput}
                />
            </label>
            <div className={styles.radioButtonsForSearchLogic}>
                <label className={styles.radioButtonLabel}>
                    <input
                    type="radio"
                    value="OR"
                    checked={currentSkillsOperandChosen === 'OR'}
                    onChange={handleSkillsOperandChange}
                    />
                    Minst 1 sökord
                </label>

                <label className={styles.radioButtonLabel}>
                    <input
                    type="radio"
                    value="AND"
                    checked={currentSkillsOperandChosen === 'AND'}
                    onChange={handleSkillsOperandChange}
                    />
                    Alla sökord
                </label>
{/*               <p>Logisk operand: {currentSkillsOperand}</p> */}
                </div>

           {/*  <button 
                onClick={handleToggle}
                className={styles.searchButton}
                >
                {isCurrentSkillsOperandToggled ? 'Alla sökord' : 'Minst 1 sökord'}
            </button> */}

            <label className={styles.searchIconAndInput}>
                Orter:
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                <input 
                    id="locationsInput"
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex:  Stockholm Uppsala"}
                    value={currentLocationsInputString}
                    onChange={handleLocationsInputChange}
                    //onBlur={handleBlurLocationsInput}
                />
            </label>
            <div className={styles.buttons}>
                <button ref={searchButton} className={styles.searchButton} onClick={handleSearchJobs}>Sök</button>
                <button className={styles.searchButton} onClick={handleClearAllFilters}>Nollställ</button>
            </div>
        </div>
    );
}

export default SearchJobs;

