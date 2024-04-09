import styles from './Feedback.module.css'
export default Feedback

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