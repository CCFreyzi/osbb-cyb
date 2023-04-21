import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBk0HCyRB21VSiwSPnU3KK1VwPUGXzcOMU",
    // apiKey: ${process.env.REACT_APP_API_KEY},
    authDomain: "osbb-cyb.firebaseapp.com",
    projectId: "osbb-cyb",
    storageBucket: "osbb-cyb.appspot.com",
    messagingSenderId: "618929973047",
    appId: "1:618929973047:web:1004578d466fbe6cf79cb2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)