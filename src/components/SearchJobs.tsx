import { useRef } from 'react';
import styles from './SearchJobs.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateMaxSearchResultsChosen, updateMessageToUser, updateCurrentJobs, fetchJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
//import { openAccount, closeAccount, deposit, withdraw, requestLoan, payLoan } from "../store/fetchAndFilterSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'
import { useEffect } from 'react';


function SearchJobs() {

    const dispatch = useDispatch<AppDispatch>();
    // GLOBAL STATES
    const { maxSearchResultsChosen, numberOfHits, currentLocationFilters, currentSkillsFilters, currentSkillsOperand } : {maxSearchResultsChosen: number, numberOfHits: number, currentLocationFilters: string[], allLocationFilters: string[], currentSkillsFilters: string[], allSkillsFilters: string[], currentSkillsOperand: string, allJobs: Job[]} = useSelector((state: RootState) => state.searchJobs)  // TODO: counter eller searchJobs?


    // SET INITIAL VALUES OF LOCAL STATE VARIABLES and GLOBAL STATE VARIABLES 


    //console.log("currentSkillsFilters in SearchJobs:",currentSkillsFilters);
    //console.log("currentLocationFilters in SearchJobs:",currentLocationFilters);

/*     function initialiseWithValuesFromLocalStorage () {
        const currentSkillsFiltersUnparsed = localStorage.getItem("currentSkillsFilters");
        if (currentSkillsFiltersUnparsed !== null && currentSkillsFiltersUnparsed !== "undefined") {
            try {
                const currentSkillsFiltersFromLocalStorage = JSON.parse(currentSkillsFiltersUnparsed);
                const currentSkillsInputStringFromLocalStorage = currentSkillsFiltersFromLocalStorage.join(' ');
                setCurrentSkillsInputString(currentSkillsInputStringFromLocalStorage);
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        } */
    

       /*  if(currentLocationFilters.length === 0){
            const currentLocationFiltersUnparsed = localStorage.getItem("currentLocationFilters");
            if(currentLocationFiltersUnparsed){
                currentLocationFiltersFromLocalStorage = JSON.parse(currentLocationFiltersUnparsed)
                currentLocationInputStringFromLocalStorage = currentLocationFiltersFromLocalStorage.join(' ')
                setCurrentLocationsInputString(currentLocationFiltersFromLocalStorage)
            }        
        }
        
        const currentSkillsOperandUnparsed = localStorage.getItem("currentSkillsOperand");
        if(currentSkillsOperandUnparsed){
            currentSkillsOperandFromLocalStorage = JSON.parse(currentSkillsOperandUnparsed)
            setCurrentSkillsOperandChosen(currentSkillsOperandFromLocalStorage as LogicOperand)
        } */
   /*  } */
    

    // UPDATE GLOBAL STATE with VALUES FROM LOCAL STORAGE
   /*  dispatch(updateCurrentSkillsFilters(currentSkillsFiltersFromLocalStorage))
    dispatch(updateCurrentSkillsOperand(currentSkillsOperandFromLocalStorage as LogicOperand))
    dispatch(updateCurrentLocationFilters(currentLocationFiltersFromLocalStorage)) */


      // LOCAL STATES  
    const [otherElementsHaveRendered, setOtherElementsHaveRendered] = useState<boolean>(false)
    const [currentSkillsInputString, setCurrentSkillsInputString] = useState<string>('')
    const [currentSkillsOperandChosen, setCurrentSkillsOperandChosen] = useState<LogicOperand>('ELLER')
    const [currentLocationsInputString, setCurrentLocationsInputString] = useState<string>('')
    const maxSearchResultsArray: number[] = [10, 20, 30, 40, 50]
    
   
    // OTHER
    const searchButton = useRef<HTMLButtonElement>(null);
    /* const skillsInput = useRef<HTMLInputElement>(null)
    const locationsInput = useRef<HTMLInputElement>(null)
    const radioButtonOr = useRef<HTMLInputElement>(null)
    const radioButtonAnd = useRef<HTMLInputElement>(null) */
   
    type LogicOperand = "ELLER" | "OCH"; 

    // INITIALISATION 
    useEffect(() => {
     
        const currentSkillsFiltersUnparsed = localStorage.getItem("currentSkillsFilters");
        if (currentSkillsFiltersUnparsed) {
            try {
                const currentSkillsFiltersFromLocalStorage = JSON.parse(currentSkillsFiltersUnparsed);
                const currentSkillsInputStringFromLocalStorage = currentSkillsFiltersFromLocalStorage.join(' ');
                setCurrentSkillsInputString(currentSkillsInputStringFromLocalStorage);
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        } 
        
        const currentLocationFiltersUnparsed = localStorage.getItem("currentLocationFilters");
        if(currentLocationFiltersUnparsed){
            try{
                const currentLocationFiltersFromLocalStorage = JSON.parse(currentLocationFiltersUnparsed)
                const currentLocationInputStringFromLocalStorage = currentLocationFiltersFromLocalStorage.join(' ')
                setCurrentLocationsInputString(currentLocationInputStringFromLocalStorage)
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        }
        
        const currentSkillsOperandUnparsed = localStorage.getItem("currentSkillsOperand");
        if(currentSkillsOperandUnparsed){
            try{
                const currentSkillsOperandFromLocalStorage = JSON.parse(currentSkillsOperandUnparsed)
                setCurrentSkillsOperandChosen(currentSkillsOperandFromLocalStorage as LogicOperand)
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        } 

        setOtherElementsHaveRendered(true)

    }, [])


/*     useEffect(() => {
        if(skillsInput.current && locationsInput.current && radioButtonOr.current && radioButtonAnd.current){
            initialiseWithValuesFromLocalStorage()
            setOtherElementsHaveRendered(true)
        }
    }, []) */

      useEffect(() => {
        // Trigger the button click event when the component mounts
        if(otherElementsHaveRendered){
            if (searchButton.current) {
                searchButton.current.click();
            }
        }
    }, [otherElementsHaveRendered]); 


    //  HELPER FUNCTIONS
    const getNewUrlEndpoint = (): string => {
            let newUrlEndpoint = 'https://jobsearch.api.jobtechdev.se/search?q='
            console.log("newUrlEndpoint första omgången:",newUrlEndpoint);
            // https://jobsearch.api.jobtechdev.se/search?q=?limit=50
            console.log("newCurrentSkillsFilters:",currentSkillsFilters);
            console.log("newCurrentLocationFilters:",currentLocationFilters);
            
            if((currentSkillsFilters.length > 0) || (currentLocationFilters.length > 0)){
                currentSkillsFilters.map(newSkillsFilter => {
                newUrlEndpoint += `${newSkillsFilter}%20`
                })
                currentLocationFilters.map(newLocationFilter => {
                newUrlEndpoint += `${newLocationFilter}%20`
                })
                if(newUrlEndpoint.slice(-3) ==="%20"){
                    newUrlEndpoint  = newUrlEndpoint.slice(0, -3);  // excluding the last '%20' from the urlEndpoint
                }
            } else {
                newUrlEndpoint += '?'
            }
            console.log("newUrlEndpoint efter ? i getNewUrlEndpoint:",newUrlEndpoint);
            
            newUrlEndpoint += `&limit=${maxSearchResultsChosen}` 
            console.log("newUrlEndpoint i slutet av getNewUrlEndpoint:",newUrlEndpoint);
            return newUrlEndpoint     
    }



    const needToFetchNewJobsData = (): boolean => {
        return true  // TODO:
        //let needToFetch = false
        /* if(!allLocationFilters ){
            needToFetch = true
            return needToFetch
        } */
        /* function doesMainArrayContainAllElementsOfSubArray(mainArray: string[], subArray: string[]) {
            return subArray.every(item => mainArray.includes(item));
        }
        const allSkillsFiltersContainCurrentSkillsFilters = doesMainArrayContainAllElementsOfSubArray(allSkillsFilters, currentSkillsFilters)
        const allLocationFiltersContainCurrentLocationFilters = doesMainArrayContainAllElementsOfSubArray(allLocationFilters, currentLocationFilters)
        needToFetch = allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters ? false : true; 
        console.log("needToFetch:",needToFetch);
        return needToFetch */
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
        const currentSkillsFiltersChosen = convertSpaceSeparatedStringIntoStringArray(e.target.value)
        dispatch(updateCurrentSkillsFilters(currentSkillsFiltersChosen))
        console.log("currentSkillsFiltersChosen:",currentSkillsFiltersChosen)
    }
    
    function handleLocationsInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setCurrentLocationsInputString(e.target.value)      
        const currentLocationFiltersChosen = convertSpaceSeparatedStringIntoStringArray(e.target.value)
        dispatch(updateCurrentLocationFilters(currentLocationFiltersChosen))
        console.log("currentLocationFiltersChosen:",currentLocationFiltersChosen)
    }

    const handleSkillsOperandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as LogicOperand
        setCurrentSkillsOperandChosen(value)
        dispatch(updateCurrentSkillsOperand(value))
        console.log("skillsOperand in handleSkillsOperandChange: ", value);
    }


    function handleBlurSkillsInput(e: React.FocusEvent<HTMLInputElement>){
        e.preventDefault();
        const currenSkillsFiltersChosen: string[] = convertSpaceSeparatedStringIntoStringArray(currentSkillsInputString)
        dispatch(updateCurrentSkillsFilters(currenSkillsFiltersChosen))       
    }
    
    function handleBlurLocationsInput(e: React.FocusEvent<HTMLInputElement>){
        e.preventDefault();
        const currentLocationFiltersChosen = convertSpaceSeparatedStringIntoStringArray(currentLocationsInputString)
        dispatch(updateCurrentLocationFilters(currentLocationFiltersChosen))
    } 


    const handleMaxSearchResultsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        console.log("e.target.value in handleMaxSearchResultsChange",e.target.value);
        const newMaxSearchResultsChosen = Number(e.target.value)
        dispatch(updateMaxSearchResultsChosen(newMaxSearchResultsChosen))
    }

    const handleSearchJobs = () => {

        // Fetch data from external serve (if needed)
        const needToFetch: boolean = needToFetchNewJobsData()



        if (needToFetch) {
            const newUrlEndpoint = getNewUrlEndpoint()
            console.log("newUrlEndpoint in dispatch(fetchJobs()): ",newUrlEndpoint);
            //dispatch(updateCurrentJobs([]))
            dispatch(fetchJobs(newUrlEndpoint));  
        } 

    }

    
    const handleClearAllFilters = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setCurrentSkillsInputString('')
        setCurrentSkillsOperandChosen("ELLER")
        setCurrentLocationsInputString('')
        dispatch(updateCurrentSkillsFilters([]))
        dispatch(updateCurrentSkillsOperand("ELLER"))
        dispatch(updateCurrentLocationFilters([]))
        dispatch(updateMessageToUser(""))
        dispatch(updateCurrentJobs([]))
        // TODO: Använda en default urlEndpoint och fetcha data? 
    }
    


    return (
        <div className={styles.search}>
            <div className={styles.labelInputCombos}>
            <label className={styles.labelAndInput}>
                {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                <span>Sökord: </span>
                <input 
                    id="skillsInput"
                    //ref={skillsInput}
                    type="text" 
                    className={styles.searchInput}
                    placeholder={"Ex: Javascript React Vue"}
                    value={currentSkillsInputString}
                    onChange={handleSkillsInputChange}
                    onBlur={handleBlurSkillsInput}
                />
            </label>
                <label className={styles.labelAndInput}>
                    <span>Orter:</span>
                    {/* <img src="./images/search-icon.svg" alt="" className={styles.searchIcon} /> */}
                    <input 
                        id="locationsInput"
                        //ref={locationsInput}
                        type="text" 
                        className={styles.searchInput}
                        placeholder={"Ex:  Stockholm Uppsala"}
                        value={currentLocationsInputString}
                        onChange={handleLocationsInputChange}
                        onBlur={handleBlurLocationsInput}
                    />
                </label>
            </div>
            
            <div className="searchLogic">
                <select onChange={handleSkillsOperandChange}
                    value={currentSkillsOperandChosen}>
                    {["ELLER","OCH"].map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div> 

           {/*  <div className={styles.radioButtonsForSearchLogic}>
                <label className={styles.radioButtonLabel}>
                    <input
                        type="radio"
                        //ref={radioButtonOr}
                        value="OR"
                        checked={currentSkillsOperandChosen === 'OR'}
                        onChange={handleSkillsOperandChange}
                    />
                    Minst 1 sökord
                </label>

                <label className={styles.radioButtonLabel}>
                    <input
                        type="radio"
                        //ref={radioButtonAnd}
                        value="AND"
                        checked={currentSkillsOperandChosen === 'AND'}
                        onChange={handleSkillsOperandChange}
                    />
                    Alla sökord
                </label>
            </div> */}


            <div className="maxSearchResultsAndHits">
                <select onChange={handleMaxSearchResultsChange}
                    value={maxSearchResultsChosen}>
                    {maxSearchResultsArray.map((number, index) => (
                        <option key={index} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
                <p className="hits">Antal träffar: {numberOfHits}</p>
            </div> 

            <div className={styles.buttons}>
                <button ref={searchButton} className={styles.searchButton} onClick={handleSearchJobs}>Sök</button>
                <button className={styles.searchButton} onClick={handleClearAllFilters}>Nollställ</button>
            </div>
        </div>
    );
}

export default SearchJobs;

 /* const getNewCurrentJobs = (): Job[] => {
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
    } */