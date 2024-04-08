import { useState } from 'react';
import styles from './Accordion.module.css';

export default Accordion;


function Accordion({ children }) {

    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={styles.buttonContainer}>
            <button onClick={toggleAccordion}>
                {expanded ? 'Stäng arbetsbeskrivning' : 'Visa arbetsbeskrivning'}
            </button>
            {expanded && <div>{children}</div>}
        </div>
    );
};



