import styles from "../Form.module.scss"

export default function TextField({ placeholder, value, type, width }) {
    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input type={type} className={styles.textField} />
        </div>
    )
}