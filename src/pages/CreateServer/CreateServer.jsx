import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import { createServer } from "../../etc/servers";
import styles from "./CreateServer.module.scss";
import Form from "../../components/Form/Form";
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
            <Form formClass={styles.form} onSubmit={handleSubmit} onInput={handleInput} fields={ //wish this was typescript but its damn hard to get working properly
                [
                    {
                        ComponentType: "input",
                        name: "serverName",
                        placeholder: "Server name",
                        type: "text",
                        width: "100%"
                    },
                    {
                        ComponentType: "submit",
                        text: "Create!"
                    }
                ]
            } />
        </div>
    )

}