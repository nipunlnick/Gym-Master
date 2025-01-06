import firebase from '../config/firebase.js';

const { firestore, auth } = firebase;

export async function signup(req, res) {
    const { email, password, displayName } = req.body;
    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName
        });
        // Store user in Firestore
        await firestore.collection('users').doc(userRecord.uid).set({
            email,
            displayName,
            role: 'member',  // Default role
        });
        res.status(201).json({ message: 'User created', userId: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await auth.getUserByEmail(email);
        // Token generation using JWT
        const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Invalid login credentials' });
    }
}
