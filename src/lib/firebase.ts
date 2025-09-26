import {getApp, getApps, initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz8fAaXWiR4qSMGZvZPPfATQiBOwh8mEQ",
  authDomain: "metting-room-4c1a0.firebaseapp.com",
  projectId: "metting-room-4c1a0",
  storageBucket: "metting-room-4c1a0.firebasestorage.app",
  messagingSenderId: "158584780111",
  appId: "1:158584780111:web:e5c385ef34f3781ed2013a"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);




