import JobsList from './JobsList'
import Feedback from './Feedback'

export default Main 




function Main ({jobs, feedback}){

    return(
        <>
            {(jobs.length>0) && 
                <JobsList 
                    key="1"
                    jobs={jobs}
                />  
            }  
            {feedback && <Feedback feedback={feedback} />}
        </>
    )
}