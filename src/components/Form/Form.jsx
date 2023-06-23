import styles from './Form.module.scss'
import HandleInputContext from '../../context/handleInputContext';
import TextField from './TextField/TextField';
import Submit from './Buttons/Submit';

export default function Form({ onSubmit, onInput, formClass, fields, errors }) {
    const classes = [styles.form, formClass]
    
    return(
        <form noValidate className={classes.join(' ')} onSubmit={(e) => {e.preventDefault(); onSubmit(e)}}>
            <HandleInputContext.Provider value={onInput}>
                { fields.map((value, index) => {
                    const ComponentType = value.ComponentType
                    if(ComponentType === "input") {
                        const { placeholder, name, type, width, passwordSwitch, typeInvisible } = value
                        const error = errors ? errors.get(name) : null
    
                        return <TextField key={index} errors={error} placeholder={placeholder} name={name} type={type} width={width} passwordSwitch={passwordSwitch} typeInvisible={typeInvisible} />
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