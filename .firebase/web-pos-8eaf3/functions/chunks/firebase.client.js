import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyADRetfzI6m7SAPnSo1R3K0mWGQ29nA604",
  authDomain: "web-pos-8eaf3.firebaseapp.com",
  projectId: "web-pos-8eaf3",
  storageBucket: "web-pos-8eaf3.appspot.com",
  messagingSenderId: "92708799998",
  appId: "1:92708799998:web:0c0adb5db4e9c810f4acaf"
};
const app = initializeApp(firebaseConfig);
getAuth(app);
getFirestore(app);
