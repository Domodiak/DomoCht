import { Helmet } from "react-helmet";
import { signOut, getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
    })

    return(
        <>
            <Helmet>
                <title>DomoCht - Index</title>
            </Helmet>
            <div>
                <div>Hello World!</div>
                <Link to="/register/">Register</Link>
                <br />
                <Link to="/login/">Log in</Link>
                <br />
                <button onClick={handleClick}>Log out</button>
            </div>
        </>
    )
}