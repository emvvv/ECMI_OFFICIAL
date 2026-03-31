import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

// Uses Vite env variables. Add these to your `.env` or `vite` env:
// VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
// VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function signIn(email, password) {
  return _signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  return _signOut(auth);
}

export function onAuthStateChanged(callback) {
  return _onAuthStateChanged(auth, callback);
}

export { auth };
