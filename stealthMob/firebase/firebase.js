// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT8QOuwzNbnue6Vt4w15iZ2SPHv4H8x78",
  authDomain: "stealth-267ab.firebaseapp.com",
  projectId: "stealth-267ab",
  storageBucket: "stealth-267ab.appspot.com",
  messagingSenderId: "1096722969896",
  appId: "1:1096722969896:web:43398f7b50c8b12514cc1d",
  measurementId: "G-4N9L78Z3TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {app,auth};