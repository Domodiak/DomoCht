import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDr9Xn0gJWngjIGWwxbmLg7Q-Aw8iKsHt8",
    authDomain: "domocht.firebaseapp.com",
    databaseURL: "https://domocht-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "domocht",
    storageBucket: "domocht.appspot.com",
    messagingSenderId: "744420899507",
    appId: "1:744420899507:web:9328b17fd7adb580fa0ec6",
    measurementId: "G-XHK396DF1J"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const firestore = getFirestore()

const firebase = {
    app: app,
    auth: auth,
    firestore: firestore,
};

export default firebase