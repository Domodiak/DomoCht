import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Register.module.scss"
import Submit from "../../components/Form/Buttons/Submit"
import { useContext, useEffect } from "react"
import UserContext from "../../context/userContext"
import { useNavigate } from "react-router"
import { signInWithGoogle } from "../../etc/SignInWithGoogle"
import Separator from "../../components/Separator/Separator"
import { createUser } from "../../etc/user"
import useFormInputs from "../../etc/useFormInputs"
import FirebaseContext from "../../context/firebaseContext"

export default function Register() {
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const { firestore, auth } = useContext(FirebaseContext)
    useEffect(() => {
        if(user) {
            navigate("/")   
        }
    }, [user, navigate])

    const [ data, handleInput ] = useFormInputs()

    function handleSubmit(e) {
        var username = data["username"] || ""
        var email = data["email"] || ""
        var password1 = data["password1"] || ""
        var password2 = data["password2"] || ""
        if(password1 !== password2) return //TODO: add errors
        createUser(firestore, auth, username, email, password1)
    }

    return (
        <>
            <Helmet>
                <title>DomoCht - Registration</title>
            </Helmet>
            <div className={styles.app} data-testid='register'>
                <div className={styles.formContainer}>
                    <h1>Create an account</h1>
                    <Form formClass={styles.registrationForm} onSubmit={handleSubmit} onInput={handleInput} >
                        <TextField name="username" placeholder="Username" type="text" width="30%" />
                        <TextField name="email" placeholder="Email" type="email" width="30%" />
                        <TextField passwordSwitch name="password1" type="text" typeInvisible="password" placeholder="Password" width="100%" />
                        <TextField passwordSwitch name="password2" type="text" typeInvisible="password" placeholder="Confirm Password" width="100%" />
                        <Submit text="Sign up"/>
                    </Form>

                    <Separator>or</Separator>

                    <div className={styles.buttons}>
                        <button onClick={() => { signInWithGoogle(auth) }} className={styles.registerButton}><img className={styles.buttonGoogleLogo} src="/Google.svg" alt=""/>Sign in with Google</button>
                        <button onClick={() => { navigate("/login/") }} className={styles.registerButton}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    )
}