import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCNRO3ga7lauiz60mimDEUjY8KM97-NB6Q",
    authDomain: "pro3-grupo7-tpfinal.firebaseapp.com",
    projectId: "pro3-grupo7-tpfinal",
    storageBucket: "pro3-grupo7-tpfinal.firebasestorage.app",
    messagingSenderId: "1042416803575",
    appId: "1:1042416803575:web:570baf8b837dfc4af3bdf2"
};


app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore(); 