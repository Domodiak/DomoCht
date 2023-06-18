import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
const { v4: uuidv4 } = require("uuid")

export async function createServer(firestore, name, creator) {
    try {
        const serverUUID = uuidv4()
        const serverRef = doc(firestore, "servers", serverUUID)
        
        setDoc(serverRef, {
            name: name,
            creator: creator.uid,
            members: [],
            channels: []
        })
    
        let success = joinServer(firestore, serverUUID, creator)
        return [success, serverUUID]
    } catch {
        return false
    }
}

export function joinServer(firestore, uuid, user) {
    try {
        const userRef = doc(firestore, "users", user.uid)
        const serverRef = doc(firestore, "servers", uuid)
    
        updateDoc(userRef, { servers: arrayUnion(uuid) })
        updateDoc(serverRef, { members: arrayUnion(user.uid) })
    } catch(err) {
        console.error(err)
        return false
    }
    return true
}

export async function getServers(firestore, userData) {
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