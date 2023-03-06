// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBcUUcISK4q6cn61eP0NchclkBzpSmsjSA",
  authDomain: "fir-test-70883.firebaseapp.com",
  projectId: "fir-test-70883",
  storageBucket: "fir-test-70883.appspot.com",
  messagingSenderId: "611119766719",
  appId: "1:611119766719:web:b08c1c17ae7d6e9b997a0a",
  measurementId: "G-4D6XQ4TKWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export default app;