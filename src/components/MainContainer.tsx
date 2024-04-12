import JobsList from './JobsList'
import Feedback from './Feedback'
import Job from '../types/Job'

 


type MainProps = {
    jobs: Job[];
    feedback: string;
  }

function MainContainer ({jobs, feedback}: MainProps){

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

export default MainContainer