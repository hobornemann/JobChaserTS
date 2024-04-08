import styles from './Feedback.module.css'
export default Feedback


function Feedback({feedback}) {
    return (
            <div className={styles.feedback}>
                <h3>{feedback}</h3>
            </div>
    );
}