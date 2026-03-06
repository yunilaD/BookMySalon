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
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

apiKey: "AIzaSyAx2PwB0VcQXuY1j_c9uu-Mq6BVIJHKVQo",
authDomain: "bookmysalon-efe40.firebaseapp.com",
projectId: "bookmysalon-efe40",
storageBucket: "bookmysalon-efe40.firebasestorage.app",
messagingSenderId: "410919574149",
appId: "1:410919574149:web:12acd805646220e58be7ec"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);


export {
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut,
collection,
addDoc,
getDocs
};
