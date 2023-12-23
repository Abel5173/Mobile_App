import { initializeApp, getApp, deleteApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app'


const firebaseConfig = {
    apiKey: "AIzaSyDTfkPpRXCTKYjRtI1OPsYxG01rHeU7JbQ",
    authDomain: "campus-emergency-app-2a6c0.firebaseapp.com",
    projectId: "campus-emergency-app-2a6c0",
    storageBucket: "campus-emergency-app-2a6c0.appspot.com",
    messagingSenderId: "1048629240458",
    appId: "1:1048629240458:web:3a51fc0ce5d9b21031c373"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore();

export { firebase, getAuth, db, auth, app };