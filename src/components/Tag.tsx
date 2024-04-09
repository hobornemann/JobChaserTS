import styles from './Tag.module.css'

type TagProps = {
    language: string;
}

function Tag({language}:TagProps) {
    return (
        <div className={styles.tag}>
            {language}
        </div>
    );
}

export default Tag