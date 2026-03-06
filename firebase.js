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
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================================
// Firebase Configuration
// ================================
// Replace this with your real Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyAx2PwB0VcQXuY1j_c9uu-Mq6BVIJHKVQo",
    authDomain: "bookmysalon-efe40.firebaseapp.com",
    projectId: "bookmysalon-efe40",
    storageBucket: "bookmysalon-efe40.firebasestorage.app",
    messagingSenderId: "410919574149",
    appId: "1:410919574149:web:12acd805646220e58be7ec"
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
    doc,
    serverTimestamp
};