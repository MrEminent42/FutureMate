import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, UserInfo, getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

import { QueryDocumentSnapshot, getFirestore } from "firebase/firestore";
import { Intern } from "../types/Intern";
import { atom } from 'jotai';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage()



// const firebaseAtom = atom(firebaseApp);
// const firebaseAuthAtom = atom(getAuth(firebaseApp));
export const usersAtom = atom<QueryDocumentSnapshot<Intern>[]>([]);
