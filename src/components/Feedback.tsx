import styles from './Feedback.module.css'


type FeedbackProps = {
    feedback: string;
  };


function Feedback({feedback}: FeedbackProps) {
    return (
            <div className={styles.feedback}>
                <h3>{feedback}</h3>
            </div>
    );
}

export default Feedback