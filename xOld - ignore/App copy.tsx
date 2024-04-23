/* import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
//import {User} from 'firebase/auth'
import { AuthContext } from '../src/contexts/AuthContext';

import HomePage from '../src/pages/HomePage'; 
import SignInPage from '../src/pages/SignInPage';
import SignUpPage from '../src/pages/SignUpPage';
import Dashboard from '../src/pages/Dashboard'

import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import './App.css'

import Header from '../src/components/Header';
import Job from '../src/types/Job'



function ProtectedRoute() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}



function App(): JSX.Element {

  const authContext = useContext(AuthContext);
  console.log("authContext: ", authContext);
  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Additional actions after sign out, such as redirecting to another page  TODO:
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };


  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [jobs, setJobs] = useState<Job[]>([]) 
  const [feedback, setFeedback] = useState<string>('Loading data...')
  const [searchTerm, setSearchTerm] = useState<string>('')


  useEffect(() => {
    // Denna kod kommer köras efter mount (initiala renderingen)
    const fetchJobs = async (searchTerm: string) => {
      try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          // TODO: limit=100
          // const httpUrl = `${'https://jobsearch.api.jobtechdev.se/search?q='}${searchTerm}&limit=100`;
          //console.log("httpUrl: ",httpUrl); 
          
          const response = await fetch(`${'https://jobsearch.api.jobtechdev.se/search?q='}${searchTerm}&limit=100`);  // 'https://jobsearch.api.jobtechdev.se/search?q=react'
          console.log('response: ',response)
          if (!response.ok) {
            setFeedback("The jobs list cannot be loaded. Please try again later.")
            throw new Error('Failed to fetch');
          }
          const jobsObjectFromFetch = await response.json();
          const jobsFromFetch = jobsObjectFromFetch.hits;
          console.log('jobsFromFetch:',jobsFromFetch);
          (jobsFromFetch.length === 0) ? setFeedback('No jobs available') : setFeedback('')
          setAllJobs(jobsFromFetch);
          setJobs(jobsFromFetch); 
          return jobsFromFetch
      } catch (error: unknown) {
        console.log(error);
        console.error('Error fetching jobs');
      }
    
    };
    fetchJobs(searchTerm);
  }, [searchTerm]);   // dependency-array inkluderas så att funtionen bara körs vid mount 



  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchTerm(e.target.value)  //TODO: Om inte en ny fetch ska triggas vid varje bokstav som skrivs, så måste man skapa en tempSearchTerm-variabel som uppdateras av handleChange, medan handleSearch uppdaterar setSearchTerm med tempSearchTerm-värdet. 
  }


  function handleSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    setFeedback('')
    // setSearchTerm(e.target.value) 
    // TODO:  Q: NÄR SKA SEARCH TRIGGAS? DIREKT NÄR MAN SKRIVER I SEARCH-INPUT eller först när man trycker på SEARCH-Button?
    // TODO: TRIGGA search med hjälp av searchTerm - fetchJobs(searchTerm)?
    setSearchTerm(searchTerm)  //TODO: checka denna
    const searchedJobs: Job[] = allJobs.filter(job => {
      return searchNestedObject(job, searchTerm)
    })
    setJobs(searchedJobs);
    !searchedJobs.length && setFeedback('Sorry, no jobs matched your search text.')  
  }



  function handleClear(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    setFeedback('')
    // setJobs([])
    setSearchTerm('')
  }

 

  function searchNestedObject(obj: any, searchString: string):boolean {
    return searchRecursive(obj);
    function searchRecursive(obj: any): boolean {
      for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'string' && value.toLowerCase().includes(searchString.toLowerCase())) {
          return true; 
          // Return true if match found in current property value
        } 
        else if (typeof value === 'object' && value !== null) {
          // Check if the property value is a non-null object (i.e. a nested object)
          // If yes, recursively search through it and check if the return value of 
          // the searchRecursive function is true, i.e. that a searchTerm-match has been found in the nested object.  
          if (searchRecursive(value)) {
            return true; 
            // since a searchTerm-match has been found in the nested object, exit the searchNestedObject-function by returning true
          }
        }  
      }
      return false; // Return false if no match found anywhere in object
    }
  } */


 /*  return (
    <BrowserRouter>
      <Header
        searchTerm={searchTerm}
        onChange={handleChange}
        onSearch={handleSearch}
        onClear={handleClear}
        onSignOut={handleSignOut}
        jobs={jobs}
        feedback={feedback} 
      /> 
      <Routes>
          <Route path="/" element={<HomePage jobs={jobs} feedback={feedback}/>}/>  
          <Route path="/*" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/dashboard" element={<ProtectedRoute/>}>
              <Route path="/dashboard" element={<Dashboard/>}/> 
          </Route>
      </Routes>
    </BrowserRouter>
  ); 
}


export default App
*/




/* 
Assets in public directory cannot be imported from JavaScript.
If you intend to import that asset, put the file in the src directory, and use /src/jsons/jobs.json instead of /public/jsons/jobs.json.
If you intend to use the URL of that asset, use /jsons/jobs.json?url.
*/




// RESERV-KOD  - FETCH från JOBS.JSON


  /* function handleSearch(e){
    e.preventDefault();
    setFeedback('')
    const searchedJobs = allJobs.filter(job => {
      return searchNestedObject(job, searchTerm)
    })
    setJobs(searchedJobs);
    !searchedJobs.length && setFeedback('Sorry, no jobs matched your search text.') 
  }
 */

   /* function handleClear(e){
    e.preventDefault();
    setFeedback('')
    setJobs(allJobs)
    setSearchTerm('')
  } */


/* 
  useEffect(() => {
    // Denna kod kommer köras efter mount (initiala renderingen)
    const fetchJobs = async () => {
      try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const response = await fetch('/jobs.json');  // '../src/jsons/jobs.json'   /jsons/jobs.json?url  //'../jsons/jobs.json'  // './jsons/jobs.json'
          if (!response.ok) {
            setFeedback("The jobs list cannot be loaded. Please try again later.")
            throw new Error('Failed to fetch');
          }
          const jobsFromFetch = await response.json();
          (jobsFromFetch.length === 0) ? setFeedback('No jobs available') : setFeedback('')
          setAllJobs(jobsFromFetch);
          setJobs(jobsFromFetch);
      } catch (error) {
        console.log(error.message)
        console.error('Error fetching jobs');
      }
    };
    setTimeout(()=> {
      fetchJobs();
    },1000)  
    // TODO: navigate to HomePage
  }, []);   // dependency-array inkluderas så att funtionen bara körs vid mount 
 */  