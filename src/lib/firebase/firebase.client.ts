// src/lib/firebase/firebase.client.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyADRetfzI6m7SAPnSo1R3K0mWGQ29nA604",
  authDomain: "web-pos-8eaf3.firebaseapp.com",
  projectId: "web-pos-8eaf3",
  storageBucket: "web-pos-8eaf3.appspot.com",
  messagingSenderId: "92708799998",
  appId: "1:92708799998:web:0c0adb5db4e9c810f4acaf"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app); // Export auth instance
export const db = getFirestore(app); // Initialize and export Firestore
