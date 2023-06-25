import { useContext, useState } from "react"
import styles from "../Form.module.scss"
import HandleInputContext from "../../../context/handleInputContext"
import { useEffect } from "react"

export default function TextField({ required, placeholder, name, type, width, passwordSwitch, typeInvisible, validationFunction, setIsValid }) {
    const onInput = useContext(HandleInputContext)
    const [ visible, setVisible ] = useState(!passwordSwitch)
    const [ error, setError ] = useState()

    function isFieldValid(v) {
        let valid = validationFunction ? validationFunction(v) : [true]

        setError(valid[1])

        return valid[0]
    }

    useEffect(() => {
        setIsValid(name, isFieldValid("")) //initialize the field
        // eslint-disable-next-line
    }, [])

    return(
        <div style={{"width": width, "--placeholder": `"${placeholder}"`}} className={styles.inputContainer}>
            <input required={required} name={name} type={visible ? type : typeInvisible} className={styles.textField} onInput={(e) => {setIsValid(name, isFieldValid(e.target.value)); onInput(name, e)}}/>
            {passwordSwitch ? <span className={["material-symbols-outlined", styles.iconVisible].join(' ')} onClick={() => {setVisible((prev) => !prev)}} >{visible ? "visibility" : "visibility_off"}</span> : ""}
            { error ? <p className={styles.error}>{error}</p> : "" }
        </div>
    )
}