import { Helmet } from "react-helmet"
import Form from "../../components/Form/Form"
import TextField from "../../components/Form/TextField/TextField"
import styles from "./Register.module.scss"
import PasswordField from "../../components/Form/TextField/PasswordField"
import Submit from "../../components/Form/Buttons/Submit"
import { useState, useContext, useEffect } from "react"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import UserContext from "../../context/userContext"
import { useNavigate } from "react-router"
import { signInWithGoogle } from "../../etc/SignInWithGoogle"

export default function Register() {

    const navigate = useNavigate()
    const user = useContext(UserContext)
    useEffect(() => {
        if(user) {
            navigate("/")   
        }
    })

    const [ data, setData ] = useState({})

    function handleSubmit(e) {
        //var username = data["username"] || ""
        var email = data["email"] || ""
        var password1 = data["password1"] || ""
        var password2 = data["password2"] || ""
        if(password1 !== password2) return
        createUserWithEmailAndPassword(getAuth(), email, password1)
        .catch((error) => {
            console.log(error.code, error.message)
        })
    }

    function handleInput(name, event) {
        setData((v) => {v[name] = event.target.value; return v})
    }
    return (
        <>
            <Helmet>
                <title>DomoCht - Registration</title>
            </Helmet>
            <div className={styles.app}>
                <div className={styles.formContainer}>
                    <h1>Create an account</h1>
                    <Form formClass={styles.registrationForm} onSubmit={handleSubmit}>
                        <TextField  name="username" placeholder="Username" type="text" width="30%" onInput={handleInput} />
                        <TextField name="email" placeholder="Email" type="email" width="30%" onInput={handleInput} />
                        <PasswordField name="password1" placeholder="Password" width="100%" onInput={handleInput} />
                        <PasswordField name="password2" placeholder="Confirm Password" type="password" width="100%" onInput={handleInput} />
                        <Submit text="Sign up"/>
                    </Form>

                    <div className={styles.separator}>or</div>

                    <div className={styles.buttons}>
                        <button onClick={signInWithGoogle} className={styles.registerButton}><img className={styles.buttonGoogleLogo} src="/Google.svg" alt=""/>Sign in with Google</button>
                        <button className={styles.registerButton}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    )
}