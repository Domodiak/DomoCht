import { useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
                const userRef = doc(firestore, "users", uid)
                getDoc(userRef)
                .then((snapshot) => {
                    if(snapshot.exists()) {
                        const userData = snapshot.data()
                        userDispatch({ type: "set", data: { user: _user, userData: userData }})
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