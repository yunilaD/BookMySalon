import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* ---------------- FIREBASE CONFIG ---------------- */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"

};


/* ---------------- INITIALIZE APP ---------------- */

const app = initializeApp(firebaseConfig);


/* ---------------- AUTH ---------------- */

export const auth = getAuth(app);


/* ---------------- FIRESTORE ---------------- */

export const db = getFirestore(app);


/* ---------------- EXPORT AUTH FUNCTIONS ---------------- */

export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};


/* ---------------- EXPORT FIRESTORE HELPERS ---------------- */

export {
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
    getDoc,
    serverTimestamp
};