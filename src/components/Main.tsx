import JobsList from './JobsList'
import Feedback from './Feedback'
import Job from '../components/JobsList'

export default Main 


type MainProps = {
    jobs: typeof Job[];
    feedback: string;
  }

function Main ({jobs, feedback}: MainProps){

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