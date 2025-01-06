import firebase from '../config/firebase.js';

const { firestore } = firebase;

export async function getStats(req, res) {
    try {
        const membersCount = await firestore.collection('members').get().then(snap => snap.size);
        const trainersCount = await firestore.collection('trainers').get().then(snap => snap.size);
        const classesCount = await firestore.collection('classes').where('status', '==', 'active').get().then(snap => snap.size);
        const revenue = 10000;  // Example static revenue data

        res.status(200).json({ membersCount, trainersCount, classesCount, revenue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
