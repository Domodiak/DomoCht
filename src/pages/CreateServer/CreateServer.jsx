import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import { createServer } from "../../etc/servers";
import styles from "./CreateServer.module.scss";
import Form from "../../components/Form/Form";
import TextField from "../../components/Form/TextField/TextField";
import Submit from "../../components/Form/Buttons/Submit";
import useFormInputs from "../../etc/useFormInputs";
import FirebaseContext from "../../context/firebaseContext";

export default function CreateServer() {

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const { firestore } = useContext(FirebaseContext)

    useEffect(() => {
        if(!user) {
            navigate("/login/")
        }
    })

    const [ data, handleInput ] = useFormInputs()
    
    const handleSubmit = () => {
        if(!data.serverName) return;
        createServer(firestore, data.serverName, user.user)
        .then(([success, UUID]) => {
            if(success) {
                console.log(success, UUID)
                navigate(`/server/${UUID}/`)
            }
        })
    }

    return(
        <div className={styles.app}>
            <Form formClass={styles.form} onSubmit={handleSubmit} onInput={handleInput} >
                <TextField name="serverName" placeholder="Server name" type="text" width="100%" /> {/* Yes i had to dedicate a whole page for this one field */}
                <Submit text="Create!"/>
            </Form>
        </div>
    )

}