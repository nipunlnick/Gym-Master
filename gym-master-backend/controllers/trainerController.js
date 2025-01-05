import { firestore } from '../firebaseConfig';

export async function getTrainers(req, res) {
    try {
        const trainersSnapshot = await firestore.collection('trainers').get();
        const trainers = trainersSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(trainers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createTrainer(req, res) {
    const { name, specialty, experience, contactInfo } = req.body;

    try {
        const newTrainer = await firestore.collection('trainers').add({
            name,
            specialty,
            experience,
            contactInfo,
        });
        return res.status(201).json({ id: newTrainer.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
