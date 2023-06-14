import styles from './Form.module.scss'
import HandleInputContext from '../../context/handleInputContext';

export default function Form({ children, onSubmit, onInput, formClass }) {
    const classes = [styles.form, formClass]
    
    return(
        <form noValidate className={classes.join(' ')} onSubmit={(e) => {e.preventDefault(); onSubmit(e)}}>
            <HandleInputContext.Provider value={onInput}>
                { children }
            </HandleInputContext.Provider>
        </form>
    )
}