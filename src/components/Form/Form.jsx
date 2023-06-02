import styles from './Form.module.scss'

export default function Form({ children, onSubmit, onError, formClass }) {
    const classes = [styles.form, formClass]
    return(
        <form className={classes.join(' ')}>
            { children }
        </form>
    )
}