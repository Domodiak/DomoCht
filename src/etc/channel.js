import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"
const { v4: uuidv4 } = require("uuid")

export async function createChannel(name, serverID, creator) {
    try {
        const firestore = getFirestore()
        const channelUUID = uuidv4()
        const channelRef = doc(firestore, "channels", channelUUID)
        const serverRef = doc(firestore, "servers", serverID)
        
        setDoc(channelRef, {
            name: name,
            creator: creator.uid,
            server: serverID
        })
    
        updateDoc(serverRef, { channels:arrayUnion(channelUUID) })
    } catch(err) {
        console.error(err)
    }
}

export async function getChannel(channelId) {
    try {
        const firestore = getFirestore()
        const channelRef = doc(firestore, "channel", channelId)
        const channelData = await getDoc(channelRef)
        return channelData.data()
    } catch (err) {
        console.error(err)
        return undefined
    }
}