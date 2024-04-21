import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react';

import styles from '../components/JobsList.module.css'
import JobCard from '../components/JobCard'
import Feedback from '../components/Feedback'

import { useSelector } from "react-redux"; 
import type { RootState } from "../store/store"; // Importera types från store.ts
import Job from '../types/Job';


function FavouritesPage() {
   

    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext && authContext.user !== null;
    console.log(isAuthenticated);
    

    const {favouriteJobs, messageToUser } : {favouriteJobs: Job[], messageToUser: string } = useSelector((state: RootState) =>  state.searchJobs)  // 
    
    return (
        <>
            {messageToUser && <Feedback feedback={messageToUser} />}
            <section className='jobsListContainer'> 
                <ul className={styles.jobsList}>
                    {favouriteJobs && favouriteJobs.length>0 && 
                        favouriteJobs.map((job) => {
                            return (
                                <JobCard
                                    key={job.id!}
                                    job = {job}
                                />
                            );
                        })
                    }  
                </ul>
            </section>
            <Footer/>
        </>
    )
}
    
export default FavouritesPage