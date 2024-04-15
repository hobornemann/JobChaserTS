import { useRef } from 'react';
import styles from './Search.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateMessageToUser, updateAllJobs, updateCurrentJobs, fetchJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'
import { useEffect } from 'react';


function SearchJobs() {

    // Non-Redux Functions and variables
    const searchButton = useRef<HTMLButtonElement>(null);

    // Local states    
    const [currentSkillsInputString, setCurrentSkillsInputString] = useState<string>('')
    const [currentSkillsOperandInputString, setCurrentSkillsOperandInputString] = useState<"AND"|"OR">("OR")
    const [currentLocationsInputString, setCurrentLocationsInputString] = useState<string>('')
    const [isCurrentSkillsOperandToggled, setIsCurrentSkillsOperandToggled] = useState<boolean>(false)

    // Redux - hämta från globala state
   // const { currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters, currentSkillsOperand, allJobs }  = useSelector((state: RootState) => state.counter.value)  // TODO: counter eller searchJobs?
    const { currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters, currentSkillsOperand, currentJobs, allJobs } : {currentLocationFilters: string[], allLocationFilters: string[], currentSkillsFilters: string[], allSkillsFilters: string[], currentSkillsOperand: string, currentJobs: Job[], allJobs: Job[]} = useSelector((state: RootState) => state.searchJobs)  // TODO: counter eller searchJobs?

    // Redux - dispatch för att dispatcha actions
    const dispatch = useDispatch<AppDispatch>();

    // Trigger a default Search when searchButton has mounted
    useEffect(() => {
        // Trigger the button click event when the component mounts
        if (searchButton.current) {
            searchButton.current.click();
        }
      }, []);


    //  Functions
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
        console.log("currentSkillsOperand: ",currentSkillsOperand);
        console.log("allJobs in getNewCurrentJobs:",allJobs);
        /* const myAllJobs = allJobs
        console.log("myAllJobs:",myAllJobs); */
        
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

        console.log("currentSkillsInputString in Search:",currentSkillsInputString)
        console.log("currentLocationsInputString in Search:",currentLocationsInputString);
        
            
          
     


        // Set the currentLocationsInputString, convert it into an array and update CurrentLocationFilters
        setCurrentLocationsInputString(currentLocationsInputString)
        const newCurrentLocationFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentLocationsInputString)
        dispatch(updateCurrentLocationFilters(newCurrentLocationFilters)) 
        console.log("currentLocationFilters (state) in Search:",currentLocationFilters);

        // SkillsOperand Toggle button is handled in separate function below

        // Check if new data needs to be fetched from the external server
        const needToFetch: boolean = needToFetchNewJobsData()

        if (needToFetch) {
            const newUrlEndpoint = getNewUrlEndpoint()
            const newAllJobs: Job[] = dispatch(fetchJobs(newUrlEndpoint));  
            dispatch(updateAllJobs(newAllJobs))
        } 

        // Filter allJobs array and update currentJobs
        const newCurrentJobs: Job[] = getNewCurrentJobs()
        console.log("newCurrentJobs in handleSearchJobs:",newCurrentJobs);
        
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
        console.log("currentSkillsInputString in Search/handleChangeSkillsInput::",currentSkillsInputString);
    }


    function handleChangeLocationsInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setCurrentLocationsInputString(e.target.value)
        console.log("currentLocationsInputString:",currentLocationsInputString)
    }
    
    function handleBlurSkillsInput(e: React.FocusEvent<HTMLInputElement>){
        e.preventDefault();
        // Set the currentSkillsInputString, convert it into an array and update CurrentSkillsFilters 
        setCurrentSkillsInputString(currentSkillsInputString)
        const newCurrentSkillsFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentSkillsInputString)
        console.log("newCurrentSkillsFilters i handleKeyDownSkillsInput:",newCurrentSkillsFilters);
        dispatch(updateCurrentSkillsFilters(newCurrentSkillsFilters))
        console.log("currentSkillsFilters (state) in Search:",currentSkillsFilters);
    }

    function handleBlurLocationsInput(e: React.FocusEvent<HTMLInputElement>){
        e.preventDefault();
        // Set the currentLocationsInputString, convert it into an array and update CurrentLocationFilters 
        setCurrentLocationsInputString(currentLocationsInputString)
        const newCurrentLocationFilters: string[] = convertSpaceSeparatedStringIntoStringArray(currentLocationsInputString)
        console.log("newCurrentLocationFilters i handleBlurLocationsInput:",newCurrentLocationFilters);
        dispatch(updateCurrentLocationFilters(newCurrentLocationFilters))
        console.log("currentLocationFilters (state) in Search:",currentLocationFilters); 
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
                    onChange={handleChangeSkillsInput}
                    onBlur={handleBlurSkillsInput}
                />
            </label>
           
            <button 
                onClick={handleToggle}
                className={styles.searchButton}
                >
                {isCurrentSkillsOperandToggled ? 'Alla sökord' : 'Minst 1 sökord'}
            </button>

            <label className={styles.searchIconAndInput}>
                Orter:
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                <input 
                    id="locationsInput"
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex:  Stockholm Uppsala"}
                    value={currentLocationsInputString}
                    onChange={handleChangeLocationsInput}
                    onBlur={handleBlurLocationsInput}
                />
            </label>
            <div className={styles.buttons}>
                <button ref={searchButton} className={styles.searchButton} onClick={handleSearchJobs}>Sök</button>
                <button className={styles.searchButton} onClick={handleClearAllFilters}>Nollställ sökord</button>
            </div>
        </div>
    );
}

export default SearchJobs;

