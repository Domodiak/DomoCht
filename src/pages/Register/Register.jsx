import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Register.module.scss"
import PasswordField from "../../components/Form/TextField/PasswordField"

export default function Register() {
    return (
        <>
            <Helmet>
                <title>DomoCht - Registration</title>
            </Helmet>
            <div className={styles.app}>
                <Form formClass={styles.registrationForm}>
                    <TextField placeholder="Username" type="text" width="30%" />
                    <TextField placeholder="Email" type="email" width="30%" />
                    <PasswordField placeholder="Password" width="100%"/>
                    <PasswordField placeholder="Confirm Password" type="password" width="100%"/>
                </Form>
            </div>
        </>
    )
}