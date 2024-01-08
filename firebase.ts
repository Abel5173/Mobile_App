import { initializeApp, getApp, deleteApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB1s-LeQ6qhpMsclipdPulbtVhXDUmQKe0",
    authDomain: "campus-emergency-app-6b3ad.firebaseapp.com",
    projectId: "campus-emergency-app-6b3ad",
    storageBucket: "campus-emergency-app-6b3ad.appspot.com",
    messagingSenderId: "695342511426",
    appId: "1:695342511426:web:d4aff6dbca81f30f7884db"
};


const app = initializeApp(firebaseConfig); 
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app);
export {db, getAuth };