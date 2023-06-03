import styles from "../Form.module.scss"

export default function Submit({ text }) {
    return (
        <input type="submit" value={text} className={styles.submit}/>
    )
}