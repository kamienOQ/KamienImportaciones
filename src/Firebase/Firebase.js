import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJu-3VPPHsgx8pMJTffmwYb9RXoXkh_jE",
    authDomain: "project-kamien.firebaseapp.com",
    projectId: "project-kamien",
    storageBucket: "project-kamien.appspot.com",
    messagingSenderId: "237921208573",
    appId: "1:237921208573:web:b18d13984139377091d694"
};
  
// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
