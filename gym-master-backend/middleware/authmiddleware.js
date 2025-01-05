import { auth } from '../firebaseConfig';

export async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
