import { useEffect } from "react";
import { collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useReducer } from "react";

export default function useUser() {
    const auth = getAuth()
    const firestore = getFirestore()
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
                const uid = _user.uid
                const usernameQuery = query(collection(firestore, "usernames"), where("uid", "==", uid), limit(1))
                getDocs(usernameQuery)
                .then((snapshot) => {
                    if(!snapshot.empty) {
                        const username = snapshot.docs[0].id
                        userDispatch({ type: "set", data: { user: _user, username: username }})
                    }
                })
            } else {
                userDispatch({ type: "reset" })
            }
        })
        return unsubscribe
    }, [ auth, firestore ])
    return [ userState.loading, userState.user ]
}