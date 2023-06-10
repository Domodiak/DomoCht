import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import UserContext from "../../context/userContext"

export default function Channel() {

    const { sid, cid } = useParams()
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    useEffect(() => {
        if(!user) {
            navigate("/login/")   
        }
    }, [ user, navigate ])

    const channels = sid in user.serverData ? user.serverData[sid].channels : undefined

    return (
        <div>
            <div>Hello world!</div>
            <div>You are at {sid}/{cid}, the channels are: { channels ? channels.join(", ") : "None"}</div>
        </div>
    )
}