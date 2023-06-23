import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import styles from "./Login.module.scss"
import { useContext, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import UserContext from "../../context/userContext"
import { useNavigate } from "react-router"
import { signInWithGoogle } from "../../etc/SignInWithGoogle"
import Separator from "../../components/Separator/Separator"
import useFormInputs from "../../etc/useFormInputs"
import FirebaseContext from "../../context/firebaseContext"

export default function Login() {
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const { auth } = useContext(FirebaseContext)
    useEffect(() => {
        if(user) {
            navigate("/")   
        }
    })


    function handleSubmit(e) {
        var email = data["email"] || ""
        var password1 = data["password1"] || ""
        signInWithEmailAndPassword(auth, email, password1)
        .catch((error) => {
            console.log(error.code, error.message)
        })
    }

    const [ data, handleInput ] = useFormInputs()

    return (
        <>
            <Helmet>
                <title>DomoCht - Sign in</title>
            </Helmet>
            <div className={styles.app}>
                <div className={styles.formContainer}>
                    <h1>Welcome!</h1>
                    <Form formClass={styles.registrationForm} onSubmit={handleSubmit} onInput={handleInput} fields={[
                        {
                            ComponentType: "input",
                            name: "email",
                            placeholder: "Email",
                            type: "email",
                            width: "100%",
                        },
                        {
                            ComponentType: "input",
                            name: "password1",
                            placeholder: "Password",
                            type: "text",
                            width: "100%",
                            passwordSwitch: true,
                            typeInvisible: "password",
                        },
                        {
                            ComponentType: "submit",
                            text: "Sign in",
                        }
                    ]} />

                    <Separator>or</Separator>

                    <div className={styles.buttons}>
                        <button onClick={() => { signInWithGoogle(auth) }} className={styles.registerButton}><img className={styles.buttonGoogleLogo} src="/Google.svg" alt=""/>Sign in with Google</button>
                        <button onClick={() => { navigate("/register/") }} className={styles.registerButton}>Sign up</button>
                    </div>
                </div>
            </div>
        </>
    )
}