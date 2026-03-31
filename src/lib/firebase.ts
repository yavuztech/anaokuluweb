import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app = hasFirebaseConfig ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

const contentCollection = import.meta.env.VITE_FIREBASE_CONTENT_COLLECTION || 'sites';
const contentDocument = import.meta.env.VITE_FIREBASE_CONTENT_DOCUMENT || 'main';

export const contentDocRef = db ? doc(db, contentCollection, contentDocument) : null;