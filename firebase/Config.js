// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =  {
    apiKey: "[REDACTED]",
    authDomain: "[REDACTED]",
    projectId: "[REDACTED]",
    storageBucket: "[REDACTED]",
    messagingSenderId: "[REDACTED]",
    appId: "[REDACTED]"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGES = "messages";


export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
};