// src/lib/firebase/firebase.client.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDL_sCfuuwPGHfJvSXM69TFK8q0xNrw5A",
  authDomain: "pos-webproj.firebaseapp.com",
  projectId: "pos-webproj",
  storageBucket: "pos-webproj.firebasestorage.app",
  messagingSenderId: "257091576302",
  appId: "1:257091576302:web:2328d47fb7e52908cf2eff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  


// Initialize services
export const auth = getAuth(app); // Export auth instance
export const db = getFirestore(app); // Initialize and export Firestore


