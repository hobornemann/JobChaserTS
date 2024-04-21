import JobsList from './JobsList'
import Feedback from './Feedback'

import { useSelector } from "react-redux"; 
import type { RootState } from "../store/store"; // Importera types från store.ts
import Job from '../types/Job';

function MainContainer (){

    const {currentJobs, messageToUser } : {currentJobs: Job[], messageToUser: string } = useSelector((state: RootState) =>  state.searchJobs)  // 
    
    return(
        <>
            {messageToUser && <Feedback feedback={messageToUser} />}
            {(currentJobs.length>0) && 
                <JobsList 
                    key="1"
                    jobs = {currentJobs}
                />  
            }  
        </>
    )
}

export default MainContainer