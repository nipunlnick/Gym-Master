import firebase from '../config/firebase.js';

const { firestore } = firebase;

export async function getClients(req, res) {
    try {
        const clientsSnapshot = await firestore.collection('clients').get();
        const clients = clientsSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createClient(req, res) {
    const { name, membershipPlan, joinedDate, contactInfo } = req.body;

    try {
        const newClient = await firestore.collection('clients').add({
            name,
            membershipPlan,
            joinedDate,
            contactInfo,
        });
        return res.status(201).json({ id: newClient.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
