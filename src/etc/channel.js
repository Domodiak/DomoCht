import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
const { v4: uuidv4 } = require("uuid")

export async function createChannel(firestore, name, serverID, creator) {
    try {
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

export async function getChannel(firestore, channelId) {
    try {
        const channelRef = doc(firestore, "channel", channelId)
        const channelData = await getDoc(channelRef)
        return channelData.data()
    } catch (err) {
        console.error(err)
        return undefined
    }
}