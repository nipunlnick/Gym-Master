import firebase from '../config/firebaseConfig.js';

const { auth } = firebase;

export async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        // Extract the ID token from the Authorization header
        const idToken = token.split(' ')[1];

        // Verify the ID token using Firebase Admin SDK
        const decodedToken = await auth.verifyIdToken(idToken);

        // Add the user's UID to the request object for future use
        req.userId = decodedToken.uid;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
