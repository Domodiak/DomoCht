import { useState } from "react"
import styles from "../Form.module.scss"

export default function PasswordField({ placeholder, value, width }) {
    const [ visible, setVisible ] = useState(false)
    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input type={visible ? "text" : "password"} className={[styles.textField, styles.passwordField].join(' ')} />
            <span class={["material-symbols-outlined", styles.iconVisible].join(' ')} onClick={() => {setVisible((prev) => !prev)}} >{visible ? "visibility" : "visibility_off"}</span>
        </div>
    )
}