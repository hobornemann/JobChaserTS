import styles from './JobsList.module.css'
import JobCard from './JobCard'
import Job from '../types/Job'

import { useSelector } from "react-redux"; 
import type { RootState } from "../store/store"; // Importera types från store.ts


function JobsList(): JSX.Element {
    const {currentJobs } = useSelector((state: RootState) => state.searchJobs)  
    
    return (
        <section className='jobsListContainer'> 
            <ul className={styles.jobsList}>
                {currentJobs.length>0 && 
                    currentJobs.map((job: Job) => {
                        return (
                            <JobCard
                                key={job.id!}
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
                                description={job.description.text!}
                            />
                        );
                    })
                }  
            </ul>
        </section>

    );
}

export default JobsList


