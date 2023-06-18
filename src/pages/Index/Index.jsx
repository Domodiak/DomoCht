import { Helmet } from "react-helmet";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import FirebaseContext from "../../context/firebaseContext";

export default function Index() {
    const { auth } = useContext(FirebaseContext)

    function handleClick() {
        console.log("sign out")
        signOut(auth)
    }
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    useEffect(() => {
        if(!user) {
            navigate("/login/")   
        }
    }, [ user, navigate ])

    return(
        <>
            <Helmet>
                <title>DomoCht - Index</title>
            </Helmet>
            <div>
                <div>Hello {user ? user.userData.username : ""}!</div>
                <button onClick={handleClick}>Log out</button>
                <button onClick={() => { navigate("/new-server/")}}>Make a server!</button>
                { Object.values(user ? user.serverData : {}).map((value, index) => (
                    <div key={index}>
                        <a href={`/server/${Object.keys(user.serverData)[index]}/channelID`}>{value.name}</a>
                    </div>
                )) }
            </div>
        </>
    )
}