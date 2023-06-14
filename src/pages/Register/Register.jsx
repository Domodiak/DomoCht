import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Register.module.scss"
import PasswordField from "../../components/Form/TextField/PasswordField"
import Submit from "../../components/Form/Buttons/Submit"
import { useContext, useEffect } from "react"
import UserContext from "../../context/userContext"
import { useNavigate } from "react-router"
import { signInWithGoogle } from "../../etc/SignInWithGoogle"
import Separator from "../../components/Separator/Separator"
import { createUser } from "../../etc/user"
import useFormInputs from "../../etc/useFormInputs"

export default function Register() {
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    useEffect(() => {
        if(user) {
            navigate("/")   
        }
    })

    const [ data, handleInput ] = useFormInputs()

    function handleSubmit(e) {
        var username = data["username"] || ""
        var email = data["email"] || ""
        var password1 = data["password1"] || ""
        var password2 = data["password2"] || ""
        if(password1 !== password2) return //TODO: add errors
        createUser(username, email)
    }

    return (
        <>
            <Helmet>
                <title>DomoCht - Registration</title>
            </Helmet>
            <div className={styles.app}>
                <div className={styles.formContainer}>
                    <h1>Create an account</h1>
                    <Form formClass={styles.registrationForm} onSubmit={handleSubmit} onInput={handleInput} >
                        <TextField  name="username" placeholder="Username" type="text" width="30%" />
                        <TextField name="email" placeholder="Email" type="email" width="30%" />
                        <PasswordField name="password1" placeholder="Password" width="100%" />
                        <PasswordField name="password2" placeholder="Confirm Password" type="password" width="100%" />
                        <Submit text="Sign up"/>
                    </Form>

                    <Separator>or</Separator>

                    <div className={styles.buttons}>
                        <button onClick={signInWithGoogle} className={styles.registerButton}><img className={styles.buttonGoogleLogo} src="/Google.svg" alt=""/>Sign in with Google</button>
                        <button onClick={() => { navigate("/login/") }} className={styles.registerButton}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    )
}