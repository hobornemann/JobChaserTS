import { useRef } from 'react';
import styles from './Search.module.css'
export default Search;


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
