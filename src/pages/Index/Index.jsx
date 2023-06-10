import { Helmet } from "react-helmet";
import { signOut, getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import { createServer } from "../../etc/servers";

export default function Index() {
    function handleClick() {
        console.log("sign out")
        signOut(getAuth())
    }
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    useEffect(() => {
        if(!user) {
            navigate("/login/")   
        }
    }, [ user, navigate ])

    console.log(user.serverData)

    return(
        <>
            <Helmet>
                <title>DomoCht - Index</title>
            </Helmet>
            <div>
                <div>Hello {user ? user.userData.username : ""}!</div>
                <button onClick={handleClick}>Log out</button>
                <button onClick={() => { createServer("TestServer", user.user) }}>Make a server!</button>
                { Object.values(user.serverData).map((value, index) => (
                    <div key={index}>
                        <a href={`/server/${Object.keys(user.serverData)[index]}/channelID`}>{value.name}</a>
                    </div>
                )) }
            </div>
        </>
    )
}