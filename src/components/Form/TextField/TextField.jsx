import { useContext, useState } from "react"
import styles from "../Form.module.scss"
import HandleInputContext from "../../../context/handleInputContext"

export default function TextField({ placeholder, name, type, width, passwordSwitch, typeInvisible }) {
    const onInput = useContext(HandleInputContext)
    const [ visible, setVisible ] = useState(!passwordSwitch)
    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input name={name} type={visible ? type : typeInvisible} className={styles.textField} onInput={(e) => {onInput(name, e)}}/>
            {passwordSwitch ? <span className={["material-symbols-outlined", styles.iconVisible].join(' ')} onClick={() => {setVisible((prev) => !prev)}} >{visible ? "visibility" : "visibility_off"}</span> : ""}
        </div>
    )
}