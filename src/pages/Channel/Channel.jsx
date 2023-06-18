import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import UserContext from "../../context/userContext"
import style from "./Channel.module.scss"
import { getChannel } from "../../etc/channel"
import FirebaseContext from "../../context/firebaseContext"

export default function Channel() {
    const [ channel, setChannel ] = useState()
    const [ loaded, setLoaded ] = useState(false)
    const { firestore } = useContext(FirebaseContext)
    const user = useContext(UserContext)
    const navigate = useNavigate()

    const { sid, cid } = useParams()
    const channels =  user ? (sid in user.serverData ? user.serverData[sid].channels : undefined) : undefined
    
    useEffect(() => {
        getChannel(firestore, cid).then((_channel) => {
            setChannel(_channel)
            setLoaded(true)
        })
    }, [cid, firestore]) //those dependancy array warnings are annoying,,,
    useEffect(() => {
        if(!user) {
            navigate("/login/")
        }
    }, [ user, navigate ])
    useEffect(() => {
        if((!channels || channels.indexOf(cid) === -1 || !channel) && loaded) {
            navigate("/")
        }
    }, [ channel, cid, navigate, channels, loaded ])

    return (
        <div className={style.App} data-testid="channel">
            { loaded ? `You are viewing a channel with name ${channel ? channel.name : "Erorr"}` : "Fetching channel..." }
        </div>
    )
}