import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Register.module.scss"

export default function Register() {
    return (
        <>
            <Helmet>
                <title>DomoCht - Registration</title>
            </Helmet>
            <div className={styles.app}>
                <Form formClass={styles.registrationForm}>
                    <TextField placeholder="Username" type="text" />
                </Form>
            </div>
        </>
    )
}