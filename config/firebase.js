import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const config = {
    apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId
};

let app;

if (!getApps().length) {
   app = initializeApp(config);
}else {
   app = getApp(); // if already initialized, use that one
}

export const firebaseApp = app;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
