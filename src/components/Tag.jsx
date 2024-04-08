import styles from './Tag.module.css'


export default Tag

function Tag({language}) {
    return (
        <div className={styles.tag}>
            {language}
        </div>
    );
}