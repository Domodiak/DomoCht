import { useState } from "react"
import styles from "../Form.module.scss"

export default function PasswordField({ placeholder, name, width, onInput }) {
    const [ visible, setVisible ] = useState(false)
    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input name={name} type={visible ? "text" : "password"} className={[styles.textField, styles.passwordField].join(' ')} onInput={(e) => {onInput(name, e)}} />
            <span className={["material-symbols-outlined", styles.iconVisible].join(' ')} onClick={() => {setVisible((prev) => !prev)}} >{visible ? "visibility" : "visibility_off"}</span>
        </div>
    )
}