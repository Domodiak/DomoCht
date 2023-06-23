import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import styles from "./Register.module.scss"
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
        if(password1 !== password2) return
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
                    <Form formClass={styles.registrationForm} onSubmit={handleSubmit} onInput={handleInput} fields={
                        [
                            {
                                ComponentType: "input",
                                name: "username",
                                placeholder: "Username",
                                type: "text",
                                width: "30%"
                            },
                            {
                                ComponentType: "input",
                                name: "email",
                                placeholder: "Email",
                                type: "email",
                                width: "30%"
                            },
                            {
                                ComponentType: "input",
                                name: "password1",
                                placeholder: "Passowrd",
                                type: "text",
                                width: "100%",
                                typeInvisible: "password",
                                passwordSwitch: true
                            },
                            {
                                ComponentType: "input",
                                name: "password2",
                                placeholder: "Confirm Password",
                                type: "text",
                                width: "100%",
                                typeInvisible: "password",
                                passwordSwitch: true
                            },
                            {
                                ComponentType: "submit",
                                text: "Create!"
                            }
                        ]
                    } />

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