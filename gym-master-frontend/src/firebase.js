// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAri8YXZsZl3IEctm4wJPTC9p8WBROA8w0",
    authDomain: "gym-master-ff735.firebaseapp.com",
    projectId: "gym-master-ff735",
    storageBucket: "gym-master-ff735.firebasestorage.app",
    messagingSenderId: "642790537185",
    appId: "1:642790537185:web:ba2b909d26bcfe101804a0",
    measurementId: "G-KHS4180B3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
