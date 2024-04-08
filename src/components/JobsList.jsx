import styles from './JobsList.module.css'
import JobCard from './JobCard'


export default JobsList



function JobsList({jobs}) {
    return (
        <section className='jobsListContainer'> 
            <ul className={styles.jobsList}>
                {jobs.length>0 && 
                    jobs.map((job) => {
                        return (
                            <JobCard
                                key={job.id}
                                logoUrl={job.logo_url}
                                headline={job.headline}
                                occupation={job.occupation.label}
                                employer={job.employer.name}
                                employmentType={job.employment_type.label}
                                workingHoursType={job.working_hours_type.label}
                                workplaceAddressCity={job.workplace_address.city}
                                workplaceAddressStreet={job.workplace_address.street_address}
                                duration={job.duration.label}
                                applicationDeadline={job.application_deadline}
                                applicationEmailAddress={job.application_details.email}
                                description={job.description.text}
                            />
                        );
                    })
                }  
            </ul>
        </section>

    );
}

