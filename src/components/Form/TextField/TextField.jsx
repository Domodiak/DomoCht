import styles from "../Form.module.scss"

export default function TextField({ placeholder, name, type, width, onInput }) {
    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input name={name} type={type} className={styles.textField} onInput={(e) => {onInput(name, e)}}/>
        </div>
    )
}