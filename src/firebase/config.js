// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAJu-3VPPHsgx8pMJTffmwYb9RXoXkh_jE",
//   authDomain: "project-kamien.firebaseapp.com",
//   projectId: "project-kamien",
//   storageBucket: "project-kamien.appspot.com",
//   messagingSenderId: "237921208573",
//   appId: "1:237921208573:web:b18d13984139377091d694"
// };

// Produccion Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQmUwAf5t9_lYYJZD9IEPuRYzkhFzlbB8",
  authDomain: "project-kamien-main.firebaseapp.com",
  projectId: "project-kamien-main",
  storageBucket: "project-kamien-main.appspot.com",
  messagingSenderId: "89353296900",
  appId: "1:89353296900:web:f9e82eb4c59d960961e951"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage();