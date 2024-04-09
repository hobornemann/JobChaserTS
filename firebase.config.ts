// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from "firebase/auth"
/* import dotenv from 'dotenv'; */

export {auth};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfj1YsD4VVi2qP_AuVItQR2-9un7BsNnE",
  authDomain: "jobchaser-ts.firebaseapp.com",
  projectId: "jobchaser-ts",
  storageBucket: "jobchaser-ts.appspot.com",
  messagingSenderId: "251076174507",
  appId: "1:251076174507:web:5955011c0b8b4de6b94dee",
  measurementId: "G-Z28MZE71M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)