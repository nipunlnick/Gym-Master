import { auth } from '../firebaseConfig';

export async function signup(req, res) {
    const { email, password, displayName } = req.body;

    try {
        const user = await auth.createUser({
            email,
            password,
            displayName,
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await auth.getUserByEmail(email);
        // Simulate authentication (in real life, use Firebase client-side for login)
        // This is just for demonstration:
        if (user.email === email && password) {
            return res.status(200).json({ token: "dummy-token", user });
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
