import { useContext } from "react"
import styles from "../Form.module.scss"
import HandleInputContext from "../../../context/handleInputContext"

export default function TextField({ placeholder, name, type, width }) {
    const onInput = useContext(HandleInputContext)
    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input name={name} type={type} className={styles.textField} onInput={(e) => {onInput(name, e)}}/>
        </div>
    )
}