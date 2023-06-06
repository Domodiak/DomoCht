import { useEffect, useRef, useState } from "react";
import { collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useUser() {
    const auth = getAuth()
    const firestore = getFirestore()
    const [ loading, setLoading ] = useState(true)
    var user = useRef()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            if(_user) {
                const uid = _user.uid
                const usernameQuery = query(collection(firestore, "usernames"), where("uid", "==", uid), limit(1))
                getDocs(usernameQuery)
                .then((snapshot) => {
                    if(!snapshot.empty) {
                      const username = snapshot.docs[0].id
                      user.current = { user: _user, username: username }
                    }
                })
                .finally(() => {
                    unsubscribe()
                    setLoading(false)
                })
            } else {
                unsubscribe()
                setLoading(false)
            }
        })
        return unsubscribe
    })

    return [ loading, user.current ]
}