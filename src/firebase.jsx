// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3dLOMpii5x_HUveXiOYWxm8iDAcfwWGI",
    authDomain: "movies-library-977a3.firebaseapp.com",
    projectId: "movies-library-977a3",
    storageBucket: "movies-library-977a3.appspot.com",
    messagingSenderId: "72192184344",
    appId: "1:72192184344:web:4d654bcf2e9d9799ba736d",
    measurementId: "G-KDYBS8J2B3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);