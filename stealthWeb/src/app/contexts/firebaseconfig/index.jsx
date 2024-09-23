import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAT8QOuwzNbnue6Vt4w15iZ2SPHv4H8x78",
  authDomain: "stealth-267ab.firebaseapp.com",
  projectId: "stealth-267ab",
  storageBucket: "stealth-267ab.appspot.com",
  messagingSenderId: "1096722969896",
  appId: "1:1096722969896:web:43398f7b50c8b12514cc1d",
  measurementId: "G-4N9L78Z3TG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, firestore };

