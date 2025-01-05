import { initializeApp, credential as _credential, firestore as _firestore, auth as _auth } from 'firebase-admin';
import serviceAccount from './path/to/firebase-admin-sdk.json'; // path to the downloaded admin SDK key

initializeApp({
    credential: _credential.cert(serviceAccount),
    databaseURL: "https://<your-project-id>.firebaseio.com",
});

const firestore = _firestore();
const auth = _auth();

export default { firestore, auth };
