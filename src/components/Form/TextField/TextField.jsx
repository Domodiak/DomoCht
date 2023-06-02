import styles from "../Form.module.scss"

export default function TextField({ placeholder, value, type }) {
    return(
        <input type={type} placeholder={placeholder} className={styles.textField} />
    )
}