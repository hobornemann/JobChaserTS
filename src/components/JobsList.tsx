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


 /* passedKey={job.id!}
                                logoUrl={job.logo_url!}
                                headline={job.headline!}
                                occupation={job.occupation.label!}
                                employer={job.employer.name!}
                                employmentType={job.employment_type.label!}
                                workingHoursType={job.working_hours_type.label!}
                                workplaceAddressCity={job.workplace_address.city!}
                                workplaceAddressStreet={job.workplace_address.street_address!}
                                duration={job.duration.label!}
                                applicationDeadline={job.application_deadline!}
                                applicationEmailAddress={job.application_details.email!}
                                description={job.description.text!} */