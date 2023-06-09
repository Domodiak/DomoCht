import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { collection, doc, getFirestore, setDoc } from "firebase/firestore"

export function createUser(username, email, password1) {
    const firestore = getFirestore()
    const usernamesRef = collection(firestore, "usernames")
    const usersRef = collection(firestore, "users")

    createUserWithEmailAndPassword(getAuth(), email, password1)
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
        console.log(error.code, error.message)
    })
}