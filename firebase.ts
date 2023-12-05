import { initializeApp } from '@firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyANdBnkhMABnOTjHfh2-GfZ2B0GephOixs",
    authDomain: "campus-emergency-app.firebaseapp.com",
    projectId: "campus-emergency-app",
    storageBucket: "campus-emergency-app.appspot.com",
    messagingSenderId: "1033326228533",
    appId: "1:1033326228533:web:a6d83f779db6b18825ad7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };