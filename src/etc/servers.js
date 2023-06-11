import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"
const { v4: uuidv4 } = require("uuid")

export async function createServer(name, creator) {
    const firestore = getFirestore()
    const serverUUID = uuidv4()
    const serverRef = doc(firestore, "servers", serverUUID)
    
    setDoc(serverRef, {
        name: name,
        creator: creator.uid,
        members: [],
        channels: []
    })

    joinServer(serverUUID, creator)
}

export function joinServer(uuid, user) {
    const firestore = getFirestore()
    const userRef = doc(firestore, "users", user.uid)
    const serverRef = doc(firestore, "servers", uuid)

    updateDoc(userRef, { servers: arrayUnion(uuid) })
    updateDoc(serverRef, { members: arrayUnion(user.uid) })
}

export async function getServers(userData) {
    const firestore = getFirestore()
    const serverIDs = userData.servers
    var servers = {}

    for(var i = 0; i < serverIDs.length; i++) {
        try {
            const serverId = serverIDs[i]
            const serverRef = doc(firestore, "servers", serverId)
            const serverData = await getDoc(serverRef)
            servers[serverId] = serverData.data()
        } catch (err) {
            console.error(err)
        }
    }
    return servers
}