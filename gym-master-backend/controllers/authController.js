import firebase from '../config/firebaseConfig.js';
import axios from 'axios';

const { firestore, auth } = firebase;

export async function signup(req, res) {
    const { email, password, displayName, role } = req.body;
    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName,
            role
        });
        // Store user in Firestore
        await firestore.collection('users').doc(userRecord.uid).set({
            email,
            displayName,
            role: role || 'member',  // Default role
        });
        res.status(201).json({ message: 'User created', userId: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        // Firebase REST API URL for sign-in
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

        // Make a POST request to Firebase Auth REST API to verify email and password
        const response = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });

        const { idToken } = response.data;

        // Return the token to the client
        res.status(200).json({ idToken });
    } catch (error) {
        res.status(400).json({ error: 'Invalid login credentials' });
    }
}
