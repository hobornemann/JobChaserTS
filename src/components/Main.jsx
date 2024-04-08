import JobsList from '../components/JobsList'
import Feedback from '../components/Feedback'

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