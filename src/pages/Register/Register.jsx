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
        //var password2 = data["password2"] || ""

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
                                width: "30%",
                                validationFunction: (v) => {
                                    if(v == null || v === "") {
                                        return [false, ""]
                                    }
                                    if(v.length < 3) {
                                        return [false, "The username should be more than 3 letters long"]
                                    }
                                    if(v.length > 50) {
                                        return [false, "The username should be less than 50 letters long"]
                                    }
                                    return [true]
                                },
                                required: true,
                            },
                            {
                                ComponentType: "input",
                                name: "email",
                                placeholder: "Email",
                                type: "email",
                                width: "30%",
                                validationFunction: (v) => {

                                    if(v == null || v === "") {
                                        return [false]
                                    }

                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    if (!emailRegex.test(v)) {
                                        return [false, "Invalid email format"];
                                    }
                                    return [true];
                                },
                                required: true,
                            },
                            {
                                ComponentType: "input",
                                name: "password1",
                                placeholder: "Password",
                                type: "text",
                                width: "100%",
                                typeInvisible: "password",
                                passwordSwitch: true,
                                validationFunction: (v) => {
                                    if (v == null || v === "") {
                                        return [false, ""];
                                    }
                                    if (v.length < 8) {
                                        return [false, "The password should be at least 8 characters long"];
                                    }
                                    const capitalLetterRegex = /[A-Z]/;
                                    if (!capitalLetterRegex.test(v)) {
                                        return [false, "The password should contain at least one capital letter"];
                                    }
                                    const digitRegex = /\d/;
                                    if (!digitRegex.test(v)) {
                                        return [false, "The password should contain at least one digit"];
                                    }
                                    return [true];
                                },
                                required: true,
                            },
                            {
                                ComponentType: "input",
                                name: "password2",
                                placeholder: "Confirm Password",
                                type: "text",
                                width: "100%",
                                typeInvisible: "password",
                                passwordSwitch: true,
                                validationFunction: (v) => {
                                    if(v == null || v === "") {
                                        return [false]
                                    }

                                    if(v !== data.password1) {
                                        return [false, "Passwords don't match!"]
                                    }

                                    return [true]
                                },
                                required: true
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