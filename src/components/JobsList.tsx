import styles from './JobsList.module.css'
import JobCard from './JobCard'
import Job from '../types/Job'


function JobsList({jobs}:{jobs: Job[]}): JSX.Element {
    
    
    return (
        <section className='jobsListContainer'> 
            <ul className={styles.jobsList}>
                {jobs && jobs.length>0 && 
                    jobs.map((job) => {
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

    );
}

export default JobsList


