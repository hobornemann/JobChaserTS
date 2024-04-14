import JobsList from './JobsList'
import Feedback from './Feedback'

import { useSelector } from "react-redux"; 
import type { RootState } from "../store/store"; // Importera types från store.ts
const {currentJobs, feedbackToUser } = useSelector((state: RootState) => state.searchJobs.value)  // TODO: counter ? 


function MainContainer (){

    return(
        <>
            {(currentJobs.length>0) && 
                <JobsList 
                    key="1"
                />  
            }  
            {feedbackToUser && <Feedback feedback={feedbackToUser} />}
        </>
    )
}

export default MainContainer