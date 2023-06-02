import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Register.module.scss"

export default function Register() {
    return (
        <div className={styles.app}>
            <Form formClass={styles.registrationForm}>
                <TextField placeholder="Username" type="text" />
            </Form>
        </div>
    )
}