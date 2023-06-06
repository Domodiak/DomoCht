import { Helmet } from "react-helmet";
import { signOut, getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";

export default function Index() {
    function handleClick() {
        console.log("sign out")
        signOut(getAuth())
    }
    
    const navigate = useNavigate()
    const { user, username } = useContext(UserContext)
    
    useEffect(() => {
        if(!user) {
            navigate("/login/")   
        }
    })


    return(
        <>
            <Helmet>
                <title>DomoCht - Index</title>
            </Helmet>
            <div>
                <div>Hello {username}!</div>
                <button onClick={handleClick}>Log out</button>
            </div>
        </>
    )
}