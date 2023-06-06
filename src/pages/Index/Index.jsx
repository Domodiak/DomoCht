import { Helmet } from "react-helmet";
import { signOut, getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router";
import { collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { useState } from "react";

export default function Index() {
    function handleClick() {
        console.log("sign out")
        signOut(getAuth())
    }
    
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [ username, setUsername ] = useState(undefined)
    const firestore = getFirestore()
    const usernamesRef = collection(firestore, "usernames")
    useEffect(() => {
        if(!user) {
            navigate("/login/")   
        } else {
            const userQueryRef = query(usernamesRef, where("uid", "==", user.uid), limit(1))
            getDocs(userQueryRef)
                .then((snapshot) => {
                    if(!snapshot.empty) {
                        setUsername(snapshot.docs[0].id)
                    }
                })
                .catch((reason) => {
                    console.log(reason)
                    setUsername("error fetching username")
                })
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