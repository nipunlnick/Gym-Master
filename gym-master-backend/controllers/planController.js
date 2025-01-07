import firebase from '../config/firebaseConfig.js';

const { firestore } = firebase;

export async function getPlans(req, res) {
    try {
        const plansSnapshot = await firestore.collection('plans').get();
        const plans = plansSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(plans);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createPlan(req, res) {
    const { name, price } = req.body;

    try {
        const newPlan = await firestore.collection('plans').add({
            name,
            price,
        });
        return res.status(201).json({ id: newPlan.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
