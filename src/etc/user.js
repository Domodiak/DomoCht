import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"

export function createUser(firestore, auth, username, email, password1) {
    const usernamesRef = collection(firestore, "usernames")
    const usersRef = collection(firestore, "users")

    createUserWithEmailAndPassword(auth, email, password1)
    .then((userCredential) => {
        const uid = userCredential.user.uid
        
        const usernameRef = doc(usernamesRef, username)
        const userRef = doc(usersRef, uid)
        setDoc(usernameRef, { "uid": uid })
        .then(() => {
            setDoc(userRef, {
                username: username,
                servers: []
            })
        })
        .catch((err) => {
            userCredential.user.delete() //well... skill issue
        })
    })
    .catch((error) => {
        console.log("User Creation Error", error.code, error.message)
    })
}