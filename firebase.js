// Import Firebase modules
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
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================================
// Firebase Configuration
// ================================
// Replace this with your real Firebase project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};


// ================================
// Initialize Firebase
// ================================
const app = initializeApp(firebaseConfig);


// ================================
// Initialize Services
// ================================
export const auth = getAuth(app);
export const db = getFirestore(app);


// ================================
// Export Auth Functions
// ================================
export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};


// ================================
// Export Firestore Functions
// ================================
export {
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc
};