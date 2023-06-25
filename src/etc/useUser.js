import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useReducer } from "react";
import { getServers } from "./servers";

export default function useUser(firestore, auth) {
    const [ userState, userDispatch ] = useReducer((state, action) => {
        switch(action.type) {
            case "set":
                return { loading: false, user: action.data }
            case "reset":
                return { loading: false, user: null }
            default:
                throw new Error("Unsupported action type")
        }
    }, { loading: true, user: null })
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            if(_user) {
                setTimeout(() => {
                    const uid = _user.uid
                    const userRef = doc(firestore, "users", uid)
                    getDoc(userRef)
                    .then((snapshot) => {
                        if(snapshot.exists()) {
                            const userData = snapshot.data()
                            getServers(firestore, userData)
                            .then((serverData) => {
                                userDispatch({ type: "set", data: { user: _user, userData: userData, serverData: serverData }})
                            })
                        }
                    })

                }, 1000)
            } else {
                userDispatch({ type: "reset" })
            }
        })
        return unsubscribe
    }, [ auth, firestore ])
    return [ userState.loading, userState.user ]
}