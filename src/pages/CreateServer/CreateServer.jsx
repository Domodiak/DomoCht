import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import { createServer } from "../../etc/servers";
import styles from "./CreateServer.module.scss";
import Form from "../../components/Form/Form";
import TextField from "../../components/Form/TextField/TextField";
import Submit from "../../components/Form/Buttons/Submit";

export default function CreateServer() {

    const user = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {
            navigate("/login/")
        }
    })

    const [ data, setData ] = useState({})

    function handleInput(name, event) {
        setData((v) => {v[name] = event.target.value; return v})
    }
    
    const handleSubmit = () => {
        if(!data.serverName) return;
        createServer(data.serverName, user.user)
        .then(([success, UUID]) => {
            if(success) {
                console.log(success, UUID)
                navigate(`/server/${UUID}/`)
            }
        })
    }

    return(
        <div className={styles.app}>
            <Form formClass={styles.form} onSubmit={handleSubmit}>
                <TextField name="serverName" placeholder="Server name" type="text" width="100%" onInput={handleInput} /> {/* Yes i had to dedicate a whole page for this one field */}
                <Submit text="Create!"/>
            </Form>
        </div>
    )

}