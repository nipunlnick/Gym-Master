import admin from 'firebase-admin';
import { createRequire } from 'module'; // Needed to use require in ES Modules

// Use `createRequire()` to load JSON files in ES Module context
const require = createRequire(import.meta.url);
const serviceAccount = require('./firebaseAdminConfig.json');

// Check if Firebase has already been initialized to prevent duplicate initialization
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        //databaseURL: "https://gym-master-ff735.firebaseio.com",  // Ensure this is your actual database URL
        //databaseURL: "https://gym-master-65885.firebaseio.com",
        databaseURL: "https://gym-main-36133.firebaseio.com",
    });
}

const firestore = admin.firestore();
const auth = admin.auth();

export default { firestore, auth };
