import styles from './Form.module.scss'

export default function Form({ children, onSubmit, formClass }) {
    const classes = [styles.form, formClass]
    return(
        <form noValidate className={classes.join(' ')} onSubmit={(e) => {e.preventDefault(); onSubmit(e)}}>
            { children }
        </form>
    )
}