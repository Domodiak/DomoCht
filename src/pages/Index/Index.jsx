import { Helmet } from "react-helmet";
import { signOut, getAuth } from "firebase/auth";

export default function Index() {
    function handleClick() {
        console.log("sign out")
        signOut(getAuth())
    }
    return(
        <>
            <Helmet>
                <title>DomoCht - Index</title>
            </Helmet>
            <div>
                <div>Hello World!</div>
                <a href="/register/">Register</a>
                <button onClick={handleClick}>Log out</button>
            </div>
        </>
    )
}