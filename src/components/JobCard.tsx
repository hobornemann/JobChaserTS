import { useState, useEffect, useContext } from 'react';
import 'firebase/auth';
import styles from './JobCard.module.css';
import Accordion from './Accordion';
import Job from '../types/Job'

import type { RootState, AppDispatch } from "../store/store"; 
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from '../contexts/AuthContext'
import { updateFavouriteJobs } from '../store/searchJobsSlice';


type JobCardProps = {
    key: string;
    job: Job;
}

function JobCard({job}: JobCardProps){
        
    const [isFavouriteJob, setIsFavouriteJob] = useState<boolean>(false);    
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext && authContext.user !== null;
    const dispatch = useDispatch<AppDispatch>();
    const favouriteJobs: Job[] = useSelector((state: RootState) => state.searchJobs.favouriteJobs);

    useEffect(() => {
        // Check if the job is in the list of favorite jobs
        setIsFavouriteJob(favouriteJobs.some(favouriteJob => favouriteJob.id === job.id));
      }, [favouriteJobs, job.id]);


    const handleSaveFavouriteToggle = () => {
        const updatedFavouriteJobs = isFavouriteJob ? favouriteJobs.filter(favouriteJob => favouriteJob.id !== job.id)
        : [...favouriteJobs, job];
        dispatch(updateFavouriteJobs(updatedFavouriteJobs));
        setIsFavouriteJob(!isFavouriteJob);
    };

    return(
        <li className={styles.jobCard}>
            <div className={styles.jobCardExclJobDescription}>
                <div className={styles.jobAdvertisement}>
                    <h2 className={styles.jobAdvertisementHeading}>{job.headline!}</h2>
                    <div className={styles.jobAdvertisementItems}>
                        {job.employer.name! && <p className={styles.jobCardInfo}><b>Företag:&nbsp;</b> {job.employer.name!}</p>}
                        {job.occupation.label! && <p className={styles.jobCardInfo}> <b>Position:&nbsp;</b> {job.occupation.label!}</p>}
                        {job.employment_type.label! && <p className={styles.jobCardInfo}><b>Anställningstyp:&nbsp;</b> {job.employment_type.label!}</p>}
                        {job.duration.label! && <p className={styles.jobCardInfo}><b>Anställningsform:&nbsp;</b> {job.duration.label!}</p>}
                        {job.working_hours_type.label! && <p className={styles.jobCardInfo}><b>Arbetstid:&nbsp;</b> {job.working_hours_type.label!}</p>}
                        {job.workplace_address.city! && <p className={styles.jobCardInfo}><b>Plats:&nbsp;</b> {job.workplace_address.street_address!}{', '}{job.workplace_address.city!}</p>}
                        {job.application_deadline! && <p className={styles.jobCardInfo}><b>Sista ansökningsdag:&nbsp;</b> {job.application_deadline!}</p>}
                        {job.application_details.email! && <p className={styles.jobCardInfo}><b>Email:&nbsp;</b> {job.application_details.email!}</p>}
                    </div>
                </div>
                <div className={styles.logoAndFavouriteButton}>
                    {job.logo_url! && <img src={job.logo_url!} alt="" className={styles.imgLogo} />}
                    {isAuthenticated && (
                        <button onClick={handleSaveFavouriteToggle} className={styles.favouriteButton}>
                            {isFavouriteJob ? 'Favorit' : 'Spara som favorit'}
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.jobDescription}>
                <Accordion>
                    {job.description.text!.split('\n').map((line, id) => (
                        <p key={id}>{line}</p>
                    ))}
                </Accordion>
                
            </div>
        </li>
    );
}

export default JobCard


