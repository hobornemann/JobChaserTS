
//import Tag from './Tag'
import styles from './JobCard.module.css';
import Accordion from './Accordion';

type JobCardProps = {
    logoUrl: string;
    headline: string;
    occupation: string;
    employer: string;
    employmentType: string;
    duration: string;
    workingHoursType: string;
    workplaceAddressCity: string;
    workplaceAddressStreet: string;
    applicationDeadline: string;
    applicationEmailAddress: string;
    description: string;
}

function JobCard({logoUrl, headline, occupation, employer, employmentType, duration, 
    workingHoursType, workplaceAddressCity, workplaceAddressStreet, 
    applicationDeadline, applicationEmailAddress, description}: JobCardProps){
        
    /* let languagesConcat = languages.join(", ")
    let toolsConcat = tools.join(", ")
 */


    return(
        <li className={styles.jobCard}>
            <div className={styles.jobCardExclJobDescription}>
                <div className={styles.jobAdvertisement}>
                    <h2 className={styles.jobAdvertisementHeading}>{headline}</h2>
                    <div className={styles.jobAdvertisementItems}>
                        {employer && <p className={styles.jobCardInfo}><b>Företag:&nbsp;</b> {employer}</p>}
                        {occupation && <p className={styles.jobCardInfo}> <b>Position:&nbsp;</b> {occupation}</p>}
                        {employmentType && <p className={styles.jobCardInfo}><b>Anställningstyp:&nbsp;</b> {employmentType}</p>}
                        {duration && <p className={styles.jobCardInfo}><b>Anställningsform:&nbsp;</b> {duration}</p>}
                        {workingHoursType && <p className={styles.jobCardInfo}><b>Arbetstid:&nbsp;</b> {workingHoursType}</p>}
                        {workplaceAddressCity && <p className={styles.jobCardInfo}><b>Plats:&nbsp;</b> {workplaceAddressStreet}{', '}{workplaceAddressCity}</p>}
                        {applicationDeadline && <p className={styles.jobCardInfo}><b>Sista ansökningsdag:&nbsp;</b> {applicationDeadline}</p>}
                        {applicationEmailAddress && <p className={styles.jobCardInfo}><b>Email:&nbsp;</b> {applicationEmailAddress}</p>}
                    </div>
                </div>
                <div>
                    {logoUrl && <img src={logoUrl} alt="" className="imgRound" />}
                </div>
            </div>
            <div className={styles.jobDescription}>
                <Accordion>
                    {description.split('\n').map((line, id) => (
                        <p key={id}>{line}</p>
                    ))}
                </Accordion>
                
            </div>
        </li>
    );
}

export default JobCard


/* function JobCard({company, logoUrl, position, role, 
    level, postedAt, contract, location, languages, tools}){
        
    let languagesConcat = languages.join(", ")
    let toolsConcat = tools.join(", ")
    return(
        <li className={styles.jobCard}>
            {logoUrl? <img src={logoUrl} alt="" className="imgRound" /> : <img src='./images/jobChaser-default.svg' alt="" className="imgRound" />}
            <div className={styles.jobDescription}>
                <h2 className={styles.jobDescriptionHeading}>{position}</h2>
                <div className={styles.jobDescriptionItems}>
                    {company && <p className={styles.jobCardInfo}><b>Company</b>: {company}</p>}
                    {position && <p className={styles.jobCardInfo}> <b>Position</b>: {position}</p>}
                    {role && <p className={styles.jobCardInfo}><b>Role</b>: {role}</p>}
                    {level && <p className={styles.jobCardInfo}><b>Level</b>: {level}</p>}
                    {postedAt && <p className={styles.jobCardInfo}><b>Posted</b>: {postedAt}</p>}
                    {contract && <p className={styles.jobCardInfo}><b>Contract</b>: {contract}</p>}
                    {location && <p className={styles.jobCardInfo}><b>Location</b>: {location}</p>}
                    {languagesConcat && <p className={styles.jobCardInfo}><b>Languages</b>: {languagesConcat}</p>}
                    {toolsConcat && <p className={styles.jobCardInfo}><b>Tools</b>: {toolsConcat}</p>}
                </div>
            </div>
            {languages && 
                languages.map((language, index) => {
                    return (
                    <Tag
                        key={index}
                        language={language}
                    />
                    );
                })
            }
        </li>
    );
} */