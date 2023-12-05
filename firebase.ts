import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANdBnkhMABnOTjHfh2-GfZ2B0GephOixs",
    authDomain: "campus-emergency-app.firebaseapp.com",
    projectId: "campus-emergency-app",
    storageBucket: "campus-emergency-app.appspot.com",
    messagingSenderId: "1033326228533",
    appId: "1:1033326228533:web:a6d83f779db6b18825ad7c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);