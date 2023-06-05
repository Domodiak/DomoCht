import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Login.module.scss"
import PasswordField from "../../components/Form/TextField/PasswordField"
import Submit from "../../components/Form/Buttons/Submit"
import { useContext, useEffect, useState } from "react"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import UserContext from "../../context/userContext"
import { useNavigate } from "react-router"
import { signInWithGoogle } from "../../etc/SignInWithGoogle"

export default function Login() {
    const [ data, setData ] = useState({})
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    useEffect(() => {
        if(user) {
            navigate("/")   
        }
    })


    function handleSubmit(e) {
        var email = data["email"] || ""
        var password1 = data["password1"] || ""
        signInWithEmailAndPassword(getAuth(), email, password1)
        .catch((error) => {
            console.log(error.code, error.message)
        })
        .then((userCredential) => {
            console.log(userCredential.user.uid)
        })
    }

    function handleInput(name, event) {
        setData((v) => {v[name] = event.target.value; return v})
    }

    return (
        <>
            <Helmet>
                <title>DomoCht - Sign in</title>
            </Helmet>
            <div className={styles.app}>
                <div className={styles.formContainer}>
                    <h1>Welcome!</h1>
                    <Form formClass={styles.registrationForm} onSubmit={handleSubmit}>
                        <TextField name="email" placeholder="Email" type="email" width="100%" onInput={handleInput} />
                        <PasswordField name="password1" placeholder="Password" width="100%" onInput={handleInput} />
                        <Submit text="Sign in"/>
                    </Form>

                    <div className={styles.separator}>or</div>

                    <div className={styles.buttons}>
                        <button onClick={signInWithGoogle} className={styles.registerButton}><img className={styles.buttonGoogleLogo} src="/Google.svg" alt=""/>Sign in with Google</button>
                        <button className={styles.registerButton}>Sign up</button>
                    </div>
                </div>
            </div>
        </>
    )
}