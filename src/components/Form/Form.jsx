import styles from './Form.module.scss'
import HandleInputContext from '../../context/handleInputContext';
import TextField from './TextField/TextField';
import Submit from './Buttons/Submit';
import { useState } from 'react';

export default function Form({ onSubmit, onInput, formClass, fields, errors }) {
    const classes = [styles.form, formClass]
    const [ fieldsValid, setFieldsValid ] = useState({})

    function setIsValid(name, val) {
        setFieldsValid(prev => {prev[name] = val; return prev})
    }

    function formValid() {
        
        let valid = false

        Object.values(fieldsValid).forEach(v => {
            valid = valid || !v
        });

        return !valid
    }

    console.log(formValid())

    return(
        <form noValidate className={classes.join(' ')} onSubmit={(e) => {e.preventDefault(); if(formValid()) {onSubmit(e)} }}>
            <HandleInputContext.Provider value={onInput}>
                { fields.map((value, index) => {
                    const ComponentType = value.ComponentType
                    if(ComponentType === "input") {
                        const { placeholder, name, type, width, passwordSwitch, typeInvisible, validationFunction, required } = value
                        const error = errors ? errors[name] : null
    
                        return <TextField setIsValid={setIsValid} required={required} key={index} errors={error} placeholder={placeholder} name={name} type={type} width={width} passwordSwitch={passwordSwitch} typeInvisible={typeInvisible} validationFunction={validationFunction} />
                    } else if(ComponentType === "submit") {
                        return <Submit key={index} text={value.text}/>
                    } else {
                        return null
                    }
                }) }
            </HandleInputContext.Provider>
        </form>
    )
}