import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react';

import styles from '../components/JobsList.module.css'
import JobCard from '../components/JobCard'
import Feedback from '../components/Feedback'

import Job from '../types/Job';
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions
import { updateMessageToUser} from "../store/searchJobsSlice"; // Importera actions från accountSlice.ts




function FavouritesPage() {
   
    const dispatch = useDispatch<AppDispatch>();

    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext && authContext.user !== null;
    console.log(isAuthenticated);
    

    const {favouriteJobs, messageToUser } : {favouriteJobs: Job[], messageToUser: string } = useSelector((state: RootState) =>  state.searchJobs)  // 
    
    if(favouriteJobs.length === 0){
        dispatch(updateMessageToUser("Du har inte sparat några favoriter ännu. Gå till sidan 'Sök jobb' för att fortsätta."))
    }

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