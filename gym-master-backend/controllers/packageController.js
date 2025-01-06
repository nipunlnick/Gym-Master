import firebase from '../config/firebase.js';

const { firestore } = firebase;

export async function createPackage(req, res) {
    const { name, price, description } = req.body;
    try {
        const newPackage = await firestore.collection('packages').add({ name, price, description });
        res.status(201).json({ id: newPackage.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getPackages(req, res) {
    try {
        const packagesSnapshot = await firestore.collection('packages').get();
        const packages = packagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updatePackage(req, res) {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        await firestore.collection('packages').doc(id).update({ name, price, description });
        res.status(200).json({ message: 'Package updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deletePackage(req, res) {
    const { id } = req.params;
    try {
        await firestore.collection('packages').doc(id).delete();
        res.status(200).json({ message: 'Package deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
