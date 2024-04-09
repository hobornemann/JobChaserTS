import styles from './JobsList.module.css'
import JobCard from './JobCard'


type JobsListProps =  {
    jobs: Job[];
}

type Job = {
    id: string;
    logo_url: string;
    headline: string;
    occupation: {
        label: string;
    };
    employer: {
        name: string;
    };
    employment_type: {
        label: string;
    };
    working_hours_type: {
        label: string;
    };
    workplace_address: {
        city: string;
        street_address: string;
    };
    duration: {
        label: string;
    };
    application_deadline: string;
    application_details: {
        email: string;
    };
    description: {
        text: string;
    };
}

function JobsList({jobs}:JobsListProps) {
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

export default JobsList


