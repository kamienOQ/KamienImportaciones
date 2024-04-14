// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKeyMain = import.meta.env.VITE_APP_API_KEY_MAIN;
const authDomainMain = import.meta.env.VITE_APP_API_AUTHDOMAIN_MAIN;
const projectIdMain = import.meta.env.VITE_APP_API_PROJECTID_MAIN;
const storageBucketMain = import.meta.env.VITE_APP_API_STORAGEBUCKET_MAIN;
const messagingSenderIdMain = import.meta.env
  .VITE_APP_API_MESSAGINGSENDERID_MAIN;
const appIdMain = import.meta.env.VITE_APP_API_APPID_MAIN;

const apiKey = import.meta.env.VITE_APP_API_KEY;
const authDomain = import.meta.env.VITE_APP_API_AUTHDOMAIN;
const projectId = import.meta.env.VITE_APP_API_PROJECTID;
const storageBucket = import.meta.env.VITE_APP_API_STORAGEBUCKET;
const messagingSenderId = import.meta.env.VITE_APP_API_MESSAGINGSENDERID;
const appId = import.meta.env.VITE_APP_API_APPID;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: authDomain,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId,
//   appId: appId
// };

// Produccion Firebase configuration
const firebaseConfig = {
  apiKey: apiKeyMain,
  authDomain: authDomainMain,
  projectId: projectIdMain,
  storageBucket: storageBucketMain,
  messagingSenderId: messagingSenderIdMain,
  appId: appIdMain,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage();
