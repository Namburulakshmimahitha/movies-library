// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArQ3N8xFxMMd5v2JcUDjWpviT3qN4QirE",
  authDomain: "movielib-d121c.firebaseapp.com",
  projectId: "movielib-d121c",
  storageBucket: "movielib-d121c.appspot.com",
  messagingSenderId: "742151153670",
  appId: "1:742151153670:web:b07a45bb7ead25f35cbb87",
  measurementId: "G-EPR654706Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db };