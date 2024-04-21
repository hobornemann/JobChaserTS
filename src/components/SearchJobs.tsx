import { useRef } from 'react';
import styles from './SearchJobs.module.css'

import { useState } from "react";
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateMaxSearchResultsChosen, updateMessageToUser, updateCurrentJobs, fetchJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts
import Job from '../types/Job'
import { useEffect } from 'react';


function SearchJobs() {

    const dispatch = useDispatch<AppDispatch>();
    // GLOBAL STATES
    const { maxSearchResultsChosen, numberOfHits, currentLocationFilters, currentSkillsFilters } : {maxSearchResultsChosen: number, numberOfHits: number, currentLocationFilters: string[], allLocationFilters: string[], currentSkillsFilters: string[], allSkillsFilters: string[], currentSkillsOperand: string, allJobs: Job[]} = useSelector((state: RootState) => state.searchJobs)  // TODO: counter eller searchJobs?


    // LOCAL STATES  
    const [otherElementsHaveRendered, setOtherElementsHaveRendered] = useState<boolean>(false)
    const [currentSkillsInputString, setCurrentSkillsInputString] = useState<string>('')
    const [currentSkillsOperandChosen, setCurrentSkillsOperandChosen] = useState<LogicOperand>('ELLER')
    const [currentLocationsInputString, setCurrentLocationsInputString] = useState<string>('')
    const maxSearchResultsArray: number[] = [10, 20, 30, 40, 50]
    
   
    // OTHER
    const searchButton = useRef<HTMLButtonElement>(null);
   
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
    }
    


    return (
        <div className={styles.search}>
            <div className={styles.labelInputCombos}>
            <label className={styles.labelAndInput}>
                <span>Sökord: </span>
                <input 
                    id="skillsInput"
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
                    <input 
                        id="locationsInput"
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

 